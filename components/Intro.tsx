import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface IntroProps {
  onEnter: () => void;
}

const TypingText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return <>{displayedText}</>;
};

export const Intro: React.FC<IntroProps> = ({ onEnter }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F9F9F9] text-journal-black overflow-hidden cursor-pointer"
      onClick={onEnter}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }}
      transition={{ duration: 0.8 }}
    >
      {/* Abstract Flowing Background - Pastel Tones */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply">
        <motion.div 
          className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-teal-100 blur-[80px]"
          animate={{ x: [0, 50, -50, 0], y: [0, -30, 30, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-[20%] right-[20%] w-[35vw] h-[35vw] rounded-full bg-blue-100 blur-[80px]"
          animate={{ x: [0, -40, 40, 0], y: [0, 40, -40, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-[40%] left-[40%] w-[30vw] h-[30vw] rounded-full bg-purple-50 blur-[80px]"
          animate={{ x: [0, 30, -30, 0], y: [0, 30, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight text-journal-black leading-none mb-6">
              <TypingText text="The Speed" delay={200} />
              <br/>
              <span className="italic">
                <TypingText text="of Thought" delay={800} />
              </span>
            </h1>
        </motion.div>

        <motion.p
          className="text-journal-gray font-sans text-sm md:text-base tracking-widest uppercase mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5, ease: "easeInOut" }}
        >
          Click to Explore
        </motion.p>
      </div>
    </motion.div>
  );
};