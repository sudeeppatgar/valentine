import React, { useEffect, useState } from "react";

const Heart: React.FC<{ left: number; delay: number; size: number }> = ({
  left,
  delay,
  size,
}) => {
  return (
    <div
      className="fixed bottom-[-50px] pointer-events-none text-rose-300 opacity-20 animate-float"
      style={{
        left: `${left}%`,
        animationDelay: `${delay}s`,
        fontSize: `${size}px`,
        animation: `float-up 10s linear infinite`,
      }}
    >
      ❤️
    </div>
  );
};

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<
    Array<{ id: number; left: number; delay: number; size: number }>
  >([]);

  useEffect(() => {
    // Reduce number of hearts on mobile for better performance
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const heartCount = isMobile ? 8 : 20;

    const initialHearts = Array.from({ length: heartCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      size: 20 + Math.random() * 30,
    }));
    setHearts(initialHearts);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
          20% { opacity: 0.4; }
          80% { opacity: 0.4; }
          100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
        }
        @media (max-width: 640px) {
          @keyframes float-up {
            0% { transform: translateY(0) rotate(0deg); opacity: 0.05; }
            20% { opacity: 0.2; }
            80% { opacity: 0.2; }
            100% { transform: translateY(-110vh) rotate(180deg); opacity: 0; }
          }
        }
      `}</style>
      {hearts.map((h) => (
        <Heart key={h.id} left={h.left} delay={h.delay} size={h.size} />
      ))}
    </div>
  );
};

export default FloatingHearts;
