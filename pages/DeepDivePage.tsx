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
  thumbnail?: string;
  heroImage?: string;
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
    thumbnail: '/deepdive/article-thumbnail.png',
    heroImage: '/deepdive/article-hero-image.png',
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

![Shelby: Data Infrastructure](/deepdive/article-shelby-data-infra.png)

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

![Shelby: Data Infrastructure](/deepdive/article-shelby-data-infra.png)

While blockchain has excelled at recording data, it has been weak at quickly retrieving recorded data. Shelby is a storage solution for services requiring real-time reading of massive data amounts, like AI model training or high-quality video streaming.

By providing speed and cost competitiveness with existing cloud services, it will attract enterprise-grade demand that couldn't previously go on-chain into the Aptos ecosystem.

### 3. Stablecoins: The Lifeblood of Real Money Flow

The cost of transferring stablecoins on Aptos is only about **$0.00003**. Compared to existing international remittance fees, this is **400,000 times cheaper**.

This overwhelming economic efficiency has already become a compelling reason for payment platforms in Africa and South America to choose Aptos. The fact that massive capital like PayPal's PYUSD and BlackRock's BUIDL fund has started moving on Aptos was only possible because prepared rails existed to accommodate massive real-economy transactions.

## Conclusion: 2026, The Moment of Truth for Infrastructure Value

From a research perspective, Aptos's past trajectory should be interpreted not as "performance showcase" but as "preemptive securing of demand accommodation capacity." If 2025 was the year of designing a solid chassis and laying tracks for mounting a massive engine, 2026 is the "moment of truth" to prove how fast and how many passengers the actual train can carry.

Aptos's approximately 490x processing capacity headroom means technical limitations no longer constrain application imagination. Market attention is now shifting from "how fast is it" to **"what will you change with that speed."**

The key questions are: Can Decibel absorb liquidity from existing major exchanges? Can Shelby cross the enterprise market threshold as an alternative to centralized cloud storage? And can stablecoins become a global payment standard beyond mere speculation tools?

Ultimately, proving that Aptos's strategy of kneeling for infrastructure to gain momentum was correct will come from **actual adoption metrics**, not indicators. 2026 appears to be a critical inflection point determining whether Aptos's vision of a "Financial Internet" can establish itself as core infrastructure for the real economic system, beyond technical hypothesis.`
  },
  {
    id: '2',
    category: 'Market',
    title: "APT Futures on Bitnomial: A Gateway to Institutional Adoption",
    titleKo: "Bitnomial APT 선물 상장: 기관 자본을 향한 관문이 열리다",
    description: 'Analysis of the first CFTC-regulated APT futures listing and its implications for Aptos ecosystem maturity.',
    descriptionKo: '미국 CFTC 규제를 받는 최초의 APT 선물 상품 출시와 이것이 앱토스 생태계 성숙도에 미치는 함의를 분석합니다.',
    readTime: '7 min read',
    thumbnail: '/deepdive/deepdive2.png',
    heroImage: '/deepdive/deepdive2.png',
    contentKo: `# APT 선물, 월스트리트의 문을 두드리다

2026년 1월 14일, 시카고에 본사를 둔 파생상품 거래소 Bitnomial이 역사적인 발표를 했습니다. 바로 미국 상품선물거래위원회(CFTC)의 규제 아래 **최초의 Aptos(APT) 월별 선물 계약**을 출시한 것입니다. 이 상장은 단순한 새로운 거래 상품의 등장을 넘어, 앱토스가 기관 금융의 영역으로 본격 진입했음을 선언하는 이정표입니다.

## 왜 규제된 선물 시장이 중요한가

암호화폐 시장에서 규제된 파생상품의 존재는 단순히 거래 수단의 다양화를 의미하지 않습니다. 그것은 해당 자산이 **기관 투자자들의 레이더에 들어왔다**는 선언과 같습니다.

비트코인과 이더리움의 사례를 보면, 규제된 선물 시장의 탄생은 현물 ETF 승인의 전제 조건이었습니다. CME에서 비트코인 선물이 거래되기 시작한 후에야 SEC는 현물 ETF를 승인했고, 이더리움 역시 같은 경로를 밟았습니다. Bitnomial의 사장 Michael Dunn은 이를 명확히 지적합니다: **"규제된 선물 시장은 현물 크립토 ETF 승인을 위한 필수 관문입니다."**

## Bitnomial이 제공하는 것

Bitnomial은 이미 비트코인과 이더리움 파생상품을 취급해온 CFTC 규제 거래소입니다. 이번 APT 선물 상품은 다음과 같은 특징을 갖습니다:

### 유연한 결제 방식
포지션 방향에 따라 **USD 또는 APT**로 결제를 선택할 수 있습니다. 이는 기관 투자자들이 기존 달러 기반 인프라를 활용하면서도 필요에 따라 실물 토큰을 확보할 수 있는 유연성을 제공합니다.

