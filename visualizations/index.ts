import { VisualizationItem } from './types';
import { rwaPartnershipsVisualization, rwaPartnerCategories, totalRWATvl } from './rwa-partnerships';
import { validatorsDistributionVisualization, validatorRegions, totalValidators, totalCountries } from './validators-distribution';

// 모든 시각화 항목들을 여기서 export
// 새로운 시각화를 추가하려면:
// 1. visualizations/ 폴더에 새 파일 생성 (예: new-visualization.ts)
// 2. VisualizationItem 타입으로 데이터 정의
// 3. 여기서 import 후 visualizationItems 배열에 추가

export const visualizationItems: VisualizationItem[] = [
  rwaPartnershipsVisualization,
  validatorsDistributionVisualization,
];

// 개별 데이터도 export (컴포넌트에서 직접 사용 가능)
export { rwaPartnerCategories, totalRWATvl };
export { validatorRegions, totalValidators, totalCountries };
export * from './types';
