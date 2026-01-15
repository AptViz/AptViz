import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ui/ScrollReveal';
import { totalRWATvl } from '../visualizations';

// TVL 포맷팅 함수
const formatTVL = (tvl: number): string => {
  if (tvl >= 1_000_000_000) return `$${(tvl / 1_000_000_000).toFixed(2)}B`;
  if (tvl >= 1_000_000) return `$${(tvl / 1_000_000).toFixed(1)}M`;
  return `$${tvl.toLocaleString()}`;
};

// Simulated artistic chart path
const ChartPath = () => (
  <svg viewBox="0 0 1000 300" className="w-full h-full overflow-visible">
    <motion.path
      d="M0,150 C100,100 200,200 300,150 S500,50 600,150 S800,250 1000,150"
      fill="none"
      stroke="#0d9488"
      strokeWidth="1.5"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2.5, ease: "easeInOut" }}
    />
    <motion.path
      d="M0,150 C100,160 200,140 300,150 S500,180 600,150 S800,120 1000,150"
      fill="none"
      stroke="#CBD5E1"
      strokeWidth="1"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
    />
    {/* Data Points */}
    {[300, 600, 1000].map((cx, i) => (
      <motion.circle
        key={i}
        cx={cx}
        cy={150}
        r="4"
        fill="#FFFFFF"
        stroke="#0d9488"
        strokeWidth="2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5 + i * 0.2 }}
      />
    ))}
  </svg>
);

export const Visualization: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-32 border-t border-gray-100">
      <div className="container mx-auto px-8">
        <ScrollReveal width="100%">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-100 pb-8">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl text-journal-black mb-4">
                Network Telemetry
              </h2>
              <p className="font-sans text-journal-gray max-w-lg font-light">
                An artistic representation of Block-STM throughput versus traditional consensus mechanisms.
              </p>
            </div>
            <div className="font-mono text-xs text-journal-gray mt-4 md:mt-0">
              LIVE DATA // MAINNET BETA
            </div>
          </div>
        </ScrollReveal>

        <div className="relative h-[400px] w-full bg-[#FAFAFA] rounded-sm border border-gray-100 p-8 md:p-16 mb-12">
          <div className="absolute top-8 left-8">
            <div className="font-serif text-2xl text-journal-black mb-1">Move <span className="italic text-journal-accent">VM</span></div>
            <div className="text-xs tracking-widest text-gray-400 uppercase">Throughput Analysis</div>
          </div>
          <ChartPath />
          <div className="absolute bottom-8 right-8 text-right">
            <div className="font-mono text-xs text-gray-400">LATEST BLOCK</div>
            <div className="font-serif text-3xl">568,960,468</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100 border border-gray-100 mb-12">
          {[
            { label: "Active Validators", value: "127", detail: "Global Distribution" },
            { label: "Peak TPS", value: "13,000+", detail: "Lab Benchmarks" },
            { label: "Gas Fees", value: "<0.0001", detail: "APT per Transaction" }
          ].map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1} width="100%" className="bg-white p-12 hover:bg-teal-50/10 transition-colors duration-500">
              <div className="flex flex-col h-full justify-between min-h-[140px]">
                <span className="font-sans text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">{stat.label}</span>
                <div>
                  <span className="font-serif text-5xl text-journal-black block mb-2">{stat.value}</span>
                  <span className="font-serif italic text-journal-gray">{stat.detail}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* RWA Partnership Highlight - Removed (now in Hero) */}
      </div>
    </section>
  );
};