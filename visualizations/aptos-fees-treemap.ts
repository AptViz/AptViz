import { VisualizationItem } from './types';

// 앱 데이터 타입 정의
export interface AppData {
  name: string;
  nameKo?: string;
  category: string;
  categoryKo: string;
  fees30d: number; // 30일 기준 Fees (USD)
  change1m?: number; // 1개월 변화율 (%)
  revenue30d?: number; // 30일 기준 Revenue (USD)
  color?: string;
}

// 카테고리 색상 매핑
export const categoryColors: Record<string, string> = {
  'SoFi': '#dc2626', // red
  'Lending': '#ea580c', // orange
  'Dexs': '#16a34a', // green
  'Physical TCG': '#ca8a04', // yellow
  'Derivatives': '#0891b2', // cyan
  'RWA': '#7c3aed', // violet
  'Leveraged Farming': '#db2777', // pink
  'Services': '#4f46e5', // indigo
  'Liquid Staking': '#0d9488', // teal
  'Luck Games': '#9333ea', // purple
  'Yield Aggregator': '#2563eb', // blue
  'Other': '#64748b', // slate
};

// DefiLlama Aptos 데이터 (2026년 1월 기준, 30일 Fees)
export const aptosAppsData: AppData[] = [
  // SoFi
  {
    name: 'KGeN',
    category: 'SoFi',
    categoryKo: '소셜 파이낸스',
    fees30d: 2390000,
    revenue30d: 2390000,
  },
  // RWA
  {
    name: 'Securitize',
    category: 'RWA',
    categoryKo: '실물자산',
    fees30d: 904242,
    change1m: 0.19,
    revenue30d: 48582,
  },
  // Lending
  {
    name: 'Echelon Market',
    category: 'Lending',
    categoryKo: '렌딩',
    fees30d: 431408,
    change1m: -8.70,
    revenue30d: 118572,
  },
  {
    name: 'Aries Markets',
    category: 'Lending',
    categoryKo: '렌딩',
    fees30d: 20027,
    change1m: -19.44,
    revenue30d: 4008,
  },
  {
    name: 'Meso Finance',
    category: 'Lending',
    categoryKo: '렌딩',
    fees30d: 612,
    change1m: -28.41,
    revenue30d: 228,
  },
  // Dexs
  {
    name: 'Hyperion',
    category: 'Dexs',
    categoryKo: '탈중앙화 거래소',
    fees30d: 252336,
    change1m: -2.31,
    revenue30d: 50467,
  },
  {
    name: 'PancakeSwap',
    category: 'Dexs',
    categoryKo: '탈중앙화 거래소',
    fees30d: 242158,
    change1m: -1.73,
    revenue30d: 77489,
  },
  {
    name: 'Tapp Exchange',
    category: 'Dexs',
    categoryKo: '탈중앙화 거래소',
    fees30d: 30324,
    revenue30d: 10009,
  },
  {
    name: 'Cellana Finance',
    category: 'Dexs',
    categoryKo: '탈중앙화 거래소',
    fees30d: 835,
    change1m: 16.46,
    revenue30d: 835,
  },
  {
    name: 'Earnium',
    category: 'Dexs',
    categoryKo: '탈중앙화 거래소',
    fees30d: 404,
    change1m: -23.04,
    revenue30d: 0,
  },
  // Liquid Staking
  {
    name: 'Amnis Finance',
    category: 'Liquid Staking',
    categoryKo: '리퀴드 스테이킹',
    fees30d: 80904,
    change1m: -5.79,
    revenue30d: 5664,
  },
  {
    name: 'Kofi Finance',
    category: 'Liquid Staking',
    categoryKo: '리퀴드 스테이킹',
    fees30d: 1583,
    change1m: 4.56,
    revenue30d: 159,
  },
  // Physical TCG
  {
    name: 'Collex',
    category: 'Physical TCG',
    categoryKo: '피지컬 TCG',
    fees30d: 68751,
    change1m: -5.31,
    revenue30d: 68751,
  },
  // Other categories
  {
    name: 'Thala',
    category: 'Other',
    categoryKo: '기타',
    fees30d: 65637,
    revenue30d: 32288,
  },
  {
    name: 'Merkle Trade',
    category: 'Derivatives',
    categoryKo: '파생상품',
    fees30d: 52017,
    change1m: 0.49,
    revenue30d: 52017,
  },
  {
    name: 'Moar Market',
    category: 'Leveraged Farming',
    categoryKo: '레버리지 파밍',
    fees30d: 50278,
    change1m: 37.51,
    revenue30d: 14315,
  },
  {
    name: 'Echo Protocol',
    category: 'Other',
    categoryKo: '기타',
    fees30d: 22420,
    change1m: -2.69,
    revenue30d: 3220,
  },
  {
    name: 'Santa Browser',
    category: 'Services',
    categoryKo: '서비스',
    fees30d: 14272,
    revenue30d: 14272,
  },
  {
    name: 'Xyra Labs',
    category: 'Other',
    categoryKo: '기타',
    fees30d: 5683,
    revenue30d: 5683,
  },
  {
    name: 'Ondo Finance',
    category: 'RWA',
    categoryKo: '실물자산',
    fees30d: 5164,
    change1m: 1400,
    revenue30d: 0,
  },
  {
    name: 'MoneyFi',
    category: 'Yield Aggregator',
    categoryKo: '일드 애그리게이터',
    fees30d: 2471,
    change1m: -10.86,
    revenue30d: 495,
  },
  {
    name: 'Kaching',
    category: 'Luck Games',
    categoryKo: '럭 게임',
    fees30d: 2194,
    change1m: -0.68,
    revenue30d: 2194,
  },
];

