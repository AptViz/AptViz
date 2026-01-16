import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { totalValidators, totalCountries, continentStats } from '../visualizations/validators-distribution';

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

          {/* Main Content - Validators Globe */}
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
                    {totalValidators} VALIDATORS
                  </span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="px-3 py-1 bg-indigo-500/10 rounded-full"
                >
                  <span className="text-xs font-mono font-bold text-indigo-600">
                    {totalCountries} COUNTRIES
                  </span>
                </motion.div>
              </div>

              <motion.h1
                className="font-serif text-6xl md:text-7xl font-normal text-journal-black leading-[1.15] mb-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                Active Validators<br />
                <span className="italic text-journal-accent">Global Distribution</span>
              </motion.h1>

              <motion.p
                className="font-sans text-base md:text-lg text-journal-gray leading-relaxed mb-8 max-w-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                전세계 19개국에 분산된 108개 Aptos Validator 노드의 지리적 분포를 3D 지구본으로 탐험하세요.
              </motion.p>

              {/* 대륙별 미니 뱃지 */}
              <motion.div
                className="flex flex-wrap gap-2 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {continentStats.slice(0, 4).map((stat, i) => (
                  <motion.span
                    key={stat.name}
                    className="text-xs px-3 py-1 bg-white/60 rounded-full text-gray-600 border border-gray-200 font-light flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: stat.color }} />
                    {stat.nameKo} ({stat.count})
                  </motion.span>
                ))}
              </motion.div>

              <motion.button
                onClick={() => {
                  navigate('/visualization/2');
                  window.scrollTo(0, 0);
                }}
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-journal-accent text-white rounded-full font-sans text-sm font-medium tracking-wide hover:bg-teal-700 active:bg-teal-800 transition-all duration-300 touch-manipulation"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Globe
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            {/* Right Column - Visualization Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden group cursor-pointer"
              onClick={() => {
                navigate('/visualization/2');
                window.scrollTo(0, 0);
              }}
            >
              {/* Globe Preview Section */}
              <div className="relative w-full h-64 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-3/4 h-3/4">
                  {/* 지구본 원 */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  {/* 위도선 */}
                  {[-30, 0, 30].map((offset, i) => (
                    <motion.ellipse
                      key={`lat-${i}`}
                      cx="100"
                      cy={100 + offset}
                      rx="70"
                      ry={Math.abs(70 - Math.abs(offset) * 1.5)}
                      fill="none"
                      stroke="#0d9488"
                      strokeWidth="0.5"
                      opacity="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                    />
                  ))}
                  {/* 경도선 */}
                  <motion.ellipse
                    cx="100"
                    cy="100"
                    rx="30"
                    ry="70"
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="0.5"
                    opacity="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                  <motion.line
                    x1="30"
                    y1="100"
                    x2="170"
                    y2="100"
                    stroke="#0d9488"
                    strokeWidth="0.5"
                    opacity="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  />
                  {/* Validator 노드들 */}
                  {[
                    { cx: 60, cy: 80, r: 5, color: '#0d9488' },   // 북미
                    { cx: 120, cy: 75, r: 4, color: '#6366f1' },  // 유럽
                    { cx: 145, cy: 90, r: 5, color: '#f59e0b' },  // 아시아
                    { cx: 130, cy: 130, r: 3, color: '#ec4899' }, // 호주
                    { cx: 85, cy: 120, r: 2, color: '#8b5cf6' },  // 남미
                  ].map((node, i) => (
                    <motion.circle
                      key={`node-${i}`}
                      cx={node.cx}
                      cy={node.cy}
                      r={node.r}
                      fill={node.color}
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        delay: 0.8 + i * 0.1,
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    />
                  ))}
                  {/* Arc 연결선 */}
                  <motion.path
                    d="M60,80 Q100,50 145,90"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="3,2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    transition={{ delay: 1.2, duration: 1, repeat: Infinity, repeatDelay: 2 }}
                  />
                  <motion.path
                    d="M120,75 Q140,100 145,90"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="1.5"
                    strokeDasharray="3,2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    transition={{ delay: 1.5, duration: 0.8, repeat: Infinity, repeatDelay: 2.5 }}
                  />
                </svg>
              </div>

              {/* Info Section */}
              <div className="p-8 md:p-10 space-y-6 bg-gray-800">
                <div>
                  <h4 className="font-serif text-xl text-white mb-2">
                    Validators <span className="italic text-teal-400">Global Map</span>
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    3D 지구본으로 전세계 Validator 분포를 탐험하세요.
                  </p>
                </div>

                {/* Region Breakdown */}
                <div className="space-y-3 pt-4 border-t border-gray-700">
                  {[
                    { label: 'North America', value: '36', color: 'text-teal-400' },
                    { label: 'Europe', value: '32', color: 'text-indigo-400' },
                    { label: 'Asia', value: '30', color: 'text-amber-400' }
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="flex justify-between items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <span className="text-xs text-gray-400 font-light">{item.label}</span>
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
