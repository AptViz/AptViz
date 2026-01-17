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
  sourceUrl?: string;
}

const newsItems: NewsItem[] = [
  {
    id: 'apt-futures-2026',
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
    thumbnail: '/news/news1.png',
    sourceUrl: 'https://www.theblock.co/post/385480/bitnomial-launches-first-regulated-aptos-futures-u-s',
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

Bitnomial은 앞으로 Aptos 관련 상품을 영구 선물 및 옵션으로 확대하여 미국 내 규제된 APT 파생상품 시장을 더욱 심화할 계획입니다.`,
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

Looking ahead, Bitnomial plans to expand its Aptos-linked offerings with perpetual futures and options, further deepening the market for regulated APT derivatives in the U.S.`
    }
  },
  {
    id: 'daily-revenue-1m-2026',
    category: { ko: '생태계', en: 'Ecosystem' },
    title: {
      ko: 'Aptos 생태계 앱들, 일일 매출 100만 달러 돌파',
      en: 'Aptos Ecosystem Apps Surpass $1M Daily Revenue'
    },
    description: {
      ko: 'Aptos 블록체인 위에 구축된 탈중앙화 애플리케이션들이 일일 총 매출 100만 달러를 돌파하며 생태계의 폭발적 성장을 입증했습니다.',
      en: 'Decentralized applications built on Aptos blockchain have surpassed $1 million in combined daily revenue, demonstrating explosive ecosystem growth.'
    },
    date: { ko: '2026년 1월 14일', en: 'Jan 14, 2026' },
    thumbnail: '/news/news2.png',
    sourceUrl: 'https://www.cryptopolitan.com/aptos-app-revenue-record-bitnomial-futures/',
    content: {
      ko: `Aptos 블록체인 생태계가 새로운 이정표를 달성했습니다. 네트워크 위에 구축된 탈중앙화 애플리케이션(dApps)들의 일일 총 매출이 처음으로 100만 달러를 돌파했습니다.

**성장 동력**

이번 성과는 여러 핵심 요소들이 결합된 결과입니다:

- 50ms 미만의 블록 타임으로 인한 사용자 경험 향상
- Native USDC 도입으로 인한 DeFi 생태계 활성화
- 기관 투자자들의 RWA(실물자산) 토큰화 참여 증가
- 게임 및 NFT 프로젝트들의 급성장

**주요 기여 프로젝트**

일일 매출에 가장 크게 기여한 분야는 다음과 같습니다:

- DeFi 프로토콜: 대출, 스테이킹, DEX 수수료
- 게임 플랫폼: 인앱 구매 및 NFT 거래
- NFT 마켓플레이스: 거래 수수료
- RWA 플랫폼: 토큰화 자산 관리 수수료

**업계 반응**

"이는 Aptos가 단순한 기술적 우수성을 넘어 실제 경제적 가치를 창출하는 플랫폼으로 자리잡았음을 보여줍니다," 라고 Aptos Labs CEO Avery Ching이 말했습니다.

**향후 전망**

분석가들은 현재의 성장 추세가 계속된다면, Aptos 생태계의 연간 매출이 수억 달러 규모에 도달할 것으로 전망하고 있습니다.`,
      en: `The Aptos blockchain ecosystem has achieved a new milestone. Decentralized applications (dApps) built on the network have surpassed $1 million in combined daily revenue for the first time.

**Growth Drivers**

This achievement is the result of several key factors:

- Enhanced user experience with sub-50ms block times
- DeFi ecosystem activation through Native USDC integration
- Increased institutional participation in RWA tokenization
- Rapid growth of gaming and NFT projects

**Top Contributing Sectors**

The sectors contributing most to daily revenue include:

- DeFi Protocols: lending, staking, DEX fees
- Gaming Platforms: in-app purchases and NFT trading
- NFT Marketplaces: transaction fees
- RWA Platforms: tokenized asset management fees

**Industry Response**

"This demonstrates that Aptos has established itself as a platform that creates real economic value beyond just technical excellence," said Aptos Labs CEO Avery Ching.

**Future Outlook**

Analysts project that if current growth trends continue, the Aptos ecosystem's annual revenue could reach hundreds of millions of dollars.`
    }
  },
  {
    id: 'block-time-50ms-2025',
    category: { ko: '업데이트', en: 'Update' },
    title: {
      ko: 'Aptos, Baby Raptr로 50ms 미만 블록 타임 달성',
      en: 'Aptos Achieves Sub-50ms Block Time with Baby Raptr'
    },
    description: {
      ko: 'Aptos가 Baby Raptr 및 Velociraptr 업그레이드를 통해 블록 타임 50ms 미만이라는 경이로운 벤치마크를 달성하며 가장 빠른 L1 블록체인으로 자리매김했습니다.',
      en: 'Aptos achieves a remarkable sub-50ms block time benchmark through Baby Raptr and Velociraptr upgrades, establishing itself as the fastest L1 blockchain.'
    },
    date: { ko: '2025년 12월 28일', en: 'Dec 28, 2025' },
    thumbnail: '/news/news3.png',
    sourceUrl: 'https://aptosfoundation.org/currents/baby-raptr-lands-on-mainnet',
    content: {
      ko: `Aptos 블록체인이 Baby Raptr 및 Velociraptr 컨센서스 업그레이드를 통해 블록 타임 50ms(0.05초) 미만을 달성했습니다. 이는 현존하는 모든 Layer 1 블록체인 중 가장 빠른 속도입니다.

**기술적 혁신**

Baby Raptr는 기존 Velociraptr 컨센서스의 최적화 버전으로, 다음과 같은 개선사항을 포함합니다:

- 블록 제안 및 투표 프로세스 최적화
- 네트워크 지연시간 최소화
- 검증자 간 통신 효율성 향상
- 메모리풀 관리 개선

**속도 비교**

다른 주요 블록체인과의 블록 타임 비교:

- Aptos (Baby Raptr): ~50ms
- Solana: ~400ms
- Ethereum: ~12초
- Bitcoin: ~10분

**실제 적용 효과**

이러한 속도 향상은 다음과 같은 실질적인 이점을 제공합니다:

- 거의 즉각적인 트랜잭션 확정
- 고빈도 거래(HFT) 애플리케이션 지원
- 게임 및 실시간 애플리케이션에 이상적인 환경
- 사용자 경험의 획기적 개선

**검증자 네트워크 반응**

전 세계 128개 이상의 검증자들이 성공적으로 업그레이드를 완료했으며, 네트워크 안정성은 99.99%를 유지하고 있습니다.

**향후 로드맵**

Aptos Labs는 2026년에 추가적인 성능 최적화를 통해 30ms 미만의 블록 타임을 목표로 하고 있다고 밝혔습니다.`,
      en: `Aptos blockchain has achieved sub-50ms (0.05 second) block time through the Baby Raptr and Velociraptr consensus upgrades. This is the fastest speed among all existing Layer 1 blockchains.

**Technical Innovation**

Baby Raptr is an optimized version of the existing Velociraptr consensus, including the following improvements:

- Optimized block proposal and voting process
- Minimized network latency
- Improved validator communication efficiency
- Enhanced mempool management

**Speed Comparison**

Block time comparison with other major blockchains:

- Aptos (Baby Raptr): ~50ms
- Solana: ~400ms
- Ethereum: ~12 seconds
- Bitcoin: ~10 minutes

**Real-World Impact**

This speed improvement provides the following practical benefits:

- Near-instantaneous transaction finality
- Support for high-frequency trading (HFT) applications
- Ideal environment for gaming and real-time applications
- Dramatically improved user experience

**Validator Network Response**

Over 128 validators worldwide have successfully completed the upgrade, maintaining network stability at 99.99%.

**Future Roadmap**

Aptos Labs announced they are targeting sub-30ms block time through additional performance optimizations in 2026.`
    }
  },
  {
    id: 'rwa-1-2b-2025',
    category: { ko: '생태계', en: 'Ecosystem' },
    title: {
      ko: 'Aptos 온체인 RWA 자산 12억 달러 돌파, 업계 Top 3',
      en: 'Aptos On-Chain RWA Assets Surpass $1.2B, Ranking Top 3'
    },
    description: {
      ko: 'Aptos 블록체인의 실물자산(RWA) 토큰화 규모가 12억 달러를 돌파하며 업계 Top 3에 진입했습니다. BlackRock BUIDL 펀드 확장이 주요 원동력입니다.',
      en: 'Aptos blockchain RWA tokenization volume surpasses $1.2 billion, entering industry Top 3. BlackRock BUIDL fund expansion is the main driver.'
    },
    date: { ko: '2025년 10월', en: 'Oct 2025' },
    thumbnail: '/news/news4.png',
    sourceUrl: 'https://cryptonews.net/news/altcoins/31838745/',
    content: {
      ko: `Aptos 블록체인에서 토큰화된 실물자산(RWA) 규모가 12억 달러($1.2B)를 돌파하며 이더리움, Polygon에 이어 업계 Top 3에 진입했습니다.

**성장 배경**

이러한 급성장의 배경에는 2024년 11월 BlackRock의 BUIDL 펀드 Aptos 확장이 있습니다. 세계 최대 자산운용사의 참여는 기관 투자자들에게 강력한 신뢰 신호를 보냈습니다.

**주요 RWA 카테고리**

Aptos에서 토큰화된 주요 자산 유형:

- 미국 국채 토큰: 약 6억 달러
- 머니마켓 펀드: 약 3억 달러
- 부동산 토큰: 약 1.5억 달러
- 기업 채권: 약 1억 달러
- 기타 자산: 약 0.5억 달러

**Aptos의 RWA 경쟁력**

기관들이 Aptos를 선택하는 이유:

- 초저지연 트랜잭션 (50ms 미만)
- 높은 처리량 (13,000+ TPS)
- Move 언어의 자산 안전성
- 규제 친화적 아키텍처
- 검증된 엔터프라이즈 파트너십

**기관 참여 현황**

현재 Aptos RWA 생태계에 참여 중인 주요 기관:

- BlackRock (BUIDL 펀드)
- Franklin Templeton
- Ondo Finance
- Securitize

**향후 전망**

업계 전문가들은 2026년까지 Aptos의 RWA TVL이 30억 달러를 돌파할 것으로 전망하고 있습니다.`,
      en: `Real-world assets (RWA) tokenized on the Aptos blockchain have surpassed $1.2 billion, entering the industry Top 3 after Ethereum and Polygon.

**Growth Background**

Behind this rapid growth is BlackRock's BUIDL fund expansion to Aptos in November 2024. The participation of the world's largest asset manager sent a strong trust signal to institutional investors.

**Major RWA Categories**

Key asset types tokenized on Aptos:

- US Treasury Tokens: approximately $600 million
- Money Market Funds: approximately $300 million
- Real Estate Tokens: approximately $150 million
- Corporate Bonds: approximately $100 million
- Other Assets: approximately $50 million

**Aptos RWA Competitiveness**

Why institutions choose Aptos:

- Ultra-low latency transactions (sub-50ms)
- High throughput (13,000+ TPS)
- Asset safety through Move language
- Regulation-friendly architecture
- Proven enterprise partnerships

**Institutional Participation**

Major institutions currently participating in the Aptos RWA ecosystem:

- BlackRock (BUIDL Fund)
- Franklin Templeton
- Ondo Finance
- Securitize

**Future Outlook**

Industry experts project Aptos RWA TVL to surpass $3 billion by 2026.`
    }
  },
  {
    id: 'velociraptr-2025',
    category: { ko: '업데이트', en: 'Update' },
    title: {
      ko: 'Aptos Velociraptr 업그레이드, 블록 타임 0.5초 미만 달성',
      en: 'Aptos Velociraptr Upgrade Achieves Sub-0.5 Second Block Time'
    },
    description: {
      ko: 'Aptos가 Velociraptr 컨센서스 업그레이드를 통해 블록 타임 0.5초 미만을 달성하며 Layer 1 블록체인 성능의 새로운 기준을 제시했습니다.',
      en: 'Aptos achieves sub-0.5 second block time through Velociraptr consensus upgrade, setting a new standard for Layer 1 blockchain performance.'
    },
    date: { ko: '2025년 9월', en: 'Sep 2025' },
    thumbnail: '/news/news5.png',
    sourceUrl: 'https://medium.com/aptoslabs/velociraptr-towards-faster-block-time-for-the-global-trading-engine-b7579d27fd1a',
    content: {
      ko: `Aptos 블록체인이 Velociraptr 컨센서스 업그레이드를 성공적으로 완료하며 블록 타임 0.5초(500ms) 미만을 달성했습니다. 이는 이전 대비 약 50% 이상의 성능 향상입니다.

**Velociraptr의 핵심 기술**

Velociraptr는 Aptos의 기존 AptosBFT 컨센서스를 기반으로 다음과 같은 혁신을 도입했습니다:

- 파이프라인 블록 실행: 여러 블록을 동시에 처리
- 최적화된 투표 메커니즘: 검증자 간 합의 속도 향상
- 동적 리더 선출: 네트워크 조건에 따른 적응형 블록 생성
- 개선된 메모리풀 관리: 트랜잭션 전파 최적화

**네트워크 성능 지표**

업그레이드 후 주요 성능 지표:

- 블록 타임: ~400-500ms (이전: ~800-1000ms)
- 트랜잭션 처리량: 10,000+ TPS
- 네트워크 안정성: 99.99%
- 검증자 참여율: 100%

**개발자 생태계 반응**

Velociraptr의 성능 향상으로 새로운 유형의 애플리케이션 개발이 가능해졌습니다:

- 고빈도 DeFi 프로토콜
- 실시간 게임 애플리케이션
- 인터랙티브 NFT 경험
- 마이크로 결제 시스템

**검증자 업그레이드 현황**

전 세계 128개 이상의 검증자가 24시간 이내에 업그레이드를 완료했으며, 네트워크 다운타임 없이 원활하게 전환되었습니다.

**다음 단계: Baby Raptr**

Aptos Labs는 Velociraptr의 성공을 바탕으로 2025년 말까지 블록 타임을 100ms 미만으로 줄이는 Baby Raptr 업그레이드를 예고했습니다.`,
      en: `Aptos blockchain has successfully completed the Velociraptr consensus upgrade, achieving sub-0.5 second (500ms) block time. This represents over 50% performance improvement compared to before.

**Key Technology of Velociraptr**

Velociraptr introduces the following innovations based on Aptos's existing AptosBFT consensus:

- Pipelined Block Execution: Processing multiple blocks simultaneously
- Optimized Voting Mechanism: Faster validator consensus
- Dynamic Leader Election: Adaptive block generation based on network conditions
- Improved Mempool Management: Optimized transaction propagation

**Network Performance Metrics**

Key performance metrics after upgrade:

- Block Time: ~400-500ms (previously: ~800-1000ms)
- Transaction Throughput: 10,000+ TPS
- Network Stability: 99.99%
- Validator Participation: 100%

**Developer Ecosystem Response**

Velociraptr's performance improvements enable new types of application development:

- High-frequency DeFi protocols
- Real-time gaming applications
- Interactive NFT experiences
- Micro-payment systems

**Validator Upgrade Status**

Over 128 validators worldwide completed the upgrade within 24 hours, with seamless transition without any network downtime.

**Next Step: Baby Raptr**

Building on Velociraptr's success, Aptos Labs announced the Baby Raptr upgrade targeting sub-100ms block time by end of 2025.`
    }
  },
  {
    id: 'native-usdc-2025',
    category: { ko: '파트너십', en: 'Partnership' },
    title: {
      ko: 'Aptos Native USDC 출시, 일일 활성 주소 100만 돌파',
      en: 'Aptos Launches Native USDC, Daily Active Addresses Surpass 1 Million'
    },
    description: {
      ko: 'Circle의 Native USDC가 Aptos에 공식 출시되며 일일 활성 주소(DAA)가 100만 개를 돌파했습니다. DeFi 생태계의 폭발적 성장이 예상됩니다.',
      en: 'Circle\'s Native USDC officially launches on Aptos, with Daily Active Addresses (DAA) surpassing 1 million. Explosive growth in DeFi ecosystem is expected.'
    },
    date: { ko: '2025년 1월', en: 'Jan 2025' },
    thumbnail: '/news/news6.png',
    sourceUrl: 'https://www.circle.com/blog/now-available-native-usdc-on-aptos',
    content: {
      ko: `Circle이 Aptos 블록체인에 Native USDC를 공식 출시했습니다. 이와 함께 Aptos의 일일 활성 주소(DAA)가 처음으로 100만 개를 돌파하며 네트워크 활성화의 새로운 이정표를 세웠습니다.

**Native USDC의 의미**

기존의 브릿지된 USDC와 달리, Native USDC는 Circle이 직접 Aptos에서 발행하는 공식 스테이블코인입니다:

- 1:1 미국 달러 준비금 보장
- Circle에 의한 직접 발행 및 환매
- 브릿지 리스크 제거
- 기관급 신뢰성

**생태계 영향**

Native USDC 도입으로 예상되는 변화:

- DeFi TVL 급증
- 기관 투자자 진입 장벽 하락
- 크로스체인 유동성 향상
- 결제 사용 사례 확대

**일일 활성 주소 100만 돌파**

Native USDC 출시와 함께 Aptos의 DAA가 100만을 돌파했습니다. 주요 활동 분야:

- DeFi 프로토콜 이용: 40%
- NFT 거래: 25%
- 게임: 20%
- 기타: 15%

**주요 DeFi 프로토콜 반응**

Aptos 생태계의 주요 DeFi 프로토콜들이 Native USDC 지원을 발표했습니다:

- Thala: USDC 유동성 풀 개설
- Liquidswap: USDC 거래 쌍 추가
- Aries Markets: USDC 대출 지원
- Echelon: USDC 담보 옵션 추가

**Circle CEO 성명**

"Aptos의 기술적 우수성과 성장하는 생태계는 Native USDC를 위한 이상적인 환경입니다. 이번 출시로 Aptos 사용자들에게 가장 신뢰할 수 있는 스테이블코인 인프라를 제공하게 되어 기쁩니다," 라고 Circle CEO Jeremy Allaire가 밝혔습니다.`,
      en: `Circle has officially launched Native USDC on the Aptos blockchain. Along with this, Aptos's Daily Active Addresses (DAA) surpassed 1 million for the first time, setting a new milestone for network activation.

**Significance of Native USDC**

Unlike bridged USDC, Native USDC is an official stablecoin issued directly by Circle on Aptos:

- 1:1 US dollar reserve guarantee
- Direct issuance and redemption by Circle
- Elimination of bridge risk
- Institutional-grade reliability

**Ecosystem Impact**

Expected changes from Native USDC introduction:

- Surge in DeFi TVL
- Lower barriers for institutional investors
- Improved cross-chain liquidity
- Expanded payment use cases

**Daily Active Addresses Surpass 1 Million**

With the Native USDC launch, Aptos DAA surpassed 1 million. Main activity areas:

- DeFi Protocol Usage: 40%
- NFT Trading: 25%
- Gaming: 20%
- Others: 15%

**Response from Major DeFi Protocols**

Major DeFi protocols in the Aptos ecosystem announced Native USDC support:

- Thala: USDC liquidity pool launch
- Liquidswap: USDC trading pair addition
- Aries Markets: USDC lending support
- Echelon: USDC collateral option addition

**Circle CEO Statement**

"Aptos's technical excellence and growing ecosystem provide an ideal environment for Native USDC. We are pleased to bring the most trusted stablecoin infrastructure to Aptos users with this launch," said Circle CEO Jeremy Allaire.`
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
  const bgIndex = newsItems.findIndex(n => n.id === id);

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

            {/* Source Link */}
            {item.sourceUrl && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">
                  {language === 'ko' ? '출처' : 'Source'}
                </h4>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-journal-accent hover:text-teal-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="font-medium">{item.sourceUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                </a>
              </div>
            )}
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
