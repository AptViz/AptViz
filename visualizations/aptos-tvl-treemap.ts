import { VisualizationItem } from './types';

// TVL 앱 데이터 타입 정의
export interface TvlAppData {
  name: string;
  nameKo?: string;
  category: string;
  categoryKo: string;
  tvl: number; // TVL (USD)
  change1m?: number; // 1개월 변화율 (%)
  change7d?: number; // 7일 변화율 (%)
}

// 카테고리 색상 매핑
export const tvlCategoryColors: Record<string, string> = {
  'Liquid Staking': '#0d9488', // teal
  'Lending': '#ea580c', // orange
  'Dexs': '#16a34a', // green
  'CDP': '#7c3aed', // violet
  'Yield': '#2563eb', // blue
  'Bridge': '#db2777', // pink
  'Derivatives': '#0891b2', // cyan
  'Leveraged Farming': '#f59e0b', // amber
  'RWA': '#8b5cf6', // purple
  'Staking Pool': '#64748b', // slate
  'Other': '#6b7280', // gray
};

// DefiLlama Aptos TVL 데이터 (2026년 1월 기준)
export const aptosTvlData: TvlAppData[] = [
  // Liquid Staking
  {
    name: 'Amnis Finance',
    category: 'Liquid Staking',
    categoryKo: '리퀴드 스테이킹',
    tvl: 285000000,
    change1m: 12.5,
    change7d: 3.2,
  },
  {
    name: 'Tortuga',
    category: 'Liquid Staking',
    categoryKo: '리퀴드 스테이킹',
    tvl: 48000000,
    change1m: -5.2,
    change7d: -1.8,
  },
  // Lending
  {
    name: 'Echelon Market',
    category: 'Lending',
    categoryKo: '렌딩',
    tvl: 180000000,
    change1m: 8.7,
    change7d: 2.1,
  },
  {
    name: 'Aries Markets',
    category: 'Lending',
    categoryKo: '렌딩',
    tvl: 95000000,
    change1m: -3.4,
    change7d: 0.8,
  },
  {
    name: 'Meso Finance',
    category: 'Lending',
    categoryKo: '렌딩',
    tvl: 12000000,
    change1m: -8.2,
    change7d: -2.1,
  },
  {
    name: 'Aave',
    category: 'Lending',
    categoryKo: '렌딩',
    tvl: 40000000,
    change1m: 15.3,
    change7d: 4.5,
  },
  // Dexs
  {
    name: 'Thala',
    category: 'Dexs',
    categoryKo: '탈중앙화 거래소',
    tvl: 120000000,
    change1m: 5.8,
    change7d: 1.2,
  },
  {
    name: 'PancakeSwap',
    category: 'Dexs',
    categoryKo: '탈중앙화 거래소',
    tvl: 85000000,
    change1m: -2.1,
    change7d: 0.5,
  },
  {
    name: 'Liquidswap',
    category: 'Dexs',
    categoryKo: '탈중앙화 거래소',
    tvl: 65000000,
    change1m: 3.4,
    change7d: 1.8,
  },
  {
    name: 'Hyperion',
    category: 'Dexs',
    categoryKo: '탈중앙화 거래소',
    tvl: 42000000,
    change1m: 18.5,
    change7d: 5.2,
  },
  {
    name: 'Cellana Finance',
    category: 'Dexs',
    categoryKo: '탈중앙화 거래소',
    tvl: 28000000,
    change1m: 22.3,
    change7d: 6.1,
  },
  {
    name: 'Sushi',
    category: 'Dexs',
    categoryKo: '탈중앙화 거래소',
    tvl: 18000000,
    change1m: -4.5,
    change7d: -1.2,
  },
  // CDP
  {
    name: 'Thala CDP',
    category: 'CDP',
    categoryKo: 'CDP',
    tvl: 55000000,
    change1m: 2.3,
    change7d: 0.8,
  },
  // Yield
  {
    name: 'Merkle Trade',
    category: 'Derivatives',
    categoryKo: '파생상품',
    tvl: 35000000,
    change1m: 45.2,
    change7d: 12.3,
  },
  {
    name: 'Econia',
    category: 'Dexs',
    categoryKo: '탈중앙화 거래소',
    tvl: 22000000,
    change1m: 8.9,
    change7d: 2.4,
  },
  // Bridge
  {
    name: 'LayerZero',
    category: 'Bridge',
    categoryKo: '브릿지',
    tvl: 75000000,
    change1m: 6.2,
    change7d: 1.5,
  },
  {
    name: 'Wormhole',
    category: 'Bridge',
    categoryKo: '브릿지',
    tvl: 45000000,
    change1m: -1.8,
    change7d: 0.3,
  },
  // Leveraged Farming
  {
    name: 'Moar Market',
    category: 'Leveraged Farming',
    categoryKo: '레버리지 파밍',
    tvl: 32000000,
    change1m: 28.5,
    change7d: 8.2,
  },
  // RWA
  {
    name: 'Securitize',
    category: 'RWA',
    categoryKo: '실물자산',
    tvl: 580000000,
    change1m: 4.2,
    change7d: 1.1,
  },
  {
    name: 'Ondo Finance',
    category: 'RWA',
    categoryKo: '실물자산',
    tvl: 8000000,
    change1m: 125.0,
    change7d: 35.2,
  },
  // Other
  {
    name: 'Echo Protocol',
    category: 'Other',
    categoryKo: '기타',
    tvl: 15000000,
    change1m: -5.8,
    change7d: -1.5,
  },
  {
    name: 'Kana Labs',
    category: 'Other',
    categoryKo: '기타',
    tvl: 8000000,
    change1m: 3.2,
    change7d: 0.9,
  },
];

