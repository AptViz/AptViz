import { VisualizationItem, PartnerCategory } from './types';

export const rwaPartnerCategories: PartnerCategory[] = [
  {
    id: 'asset-managers',
    title: 'Asset Managers',
    titleKo: '글로벌 자산 운용사',
    description: '직접 펀드 운용 - 가장 신뢰도가 높은 대형 금융 기관들로, 앱토스에 직접 자본을 공급하는 주체',
    color: '#0d9488', // teal
    partners: [
      {
        name: 'BlackRock',
        nameKo: '블랙록',
        description: '세계 최대 운용사. BUIDL 펀드를 앱토스 네트워크에 확장하여 기관용 유동성 공급.',
        tokens: ['BUIDL'],
        tvl: 558100000,
        note: 'Securitize를 통해 발행된 펀드 TVL',
        url: 'https://www.blackrock.com'
      },
      {
        name: 'Franklin Templeton',
        nameKo: '프랭클린 템플턴',
        description: '미 국채 기반 펀드(FOBXX)를 BENJI 토큰으로 발행. 앱토스를 주요 온체인 운영 허브로 채택.',
        tokens: ['BENJI'],
        tvl: 21701638,
        note: '미 국채 기반 펀드',
        url: 'https://www.franklintempleton.com'
      }
    ]
  },
  {
    id: 'rwa-platforms',
    title: 'RWA Platforms',
    titleKo: '토큰화 플랫폼 및 프로토콜',
    description: '자산 발행 및 기술 지원 - 전통 자산을 블록체인 상의 토큰으로 변환하고 관리하는 인프라',
    color: '#6366f1', // indigo
    partners: [
      {
        name: 'Securitize',
        nameKo: '시큐리타이즈',
        description: '블랙록 BUIDL의 발행 파트너. 앱토스 내 가장 큰 규모의 RWA 자산 관리.',
        tokens: ['BUIDL', 'ACRED'],
        tvl: 579600000,
        note: 'BUIDL ($558M) + ACRED ($21.5M) 합산. BlackRock과 Apollo 관련 자산 관리',
        url: 'https://securitize.io'
      },
      {
        name: 'PACT',
        nameKo: 'PACT',
        description: '프라이빗 크레딧 중심의 토큰화 플랫폼. Berkeley Square 시리즈 펀드 운용.',
        tokens: ['EM', 'NPA', 'CAD', 'AD', 'KES'],
        tvl: 602694716,
        note: '여러 포트폴리오 합산 (EM-2 $189M, EM-1 $159M 등). 프라이빗 크레딧 중심',
        url: 'https://pact.foundation'
      },
      {
        name: 'Ondo Finance',
        nameKo: '온도 파이낸스',
        description: '국채 기반 수익형 토큰인 USDY 발행. 앱토스 생태계 내 DeFi 유동성 핵심.',
        tokens: ['USDY'],
        tvl: 7663931,
        note: '국채 기반 수익 토큰',
        url: 'https://ondo.finance'
      },
      {
        name: 'KAIO',
        nameKo: '카이오 (구 Libre Capital)',
        description: '노무라(Nomura) 계열의 기관급 토큰화 플랫폼. 헤지펀드 및 사모펀드 자산을 앱토스에 연결.',
        tokens: ['CASHx', 'MACROx', 'SCOPEx'],
        tvl: 21206391,
        note: 'CASHx ($10.5M) + MACROx ($6.3M) + SCOPEx ($4.3M) 합산. Nomura 계열 펀드',
        url: 'https://libre.capital'
      }
    ]
  },
  {
    id: 'infrastructure',
    title: 'Institutional Infrastructure',
    titleKo: '기관급 인프라',
    description: '자산 보관 및 보안 - 기관들이 안심하고 앱토스를 사용할 수 있게 돕는 신뢰 기관',
    color: '#f59e0b', // amber
    partners: [
      {
        name: 'Anchorage Digital',
        nameKo: '앤커리지 디지털',
        description: '규제 준수 수탁 기관. 앱토스 기반 기관 자산의 커스터디 지원.',
        tokens: [],
        tvl: 0,
        note: 'TVL 직접 측정되지 않음 (커스터디 지원 역할)',
        url: 'https://www.anchorage.com'
      },
      {
        name: 'Coinbase Custody',
        nameKo: '코인베이스 커스터디',
        description: '기관용 암호화폐 보관 및 관리 서비스 제공.',
        tokens: [],
        tvl: 0,
        note: 'TVL 직접 측정되지 않음 (보관 서비스)',
        url: 'https://www.coinbase.com/prime/custody'
      },
      {
        name: 'Copper',
        nameKo: '카퍼',
        description: '기관 전용 거래 및 결제 솔루션 파트너.',
        tokens: [],
        tvl: 0,
        note: 'TVL 직접 측정되지 않음 (거래 솔루션)',
        url: 'https://copper.co'
      },
      {
        name: 'BitGo',
        nameKo: '비트고',
        description: '기관급 디지털 자산 커스터디 및 보안 솔루션 제공.',
        tokens: ['USD1'],
        tvl: 0,
        note: '보고된 TVL 없음',
        url: 'https://www.bitgo.com'
      }
    ]
  },
  {
    id: 'liquidity-bridge',
    title: 'Stablecoins & Bridge',
    titleKo: '유동성 및 브릿지',
    description: '자금 이동 통로 - 자산이 원활하게 유입되고 거래될 수 있도록 하는 통로',
    color: '#ec4899', // pink
    partners: [
      {
        name: 'Tether',
        nameKo: 'USDT',
        description: '앱토스 내 최대 규모의 스테이블코인 공급.',
        tokens: ['USDT'],
        tvl: 936000000,
        note: '네이티브 $936M ~ (Market Share Estimation)',
        url: 'https://tether.to'
      },
      {
        name: 'Circle',
        nameKo: 'USDC',
        description: '규제 준수형 스테이블코인 공급 및 네이티브 USDC 발행 협업.',
        tokens: ['USDC'],
        tvl: 264800000,
        note: '네이티브 + 브릿지 합산 ($264.8M)',
        url: 'https://www.circle.com'
      },
      {
        name: 'LayerZero',
        nameKo: '레이어제로',
        description: "'Aptos Bridge'를 통해 타 체인의 자산을 앱토스로 안전하게 이동시키는 기술 지원.",
        tokens: [],
        tvl: 0,
        note: '브릿지 역할로 직접 TVL 없음 (브릿지된 자산은 상위 스테이블코인에 포함)',
        url: 'https://layerzero.network'
      },
      {
        name: 'Wormhole',
        nameKo: 'Portal Bridge',
        description: '범용 메시징 프로토콜을 통한 자산 전송 파트너십.',
        tokens: [],
        tvl: 0,
        note: '브릿지 역할로 직접 TVL 없음 (브릿지된 자산은 상위 스테이블코인에 포함)',
        url: 'https://wormhole.com'
      }
    ]
  },
  {
    id: 'data-analytics',
    title: 'Data Partners',
    titleKo: '데이터 및 분석',
    description: 'RWA 생태계의 투명성과 분석 데이터 제공',
    color: '#8b5cf6', // violet
    partners: [
      {
        name: 'RWA.xyz',
        nameKo: 'RWA.xyz',
        description: '앱토스 네트워크의 RWA 실시간 지표(TVL, 홀더 수 등)를 투명하게 공개하고 분석 데이터 제공.',
        tokens: [],
        tvl: 0,
        note: '데이터 제공 역할, TVL 없음',
        url: 'https://rwa.xyz'
      }
    ]
  },
  {
    id: 'other',
    title: 'Other Partners',
    titleKo: '기타 파트너',
    description: '앱토스 생태계를 지원하는 기타 인프라 파트너',
    color: '#64748b', // slate
    partners: [
      {
        name: 'Petra',
        nameKo: '페트라',
        description: '앱토스 공식 지갑. 사용자 온보딩 및 자산 관리 지원.',
        tokens: [],
        tvl: 0,
        note: '월렛 역할, TVL 없음',
        url: 'https://petra.app'
      }
    ]
  },
];

