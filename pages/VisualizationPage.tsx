import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { ArrowLeft } from 'lucide-react';
import { visualizationItems, VisualizationItem } from '../visualizations';
import { RWAPartnershipChart } from '../components/visualizations/RWAPartnershipChart';

// 커스텀 컴포넌트 매핑
const customComponents: Record<string, React.FC> = {
  RWAPartnershipChart: RWAPartnershipChart,
};

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
          {/* RWA 카드는 이미지 표시 */}
          {item.id === '1' ? (
            <img 
              src="/images/RWA.png"
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <>
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
            </>
          )}
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

  // 커스텀 컴포넌트가 있으면 사용
  const CustomComponent = item.component ? customComponents[item.component] : null;

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-8 max-w-6xl">
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
            
            {/* 커스텀 컴포넌트가 있으면 렌더링 */}
            {CustomComponent ? (
              <div className="mb-12">
                <CustomComponent />
              </div>
            ) : (
              <>
                <div className="aspect-video bg-teal-100 rounded-sm mb-12 relative overflow-hidden">
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
              </>
            )}
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
            {visualizationItems.filter(item => item.id === '1').map((item, index) => (
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
