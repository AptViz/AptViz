import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, Search, X } from 'lucide-react';

const navItems = [
  { label: 'Visualization', path: '/visualization' },
  { label: 'Deep dive', path: '/deep-dive' },
  { label: 'News', path: '/news' }
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-[#F9F9F9]/90 backdrop-blur-md py-4 border-b border-gray-200' : 'bg-transparent py-8'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-8 flex justify-between items-center">
          {/* Logo - Textual, Serif, Elegant */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-journal-black hover:text-journal-accent transition-colors touch-manipulation"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </button>
            <Link 
              to="/" 
              onClick={() => window.scrollTo(0, 0)}
              className="font-serif text-2xl font-bold tracking-tight text-journal-black touch-manipulation"
            >
              Apt<span className="italic font-normal text-journal-gray">Viz</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => window.scrollTo(0, 0)}
                className="text-sm font-medium uppercase tracking-widest text-journal-gray hover:text-journal-black transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
              <button className="w-10 h-10 flex items-center justify-center text-journal-gray hover:text-journal-black transition-colors touch-manipulation">
                  <Search size={20} strokeWidth={1.5} />
              </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-[60] touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-[70] shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <div className="font-serif text-2xl font-bold tracking-tight text-journal-black">
                    Apt<span className="italic font-normal text-journal-gray">Viz</span>
                  </div>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="w-10 h-10 flex items-center justify-center text-journal-gray hover:text-journal-black transition-colors touch-manipulation"
                    aria-label="Close menu"
                  >
                    <X size={24} strokeWidth={1.5} />
                  </button>
                </div>
                
                {/* Navigation */}
                <nav className="flex-1 py-8">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      onClick={() => handleNavClick(item.path)}
                      className="w-full text-left px-6 py-5 text-lg font-medium text-journal-black hover:bg-gray-50 hover:text-journal-accent transition-colors touch-manipulation"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>
                
                {/* Footer */}
                <div className="p-6 border-t border-gray-100">
                  <button 
                    onClick={() => handleNavClick('/')}
                    className="w-full py-4 text-sm font-medium text-journal-gray hover:text-journal-black transition-colors touch-manipulation"
                  >
                    ← Back to Home
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};