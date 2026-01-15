import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { ArrowLeft, Calendar, Globe } from 'lucide-react';

type Language = 'ko' | 'en';

interface NewsItem {
  id: string;
  category: { ko: string; en: string };
  title: { ko: string; en: string };
  description: { ko: string; en: string };
  date: { ko: string; en: string };
  content: { ko: string; en: string };
  thumbnail?: string;
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    category: { ko: '파트너십', en: 'Partnership' },
    title: {
      ko: 'Bitnomial, 미국 최초 CFTC 규제 Aptos(APT) 선물 출시',
      en: 'Bitnomial Launches First U.S.-Regulated Aptos (APT) Futures'
    },
    description: {
      ko: '시카고 기반 암호화폐 거래소 Bitnomial이 미국 최초로 CFTC 규제를 받는 APT 선물 계약을 출시하며, 기관 투자자 유입과 ETF 승인 가능성의 발판을 마련했습니다.',
      en: 'Chicago-based crypto exchange Bitnomial introduces the first CFTC-regulated APT futures contracts, paving the way for institutional adoption and potential ETF approval.'
    },
    date: { ko: '2026년 1월 14일', en: 'Jan 14, 2026' },
    thumbnail: '/news/news-1-bitnomial-apt-futures.png',
    content: {
      ko: `시카고 기반 암호화폐 거래소 Bitnomial이 레이어-1 블록체인 Aptos의 네이티브 토큰과 연동된 월간 선물 계약을 출시했습니다. 이는 미국 규제 하에서 최초로 출시되는 APT 파생상품입니다.

**주요 내용**

해당 계약은 1월 14일 Bitnomial Exchange에서 거래를 시작했으며, 기관 및 개인 투자자 모두에게 규제된 환경에서의 가격 발견과 리스크 관리 기회를 제공합니다.

**계약 특징**

- 월간 만기 계약
- 포지션 방향에 따라 미국 달러 또는 APT로 결제 가능
- Bitnomial Clearinghouse를 통해 암호화폐 또는 USD로 마진 설정 가능
- Bitnomial Exchange FCM 청산 회원사를 통해 접근 가능

**암호화폐 마진 기능**

트레이더들은 Bitnomial Clearinghouse를 통해 암호화폐 또는 USD를 담보로 설정할 수 있어, 현금만 받는 전통적인 파생상품 플랫폼에 비해 자본 효율성이 높습니다. 이 암호화폐 마진 기능은 Bitnomial을 대부분의 미국 거래소보다 앞서게 하며, 현재 이 옵션을 제공하는 유일한 CFTC 규제 거래소입니다.

**ETF 승인에 대한 중요성**

"이것은 미국 최초의 APT 선물이며, 규제된 선물 시장은 SEC의 일반 상장 기준에 따른 현물 암호화폐 ETF 승인의 전제 조건입니다," 라고 Bitnomial Exchange의 Michael Dunn 사장이 말했습니다.

**기관 및 개인 접근**

해당 계약은 Bitnomial의 청산 회원사를 통해 기관 고객에게 제공되며, 개인 투자자는 향후 몇 주 내에 회사의 Botanical 플랫폼을 통해 접근할 수 있을 예정입니다.

**향후 계획**

Bitnomial은 앞으로 Aptos 관련 상품을 영구 선물 및 옵션으로 확대하여 미국 내 규제된 APT 파생상품 시장을 더욱 심화할 계획입니다.

**Bitnomial 소개**

Bitnomial, Inc.는 시카고에 본사를 둔 파생상품 거래소 회사로, 미국 CFTC 규제를 받는 거래소(DCM), 청산소(DCO), 청산 중개업(FCM) 자회사를 소유 및 운영하고 있습니다. Bitnomial은 BTC와 해시레이트로 구성된 Bitcoin Complex와 미국 최초의 XRP, ADA, USDC 선물 등을 포함하는 Crypto Complex에 대한 미국 최초의 영구 선물, 실물 선물 및 옵션을 제공합니다.`,
      en: `Chicago-based crypto exchange Bitnomial has launched monthly futures contracts tied to the Layer-1 blockchain Aptos' native token, marking the first APT derivatives product regulated under U.S. oversight.

**Key Details**

The contracts began trading on January 14 on Bitnomial Exchange, offering both institutional and retail traders a regulated venue for price discovery and risk management.

**Contract Features**

- Monthly expiration contracts
- Settlement in either U.S. dollars or APT depending on position direction
- Margin posting available in crypto or USD through Bitnomial Clearinghouse
- Accessible via Bitnomial Exchange FCM clearing members

**Crypto-Margin Capability**

Traders can post either cryptocurrency or USD as collateral through Bitnomial Clearinghouse, providing more capital efficiency compared to traditional derivatives platforms that only accept cash. This crypto-margining capability puts Bitnomial ahead of most U.S. exchanges, as it remains the only CFTC-regulated venue offering this option.

**Significance for ETF Approval**

"These are the first U.S. APT futures, and a regulated futures market is a prerequisite for spot crypto ETF approval under the SEC's generic listing standards," said Michael Dunn, President of Bitnomial Exchange.

**Institutional & Retail Access**

The contracts will be available to institutional clients through Bitnomial's clearing members, with retail access expected in the coming weeks via the company's Botanical platform.

**Future Plans**

Looking ahead, Bitnomial plans to expand its Aptos-linked offerings with perpetual futures and options, further deepening the market for regulated APT derivatives in the U.S.

**About Bitnomial**

Bitnomial, Inc., headquartered in Chicago, is a derivatives exchange company that owns and operates U.S. CFTC-regulated exchange (DCM), clearinghouse (DCO), and clearing brokerage (FCM) subsidiaries. Bitnomial offers the first U.S. perpetuals, physical futures, and options on the Bitcoin Complex comprising BTC and Hashrate, and the Crypto Complex comprising the first-ever U.S. XRP, ADA, and USDC futures, among other assets.`
    }
  }
];

