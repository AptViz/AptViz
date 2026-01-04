import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-48 pb-32 md:pt-64 md:pb-40 w-full bg-[#F9F9F9] overflow-hidden">
      
      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-4xl">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 pl-1"
            >
            <span className="font-sans text-journal-gray text-xs font-bold tracking-[0.2em] uppercase border-b border-journal-gray pb-2">
                Vol. 1 — Genesis
            </span>
            </motion.div>

            <motion.h1 
            className="font-serif text-6xl md:text-8xl font-normal text-journal-black mb-12 leading-[1.1]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
            Redefining<br />
            <span className="italic text-journal-accent">Parallel Execution</span><br/>
            at Scale.
            </motion.h1>

            <div className="flex flex-col md:flex-row gap-12 items-start">
                <motion.p
                    className="font-sans text-lg text-journal-gray max-w-md leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                    A curated look into the mechanics of Block-STM and the Move language. 
                    We explore how Aptos achieves sub-second latency while maintaining 
                    decentralized integrity.
                </motion.p>
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative w-full md:w-64 h-64 bg-white p-6 shadow-sm border border-gray-100 flex flex-col justify-between"
                >
                    <div className="text-xs uppercase tracking-widest text-gray-400">Current Status</div>
                    <div className="font-serif text-4xl text-journal-black">
                        24K <span className="text-lg italic text-gray-400">TPS</span>
                    </div>
                    <div className="w-full h-px bg-gray-200 my-2"></div>
                    <div className="font-serif text-4xl text-journal-black">
                        400ms <span className="text-lg italic text-gray-400">Finality</span>
                    </div>
                </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
};