import React from "react";
import { GalleryItem } from "../types";

const GalleryCard: React.FC<{ onBack: () => void; items?: GalleryItem[] }> = ({
  onBack,
  items,
}) => {
  const fallbackItems = [
    { id: "1", imageUrl: "", caption: "Cute as a kitten" },
    { id: "2", imageUrl: "", caption: "Clever & bright" },
    { id: "3", imageUrl: "", caption: "Sweet as a blossom" },
    { id: "4", imageUrl: "", caption: "My sweet strawberry" },
    { id: "5", imageUrl: "", caption: "One tough cookie" },
    { id: "6", imageUrl: "", caption: "Cuddly like a panda" },
  ];
  const galleryItems = items && items.length > 0 ? items : fallbackItems;

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl md:rounded-[3rem] shadow-2xl card-enter w-full">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-romantic font-bold text-rose-600 text-center mb-6 sm:mb-8 md:mb-10 underline decoration-rose-200 underline-offset-4 sm:underline-offset-6 md:underline-offset-8 leading-tight">
        Look at this cutie!
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden bg-rose-50 p-2 sm:p-3 md:p-4 rounded-2xl md:rounded-3xl flex flex-col items-center gap-2 sm:gap-3 md:gap-4 transition-all hover:bg-rose-100 hover:scale-105 active:scale-95 cursor-pointer border-2 border-transparent hover:border-rose-300"
          >
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.caption}
                className="w-full h-24 sm:h-32 md:h-40 object-cover rounded-xl md:rounded-2xl shadow-sm"
              />
            ) : (
              <div className="text-5xl sm:text-6xl md:text-7xl group-hover:animate-bounce">
                💝
              </div>
            )}
            <p className="font-bold text-rose-500 text-center text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
              {item.caption}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center">
        <button
          onClick={onBack}
          className="bg-rose-400 hover:bg-rose-500 active:scale-95 text-white px-8 sm:px-10 md:px-12 py-2 sm:py-2.5 md:py-3 rounded-full font-bold shadow-md transition-all text-sm sm:text-base md:text-lg"
        >
          Back Home
        </button>
      </div>
    </div>
  );
};

export default GalleryCard;
