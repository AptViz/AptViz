import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { ArrowLeft, Calendar } from 'lucide-react';

interface NewsItem {
  id: string;
  category: string;
  title: string;
  description: string;
  date: string;
  content: string;
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    category: 'Announcement',
    title: 'Aptos Foundation Announces $50M Ecosystem Fund',
    description: 'New initiative to accelerate developer adoption and protocol development across the Aptos ecosystem.',
    date: 'Jan 3, 2026',
    content: `The Aptos Foundation has announced a $50 million ecosystem fund dedicated to supporting developers and projects building on the Aptos blockchain.

The fund will focus on several key areas:

**Developer Grants**
Individual developers and small teams can apply for grants ranging from $5,000 to $100,000 to build innovative applications, tooling, and infrastructure.

**Protocol Investments**
Strategic investments in DeFi protocols, gaming platforms, and infrastructure projects that demonstrate strong potential for ecosystem growth.

**Hackathon Prizes**
Sponsorship of global hackathons with significant prize pools to attract new talent to the ecosystem.

**Educational Initiatives**
Funding for educational content, workshops, and bootcamps to onboard the next generation of Move developers.

Applications are now open through the Aptos Foundation website. The first round of grants will be announced in Q1 2026.`
  },
  {
    id: '2',
    category: 'Update',
    title: 'Network Upgrade v1.9: Performance Improvements',
    description: 'Latest network upgrade brings 40% improvement in transaction throughput and reduced gas costs.',
    date: 'Jan 2, 2026',
    content: `The Aptos network has successfully completed the v1.9 upgrade, bringing significant performance improvements to mainnet.

**Key Improvements**

- Transaction throughput increased by 40%
- Average gas costs reduced by 25%
- Block finality time improved to under 400ms
- Memory usage optimized for validator nodes

**Technical Details**

The upgrade introduces several optimizations to the execution layer:

1. Improved parallel execution scheduling
2. More efficient state tree pruning
3. Optimized transaction batching
4. Enhanced peer-to-peer networking

**Validator Information**

All validators have successfully upgraded to the latest software version. No action is required from users or developers.

The next upgrade is planned for Q2 2026 and will focus on further scalability improvements.`
  },
  {
    id: '3',
    category: 'Partnership',
    title: 'Major Exchange Lists APT Perpetual Futures',
    description: 'Leading cryptocurrency exchange adds APT perpetual futures with up to 20x leverage.',
    date: 'Jan 1, 2026',
    content: `A major cryptocurrency exchange has announced the listing of APT perpetual futures contracts, expanding trading options for the Aptos ecosystem.

**Trading Details**

- Contract: APT-PERP
- Maximum leverage: 20x
- Minimum order: 0.1 APT
- Trading fee: 0.02% maker, 0.05% taker

**Market Impact**

The addition of perpetual futures is expected to:

- Increase liquidity for APT trading
- Provide hedging opportunities for validators and stakers
- Attract institutional traders to the ecosystem

**Risk Warning**

Leverage trading carries significant risks. Users should understand the mechanics of perpetual futures and position management before trading.

This listing follows the recent addition of APT spot trading pairs on multiple exchanges throughout 2025.`
  },
  {
    id: '4',
    category: 'Ecosystem',
    title: 'New DEX Launches with Innovative AMM Design',
    description: 'Concentrated liquidity and dynamic fees bring capital efficiency to Aptos DeFi.',
    date: 'Dec 30, 2025',
    content: `A new decentralized exchange has launched on Aptos, featuring an innovative automated market maker design optimized for capital efficiency.

**Key Features**

- Concentrated liquidity positions
- Dynamic fee tiers based on volatility
- Native integration with Aptos token standards
- Gas-optimized swap routing

**How It Works**

The new AMM allows liquidity providers to concentrate their capital within specific price ranges, dramatically improving capital efficiency compared to traditional constant product AMMs.

**Launch Statistics**

- Total Value Locked: $15M
- Unique traders: 5,000+
- Daily volume: $3M+

**Token Incentives**

Early liquidity providers are eligible for governance token rewards. The protocol plans to decentralize governance over the coming months.

This launch represents growing sophistication in the Aptos DeFi ecosystem.`
  },
  {
    id: '5',
    category: 'Community',
    title: 'Aptos Developer Conference 2026 Announced',
    description: 'Annual developer conference returns with focus on Move ecosystem growth and tooling.',
    date: 'Dec 28, 2025',
    content: `The Aptos Foundation has announced dates for the 2026 Developer Conference, bringing together builders from around the world.

**Event Details**

- Date: March 15-17, 2026
- Location: San Francisco, CA
- Expected attendance: 2,000+

**Conference Tracks**

- Move Language Deep Dives
- DeFi Protocol Design
- Gaming and NFTs
- Infrastructure and Tooling
- Security Best Practices

**Call for Speakers**

The call for speakers is now open. Topics of interest include:

- Novel Move programming patterns
- Cross-chain interoperability
- Developer experience improvements
- Real-world case studies

**Registration**

Early bird registration is available at a discounted rate until February 1, 2026. Student and builder scholarships are available.

Virtual attendance options will be announced closer to the event.`
  },
  {
    id: '6',
    category: 'Security',
    title: 'Bug Bounty Program Expanded to $1M',
    description: 'Critical vulnerability rewards increased to attract top security researchers.',
    date: 'Dec 25, 2025',
    content: `The Aptos security team has expanded the bug bounty program, with maximum rewards now reaching $1 million for critical vulnerabilities.

**New Reward Tiers**

- Critical: Up to $1,000,000
- High: Up to $100,000
- Medium: Up to $10,000
- Low: Up to $1,000

**Scope**

The expanded program covers:

- Core protocol vulnerabilities
- Move VM security issues
- Validator software bugs
- Official client libraries

**Submission Process**

Security researchers should:

1. Report vulnerabilities through the official portal
2. Provide detailed reproduction steps
3. Allow reasonable time for fixes
4. Follow responsible disclosure guidelines

**Recognition**

Top contributors will be featured in the security hall of fame and invited to exclusive security-focused events.

The Aptos team remains committed to maintaining the highest security standards for the ecosystem.`
  }
];