### 포트폴리오 마진링
기관 투자자들은 기존 거래 인프라 위에서 **포트폴리오 마진링**을 통해 APT 익스포저를 효율적으로 관리할 수 있습니다. 같은 계좌에서 비트코인, 이더리움과 함께 APT 포지션을 통합 관리할 수 있다는 의미입니다.

### 소매 투자자 접근성
기관 투자자뿐 아니라 소매 투자자들도 Bitnomial의 **Botanical 플랫폼**을 통해 조만간 접근이 가능해질 예정입니다. 이는 규제된 환경에서 APT 파생상품 거래를 원하는 모든 미국 투자자들에게 문을 열어줍니다.

## 시장에 미치는 파급 효과

### 유동성과 가격 안정성
규제된 선물 시장은 기관 자본의 유입을 촉진합니다. 이는 단순히 거래량 증가를 넘어 **가격 발견 메커니즘의 성숙**을 의미합니다. 기관 투자자들의 참여는 일반적으로 시장의 변동성을 완화하고, 보다 효율적인 가격 형성에 기여합니다.

### ETF 승인을 향한 디딤돌
역사가 증명하듯, 규제된 선물 시장의 존재는 미국 SEC가 현물 ETF를 승인할 때 가장 중요하게 고려하는 요소 중 하나입니다. APT 선물 상장은 미래의 **APT 현물 ETF 승인 가능성**을 한층 높여주는 결정적인 선례가 됩니다.

### 앱토스 생태계의 성숙 신호
이번 상장이 발표된 시점은 우연이 아닙니다. 앱토스는 최근 **일일 수수료 수익 100만 달러를 돌파**하며, RWA(실물자산 토큰화) 분야에서 폭발적인 성장세를 보여주고 있습니다. 네트워크의 안정성과 보안이 기관 수준에 도달했다는 명확한 증거입니다.

## 해외 시장과의 차별점

Binance를 비롯한 해외 거래소에서는 이미 APT 무기한(Perpetual) 선물이 거래되고 있습니다. 그러나 이들 상품은 미국 규제 체계 밖에서 운영됩니다. Bitnomial의 상품이 갖는 차별점은 명확합니다:

- **CFTC 직접 규제**: 미국 상품선물거래위원회의 직접적인 감독
- **법적 명확성**: 미국 기관 투자자들이 컴플라이언스 우려 없이 참여 가능
- **시장 감시**: 조작 방지를 위한 체계적인 시장 감시 체계

Aptos Labs의 최고 비즈니스 책임자 Solomon Tesfaye는 이를 다음과 같이 평가했습니다: **"이 상장은 블록체인 기술의 기관 채택을 위한 필수 인프라를 제공합니다."**

## 잠재적 리스크와 전망

### 리스크 요인
모든 파생상품이 그렇듯, 레버리지 거래는 청산 위험을 동반합니다. 또한 규제 환경의 변화(예: CFTC의 추가 제한)가 시장에 영향을 미칠 수 있습니다. 그러나 CFTC의 감독 체계 자체가 시장 조작 가능성을 크게 완화합니다.

### 확장 로드맵
Bitnomial은 월별 선물에서 멈추지 않을 계획입니다. 향후 **무기한 선물(Perpetual Futures)** 과 **옵션** 상품 출시가 예정되어 있습니다. 이는 앱토스의 파생상품 생태계가 비트코인, 이더리움과 동등한 수준으로 성숙해 나갈 것임을 시사합니다.

## 결론: 기관화의 새로운 장

Bitnomial의 APT 선물 상장은 단순한 새 상품 출시가 아닙니다. 이는 **앱토스가 기관 투자자들의 투자 유니버스에 공식적으로 편입되었음**을 알리는 선언입니다.

암호화폐 시장의 기관화는 거스를 수 없는 흐름입니다. 2024년 비트코인 현물 ETF 승인, 2025년 이더리움 현물 ETF 승인에 이어, 2026년은 알트코인들이 그 뒤를 따르는 해가 될 것으로 보입니다. 앱토스는 규제된 선물 시장을 확보한 극소수의 레이어1 블록체인 중 하나로서, 이 대열의 선두에 서게 되었습니다.

투자자들에게 이번 상장은 분명 긍정적인 시그널입니다. 그러나 파생상품 시장의 본질적인 변동성과 레버리지 위험을 감안한 신중한 접근이 필요합니다. 앱토스의 기술적 성숙도와 기관 인프라가 함께 갖춰진 지금, 시장은 다음 단계 **현물 ETF 승인** 를 향한 기대감으로 들끓고 있습니다.`,
    content: `# APT Futures: Knocking on Wall Street's Door

On January 14, 2026, Chicago-based derivatives exchange Bitnomial made a historic announcement: the launch of **the first Aptos (APT) monthly futures contract** under the regulation of the U.S. Commodity Futures Trading Commission (CFTC). This listing goes beyond the mere introduction of a new trading product—it marks a milestone declaring Aptos's official entry into the realm of institutional finance.

## Why Regulated Futures Markets Matter

In the crypto market, the existence of regulated derivatives signifies more than just diversification of trading instruments. It's a declaration that the asset has **entered the radar of institutional investors**.

