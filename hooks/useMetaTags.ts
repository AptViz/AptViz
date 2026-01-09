import { useEffect } from 'react';

interface MetaTagsProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export const useMetaTags = ({ title, description, image, url }: MetaTagsProps) => {
  useEffect(() => {
    // 페이지 제목 업데이트
    document.title = `${title} | AptViz - Aptos Visualizations & Analysis`;

    // 기존 메타 태그 업데이트 또는 생성
    const updateMetaTag = (property: string, content: string, isProperty: boolean = true) => {
      const attribute = isProperty ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, property);
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', content);
    };

    // Open Graph 메타 태그 업데이트
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    if (image) {
      updateMetaTag('og:image', image);
    }
    if (url) {
      updateMetaTag('og:url', url);
    }

    // Twitter 메타 태그 업데이트
    updateMetaTag('twitter:title', title, false);
    updateMetaTag('twitter:description', description, false);
    if (image) {
      updateMetaTag('twitter:image', image, false);
    }

    // 일반 메타 태그 업데이트
    updateMetaTag('description', description, false);

    // 클린업: 컴포넌트 언마운트 시 기본값으로 복원
    return () => {
      document.title = 'AptViz - Aptos Visualizations & Analysis';
      updateMetaTag('og:title', 'AptViz - Aptos Visualizations & Analysis');
      updateMetaTag('og:description', 'Interactive data visualizations and in-depth analysis of the Aptos blockchain ecosystem');
      updateMetaTag('og:image', 'https://www.aptviz.xyz/images/article-thumbnail.png?v=2');
      updateMetaTag('description', 'AptViz - Interactive data visualizations and analysis of the Aptos blockchain ecosystem', false);
    };
  }, [title, description, image, url]);
};
