import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowLeft, Search as SearchIcon } from 'lucide-react';

interface SearchItem {
  id: string;
  type: 'visualization' | 'deep-dive' | 'news';
  category: string;
  title: string;
  description: string;
  readTime?: string;
}

const allItems: SearchItem[] = [
  // Visualization Items
  {
    id: '1',
    type: 'visualization',
    category: 'Network',
    title: 'Block-STM Throughput Analysis',
    description: 'Real-time visualization of parallel transaction execution performance.',
    readTime: '5 min read'
  },
  {
    id: '2',
    type: 'visualization',
    category: 'Validators',
    title: 'Global Validator Distribution',
    description: 'Interactive map showing validator nodes across the world.',
    readTime: '5 min read'
  },
  {
    id: '3',
    type: 'visualization',
    category: 'Performance',
    title: 'Gas Fee Trends',
    description: 'Historical analysis of transaction costs over time.',
    readTime: '5 min read'
  },
  {
    id: '4',
    type: 'visualization',
    category: 'DeFi',
    title: 'TVL Growth Metrics',
    description: 'Total Value Locked progression across Aptos DeFi protocols.',
    readTime: '5 min read'
  },
  {
    id: '5',
    type: 'visualization',
    category: 'Transactions',
    title: 'Daily Active Addresses',
    description: 'User activity patterns and network adoption metrics.',
    readTime: '5 min read'
  },
  {
    id: '6',
    type: 'visualization',
    category: 'Infrastructure',
    title: 'Node Response Latency',
    description: 'RPC endpoint performance monitoring dashboard.',
    readTime: '5 min read'
  },
  // Deep Dive Items
  {
    id: '1',
    type: 'deep-dive',
    category: 'Architecture',
    title: 'The Evolution of Consensus: From HotStuff to Bullshark',
    description: 'An in-depth analysis of how DAG-based consensus mechanisms are reducing latency and increasing throughput in the latest network upgrade.',
    readTime: '12 min read'
  },
  {
    id: '2',
    type: 'deep-dive',
    category: 'Language',
    title: 'Move vs Solidity: A Security-First Comparison',
    description: 'How the Move language object model provides superior security guarantees for high-value financial protocols.',
    readTime: '15 min read'
  },
  {
    id: '3',
    type: 'deep-dive',
    category: 'Gaming',
    title: 'Web3 Gaming: Beyond the Hype Cycle',
    description: 'Why fast finality is the missing link for on-chain gaming experiences, and how Aptos solves the synchronization problem.',
    readTime: '10 min read'
  },
  {
    id: '4',
    type: 'deep-dive',
    category: 'Economics',
    title: 'Tokenomics Deep Dive: APT Distribution Analysis',
    description: 'A comprehensive analysis of APT token distribution, vesting schedules, and long-term economic implications.',
    readTime: '18 min read'
  },
  {
    id: '5',
    type: 'deep-dive',
    category: 'Infrastructure',
    title: 'Running an Aptos Validator: Technical Requirements',
    description: 'Complete guide to validator node setup, hardware requirements, and operational best practices.',
    readTime: '20 min read'
  },
  {
    id: '6',
    type: 'deep-dive',
    category: 'Development',
    title: 'Building Your First Move Module',
    description: 'Step-by-step tutorial for developers new to Move, covering fundamentals through deployment.',
    readTime: '25 min read'
  },
  // News Items
  {
    id: '1',
    type: 'news',
    category: 'Announcement',
    title: 'Aptos Foundation Announces $50M Ecosystem Fund',
    description: 'New initiative to accelerate developer adoption and protocol development across the Aptos ecosystem.',
    readTime: '4 min read'
  },
  {
    id: '2',
    type: 'news',
    category: 'Update',
    title: 'Network Upgrade v1.9: Performance Improvements',
    description: 'Latest network upgrade brings 40% improvement in transaction throughput and reduced gas costs.',
    readTime: '6 min read'
  },
  {
    id: '3',
    type: 'news',
    category: 'Partnership',
    title: 'Major Exchange Lists APT Perpetual Futures',
    description: 'Leading cryptocurrency exchange adds APT perpetual futures with up to 20x leverage.',
    readTime: '5 min read'
  },
  {
    id: '4',
    type: 'news',
    category: 'Ecosystem',
    title: 'New DEX Launches with Innovative AMM Design',
    description: 'Concentrated liquidity and dynamic fees bring capital efficiency to Aptos DeFi.',
    readTime: '7 min read'
  },
  {
    id: '5',
    type: 'news',
    category: 'Community',
    title: 'Aptos Developer Conference 2026 Announced',
    description: 'Annual developer conference returns with focus on Move ecosystem growth and tooling.',
    readTime: '3 min read'
  },
  {
    id: '6',
    type: 'news',
    category: 'Security',
    title: 'Bug Bounty Program Expanded to $1M',
    description: 'Critical vulnerability rewards increased to attract top security researchers.',
    readTime: '4 min read'
  }
];