// 총 TVL 계산
export const totalAptosTvl = aptosTvlData.reduce((sum, app) => sum + app.tvl, 0);

// 카테고리별 그룹화 및 합계 계산
export const tvlCategoryData = aptosTvlData.reduce((acc, app) => {
  if (!acc[app.category]) {
    acc[app.category] = {
      category: app.category,
      categoryKo: app.categoryKo,
      totalTvl: 0,
      apps: [],
      color: tvlCategoryColors[app.category] || '#64748b',
    };
  }
  acc[app.category].totalTvl += app.tvl;
  acc[app.category].apps.push(app);
  return acc;
}, {} as Record<string, { category: string; categoryKo: string; totalTvl: number; apps: TvlAppData[]; color: string }>);

// 카테고리를 TVL 순으로 정렬
export const sortedTvlCategories = Object.values(tvlCategoryData).sort((a, b) => b.totalTvl - a.totalTvl);

export const aptosTvlTreemapVisualization: VisualizationItem = {
  id: '4',
  category: 'DeFi',
  title: 'Aptos DeFi TVL Treemap',
  description: 'Aptos 생태계 프로토콜별 TVL(Total Value Locked) 시각화',
  component: 'AptosTvlTreemap',
  thumbnail: '/visualization/tvl-treemap.png',
  content: `Aptos 블록체인의 DeFi 생태계에 예치된 자산(TVL)을 트리맵 형태로 시각화합니다.

**데이터 출처**
DefiLlama의 Aptos 체인 TVL 데이터를 기반으로 합니다.

**주요 카테고리**
- RWA (실물자산): Securitize가 BlackRock BUIDL 펀드로 가장 큰 TVL 보유
- Liquid Staking (리퀴드 스테이킹): Amnis Finance가 선두
- Lending (렌딩): Echelon Market, Aries Markets 등
- Dexs (탈중앙화 거래소): Thala, PancakeSwap, Liquidswap 등

**해석**
트리맵의 각 영역 크기는 해당 프로토콜의 TVL에 비례합니다.
색상으로 성장률을 구분하여 Aptos 생태계의 자금 흐름을 한눈에 파악할 수 있습니다.`
};
