import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { ArrowLeft } from 'lucide-react';

interface DeepDiveItem {
  id: string;
  category: string;
  title: string;
  description: string;
  readTime: string;
  content: string;
}

const deepDiveItems: DeepDiveItem[] = [
  {
    id: '1',
    category: 'Architecture',
    title: 'The Evolution of Consensus: From HotStuff to Bullshark',
    description: 'An in-depth analysis of how DAG-based consensus mechanisms are reducing latency and increasing throughput in the latest network upgrade.',
    readTime: '12 min read',
    content: `The journey from HotStuff to Bullshark represents a fundamental shift in how blockchain consensus can be achieved. This deep dive explores the technical evolution and its implications.

## HotStuff: The Foundation

HotStuff introduced a pipelined approach to BFT consensus, reducing the number of communication rounds required for consensus from O(n²) to O(n). This linear communication complexity was a breakthrough that made BFT practical for blockchain applications.

## The DAG Revolution

Directed Acyclic Graph (DAG) based consensus mechanisms like Bullshark take a fundamentally different approach. Instead of sequential block production, validators continuously produce blocks that reference previous blocks from any validator.

## Bullshark's Innovations

Bullshark builds upon the Narwhal mempool to achieve several key improvements:
- Zero-message overhead for consensus
- Asynchronous safety guarantees
- Improved throughput under Byzantine conditions

## Real-World Performance

In production environments, the transition to Bullshark has demonstrated:
- 50% reduction in finality latency
- 2x improvement in sustained throughput
- Better performance during network partitions

## Looking Forward

The consensus layer continues to evolve with research into parallel execution within the DAG structure and further optimizations for specific workload patterns.`
  },
  {
    id: '2',
    category: 'Language',
    title: 'Move vs Solidity: A Security-First Comparison',
    description: 'How the Move language object model provides superior security guarantees for high-value financial protocols.',
    readTime: '15 min read',
    content: `Move was designed from the ground up with blockchain-specific security concerns in mind. This analysis compares its approach to Solidity's model.

## Resource-Oriented Programming

Move's defining feature is its resource type system. Unlike Solidity's balance mappings, Move resources cannot be copied or implicitly discarded—they must be explicitly moved or destroyed.

## The Reentrancy Problem

Reentrancy attacks have cost the Ethereum ecosystem billions. Move's execution model makes reentrancy impossible by design:
- No external calls during transaction execution
- Strict resource accounting
- Deterministic execution ordering

## Formal Verification

Move includes built-in support for formal verification through the Move Prover:
- Specification language integrated with code
- Automated verification of invariants
- Mathematical proofs of correctness

## Module System

Move's module system provides:
- Fine-grained access control
- Capability-based security
- Upgradability patterns without proxy complexity

## Practical Implications

For DeFi protocols, Move's guarantees translate to:
- Reduced audit complexity
- Fewer attack vectors
- Higher confidence in protocol security

The learning curve is steeper, but the security benefits make it worthwhile for high-value applications.`
  },
  {
    id: '3',
    category: 'Gaming',
    title: 'Web3 Gaming: Beyond the Hype Cycle',
    description: 'Why fast finality is the missing link for on-chain gaming experiences, and how Aptos solves the synchronization problem.',
    readTime: '10 min read',
    content: `Blockchain gaming has yet to deliver on its promises. This analysis examines why finality is the key bottleneck and how it can be solved.

## The Latency Problem

Traditional blockchain games face a fundamental problem: players expect instant feedback, but most blockchains take seconds to minutes for finality.

## Why Finality Matters

In gaming contexts, finality affects:
- Player action responsiveness
- Game state synchronization
- Anti-cheat mechanisms
- Economic interactions

## The Sub-Second Solution

Aptos achieves sub-second finality through:
- Pipelined execution
- Parallel transaction processing
- Optimized networking layer

## Architecture Patterns

Successful blockchain games use:
- Optimistic state updates with rollback
- State channels for frequent interactions
- On-chain settlement for economic finality

## Case Studies

Examining successful implementations:
- Trading card games with instant battles
- Strategy games with on-chain state
- MMO economies with real-time trading

## The Path Forward

The combination of fast finality, low fees, and high throughput enables game designs previously impossible on blockchain.`
  },
  {
    id: '4',
    category: 'Economics',
    title: 'Tokenomics Deep Dive: APT Distribution Analysis',
    description: 'A comprehensive analysis of APT token distribution, vesting schedules, and long-term economic implications.',
    readTime: '18 min read',
    content: `Understanding tokenomics is crucial for evaluating any blockchain project. This deep dive analyzes APT's distribution model.

## Initial Distribution

The initial APT distribution was allocated across:
- Community initiatives: 51.02%
- Core contributors: 19%
- Foundation: 16.5%
- Investors: 13.48%

## Vesting Schedules

Different allocation categories have varying vesting periods:
- Core contributors: 4-year vesting with 1-year cliff
- Investors: Similar structure with varying terms
- Community: Ongoing distribution through grants and rewards

## Staking Economics

The staking mechanism provides:
- Network security through stake weight
- Inflation distribution to active participants
- Governance participation rights

## Inflation Model

APT follows a designed inflation curve:
- Starting at 7% annual inflation
- Decreasing by 1.5% per year
- Floor at 3.25% annual inflation

## Long-term Projections

Economic modeling suggests:
- Sustainable validator economics
- Predictable supply schedule
- Alignment of stakeholder incentives

The tokenomics design balances growth incentives with long-term value preservation.`
  },
  {
    id: '5',
    category: 'Infrastructure',
    title: 'Running an Aptos Validator: Technical Requirements',
    description: 'Complete guide to validator node setup, hardware requirements, and operational best practices.',
    readTime: '20 min read',
    content: `Operating a validator node is a significant responsibility. This guide covers everything needed to run a reliable validator.

## Hardware Requirements

Minimum specifications for mainnet:
- CPU: 32 cores (64 threads recommended)
- RAM: 64GB minimum, 128GB recommended
- Storage: 2TB NVMe SSD
- Network: 1Gbps dedicated connection

## Software Stack

Required components:
- Ubuntu 22.04 LTS
- Docker and Docker Compose
- Aptos CLI tools
- Monitoring stack (Prometheus, Grafana)

## Network Configuration

Critical networking setup:
- Dedicated IP address
- Properly configured firewall
- DDoS protection
- Low-latency connectivity to peers

## Operational Practices

Best practices for reliability:
- Automated failover systems
- Key management procedures
- Upgrade protocols
- Incident response plans

## Economics of Validation

Financial considerations:
- Minimum stake requirements
- Expected rewards vs costs
- Slashing conditions
- Delegation strategies

Running a validator is both technically challenging and economically significant.`
  },
  {
    id: '6',
    category: 'Development',
    title: 'Building Your First Move Module',
    description: 'Step-by-step tutorial for developers new to Move, covering fundamentals through deployment.',
    readTime: '25 min read',
    content: `This tutorial walks through building a complete Move module from scratch, suitable for developers new to the ecosystem.

## Development Environment

Setting up your workspace:
- Install Aptos CLI
- Configure VS Code with Move extension
- Initialize a new project
- Connect to devnet

## Move Fundamentals

Core concepts to understand:
- Modules and scripts
- Resources and abilities
- Generic types
- Access control

## Your First Module

Building a simple token:
\`\`\`move
module my_addr::simple_token {
    struct Token has key, store {
        value: u64
    }
    
    public fun mint(account: &signer, value: u64) {
        move_to(account, Token { value });
    }
}
\`\`\`

## Testing

Writing comprehensive tests:
- Unit tests with #[test]
- Integration tests
- Property-based testing

## Deployment

Getting your module live:
- Compile and verify
- Deploy to devnet
- Test thoroughly
- Mainnet deployment

## Next Steps

Advancing your skills:
- Study existing protocols
- Contribute to open source
- Join developer communities

The Move ecosystem welcomes developers from all backgrounds.`
  }
];

