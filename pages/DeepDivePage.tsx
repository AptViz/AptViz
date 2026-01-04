import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { ArrowLeft, List } from 'lucide-react';

// TOC Item interface
interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface DeepDiveItem {
  id: string;
  category: string;
  title: string;
  titleKo?: string;
  description: string;
  descriptionKo?: string;
  readTime: string;
  content: string;
  contentKo?: string;
}

const deepDiveItems: DeepDiveItem[] = [
  {
    id: '1',
    category: 'Strategy',
    title: "Decibel for Trading, Shelby for Data: Aptos's Blueprint for 2026",
    titleKo: "거래는 데시벨로, 데이터는 쉘비로: 앱토스가 그리는 2026년의 청사진",
    description: 'How Aptos strategically focused on building robust infrastructure in 2025 to prepare for explosive growth in 2026.',
    descriptionKo: '2025년에 탄탄한 인프라 구축에 전략적으로 집중하며 2026년의 폭발적인 성장을 준비한 앱토스의 이야기.',
    readTime: '9 min read',
    contentKo: `# 앱토스가 그리는 2026년의 청사진

성공하는 레이어 1 블록체인들을 살펴보면 몇 가지 공통적인 승리 공식이 존재합니다. 확장 가능한 구조, 자본이 막힘없이 흐를 수 있는 깊은 스테이블코인 유동성, 그리고 이러한 기반 위에서 사용자 유입을 폭발적으로 이끌어낼 킬러 앱의 등장입니다.

과거 이더리움은 인프라가 여러 서비스를 레고 블록처럼 자유롭게 조립할 수 있는 수준에 도달했을 때 '디파이 서머'를 맞이했고, 솔라나는 1초도 안 되는 빠른 거래 확정 속도와 극도로 낮은 수수료를 무기로 고빈도 거래와 밈코인 시장을 장악했습니다. 결국 인프라라는 그릇이 먼저 준비되고, 그 위에 딱 맞는 애플리케이션이 담기는 순간 생태계는 폭발적으로 성장합니다.

## 2025년: 그릇을 만드는 시간

앱토스에게 2025년은 바로 이 '그릇'을 만드는 데 모든 것을 쏟아부으며 몸을 낮춘 시기였습니다. 겉으로 드러나는 화려한 지표보다 네트워크의 물리적 한계를 제거하는 데 집착했습니다.

그 결과 2025년 12월, 앱토스는 메인넷에서 블록 생성 시간을 **0.05초(50ms) 미만**으로 줄이는 성과를 거두었습니다. 이는 현재 운영 중인 주요 블록체인 중 가장 빠른 수준입니다. 단순히 숫자만 바뀐 것이 아닙니다. 합의 과정에서 네트워크를 거치는 단계를 6단계에서 4단계로 줄인 기술적 혁신을 통해, 네트워크에 부하가 걸리는 상황에서도 사용자가 체감하는 지연 시간을 획기적으로 낮췄습니다.

## 보이지 않는 곳에서의 기술적 성취

기술적인 성취는 보이지 않는 곳에서 계속되었습니다. 데이터 저장 용량의 한계를 해결하기 위해 스토리지 샤딩 기술을 도입했고, 이를 통해 초당 거래 처리량(TPS)을 실측 기준 **2.5만 건**까지 끌어올렸습니다. 이론적으로는 100만 건 이상의 처리가 가능하도록 설계되었습니다.

현재 앱토스의 평균 사용량이 초당 45건 내외라는 점을 고려하면, 실제 수요보다 **약 490배나 넓은 고속도로**를 미리 닦아놓은 셈입니다.

또한 앱토스의 개발 언어인 Move는 2.0으로 진화하며 더 정교한 금융 계산과 유연한 서비스 연동이 가능해졌습니다. 이는 개발자들이 더 안전하고 효율적인 금융 서비스를 만들 수 있는 완벽한 토양이 마련되었음을 의미합니다.

## 2026년: 세 가지 핵심 방향

이렇게 다져온 인프라는 2026년에 들어서며 세 가지 핵심 방향을 통해 본격적인 추진력으로 전환될 준비를 마쳤습니다.

### 1. 데시벨(Decibel): 거래 환경의 혁신

데시벨은 중앙화 거래소에 버금가는 **0.02초 미만의 실행 속도**를 목표로 하는 탈중앙화 거래소입니다. 하나의 계정으로 현물 거래와 선물 거래를 동시에 처리할 수 있는 강력한 기능을 갖추고 있습니다.

특히 주목할 점은 사용자가 이더리움이나 솔라나 지갑을 그대로 사용하면서도 앱토스 서비스를 즉시 이용할 수 있게 한 기술입니다. 지갑을 새로 만들거나 코인을 옮겨야 하는 번거로움을 없애 유입 장벽을 완전히 허물었습니다.

### 2. 쉘비(Shelby): 데이터 인프라

그동안 블록체인은 데이터를 기록하는 데는 뛰어났지만, 기록된 데이터를 빠르게 읽어오는 데는 취약했습니다. 쉘비는 AI 모델 학습이나 고화질 영상 스트리밍처럼 엄청난 양의 데이터를 실시간으로 읽어야 하는 서비스들을 위한 저장소입니다.

기존 클라우드 서비스와 경쟁할 수 있을 정도의 빠른 속도와 저렴한 비용을 제공함으로써, 그동안 온체인으로 들어오지 못했던 엔터프라이즈급 수요를 앱토스 생태계로 끌어들이는 역할을 할 것입니다.

### 3. 스테이블코인: 실제 돈이 흐르는 혈맥

앱토스에서 스테이블코인을 전송할 때 드는 비용은 약 **0.00003달러**에 불과합니다. 기존 해외 송금 수수료와 비교하면 무려 **40만 배**나 저렴한 수준입니다.

이러한 압도적인 경제성은 이미 아프리카나 남미의 결제 플랫폼들이 앱토스를 선택하게 만드는 강력한 이유가 되었습니다. 페이팔의 PYUSD나 블랙록의 BUIDL 펀드 같은 거대 자본이 앱토스 위에서 움직이기 시작한 것 역시, 실물 경제의 거대한 트랜잭션을 수용할 수 있는 준비된 레일이 있었기 때문에 가능한 일이었습니다.

## 결론: 2026년, 인프라의 가치를 증명할 '진실의 시간'

리서치 관점에서 앱토스의 지난 행보는 '성능 과시'가 아닌 '수요 수용 능력의 선제적 확보'로 해석됩니다. 2025년이 거대한 엔진을 얹기 위해 견고한 차체를 설계하고 철로를 놓은 해였다면, 2026년은 그 위에서 실제 기차가 얼마나 빠르게, 그리고 얼마나 많은 승객을 태우고 달릴 수 있는지를 증명해야 하는 '진실의 시간'입니다.

앱토스가 확보한 약 490배의 처리 용량 여유분은 더 이상 기술적 한계가 애플리케이션의 상상력을 제한하지 않는다는 것을 의미합니다. 이제 시장의 시선은 "얼마나 빠른가"에서 "그 속도로 무엇을 바꿀 것인가"로 옮겨가고 있습니다.

데시벨이 기존 거대 거래소의 유동성을 흡수할 수 있을지, 쉘비가 중앙화된 클라우드 스토리지의 대안으로서 엔터프라이즈 시장의 문턱을 넘을 수 있을지, 그리고 스테이블코인이 단순한 투기 수단을 넘어 글로벌 결제의 표준이 될 수 있을지가 관건입니다.

결국 추진력을 얻기 위해 무릎을 꿇고 인프라에 매진했던 앱토스의 전략이 옳았음을 증명하는 것은 기술 지표가 아닌 **실질적인 채택 지표**가 될 것입니다. 2026년은 앱토스가 설계한 '금융 인터넷'이라는 비전이 기술적 가설을 넘어 실제 경제 시스템의 핵심 인프라로 자리 잡을 수 있을지를 결정짓는 중대한 분기점이 될 것으로 보입니다.`,
    content: `# Aptos's Strategy from Infrastructure Completion to Mass Adoption

When examining successful Layer 1 blockchains, several common winning formulas emerge: scalable architecture, deep stablecoin liquidity that allows capital to flow freely, and the emergence of killer apps that drive explosive user adoption on top of this foundation.

Ethereum experienced its "DeFi Summer" when its infrastructure reached a level where various services could be freely assembled like Lego blocks. Solana dominated the high-frequency trading and memecoin markets with its sub-second transaction finality and extremely low fees. Ultimately, ecosystems experience explosive growth when the infrastructure vessel is prepared first, and the right applications are placed on top.

## 2025: Building the Vessel

For Aptos, 2025 was a period of dedicating everything to building this "vessel" while staying humble. Rather than flashy metrics, the focus was obsessively on removing the network's physical limitations.

As a result, in December 2025, Aptos achieved block production times of **under 0.05 seconds (50ms)** on mainnet. This is the fastest among currently operating major blockchains. It wasn't just about changing numbers. Through technical innovation that reduced consensus network steps from 6 to 4, user-perceived latency was dramatically lowered even under network load.

## Behind-the-Scenes Technical Achievements

Technical achievements continued behind the scenes. Storage sharding technology was introduced to solve data storage limitations, raising measured TPS to **25,000 transactions per second**. Theoretically, it's designed to handle over 1 million.

Considering that Aptos's average usage is around 45 transactions per second, this means building a highway **approximately 490 times wider** than actual demand.

Additionally, Move, Aptos's development language, evolved to version 2.0, enabling more sophisticated financial calculations and flexible service integration. This means perfect soil has been prepared for developers to build safer and more efficient financial services.

## 2026: Three Key Directions

The infrastructure built this way is now ready to convert into real momentum through three key directions in 2026.

### 1. Decibel: Revolutionary Trading Environment

Decibel is a decentralized exchange targeting **sub-0.02 second execution speeds**, rivaling centralized exchanges. It features powerful functionality allowing spot and futures trading from a single account.

Notably, users can instantly access Aptos services while using their existing Ethereum or Solana wallets. By eliminating the hassle of creating new wallets or transferring coins, entry barriers have been completely removed.

### 2. Shelby: Data Infrastructure

While blockchain has excelled at recording data, it has been weak at quickly retrieving recorded data. Shelby is a storage solution for services requiring real-time reading of massive data amounts, like AI model training or high-quality video streaming.

By providing speed and cost competitiveness with existing cloud services, it will attract enterprise-grade demand that couldn't previously go on-chain into the Aptos ecosystem.

### 3. Stablecoins: The Lifeblood of Real Money Flow

The cost of transferring stablecoins on Aptos is only about **$0.00003**. Compared to existing international remittance fees, this is **400,000 times cheaper**.

This overwhelming economic efficiency has already become a compelling reason for payment platforms in Africa and South America to choose Aptos. The fact that massive capital like PayPal's PYUSD and BlackRock's BUIDL fund has started moving on Aptos was only possible because prepared rails existed to accommodate massive real-economy transactions.

## Conclusion: 2026, The Moment of Truth for Infrastructure Value

From a research perspective, Aptos's past trajectory should be interpreted not as "performance showcase" but as "preemptive securing of demand accommodation capacity." If 2025 was the year of designing a solid chassis and laying tracks for mounting a massive engine, 2026 is the "moment of truth" to prove how fast and how many passengers the actual train can carry.

Aptos's approximately 490x processing capacity headroom means technical limitations no longer constrain application imagination. Market attention is now shifting from "how fast is it" to **"what will you change with that speed."**

The key questions are: Can Decibel absorb liquidity from existing major exchanges? Can Shelby cross the enterprise market threshold as an alternative to centralized cloud storage? And can stablecoins become a global payment standard beyond mere speculation tools?

Ultimately, proving that Aptos's strategy of kneeling for infrastructure to gain momentum was correct will come from **actual adoption metrics**, not technical indicators. 2026 appears to be a critical inflection point determining whether Aptos's vision of a "Financial Internet" can establish itself as core infrastructure for the real economic system, beyond technical hypothesis.`
  }
];

