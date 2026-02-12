import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white/90 backdrop-blur-md p-10 rounded-[2.5rem] shadow-2xl border-4 border-rose-200 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-romantic font-bold text-rose-600">About Valentine Enchantment</h1>
        <p className="text-rose-500 text-lg">
          A playful, heartfelt way to create a personal Valentine experience and share it with someone special.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-2xl font-romantic font-bold text-rose-600">What It Is</h2>
        <p className="text-rose-500">
          Valentine Enchantment lets you craft a custom proposal, love letter, quiz, gallery, and more — all in one
          beautiful, shareable experience. Your recipient opens a single link and explores each surprise step by step.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-romantic font-bold text-rose-600">Privacy</h2>
        <p className="text-rose-500">
          Your content is stored securely and only accessible through your unique share link once it is approved.
          We do not sell or share your personal data.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-romantic font-bold text-rose-600">Support</h2>
        <p className="text-rose-500">
          Need help or changes? Contact us and we’ll take care of it quickly.
        </p>
        <p className="text-rose-400 text-sm">
          phone no: 9481649205
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-romantic font-bold text-rose-600">Terms</h2>
        <p className="text-rose-500">
          By using this service, you agree to provide respectful content and avoid any abusive or harmful material.
          We reserve the right to reject or remove content that violates these guidelines.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
