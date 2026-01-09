import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { totalRWATvl } from '../visualizations';

const formatTVL = (tvl: number): string => {
  if (tvl >= 1_000_000_000) return `$${(tvl / 1_000_000_000).toFixed(2)}B`;
  if (tvl >= 1_000_000) return `$${(tvl / 1_000_000).toFixed(1)}M`;
  return `$${tvl.toLocaleString()}`;
};

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 w-full bg-[#F9F9F9] overflow-hidden">
      
      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-6xl">
          {/* Vol. 1 Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <span className="font-sans text-journal-gray text-xs font-bold tracking-[0.2em] uppercase border-b border-journal-gray pb-2 inline-block">
              Featured Visualization
            </span>
          </motion.div>

          {/* Main Content - RWA Partnership */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Column - Title & Description */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="px-3 py-1 bg-journal-accent/10 rounded-full"
                >
                  <span className="text-xs font-mono font-bold text-journal-accent">
                    TVL {formatTVL(totalRWATvl)}
                  </span>
                </motion.div>
              </div>

              <motion.h1 
                className="font-serif text-6xl md:text-7xl font-normal text-journal-black leading-[1.15] mb-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                RWA Partnership<br />
                <span className="italic text-journal-accent">Ecosystem</span>
              </motion.h1>

              <motion.p
                className="font-sans text-base md:text-lg text-journal-gray leading-relaxed mb-8 max-w-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                BlackRock, Franklin Templeton 등 글로벌 금융 기관들과 함께하는 Aptos의 Real World Asset 토큰화 생태계를 탐험하세요.
              </motion.p>

              {/* 파트너 미니 뱃지 */}
              <motion.div 
                className="flex flex-wrap gap-2 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {['BlackRock', 'PACT', 'Securitize', 'Tether', 'Circle'].map((partner, i) => (
                  <motion.span 
                    key={partner}
                    className="text-xs px-3 py-1 bg-white/60 rounded-full text-gray-600 border border-gray-200 font-light"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                  >
                    {partner}
                  </motion.span>
                ))}
                <motion.span 
                  className="text-xs px-3 py-1 bg-journal-accent/10 rounded-full text-journal-accent border border-journal-accent/20 font-light"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.75 }}
                >
                  +12 more
                </motion.span>
              </motion.div>

              <motion.button
                onClick={() => {
                  navigate('/visualization/1');
                  window.scrollTo(0, 0);
                }}
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-journal-accent text-white rounded-full font-sans text-sm font-medium tracking-wide hover:bg-teal-700 active:bg-teal-800 transition-all duration-300 touch-manipulation"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Map
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            {/* Right Column - Visualization Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden group cursor-pointer"
              onClick={() => {
                navigate('/visualization/1');
                window.scrollTo(0, 0);
              }}
            >
              {/* Image Section */}
              <div className="relative w-full h-64 bg-gradient-to-br from-teal-50 to-indigo-50 overflow-hidden">
                <img 
                  src="/images/RWA.png" 
                  alt="RWA Partnership Ecosystem"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info Section */}
              <div className="p-8 md:p-10 space-y-6">
                <div>
                  <h4 className="font-serif text-xl text-journal-black mb-2">
                    RWA Partnership <span className="italic">Ecosystem</span>
                  </h4>
                  <p className="text-sm text-journal-gray leading-relaxed">
                    Aptos의 Real World Asset 토큰화 생태계를 탐험하세요.
                  </p>
                </div>

                {/* Category Breakdown */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  {[
                    { label: 'Asset Managers', value: '$317M', color: 'text-teal-600' },
                    { label: 'RWA Platforms', value: '$603M', color: 'text-indigo-600' },
                    { label: 'Stablecoins', value: '$914M', color: 'text-pink-600' }
                  ].map((item, i) => (
                    <motion.div 
                      key={item.label}
                      className="flex justify-between items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <span className="text-xs text-gray-600 font-light">{item.label}</span>
                      <span className={`font-mono font-bold text-sm ${item.color}`}>
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};