const LanguageToggle: React.FC<{ language: Language; setLanguage: (lang: Language) => void }> = ({ language, setLanguage }) => {
  return (
    <div className="flex items-center gap-2">
      <Globe size={16} className="text-gray-400" />
      <div className="flex bg-gray-100 rounded-full p-1">
        <button
          onClick={() => setLanguage('ko')}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${language === 'ko'
              ? 'bg-white text-journal-black shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          KO
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${language === 'en'
              ? 'bg-white text-journal-black shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          EN
        </button>
      </div>
    </div>
  );
};

const NewsCard: React.FC<{ item: NewsItem; index: number; language: Language }> = ({ item, index, language }) => {
  const navigate = useNavigate();

  const categoryColors: Record<string, string> = {
    '공지': 'bg-teal-100 text-teal-700',
    'Announcement': 'bg-teal-100 text-teal-700',
    '업데이트': 'bg-blue-100 text-blue-700',
    'Update': 'bg-blue-100 text-blue-700',
    '파트너십': 'bg-purple-100 text-purple-700',
    'Partnership': 'bg-purple-100 text-purple-700',
    '생태계': 'bg-amber-100 text-amber-700',
    'Ecosystem': 'bg-amber-100 text-amber-700',
    '커뮤니티': 'bg-rose-100 text-rose-700',
    'Community': 'bg-rose-100 text-rose-700',
    '보안': 'bg-emerald-100 text-emerald-700',
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

  const handleClick = () => {
    navigate(`/news/${item.id}?lang=${language}`);
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
        <div className={`aspect-[16/9] ${bgPatterns[index % bgPatterns.length]} relative overflow-hidden`}>
          {item.thumbnail ? (
            <img
              src={item.thumbnail}
              alt={item.title[language]}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border border-gray-300 rounded-full opacity-30" />
              <div className="absolute w-24 h-24 border border-gray-300 rounded-full opacity-20" />
              <div className="absolute w-32 h-32 border border-gray-300 rounded-full opacity-10" />
            </div>
          )}
          <div className="absolute top-4 left-4">
            <span className={`text-xs font-bold tracking-widest uppercase px-2 py-1 rounded ${categoryColors[item.category[language]] || 'bg-gray-100 text-gray-700'}`}>
              {item.category[language]}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <Calendar size={12} />
            <span>{item.date[language]}</span>
          </div>
          <h3 className="font-serif text-xl text-journal-black mb-3 group-hover:text-journal-accent transition-colors leading-tight">
            {item.title[language]}
          </h3>
          <p className="font-sans text-sm text-journal-gray font-light line-clamp-2">
            {item.description[language]}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const NewsDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const initialLang = (searchParams.get('lang') as Language) || 'ko';
  const [language, setLanguage] = useState<Language>(initialLang);

  const item = newsItems.find(n => n.id === id);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{language === 'ko' ? '뉴스를 찾을 수 없습니다' : 'News not found'}</p>
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
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/news')}
              className="flex items-center gap-2 text-journal-gray hover:text-journal-black transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-medium">
                {language === 'ko' ? '뉴스 목록으로' : 'Back to News'}
              </span>
            </button>
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={language}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-journal-accent">
                {item.category[language]}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar size={12} />
                {item.date[language]}
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-journal-black mt-2 mb-6 leading-tight">
              {item.title[language]}
            </h1>
            <p className="font-sans text-xl text-journal-gray font-light mb-12 leading-relaxed">
              {item.description[language]}
            </p>

            <div className={`aspect-video ${bgPatterns[bgIndex % bgPatterns.length]} rounded-sm mb-12 relative overflow-hidden`}>
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.title[language]}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 border border-gray-400 rounded-full opacity-30" />
                  <div className="absolute w-36 h-36 border border-gray-400 rounded-full opacity-20" />
                  <div className="absolute w-48 h-48 border border-gray-400 rounded-full opacity-10" />
                </div>
              )}
            </div>

            <div className="prose prose-lg max-w-none">
              {item.content[language].split('\n\n').map((paragraph, i) => {
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
  const [language, setLanguage] = useState<Language>('ko');

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-8">
          <ScrollReveal width="100%">
            <div className="mb-16 border-b border-black pb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="font-serif text-5xl md:text-6xl text-journal-black">
                  {language === 'ko' ? '뉴스' : 'News'}
                </h1>
                <LanguageToggle language={language} setLanguage={setLanguage} />
              </div>
              <p className="font-serif italic text-xl text-gray-500">
                {language === 'ko'
                  ? '최신 업데이트, 공지사항 및 생태계 뉴스'
                  : 'Latest updates, announcements & ecosystem news'
                }
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <NewsCard key={item.id} item={item} index={index} language={language} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { NewsDetail };