// 총 TVL 계산
export const totalRWATvl = rwaPartnerCategories.reduce(
  (total, category) => total + category.partners.reduce((catTotal, partner) => catTotal + partner.tvl, 0),
  0
);

export const rwaPartnershipsVisualization: VisualizationItem = {
  id: '1',
  category: 'RWA',
  title: 'RWA Partnership Ecosystem',
  description: 'Aptos의 Real World Asset 토큰화 파트너십 생태계 지도',
  component: 'RWAPartnershipChart',
  thumbnail: 'https://www.aptviz.xyz/images/RWA.png',
  content: `Aptos는 전통 금융과 블록체인을 연결하는 RWA(Real World Assets) 분야에서 가장 강력한 파트너십 네트워크를 구축하고 있습니다.

**글로벌 자산 운용사 (Asset Managers)**
BlackRock과 Franklin Templeton 등 세계 최대 자산운용사들이 Aptos 네트워크에서 직접 펀드를 운용합니다. BlackRock의 BUIDL 펀드와 Franklin Templeton의 BENJI 토큰이 대표적입니다.

**토큰화 플랫폼 (RWA Platforms)**
Securitize, Ondo Finance, KAIO 등이 전통 자산을 온체인 토큰으로 변환하는 핵심 인프라를 제공합니다. 특히 Ondo의 USDY는 앱토스 DeFi 생태계의 주요 유동성 원천입니다.

**기관급 인프라 (Institutional Infrastructure)**
Anchorage Digital, Coinbase Custody, Copper 등 규제 준수 수탁 기관들이 기관 투자자들의 안전한 자산 보관을 지원합니다.

**유동성 및 브릿지 (Stablecoins & Bridge)**
Tether(USDT), Circle(USDC)의 스테이블코인과 LayerZero, Wormhole의 크로스체인 브릿지가 원활한 자금 흐름을 보장합니다.

**데이터 및 분석 (Data Partners)**
RWA.xyz가 앱토스 RWA 생태계의 실시간 지표와 투명한 분석 데이터를 제공합니다.`
};