const SearchResultCard: React.FC<{ item: SearchItem }> = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${item.type}/${item.id}`);
    window.scrollTo(0, 0);
  };

  const typeColors: Record<string, string> = {
    'visualization': 'bg-teal-100 text-teal-700',
    'deep-dive': 'bg-blue-100 text-blue-700',
    'news': 'bg-purple-100 text-purple-700'
  };

  const typeLabels: Record<string, string> = {
    'visualization': 'Visualization',
    'deep-dive': 'Deep Dive',
    'news': 'News'
  };

  return (
    <motion.div
      className="p-6 border border-gray-200 rounded-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 touch-manipulation"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-bold tracking-widest uppercase px-2 py-1 rounded ${typeColors[item.type] || 'bg-gray-100 text-gray-700'}`}>
          {typeLabels[item.type]}
        </span>
        <span className="text-xs text-gray-400">{item.category}</span>
      </div>
      <h3 className="font-serif text-lg md:text-xl text-journal-black mb-2 leading-tight group-hover:text-journal-accent transition-colors">
        {item.title}
      </h3>
      <p className="font-sans text-sm text-journal-gray mb-4 line-clamp-2">
        {item.description}
      </p>
      {item.readTime && (
        <div className="text-xs text-gray-400 font-serif italic">
          {item.readTime}
        </div>
      )}
    </motion.div>
  );
};

export const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return allItems.filter(
      item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-8">
          {/* Search Header */}
          <div className="mb-12 max-w-2xl mx-auto">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-journal-gray hover:text-journal-black transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">Back to Home</span>
            </button>

            <h1 className="font-serif text-4xl md:text-5xl text-journal-black mb-6">
              Search
            </h1>

            {/* Search Input */}
            <form onSubmit={handleSearch} className="relative">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search visualizations, articles, and insights..."
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-full font-sans text-base focus:outline-none focus:border-journal-accent transition-colors"
                  autoFocus
                />
                <SearchIcon className="absolute right-6 text-journal-gray pointer-events-none" size={20} />
              </div>
            </form>
          </div>

          {/* Results */}
          <div className="max-w-4xl mx-auto">
            {searchQuery.trim() === '' ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <SearchIcon className="w-16 h-16 mx-auto text-gray-300 mb-6" />
                <h2 className="font-serif text-2xl text-journal-gray mb-4">
                  Start searching
                </h2>
                <p className="font-sans text-journal-gray max-w-md mx-auto">
                  Find visualizations, deep dive articles, and news from across the Aptos ecosystem
                </p>
              </motion.div>
            ) : results.length === 0 ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <SearchIcon className="w-16 h-16 mx-auto text-gray-300 mb-6" />
                <h2 className="font-serif text-2xl text-journal-gray mb-4">
                  No results found
                </h2>
                <p className="font-sans text-journal-gray max-w-md mx-auto">
                  Try different keywords or browse our main sections
                </p>
              </motion.div>
            ) : (
              <>
                <motion.p
                  className="text-sm text-journal-gray mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Found <span className="font-semibold text-journal-black">{results.length}</span> result{results.length !== 1 ? 's' : ''} for "<span className="font-semibold">{searchQuery}</span>"
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.map((item, index) => (
                    <motion.div
                      key={`${item.type}-${item.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <SearchResultCard item={item} />
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
