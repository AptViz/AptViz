import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { ArrowLeft } from 'lucide-react';

interface VisualizationItem {
  id: string;
  category: string;
  title: string;
  description: string;
  content: string;
}

const visualizationItems: VisualizationItem[] = [
  {
    id: '1',
    category: 'Network',
    title: 'Block-STM Throughput Analysis',
    description: 'Real-time visualization of parallel transaction execution performance.',
    content: `Block-STM is a parallel execution engine that enables high throughput by optimistically executing transactions in parallel while ensuring serializable outcomes.

The visualization shows how Block-STM achieves near-linear scaling with the number of cores, maintaining consistency through a novel multi-version data structure.

Key metrics displayed:
- Transaction throughput per second
- Parallel execution efficiency
- Conflict resolution overhead
- Memory utilization patterns

This approach allows Aptos to achieve over 160,000 transactions per second in controlled environments, making it one of the fastest blockchain networks.`
  },
  {
    id: '2',
    category: 'Validators',
    title: 'Global Validator Distribution',
    description: 'Interactive map showing validator nodes across the world.',
    content: `The Aptos network is secured by over 100 validator nodes distributed across multiple continents, ensuring geographic decentralization and network resilience.

This visualization provides:
- Real-time validator status monitoring
- Geographic distribution heatmap
- Stake weight visualization
- Network latency measurements between nodes

The decentralized nature of the validator set ensures that no single entity can control the network, maintaining the core principles of blockchain technology.`
  },
  {
    id: '3',
    category: 'Performance',
    title: 'Gas Fee Trends',
    description: 'Historical analysis of transaction costs over time.',
    content: `Aptos maintains consistently low gas fees through its efficient execution environment and gas pricing mechanism.

This chart displays:
- Average gas fees over the past 30 days
- Peak vs. off-peak pricing patterns
- Comparison with other L1 networks
- Fee prediction models

Understanding gas trends helps developers and users optimize their transaction timing and budget allocation.`
  },
  {
    id: '4',
    category: 'DeFi',
    title: 'TVL Growth Metrics',
    description: 'Total Value Locked progression across Aptos DeFi protocols.',
    content: `The Total Value Locked (TVL) in Aptos DeFi protocols has shown remarkable growth since mainnet launch.

Visualization features:
- Protocol-by-protocol breakdown
- Growth rate analysis
- Comparison with ecosystem development
- Yield farming APY trends

The Move language's safety guarantees have attracted significant DeFi development, leading to diverse protocol offerings.`
  },
  {
    id: '5',
    category: 'Transactions',
    title: 'Daily Active Addresses',
    description: 'User activity patterns and network adoption metrics.',
    content: `Daily Active Addresses (DAA) is a key metric for measuring network adoption and user engagement.

This visualization tracks:
- Unique addresses interacting with the network daily
- New vs. returning address ratios
- Activity segmentation by transaction type
- Correlation with market events

Growing DAA indicates healthy network adoption and sustainable ecosystem growth.`
  },
  {
    id: '6',
    category: 'Infrastructure',
    title: 'Node Response Latency',
    description: 'RPC endpoint performance monitoring dashboard.',
    content: `Fast and reliable RPC endpoints are crucial for dApp user experience and developer productivity.

Dashboard metrics include:
- Average response times across regions
- Success rate percentages
- Load balancing efficiency
- Peak traffic handling capacity

Aptos provides multiple public RPC endpoints with enterprise-grade reliability for production applications.`
  }
];

const VisualizationCard: React.FC<{ item: VisualizationItem; index: number }> = ({ item, index }) => {
  const navigate = useNavigate();
  
  const colors = ['bg-teal-100', 'bg-blue-100', 'bg-purple-100', 'bg-amber-100', 'bg-rose-100', 'bg-emerald-100'];
  
  const handleClick = () => {
    navigate(`/visualization/${item.id}`);
    window.scrollTo(0, 0);
  };
  
  return (
    <motion.div
      className="group cursor-pointer touch-manipulation"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={handleClick}
      whileTap={{ scale: 0.98 }}
    >
      <div className="bg-white border border-gray-100 rounded-sm overflow-hidden hover:shadow-xl active:shadow-lg transition-all duration-500 hover:-translate-y-1">
        <div className={`aspect-[4/3] ${colors[index % colors.length]} relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-30">
            <svg viewBox="0 0 200 150" className="w-full h-full">
              <motion.path
                d={`M0,75 Q50,${30 + index * 10} 100,75 T200,75`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-600"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
              />
              {[40, 100, 160].map((cx, i) => (
                <motion.circle
                  key={i}
                  cx={cx}
                  cy={75 + Math.sin(index + i) * 20}
                  r="4"
                  fill="currentColor"
                  className="text-gray-700"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                />
              ))}
            </svg>
          </div>
          <div className="absolute top-4 left-4">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-700 bg-white/80 px-2 py-1 rounded">
              {item.category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-serif text-xl text-journal-black mb-2 group-hover:text-journal-accent transition-colors">
            {item.title}
          </h3>
          <p className="font-sans text-sm text-journal-gray font-light line-clamp-2">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const VisualizationDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = visualizationItems.find(v => v.id === id);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Item not found</p>
      </div>
    );
  }

  const colors = ['bg-teal-100', 'bg-blue-100', 'bg-purple-100', 'bg-amber-100', 'bg-rose-100', 'bg-emerald-100'];
  const colorIndex = parseInt(id || '1') - 1;

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-8 max-w-4xl">
          <button
            onClick={() => navigate('/visualization')}
            className="flex items-center gap-2 text-journal-gray hover:text-journal-black transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back to Visualization</span>
          </button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-xs font-bold tracking-widest uppercase text-journal-accent">
              {item.category}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-journal-black mt-4 mb-6">
              {item.title}
            </h1>
            <p className="font-sans text-xl text-journal-gray font-light mb-12">
              {item.description}
            </p>
            
            <div className={`aspect-video ${colors[colorIndex % colors.length]} rounded-sm mb-12 relative overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 400 200" className="w-3/4 h-3/4">
                  <motion.path
                    d="M0,100 C50,50 100,150 150,100 S250,50 300,100 S350,150 400,100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-gray-600"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                  />
                </svg>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              {item.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="font-sans text-journal-gray leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const VisualizationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-8">
          <ScrollReveal width="100%">
            <div className="mb-16 border-b border-black pb-6">
              <h1 className="font-serif text-5xl md:text-6xl text-journal-black mb-4">
                Visualization
              </h1>
              <p className="font-serif italic text-xl text-gray-500">
                Interactive data visualizations & network analytics
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visualizationItems.map((item, index) => (
              <VisualizationCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { VisualizationDetail };
