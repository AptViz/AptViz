import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, Search } from 'lucide-react';

const navItems = [
  { label: 'Visualization', path: '/visualization' },
  { label: 'Deep dive', path: '/deep-dive' },
  { label: 'News', path: '/news' }
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
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
          <Menu className="w-6 h-6 text-journal-black cursor-pointer hover:text-journal-accent transition-colors" strokeWidth={1.5} />
          <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-journal-black">
            Apt<span className="italic font-normal text-journal-gray">Viz</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-12">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="text-sm font-medium uppercase tracking-widest text-journal-gray hover:text-journal-black transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
            <button className="text-journal-gray hover:text-journal-black transition-colors">
                <Search size={20} strokeWidth={1.5} />
            </button>
        </div>
      </div>
    </motion.header>
  );
};