const NewsCard: React.FC<{ item: NewsItem; index: number }> = ({ item, index }) => {
  const navigate = useNavigate();
  
  const categoryColors: Record<string, string> = {
    'Announcement': 'bg-teal-100 text-teal-700',
    'Update': 'bg-blue-100 text-blue-700',
    'Partnership': 'bg-purple-100 text-purple-700',
    'Ecosystem': 'bg-amber-100 text-amber-700',
    'Community': 'bg-rose-100 text-rose-700',
    'Security': 'bg-emerald-100 text-emerald-700'
  };
  
  const bgPatterns = [
    'bg-gradient-to-br from-gray-50 to-teal-50',
    'bg-gradient-to-br from-gray-50 to-blue-50',
    'bg-gradient-to-br from-gray-50 to-purple-50',
    'bg-gradient-to-br from-gray-50 to-amber-50',
    'bg-gradient-to-br from-gray-50 to-rose-50',
    'bg-gradient-to-br from-gray-50 to-emerald-50'
  ];
  
  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => navigate(`/news/${item.id}`)}
    >
      <div className="bg-white border border-gray-100 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
        <div className={`aspect-[16/9] ${bgPatterns[index % bgPatterns.length]} relative overflow-hidden`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border border-gray-300 rounded-full opacity-30" />
            <div className="absolute w-24 h-24 border border-gray-300 rounded-full opacity-20" />
            <div className="absolute w-32 h-32 border border-gray-300 rounded-full opacity-10" />
          </div>
          <div className="absolute top-4 left-4">
            <span className={`text-xs font-bold tracking-widest uppercase px-2 py-1 rounded ${categoryColors[item.category] || 'bg-gray-100 text-gray-700'}`}>
              {item.category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <Calendar size={12} />
            <span>{item.date}</span>
          </div>
          <h3 className="font-serif text-xl text-journal-black mb-3 group-hover:text-journal-accent transition-colors leading-tight">
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

const NewsDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = newsItems.find(n => n.id === id);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>News not found</p>
      </div>
    );
  }

  const bgPatterns = [
    'bg-gradient-to-br from-gray-50 to-teal-50',
    'bg-gradient-to-br from-gray-50 to-blue-50',
    'bg-gradient-to-br from-gray-50 to-purple-50',
    'bg-gradient-to-br from-gray-50 to-amber-50',
    'bg-gradient-to-br from-gray-50 to-rose-50',
    'bg-gradient-to-br from-gray-50 to-emerald-50'
  ];
  const bgIndex = parseInt(id || '1') - 1;

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-8 max-w-3xl">
          <button
            onClick={() => navigate('/news')}
            className="flex items-center gap-2 text-journal-gray hover:text-journal-black transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back to News</span>
          </button>
          
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-journal-accent">
                {item.category}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar size={12} />
                {item.date}
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-journal-black mt-2 mb-6 leading-tight">
              {item.title}
            </h1>
            <p className="font-sans text-xl text-journal-gray font-light mb-12 leading-relaxed">
              {item.description}
            </p>
            
            <div className={`aspect-video ${bgPatterns[bgIndex % bgPatterns.length]} rounded-sm mb-12 relative overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 border border-gray-400 rounded-full opacity-30" />
                <div className="absolute w-36 h-36 border border-gray-400 rounded-full opacity-20" />
                <div className="absolute w-48 h-48 border border-gray-400 rounded-full opacity-10" />
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              {item.content.split('\n\n').map((paragraph, i) => {
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h3 key={i} className="font-serif text-xl text-journal-black mt-8 mb-4">
                      {paragraph.replace(/\*\*/g, '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('- ') || paragraph.includes('\n- ')) {
                  const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                  return (
                    <ul key={i} className="list-disc pl-6 my-4 space-y-2">
                      {items.map((li, j) => (
                        <li key={j} className="font-sans text-journal-gray">
                          {li.replace('- ', '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.match(/^\d+\./)) {
                  const items = paragraph.split('\n').filter(line => line.match(/^\d+\./));
                  return (
                    <ol key={i} className="list-decimal pl-6 my-4 space-y-2">
                      {items.map((li, j) => (
                        <li key={j} className="font-sans text-journal-gray">
                          {li.replace(/^\d+\.\s*/, '')}
                        </li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={i} className="font-sans text-journal-gray leading-relaxed mb-6">
                    {paragraph.split('**').map((part, j) => 
                      j % 2 === 1 ? <strong key={j} className="font-semibold text-journal-black">{part}</strong> : part
                    )}
                  </p>
                );
              })}
            </div>
          </motion.article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const NewsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-8">
          <ScrollReveal width="100%">
            <div className="mb-16 border-b border-black pb-6">
              <h1 className="font-serif text-5xl md:text-6xl text-journal-black mb-4">
                News
              </h1>
              <p className="font-serif italic text-xl text-gray-500">
                Latest updates, announcements & ecosystem news
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <NewsCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { NewsDetail };
