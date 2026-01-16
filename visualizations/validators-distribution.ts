import { VisualizationItem } from './types';

// Aptos Validator 지역별 분포 데이터
// 데이터 출처:
// - Aptos Explorer: https://explorer.aptoslabs.com/validators/all?network=mainnet
// - 참고 기준일: 2026년 1월
// - 총 128개 validators, 19개국 분포

export interface ValidatorRegion {
  id: string;
  name: string;
  nameKo: string;
  lat: number;
  lng: number;
  count: number;
  percentage: number;
  color: string;
}

export const validatorRegions: ValidatorRegion[] = [
  // 북미 (36개, 28.1%)
  { id: 'usa', name: 'United States', nameKo: '미국', lat: 39.8283, lng: -98.5795, count: 27, percentage: 21.1, color: '#0d9488' },
  { id: 'canada', name: 'Canada', nameKo: '캐나다', lat: 56.1304, lng: -106.3468, count: 9, percentage: 7.0, color: '#0d9488' },

  // 유럽 (87개, 68.0%)
  { id: 'germany', name: 'Germany', nameKo: '독일', lat: 51.1657, lng: 10.4515, count: 23, percentage: 18.0, color: '#6366f1' },
  { id: 'ireland', name: 'Ireland', nameKo: '아일랜드', lat: 53.1424, lng: -7.6921, count: 13, percentage: 10.2, color: '#6366f1' },
  { id: 'netherlands', name: 'Netherlands', nameKo: '네덜란드', lat: 52.1326, lng: 5.2913, count: 13, percentage: 10.2, color: '#6366f1' },
  { id: 'france', name: 'France', nameKo: '프랑스', lat: 46.2276, lng: 2.2137, count: 12, percentage: 9.4, color: '#6366f1' },
  { id: 'uk', name: 'United Kingdom', nameKo: '영국', lat: 55.3781, lng: -3.4360, count: 7, percentage: 5.5, color: '#6366f1' },
  { id: 'finland', name: 'Finland', nameKo: '핀란드', lat: 61.9241, lng: 25.7482, count: 5, percentage: 3.9, color: '#6366f1' },
  { id: 'poland', name: 'Poland', nameKo: '폴란드', lat: 51.9194, lng: 19.1451, count: 5, percentage: 3.9, color: '#6366f1' },
  { id: 'belgium', name: 'Belgium', nameKo: '벨기에', lat: 50.5039, lng: 4.4699, count: 2, percentage: 1.6, color: '#6366f1' },
  { id: 'switzerland', name: 'Switzerland', nameKo: '스위스', lat: 46.8182, lng: 8.2275, count: 2, percentage: 1.6, color: '#6366f1' },
  { id: 'sweden', name: 'Sweden', nameKo: '스웨덴', lat: 60.1282, lng: 18.6435, count: 2, percentage: 1.6, color: '#6366f1' },
  { id: 'czechia', name: 'Czechia', nameKo: '체코', lat: 49.8175, lng: 15.4730, count: 1, percentage: 0.8, color: '#6366f1' },
  { id: 'austria', name: 'Austria', nameKo: '오스트리아', lat: 47.5162, lng: 14.5501, count: 1, percentage: 0.8, color: '#6366f1' },
  { id: 'lithuania', name: 'Lithuania', nameKo: '리투아니아', lat: 55.1694, lng: 23.8813, count: 1, percentage: 0.8, color: '#6366f1' },

  // 아시아 (3개, 2.3%)
  { id: 'japan', name: 'Japan', nameKo: '일본', lat: 36.2048, lng: 138.2529, count: 2, percentage: 1.6, color: '#f59e0b' },
  { id: 'singapore', name: 'Singapore', nameKo: '싱가포르', lat: 1.3521, lng: 103.8198, count: 1, percentage: 0.8, color: '#f59e0b' },

  // 남미 (2개, 1.6%)
  { id: 'brazil', name: 'Brazil', nameKo: '브라질', lat: -14.2350, lng: -51.9253, count: 1, percentage: 0.8, color: '#8b5cf6' },
  { id: 'argentina', name: 'Argentina', nameKo: '아르헨티나', lat: -38.4161, lng: -63.6167, count: 1, percentage: 0.8, color: '#8b5cf6' },
];

