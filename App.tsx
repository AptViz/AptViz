import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Intro } from './components/Intro';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { VisualizationPage, VisualizationDetail } from './pages/VisualizationPage';
import { DeepDivePage, DeepDiveDetail } from './pages/DeepDivePage';
import { NewsPage, NewsDetail } from './pages/NewsPage';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  // Smooth scroll behavior for anchor links (if any)
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-slate-900 selection:bg-teal-100 selection:text-teal-900">
        <AnimatePresence mode="wait">
          {showIntro ? (
            <Intro key="intro" onEnter={() => setShowIntro(false)} />
          ) : (
            <motion.div
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/visualization" element={<VisualizationPage />} />
                <Route path="/visualization/:id" element={<VisualizationDetail />} />
                <Route path="/deep-dive" element={<DeepDivePage />} />
                <Route path="/deep-dive/:id" element={<DeepDiveDetail />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/:id" element={<NewsDetail />} />
              </Routes>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
};

export default App;