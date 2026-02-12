import React from "react";

const toEmbedUrl = (url: string) => {
  // YouTube
  if (url.includes("youtube.com/watch")) {
    const params = new URL(url).searchParams;
    const id = params.get("v");
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }

  // Vimeo
  if (url.includes("vimeo.com/")) {
    const id = url.split("vimeo.com/")[1]?.split("?")[0];
    return id ? `https://player.vimeo.com/video/${id}` : url;
  }

  // Daily Motion
  if (url.includes("dailymotion.com/video/")) {
    const id = url.split("dailymotion.com/video/")[1]?.split("_")[0];
    return id ? `https://www.dailymotion.com/embed/video/${id}` : url;
  }

  // Return original URL for fallback
  return url;
};

const VideoCard: React.FC<{ onBack: () => void; videoLink: string }> = ({
  onBack,
  videoLink,
}) => {
  const embedUrl = toEmbedUrl(videoLink);
  const isEmbeddable =
    embedUrl.includes("embed") || embedUrl.includes("player");

  return (
    <div className="bg-white/90 backdrop-blur-md p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-[2rem] shadow-2xl card-enter w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-romantic font-bold text-rose-600">
          A Video Just for You 🎬
        </h2>
        <p className="text-rose-400 italic text-sm sm:text-base mt-1 sm:mt-2">
          Press play and feel the love
        </p>
      </div>

      {/* Video Container */}
      {isEmbeddable ? (
        <div className="aspect-video w-full rounded-lg sm:rounded-2xl overflow-hidden shadow-lg border-2 border-rose-100">
          <iframe
            src={embedUrl}
            title="Valentine Video"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="bg-rose-50 p-4 sm:p-6 rounded-lg sm:rounded-2xl text-center border-2 border-rose-100">
          <p className="text-rose-500 mb-4 text-sm sm:text-base">
            Your video is ready to watch.
          </p>
          <a
            href={videoLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-rose-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold hover:bg-rose-600 active:bg-rose-700 transition-colors text-sm sm:text-base touch-friendly"
          >
            Open Video
          </a>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-6 sm:mt-8 flex justify-center">
        <button
          onClick={onBack}
          className="text-rose-400 hover:text-rose-600 active:text-rose-700 transition-colors font-semibold py-2 px-4 rounded-lg hover:bg-rose-50 text-sm sm:text-base min-h-10 sm:min-h-12 flex items-center justify-center"
        >
          ← Back to Menu
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