// 대륙별 통계
export const continentStats = [
  { name: 'Europe', nameKo: '유럽', count: 87, percentage: 68.0, color: '#6366f1' },
  { name: 'North America', nameKo: '북미', count: 36, percentage: 28.1, color: '#0d9488' },
  { name: 'Asia', nameKo: '아시아', count: 3, percentage: 2.3, color: '#f59e0b' },
  { name: 'South America', nameKo: '남미', count: 2, percentage: 1.6, color: '#8b5cf6' },
];

// Validator 간 연결 (arc) 데이터 - 주요 연결만 표시
export interface ValidatorConnection {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
}

export const validatorConnections: ValidatorConnection[] = [
  // Germany <-> USA
  { startLat: 51.1657, startLng: 10.4515, endLat: 39.8283, endLng: -98.5795, color: '#6366f1' },
  // Ireland <-> USA
  { startLat: 53.1424, startLng: -7.6921, endLat: 39.8283, endLng: -98.5795, color: '#6366f1' },
  // Netherlands <-> Germany
  { startLat: 52.1326, startLng: 5.2913, endLat: 51.1657, endLng: 10.4515, color: '#6366f1' },
  // France <-> UK
  { startLat: 46.2276, startLng: 2.2137, endLat: 55.3781, endLng: -3.4360, color: '#6366f1' },
  // USA <-> Canada
  { startLat: 39.8283, startLng: -98.5795, endLat: 56.1304, endLng: -106.3468, color: '#0d9488' },
  // Germany <-> Japan
  { startLat: 51.1657, startLng: 10.4515, endLat: 36.2048, endLng: 138.2529, color: '#f59e0b' },
  // Finland <-> Poland
  { startLat: 61.9241, startLng: 25.7482, endLat: 51.9194, endLng: 19.1451, color: '#6366f1' },
  // USA <-> Brazil
  { startLat: 39.8283, startLng: -98.5795, endLat: -14.2350, endLng: -51.9253, color: '#8b5cf6' },
];

// 총 Validator 수
export const totalValidators = 128;

// 국가 수
export const totalCountries = validatorRegions.length;

export const validatorsDistributionVisualization: VisualizationItem = {
  id: '2',
  category: 'Network',
  title: 'Active Validators Global Distribution',
  description: `${totalValidators}개 Aptos Validator 노드의 전세계 분포를 3D 지구본으로 시각화`,
  component: 'ValidatorsGlobeChart',
  thumbnail: '/images/validators-globe.png',
  content: `Aptos 네트워크는 전세계 ${totalCountries}개국에 걸쳐 ${totalValidators}개의 활성 Validator를 운영하고 있습니다. 이러한 지리적 분산은 네트워크의 탈중앙화와 복원력을 보장합니다.

**지역별 분포**
유럽이 68%로 압도적인 비중을 차지합니다. 독일(23개), 아일랜드(13개), 네덜란드(13개), 프랑스(12개) 등이 주요 거점입니다. 북미(미국 27개, 캐나다 9개)가 28%로 두 번째입니다.

**블록 전파**
Validator 노드들은 Block-STM 병렬 실행 엔진을 통해 높은 처리량을 유지하면서 전세계에 블록을 전파합니다. 지구본 위의 arc 애니메이션은 노드 간 블록 전파를 시각적으로 보여줍니다.

**인프라 파트너**
주요 클라우드 제공업체(AWS, GCP, Azure)와 전문 노드 운영사들이 Validator 인프라를 지원하며, 이는 엔터프라이즈급 안정성을 보장합니다.`
};
