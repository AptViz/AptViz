export interface VisualizationItem {
  id: string;
  category: string;
  title: string;
  description: string;
  content: string;
  component?: string; // 커스텀 시각화 컴포넌트 이름
}

export interface Partner {
  name: string;
  nameKo: string;
  description: string;
  logo?: string;
  tokens: string[];
  tvl: number;
  note: string;
  url?: string;
}

export interface PartnerCategory {
  id: string;
  title: string;
  titleKo: string;
  description: string;
  color: string;
  partners: Partner[];
}
