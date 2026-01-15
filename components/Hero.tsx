import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { totalRWATvl } from '../visualizations';

const formatTVL = (tvl: number): string => {
  if (tvl >= 1_000_000_000) return `$${(tvl / 1_000_000_000).toFixed(2)}B`;
  if (tvl >= 1_000_000) return `$${(tvl / 1_000_000).toFixed(1)}M`;
  return `$${tvl.toLocaleString()}`;
};

interface SlideItem {
  id: string;
  type: 'visualization' | 'deepdive' | 'news';
  category: string;
  badge?: string;
  title: React.ReactNode;
  description: string;
  tags?: string[];
  buttonText: string;
  link: string;
  image: string;
  cardTitle: string;
  cardDescription: string;
  stats?: { label: string; value: string; color: string }[];
}

const slides: SlideItem[] = [
  {
    id: '1',
    type: 'visualization',
    category: 'Featured Visualization',
    badge: `TVL ${formatTVL(totalRWATvl)}`,
    title: <>RWA Partnership<br /><span className="italic text-journal-accent">Ecosystem</span></>,
    description: 'BlackRock, Franklin Templeton 등 글로벌 금융 기관들과 함께하는 Aptos의 Real World Asset 토큰화 생태계를 탐험하세요.',
    tags: ['BlackRock', 'PACT', 'Securitize', 'Tether', 'Circle'],
    buttonText: 'Explore Map',
    link: '/visualization/1',
    image: '/visualization/RWA.png',
    cardTitle: 'RWA Partnership Ecosystem',
    cardDescription: 'Aptos의 Real World Asset 토큰화 생태계를 탐험하세요.',
    stats: [
      { label: 'Asset Managers', value: '$317M', color: 'text-teal-600' },
      { label: 'RWA Platforms', value: '$603M', color: 'text-indigo-600' },
      { label: 'Stablecoins', value: '$914M', color: 'text-pink-600' }
    ]
  },
  {
    id: '2',
    type: 'deepdive',
    category: 'Deep Dive',
    badge: '9 min read',
    title: <>거래는 데시벨로,<br /><span className="italic text-journal-accent">데이터는 쉘비로</span></>,
    description: '2025년에 탄탄한 인프라 구축에 전략적으로 집중하며 2026년의 폭발적인 성장을 준비한 앱토스의 이야기.',
    tags: ['Decibel', 'Shelby', 'Infrastructure', 'Move 2.0'],
    buttonText: 'Read Article',
    link: '/deep-dive/1',
    image: '/deepdive/article-thumbnail.png',
    cardTitle: "Aptos's Blueprint for 2026",
    cardDescription: '앱토스가 그리는 2026년의 청사진',
    stats: [
      { label: 'Block Time', value: '< 50ms', color: 'text-teal-600' },
      { label: 'Measured TPS', value: '25,000+', color: 'text-indigo-600' },
      { label: 'Capacity Headroom', value: '490x', color: 'text-pink-600' }
    ]
  },
  {
    id: '3',
    type: 'news',
    category: 'Latest News',
    badge: 'Jan 14, 2026',
    title: <>Bitnomial, 미국 최초<br /><span className="italic text-journal-accent">APT 선물 출시</span></>,
    description: '시카고 기반 암호화폐 거래소 Bitnomial이 미국 최초로 CFTC 규제를 받는 APT 선물 계약을 출시했습니다.',
    tags: ['CFTC', 'Futures', 'ETF', 'Institutional'],
    buttonText: 'Read More',
    link: '/news/1',
    image: '/news/news-1-bitnomial-apt-futures.png',
    cardTitle: 'First U.S.-Regulated APT Futures',
    cardDescription: 'CFTC 규제 APT 선물로 ETF 승인 기반 마련',
    stats: [
      { label: 'Regulation', value: 'CFTC', color: 'text-teal-600' },
      { label: 'Settlement', value: 'USD/APT', color: 'text-indigo-600' },
      { label: 'Margin', value: 'Crypto OK', color: 'text-pink-600' }
    ]
  }
];

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slides every 3 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section
      className="relative pt-32 pb-24 md:pt-48 md:pb-32 w-full bg-[#F9F9F9] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-6xl">
          {/* Category Label with Slide Indicators */}
          <div className="flex items-center justify-between mb-12">
            <motion.div
              key={slide.category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="font-sans text-journal-gray text-xs font-bold tracking-[0.2em] uppercase border-b border-journal-gray pb-2 inline-block">
                {slide.category}
              </span>
            </motion.div>

            {/* Slide Indicators */}
            <div className="flex items-center gap-4">
              <button
                onClick={goToPrev}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft size={20} className="text-gray-400" />
              </button>
              <div className="flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'w-8 bg-journal-accent'
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={goToNext}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
            >
              {/* Left Column - Title & Description */}
              <div>
                {slide.badge && (
                  <div className="flex items-center gap-3 mb-6">
                    <div className="px-3 py-1 bg-journal-accent/10 rounded-full">
                      <span className="text-xs font-mono font-bold text-journal-accent">
                        {slide.badge}
                      </span>
                    </div>
                  </div>
                )}

                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-normal text-journal-black leading-[1.15] mb-8">
                  {slide.title}
                </h1>

                <p className="font-sans text-base md:text-lg text-journal-gray leading-relaxed mb-8 max-w-lg">
                  {slide.description}
                </p>

                {/* Tags */}
                {slide.tags && (
                  <div className="flex flex-wrap gap-2 mb-10">
                    {slide.tags.map((tag, i) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 bg-white/60 rounded-full text-gray-600 border border-gray-200 font-light"
                      >
                        {tag}
                      </span>
                    ))}
                    {slide.type === 'visualization' && (
                      <span className="text-xs px-3 py-1 bg-journal-accent/10 rounded-full text-journal-accent border border-journal-accent/20 font-light">
                        +12 more
                      </span>
                    )}
                  </div>
                )}

                <button
                  onClick={() => {
                    navigate(slide.link);
                    window.scrollTo(0, 0);
                  }}
                  className="group inline-flex items-center gap-3 px-6 py-3.5 bg-journal-accent text-white rounded-full font-sans text-sm font-medium tracking-wide hover:bg-teal-700 active:bg-teal-800 transition-all duration-300 touch-manipulation"
                >
                  {slide.buttonText}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Right Column - Card Preview */}
              <div
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow duration-300"
                onClick={() => {
                  navigate(slide.link);
                  window.scrollTo(0, 0);
                }}
              >
                {/* Image Section */}
                <div className="relative w-full h-64 bg-gradient-to-br from-teal-50 to-indigo-50 overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.cardTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info Section */}
                <div className="p-8 md:p-10 space-y-6">
                  <div>
                    <h4 className="font-serif text-xl text-journal-black mb-2">
                      {slide.cardTitle}
                    </h4>
                    <p className="text-sm text-journal-gray leading-relaxed">
                      {slide.cardDescription}
                    </p>
                  </div>

                  {/* Stats */}
                  {slide.stats && (
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                      {slide.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="flex justify-between items-center"
                        >
                          <span className="text-xs text-gray-600 font-light">{stat.label}</span>
                          <span className={`font-mono font-bold text-sm ${stat.color}`}>
                            {stat.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};
