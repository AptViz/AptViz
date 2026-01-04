export interface NewsItem {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

export interface MetricData {
  time: string;
  value: number;
}

export enum SectionId {
  HERO = 'hero',
  VISUALIZATION = 'visualization',
  NEWS = 'news',
}