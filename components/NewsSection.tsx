import React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from './ui/ScrollReveal';
import { NewsItem } from '../types';

const newsItems: NewsItem[] = [
  {
    id: '1',
    category: 'Architecture',
    title: 'The Evolution of Consensus: From HotStuff to Bullshark',
    description: 'An in-depth analysis of how DAG-based consensus mechanisms are reducing latency and increasing throughput in the latest network upgrade.',
    imageUrl: '', // We will use abstract placeholders
    date: '4 min read'
  },
  {
    id: '2',
    category: 'Ecosystem',
    title: 'DeFi 2.0: Institutional Grade Lending on Move',
    description: 'How the Move language object model provides superior security guarantees for high-value financial protocols.',
    imageUrl: '', 
    date: '6 min read'
  },
  {
    id: '3',
    category: 'Perspectives',
    title: 'Web3 Gaming: Beyond the Hype Cycle',
    description: 'Why fast finality is the missing link for on-chain gaming experiences, and how Aptos solves the synchronization problem.',
    imageUrl: '',
    date: '5 min read'
  }
];

const AbstractThumbnail = ({ index }: { index: number }) => (
  <div className={`w-full h-full bg-gray-100 overflow-hidden relative`}>
     {/* Generative-ish abstract art */}
     <div className={`absolute inset-0 opacity-20 mix-blend-multiply ${
        index === 0 ? 'bg-teal-200' : index === 1 ? 'bg-blue-200' : 'bg-purple-200'
     }`} />
     <div className="absolute top-0 right-0 w-full h-full border-[20px] border-white/50 rounded-full scale-150 translate-x-1/2 -translate-y-1/2" />
  </div>
);

const ArticleRow: React.FC<{ item: NewsItem; index: number }> = ({ item, index }) => (
  <motion.div 
    className="group flex flex-col md:flex-row gap-8 md:gap-16 py-16 border-b border-gray-100 cursor-pointer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
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
    
    <div className="md:w-1/4 aspect-square md:aspect-[4/5] bg-gray-50 relative overflow-hidden hidden md:block transition-transform duration-700 group-hover:scale-[1.02]">
      <AbstractThumbnail index={index} />
    </div>
  </motion.div>
);

export const NewsSection: React.FC = () => {
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
            <ArticleRow key={item.id} item={item} index={index} />
          ))}
        </div>

        <div className="mt-24 text-center">
            <button className="px-10 py-4 border border-gray-300 rounded-full font-sans text-sm font-bold tracking-widest uppercase hover:bg-journal-black hover:text-white hover:border-journal-black transition-all duration-300">
                Load More Stories
            </button>
        </div>
      </div>
    </section>
  );
};