const DeepDiveCard: React.FC<{ item: DeepDiveItem; index: number }> = ({ item, index }) => {
  const navigate = useNavigate();
  
  const gradients = [
    'from-teal-50 to-cyan-100',
    'from-blue-50 to-indigo-100',
    'from-purple-50 to-pink-100',
    'from-amber-50 to-orange-100',
    'from-rose-50 to-red-100',
    'from-emerald-50 to-green-100'
  ];
  
  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => navigate(`/deep-dive/${item.id}`)}
    >
      <div className="bg-white border border-gray-100 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
        <div className={`aspect-[3/2] bg-gradient-to-br ${gradients[index % gradients.length]} relative overflow-hidden`}>
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-32 h-32 border-2 border-gray-400 rounded-full" />
            <div className="absolute w-24 h-24 border-2 border-gray-400 rounded-full translate-x-8 translate-y-8" />
          </div>
          <div className="absolute top-4 left-4">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-700 bg-white/80 px-2 py-1 rounded">
              {item.category}
            </span>
          </div>
          <div className="absolute bottom-4 right-4">
            <span className="text-xs text-gray-600 bg-white/80 px-2 py-1 rounded font-serif italic">
              {item.readTime}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-serif text-xl text-journal-black mb-3 group-hover:text-journal-accent transition-colors leading-tight">
            {item.title}
          </h3>
          <p className="font-sans text-sm text-journal-gray font-light line-clamp-3">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const DeepDiveDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = deepDiveItems.find(d => d.id === id);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Article not found</p>
      </div>
    );
  }

  const gradients = [
    'from-teal-50 to-cyan-100',
    'from-blue-50 to-indigo-100',
    'from-purple-50 to-pink-100',
    'from-amber-50 to-orange-100',
    'from-rose-50 to-red-100',
    'from-emerald-50 to-green-100'
  ];
  const gradientIndex = parseInt(id || '1') - 1;

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-8 max-w-3xl">
          <button
            onClick={() => navigate('/deep-dive')}
            className="flex items-center gap-2 text-journal-gray hover:text-journal-black transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back to Deep Dive</span>
          </button>
          
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-journal-accent">
                {item.category}
              </span>
              <span className="text-xs text-gray-400 font-serif italic">{item.readTime}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-journal-black mt-2 mb-6 leading-tight">
              {item.title}
            </h1>
            <p className="font-sans text-xl text-journal-gray font-light mb-12 leading-relaxed">
              {item.description}
            </p>
            
            <div className={`aspect-video bg-gradient-to-br ${gradients[gradientIndex % gradients.length]} rounded-sm mb-12 relative overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <div className="w-48 h-48 border-2 border-gray-500 rounded-full" />
                <div className="absolute w-36 h-36 border-2 border-gray-500 rounded-full translate-x-12 translate-y-12" />
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              {item.content.split('\n\n').map((paragraph, i) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={i} className="font-serif text-2xl text-journal-black mt-12 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('```')) {
                  return (
                    <pre key={i} className="bg-gray-900 text-gray-100 p-4 rounded-sm overflow-x-auto my-6">
                      <code>{paragraph.replace(/```\w*\n?/g, '')}</code>
                    </pre>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n');
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
                return (
                  <p key={i} className="font-sans text-journal-gray leading-relaxed mb-6">
                    {paragraph}
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

export const DeepDivePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-8">
          <ScrollReveal width="100%">
            <div className="mb-16 border-b border-black pb-6">
              <h1 className="font-serif text-5xl md:text-6xl text-journal-black mb-4">
                Deep Dive
              </h1>
              <p className="font-serif italic text-xl text-gray-500">
                In-depth analysis, research & technical perspectives
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deepDiveItems.map((item, index) => (
              <DeepDiveCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { DeepDiveDetail };
