import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScrollReveal } from './ui/ScrollReveal';
import { NewsItem } from '../types';

const newsItems: NewsItem[] = [
  {
    id: '1',
    category: 'Strategy',
    title: 'Decibel for Trading, Shelby for Data: Aptos\'s Blueprint for 2026',
    description: '2025년에 탄탄한 인프라 구축에 전략적으로 집중하며 2026년의 폭발적인 성장을 준비한 앱토스의 이야기.',
    imageUrl: '/deepdive/article-thumbnail.png',
    date: '9 min read'
  }
];

const AbstractThumbnail = ({ index, imageUrl }: { index: number; imageUrl?: string }) => (
  <div className={`w-full h-full bg-gray-100 overflow-hidden relative flex items-center justify-center`}>
     {imageUrl ? (
       <img src={imageUrl} alt="" className="w-full h-auto object-contain" />
     ) : (
       <>
         {/* Generative-ish abstract art */}
         <div className={`absolute inset-0 opacity-20 mix-blend-multiply ${
            index === 0 ? 'bg-teal-200' : index === 1 ? 'bg-blue-200' : 'bg-purple-200'
         }`} />
         <div className="absolute top-0 right-0 w-full h-full border-[20px] border-white/50 rounded-full scale-150 translate-x-1/2 -translate-y-1/2" />
       </>
     )}
  </div>
);

const ArticleRow: React.FC<{ item: NewsItem; index: number; onClick: () => void }> = ({ item, index, onClick }) => {
  const handleClick = () => {
    onClick();
    window.scrollTo(0, 0);
  };

  return (
    <motion.div 
      className="group flex flex-col md:flex-row gap-8 md:gap-16 py-16 border-b border-gray-100 cursor-pointer touch-manipulation"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={handleClick}
      whileTap={{ scale: 0.99 }}
    >
    <div className="md:w-3/4 pr-4">
      <div className="flex items-center gap-4 mb-4">
         <span className="text-xs font-bold tracking-widest uppercase text-journal-accent">{item.category}</span>
         <span className="text-xs text-gray-400 font-serif italic">{item.date}</span>
      </div>
      <h3 className="font-serif text-3xl md:text-4xl text-journal-black mb-4 group-hover:text-journal-accent transition-colors duration-300 leading-tight">
        {item.title}
      </h3>
      <p className="font-sans text-journal-gray text-lg leading-relaxed font-light line-clamp-2 md:line-clamp-none">
        {item.description}
      </p>
      <div className="mt-6 flex items-center gap-2 text-sm font-bold underline decoration-1 underline-offset-4 decoration-gray-300 group-hover:decoration-journal-accent transition-all">
        Read Article
      </div>
    </div>
    
    <div className="md:w-1/4 aspect-[40/21] bg-gray-50 relative overflow-hidden hidden md:block transition-transform duration-700 group-hover:scale-[1.02]">
      <AbstractThumbnail index={index} imageUrl={item.imageUrl} />
    </div>
  </motion.div>
  );
};

export const NewsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 bg-[#F9F9F9]">
      <div className="container mx-auto px-8 max-w-5xl">
        
        <div className="mb-20 border-b border-black pb-6 flex justify-between items-end">
          <ScrollReveal width="fit-content">
            <h2 className="font-serif text-5xl md:text-6xl text-journal-black">
              Deep Dive
            </h2>
          </ScrollReveal>
          <div className="hidden md:block text-right">
              <p className="font-serif italic text-xl text-gray-500">Perspectives & Analysis</p>
          </div>
        </div>

        <div>
          {newsItems.map((item, index) => (
            <ArticleRow 
              key={item.id} 
              item={item} 
              index={index} 
              onClick={() => navigate(`/deep-dive/${item.id}`)}
            />
          ))}
        </div>

        <div className="mt-24 text-center">
            <button 
              onClick={() => {
                navigate('/deep-dive');
                window.scrollTo(0, 0);
              }}
              className="px-10 py-4 border border-gray-300 rounded-full font-sans text-sm font-bold tracking-widest uppercase hover:bg-journal-black hover:text-white hover:border-journal-black active:bg-gray-800 transition-all duration-300 touch-manipulation"
            >
                View All Articles
            </button>
        </div>
      </div>
    </section>
  );
};