Looking at Bitcoin and Ethereum, the birth of regulated futures markets was a prerequisite for spot ETF approval. Only after Bitcoin futures began trading on CME did the SEC approve a spot ETF, and Ethereum followed the same path. Bitnomial President Michael Dunn points this out clearly: **"Regulated futures markets are an essential gateway for spot crypto ETF approval."**

## What Bitnomial Offers

Bitnomial is a CFTC-regulated exchange that already handles Bitcoin and Ethereum derivatives. The new APT futures product features:

### Flexible Settlement
Traders can choose to settle in **USD or APT** depending on position direction. This provides institutional investors the flexibility to utilize existing dollar-based infrastructure while acquiring actual tokens when needed.

### Portfolio Margining
Institutional investors can efficiently manage APT exposure through **portfolio margining** on top of existing trading infrastructure. This means APT positions can be managed alongside Bitcoin and Ethereum in the same account.

### Retail Investor Access
Not just institutions—retail investors will soon be able to access these products through Bitnomial's **Botanical platform**. This opens doors for all U.S. investors seeking APT derivative trading in a regulated environment.

## Market Ripple Effects

### Liquidity and Price Stability
Regulated futures markets facilitate institutional capital inflows. This goes beyond mere volume increases—it signifies **maturation of price discovery mechanisms**. Institutional participation generally mitigates market volatility and contributes to more efficient price formation.

### Stepping Stone Toward ETF Approval
As history proves, the existence of a regulated futures market is one of the most important factors the SEC considers when approving spot ETFs. The APT futures listing becomes a decisive precedent that significantly raises the possibility of a **future APT spot ETF approval**.

### Signal of Aptos Ecosystem Maturity
The timing of this listing announcement is no coincidence. Aptos recently **surpassed $1 million in daily fee revenue**, demonstrating explosive growth in the RWA (Real World Asset tokenization) sector. This is clear evidence that the network's stability and security have reached institutional grade.

## Differentiation from Overseas Markets

APT perpetual futures already trade on overseas exchanges like Binance. However, these products operate outside the U.S. regulatory framework. Bitnomial's product has clear differentiators:

- **Direct CFTC Regulation**: Direct oversight by the U.S. Commodity Futures Trading Commission
- **Legal Clarity**: U.S. institutional investors can participate without compliance concerns
- **Market Surveillance**: Systematic market surveillance mechanisms to prevent manipulation

Aptos Labs Chief Business Officer Solomon Tesfaye evaluated this as follows: **"This listing provides essential infrastructure for institutional adoption of blockchain technology."**

## Potential Risks and Outlook

### Risk Factors
As with all derivatives, leveraged trading carries liquidation risks. Additionally, changes in the regulatory environment (e.g., additional CFTC restrictions) could impact the market. However, the CFTC oversight system itself significantly mitigates the possibility of market manipulation.

### Expansion Roadmap
Bitnomial doesn't plan to stop at monthly futures. **Perpetual futures** and **options** products are planned for future release. This suggests Aptos's derivatives ecosystem will mature to levels equivalent to Bitcoin and Ethereum.

## Conclusion: A New Chapter in Institutionalization

Bitnomial's APT futures listing is not merely a new product launch. It's a declaration that **Aptos has been officially incorporated into institutional investors' investment universe**.

The institutionalization of the crypto market is an irreversible trend. Following the 2024 Bitcoin spot ETF approval and 2025 Ethereum spot ETF approval, 2026 appears to be the year altcoins follow suit. Aptos is one of the few Layer 1 blockchains with a regulated futures market, now standing at the forefront of this movement.

For investors, this listing is clearly a positive signal. However, a prudent approach is needed considering the inherent volatility of derivatives markets and leverage risks. With Aptos's technical maturity and institutional infrastructure now in place, the market is buzzing with anticipation for the next step—spot ETF approval.`
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
        <div className={`aspect-[16/9] bg-gradient-to-br ${gradients[index % gradients.length]} relative overflow-hidden`}>
          {item.thumbnail ? (
            <img 
              src={item.thumbnail} 
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="w-32 h-32 border-2 border-gray-400 rounded-full" />
              <div className="absolute w-24 h-24 border-2 border-gray-400 rounded-full translate-x-8 translate-y-8" />
            </div>
          )}
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
            {item.descriptionKo || item.description}
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
  const [language, setLanguage] = useState<'en' | 'ko'>('ko');
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
                {item.heroImage && (
                  <img 
                    src={item.heroImage} 
                    alt={currentTitle}
                    className="w-full h-auto rounded-lg mb-8 object-contain"
                  />
                )}
                
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
                      img: (props) => {
                        const { src, alt } = props;
                        return src ? (
                          <div className="my-8 flex justify-center">
                            <img 
                              src={src} 
                              alt={alt || 'Article image'} 
                              className="rounded-lg max-w-full h-auto"
                              onError={(e) => {
                                console.error('Image failed to load:', src);
                              }}
                            />
                          </div>
                        ) : null;
                      },
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