// Coming Soon Placeholder Card Component
const ComingSoonCard: React.FC<{ index: number }> = ({ index }) => {
  const placeholderGradients = [
    'from-gray-100 to-gray-200',
    'from-slate-100 to-slate-200',
  ];
  
  return (
    <motion.div
      className="touch-manipulation"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index + 1) * 0.1 }}
    >
      <div className="bg-white border border-gray-100 rounded-sm overflow-hidden opacity-60">
        <div className={`aspect-[3/2] bg-gradient-to-br ${placeholderGradients[index % 2]} relative overflow-hidden`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-300/50 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-400 tracking-wide">COMING SOON</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-100 rounded w-full"></div>
            <div className="h-3 bg-gray-100 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

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
  
  const handleClick = () => {
    navigate(`/deep-dive/${item.id}`);
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
  const [language, setLanguage] = useState<'en' | 'ko'>('en');
  const [activeSection, setActiveSection] = useState<string>('');
  const [isTocOpen, setIsTocOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  // Check if this article has Korean content
  const hasKorean = item?.contentKo ? true : false;

  // Get content based on selected language
  const currentContent = useMemo(() => {
    if (!item) return '';
    if (language === 'ko' && item.contentKo) {
      return item.contentKo;
    }
    return item.content;
  }, [item, language]);

  const currentTitle = useMemo(() => {
    if (!item) return '';
    if (language === 'ko' && item.titleKo) {
      return item.titleKo;
    }
    return item.title;
  }, [item, language]);

  const currentDescription = useMemo(() => {
    if (!item) return '';
    if (language === 'ko' && item.descriptionKo) {
      return item.descriptionKo;
    }
    return item.description;
  }, [item, language]);

  // Extract headings from content for TOC
  const tocItems = useMemo((): TocItem[] => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const items: TocItem[] = [];
    let match;
    
    while ((match = headingRegex.exec(currentContent)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9가-힣\s]/g, '')
        .replace(/\s+/g, '-');
      items.push({ id, text, level });
    }
    
    return items;
  }, [currentContent]);

  // Generate heading ID from text
  const generateId = useCallback((text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s]/g, '')
      .replace(/\s+/g, '-');
  }, []);

  // Scroll spy - track active section
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const headings = contentRef.current.querySelectorAll('h1, h2, h3');
      const scrollPosition = window.scrollY + 150;
      
      let currentActive = '';
      
      headings.forEach((heading) => {
        const element = heading as HTMLElement;
        const offsetTop = element.offsetTop;
        
        if (scrollPosition >= offsetTop) {
          currentActive = element.id;
        }
      });
      
      if (currentActive !== activeSection) {
        setActiveSection(currentActive);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, tocItems]);

  // Scroll to section when TOC item is clicked
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 120;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

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
        <div className="max-w-6xl mx-auto px-4 lg:px-8 lg:ml-[20%] lg:mr-auto">
          {/* Top navigation bar */}
          <div className="max-w-3xl lg:max-w-none flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/deep-dive')}
              className="flex items-center gap-2 text-journal-gray hover:text-journal-black transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">Back to Deep Dive</span>
            </button>
            
            {/* Language Toggle Button */}
            {hasKorean && (
              <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full p-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                    language === 'en'
                      ? 'bg-journal-black text-white'
                      : 'text-journal-gray hover:text-journal-black'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ko')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                    language === 'ko'
                      ? 'bg-journal-black text-white'
                      : 'text-journal-gray hover:text-journal-black'
                  }`}
                >
                  한국어
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-8 justify-center">
            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={language}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-journal-accent">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400 font-serif italic">{item.readTime}</span>
                </div>
                <h1 className="font-serif text-4xl md:text-5xl text-journal-black mt-2 mb-6 leading-tight">
                  {currentTitle}
                </h1>
                
                {/* Author Info */}
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                  <img 
                    src="/author-ray.jpg" 
                    alt="Ray" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-journal-black">Ray</span>
                    <span className="text-sm text-journal-gray">Aptos Movers</span>
                  </div>
                  <div className="ml-auto text-sm text-gray-400">
                    2026.01.04
                  </div>
                </div>

                <p className="font-sans text-xl text-journal-gray font-light mb-12 leading-relaxed">
                  {currentDescription}
                </p>
                
                <div className={`aspect-video bg-gradient-to-br ${gradients[gradientIndex % gradients.length]} rounded-sm mb-12 relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <div className="w-48 h-48 border-2 border-gray-500 rounded-full" />
                    <div className="absolute w-36 h-36 border-2 border-gray-500 rounded-full translate-x-12 translate-y-12" />
                  </div>
                </div>
                
                {/* Markdown Content with proper styling */}
                <div ref={contentRef} className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-journal-black prose-p:text-journal-gray prose-p:leading-relaxed prose-strong:text-journal-black prose-li:text-journal-gray">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => {
                        const text = String(children);
                        const headingId = generateId(text);
                        return (
                          <h1 id={headingId} className="font-serif text-3xl md:text-4xl text-journal-black mt-12 mb-6 leading-tight scroll-mt-32">
                            {children}
                          </h1>
                        );
                      },
                      h2: ({ children }) => {
                        const text = String(children);
                        const headingId = generateId(text);
                        return (
                          <h2 id={headingId} className="font-serif text-2xl md:text-3xl text-journal-black mt-10 mb-4 leading-tight scroll-mt-32">
                            {children}
                          </h2>
                        );
                      },
                      h3: ({ children }) => {
                        const text = String(children);
                        const headingId = generateId(text);
                        return (
                          <h3 id={headingId} className="font-serif text-xl md:text-2xl text-journal-black mt-8 mb-3 leading-tight scroll-mt-32">
                            {children}
                          </h3>
                        );
                      },
                      p: ({ children }) => (
                        <p className="font-sans text-journal-gray leading-relaxed mb-6 text-lg">
                          {children}
                        </p>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-journal-black">
                          {children}
                        </strong>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc pl-6 my-4 space-y-2">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal pl-6 my-4 space-y-2">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="font-sans text-journal-gray text-lg">
                          {children}
                        </li>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-journal-accent pl-6 my-6 italic text-gray-600">
                          {children}
                        </blockquote>
                      ),
                      code: ({ className, children }) => {
                        const isBlock = className?.includes('language-');
                        if (isBlock) {
                          return (
                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-sm overflow-x-auto my-6">
                              <code>{children}</code>
                            </pre>
                          );
                        }
                        return (
                          <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm">
                            {children}
                          </code>
                        );
                      },
                      hr: () => (
                        <hr className="my-12 border-gray-200" />
                      ),
                    }}
                  >
                    {currentContent}
                  </ReactMarkdown>
                </div>
              </motion.article>
            </div>

            {/* Sticky Table of Contents - Desktop */}
            {tocItems.length > 0 && (
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-32">
                  <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                      <List size={18} className="text-journal-accent" />
                      <h3 className="font-medium text-journal-black text-sm">
                        {language === 'ko' ? '목차' : 'Table of Contents'}
                      </h3>
                    </div>
                    <nav className="space-y-1 max-h-[60vh] overflow-y-auto">
                      {tocItems.map((tocItem, index) => (
                        <button
                          key={index}
                          onClick={() => scrollToSection(tocItem.id)}
                          className={`block w-full text-left py-2 px-3 rounded-md text-sm transition-all duration-200 ${
                            tocItem.level === 1 ? 'font-medium' : ''
                          } ${
                            tocItem.level === 2 ? 'pl-5' : ''
                          } ${
                            tocItem.level === 3 ? 'pl-7 text-xs' : ''
                          } ${
                            activeSection === tocItem.id
                              ? 'bg-journal-accent/10 text-journal-accent border-l-2 border-journal-accent'
                              : 'text-journal-gray hover:text-journal-black hover:bg-gray-50'
                          }`}
                        >
                          {tocItem.text}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </aside>
            )}
          </div>

          {/* Mobile TOC Toggle Button */}
          {tocItems.length > 0 && (
            <div className="lg:hidden fixed bottom-6 right-6 z-40">
              <button
                onClick={() => setIsTocOpen(!isTocOpen)}
                className="bg-journal-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
              >
                <List size={24} />
              </button>
            </div>
          )}

          {/* Mobile TOC Drawer */}
          {tocItems.length > 0 && isTocOpen && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="lg:hidden fixed bottom-24 right-6 z-40 w-72 max-h-[50vh] bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden"
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <List size={18} className="text-journal-accent" />
                  <h3 className="font-medium text-journal-black text-sm">
                    {language === 'ko' ? '목차' : 'Contents'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsTocOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <nav className="p-3 overflow-y-auto max-h-[calc(50vh-60px)]">
                {tocItems.map((tocItem, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      scrollToSection(tocItem.id);
                      setIsTocOpen(false);
                    }}
                    className={`block w-full text-left py-2 px-3 rounded-md text-sm transition-all ${
                      tocItem.level === 1 ? 'font-medium' : ''
                    } ${
                      tocItem.level === 2 ? 'pl-5' : ''
                    } ${
                      tocItem.level === 3 ? 'pl-7 text-xs' : ''
                    } ${
                      activeSection === tocItem.id
                        ? 'bg-journal-accent/10 text-journal-accent border-l-2 border-journal-accent'
                        : 'text-journal-gray hover:text-journal-black hover:bg-gray-50'
                    }`}
                  >
                    {tocItem.text}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
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
            {/* Coming Soon Placeholder Cards */}
            <ComingSoonCard index={0} />
            <ComingSoonCard index={1} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { DeepDiveDetail };