// 총 Fees 계산
export const totalFees30d = aptosAppsData.reduce((sum, app) => sum + app.fees30d, 0);

// 카테고리별 그룹화 및 합계 계산
export const categoryData = aptosAppsData.reduce((acc, app) => {
  if (!acc[app.category]) {
    acc[app.category] = {
      category: app.category,
      categoryKo: app.categoryKo,
      totalFees: 0,
      apps: [],
      color: categoryColors[app.category] || '#64748b',
    };
  }
  acc[app.category].totalFees += app.fees30d;
  acc[app.category].apps.push(app);
  return acc;
}, {} as Record<string, { category: string; categoryKo: string; totalFees: number; apps: AppData[]; color: string }>);

// 카테고리를 Fees 순으로 정렬
export const sortedCategories = Object.values(categoryData).sort((a, b) => b.totalFees - a.totalFees);

export const aptosFeesTreemapVisualization: VisualizationItem = {
  id: '3',
  category: 'DeFi',
  title: 'Aptos DeFi Ecosystem Treemap',
  description: 'Aptos 생태계의 Fees / TVL 트리맵 시각화',
  component: 'AptosFeesTreemap',
  thumbnail: '/visualization/fees-treemap.png',
  content: `Aptos 블록체인의 DeFi 생태계를 트리맵 형태로 시각화합니다. Fees와 TVL 두 가지 뷰를 토글로 전환할 수 있습니다.

**데이터 출처**
DefiLlama의 Aptos 체인 데이터를 기반으로 합니다.

**주요 카테고리**
- SoFi (소셜 파이낸스): KGeN이 높은 수수료 매출 기록
- RWA (실물자산): Securitize가 BlackRock BUIDL 펀드 운용
- Lending (렌딩): Echelon Market, Aries Markets
- Dexs (탈중앙화 거래소): Thala, PancakeSwap, Hyperion
- Liquid Staking (리퀴드 스테이킹): Amnis Finance

**해석**
트리맵의 각 영역 크기는 해당 앱의 Fees 또는 TVL에 비례합니다.
색상은 카테고리별로 구분되어 있습니다.`
};
