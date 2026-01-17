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
    category: 'RWA',
    title: 'RWA Partnership Ecosystem',
    description: 'Aptos의 Real World Asset 토큰화 파트너십 생태계를 탐험하세요.',
    readTime: '5 min read'
  },
  // Deep Dive Items
  {
    id: '1',
    type: 'deep-dive',
    category: 'Strategy',
    title: "Decibel for Trading, Shelby for Data: Aptos's Blueprint for 2026",
    description: 'How Aptos strategically focused on building robust infrastructure in 2025 to prepare for explosive growth in 2026. 거래는 데시벨로, 데이터는 쉘비로: 앱토스가 그리는 2026년의 청사진.',
    readTime: '9 min read'
  },
  // News Items
  {
    id: 'apt-futures-2026',
    type: 'news',
    category: 'Partnership',
    title: 'Bitnomial, 미국 최초 CFTC 규제 Aptos(APT) 선물 출시',
    description: '시카고 기반 암호화폐 거래소 Bitnomial이 미국 최초로 CFTC 규제를 받는 APT 선물 계약을 출시하며, 기관 투자자 유입과 ETF 승인 가능성의 발판을 마련했습니다.',
    readTime: '5 min read'
  },
  {
    id: 'daily-revenue-1m-2026',
    type: 'news',
    category: 'Ecosystem',
    title: 'Aptos 생태계 앱들, 일일 매출 100만 달러 돌파',
    description: 'Aptos 블록체인 위에 구축된 탈중앙화 애플리케이션들이 일일 총 매출 100만 달러를 돌파하며 생태계의 폭발적 성장을 입증했습니다.',
    readTime: '4 min read'
  },
  {
    id: 'block-time-50ms-2025',
    type: 'news',
    category: 'Update',
    title: 'Aptos, Baby Raptr로 50ms 미만 블록 타임 달성',
    description: 'Aptos가 Baby Raptr 및 Velociraptr 업그레이드를 통해 블록 타임 50ms 미만이라는 경이로운 벤치마크를 달성하며 가장 빠른 L1 블록체인으로 자리매김했습니다.',
    readTime: '5 min read'
  },
  {
    id: 'rwa-1-2b-2025',
    type: 'news',
    category: 'Ecosystem',
    title: 'Aptos 온체인 RWA 자산 12억 달러 돌파, 업계 Top 3',
    description: 'Aptos 블록체인의 실물자산(RWA) 토큰화 규모가 12억 달러를 돌파하며 업계 Top 3에 진입했습니다. BlackRock BUIDL 펀드 확장이 주요 원동력입니다.',
    readTime: '5 min read'
  },
  {
    id: 'velociraptr-2025',
    type: 'news',
    category: 'Update',
    title: 'Aptos Velociraptr 업그레이드, 블록 타임 0.5초 미만 달성',
    description: 'Aptos가 Velociraptr 컨센서스 업그레이드를 통해 블록 타임 0.5초 미만을 달성하며 Layer 1 블록체인 성능의 새로운 기준을 제시했습니다.',
    readTime: '5 min read'
  },
  {
    id: 'native-usdc-2025',
    type: 'news',
    category: 'Partnership',
    title: 'Aptos Native USDC 출시, 일일 활성 주소 100만 돌파',
    description: 'Circle의 Native USDC가 Aptos에 공식 출시되며 일일 활성 주소(DAA)가 100만 개를 돌파했습니다. DeFi 생태계의 폭발적 성장이 예상됩니다.',
    readTime: '5 min read'
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
