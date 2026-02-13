import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white/90 backdrop-blur-md p-5 sm:p-7 md:p-10 rounded-xl sm:rounded-2xl md:rounded-[2.5rem] shadow-2xl border-2 md:border-4 border-rose-200 space-y-5 sm:space-y-6 md:space-y-8 w-full max-w-2xl mx-auto">
      <div className="text-center space-y-2 sm:space-y-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-romantic font-bold text-rose-600 leading-tight">
          About Valentine Enchantment
        </h1>
        <p className="text-rose-500 text-sm sm:text-base md:text-lg leading-relaxed">
          A playful, heartfelt way to create a personal Valentine experience and
          share it with someone special.
        </p>
      </div>

      <section className="space-y-2 sm:space-y-3">
        <h2 className="text-lg sm:text-xl md:text-2xl font-romantic font-bold text-rose-600">
          What It Is
        </h2>
        <p className="text-rose-500 text-sm sm:text-base leading-relaxed">
          Valentine Enchantment lets you craft a custom proposal, love letter,
          quiz, gallery, and more — all in one beautiful, shareable experience.
          Your recipient opens a single link and explores each surprise step by
          step.
        </p>
      </section>

      <section className="space-y-2 sm:space-y-3">
        <h2 className="text-lg sm:text-xl md:text-2xl font-romantic font-bold text-rose-600">
          Privacy
        </h2>
        <p className="text-rose-500 text-sm sm:text-base leading-relaxed">
          Your content is stored securely and only accessible through your
          unique share link once it is approved. We do not sell or share your
          personal data.
        </p>
      </section>

      <section className="space-y-2 sm:space-y-3">
        <h2 className="text-lg sm:text-xl md:text-2xl font-romantic font-bold text-rose-600">
          Support
        </h2>
        <p className="text-rose-500 text-sm sm:text-base leading-relaxed">
          Need help or changes? Contact us and we'll take care of it quickly.
        </p>
        <p className="text-rose-400 text-xs sm:text-sm">phone no: 8951787715</p>
      </section>

      <section className="space-y-2 sm:space-y-3">
        <h2 className="text-lg sm:text-xl md:text-2xl font-romantic font-bold text-rose-600">
          Terms
        </h2>
        <p className="text-rose-500 text-sm sm:text-base leading-relaxed">
          By using this service, you agree to provide respectful content and
          avoid any abusive or harmful material. We reserve the right to reject
          or remove content that violates these guidelines.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
