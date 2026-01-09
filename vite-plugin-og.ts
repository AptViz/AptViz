import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

interface VisualizationItem {
  id: string;
  category: string;
  title: string;
  description: string;
  thumbnail?: string;
}

export default function viteSocialMetaPlugin(): Plugin {
  // Visualization 데이터 정의 (actualdata와 동기화해야 함)
  const visualizations: VisualizationItem[] = [
    {
      id: '1',
      category: 'RWA',
      title: 'RWA Partnership Ecosystem',
      description: 'Aptos의 Real World Asset 토큰화 파트너십 생태계 지도',
      thumbnail: 'https://www.aptviz.xyz/images/RWA.png',
    },
  ];

  return {
    name: 'vite-social-meta',
    apply: 'build',
    async closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexPath = path.join(distDir, 'index.html');

      // 원본 index.html 읽기
      let indexContent = fs.readFileSync(indexPath, 'utf-8');

      for (const viz of visualizations) {
        // 각 visualization별 폴더 생성
        const vizDir = path.join(distDir, 'visualization', viz.id);
        if (!fs.existsSync(vizDir)) {
          fs.mkdirSync(vizDir, { recursive: true });
        }

        // 메타 태그 생성
        let modifiedContent = indexContent;
        
        // og:title 변경
        modifiedContent = modifiedContent.replace(
          /<meta property="og:title" content="[^"]*"/,
          `<meta property="og:title" content="${viz.title} | AptViz - Aptos Visualizations & Analysis"`
        );

        // og:description 변경
        modifiedContent = modifiedContent.replace(
          /<meta property="og:description" content="[^"]*"/,
          `<meta property="og:description" content="${viz.description}"`
        );

        // og:image 변경
        if (viz.thumbnail) {
          modifiedContent = modifiedContent.replace(
            /<meta property="og:image" content="[^"]*"/,
            `<meta property="og:image" content="${viz.thumbnail}"`
          );
        }

        // og:url 변경
        modifiedContent = modifiedContent.replace(
          /<meta property="og:url" content="[^"]*"/,
          `<meta property="og:url" content="https://www.aptviz.xyz/visualization/${viz.id}"`
        );

        // twitter:title 변경
        modifiedContent = modifiedContent.replace(
          /<meta name="twitter:title" content="[^"]*"/,
          `<meta name="twitter:title" content="${viz.title} | AptViz - Aptos Visualizations & Analysis"`
        );

        // twitter:description 변경
        modifiedContent = modifiedContent.replace(
          /<meta name="twitter:description" content="[^"]*"/,
          `<meta name="twitter:description" content="${viz.description}"`
        );

        // twitter:image 변경
        if (viz.thumbnail) {
          modifiedContent = modifiedContent.replace(
            /<meta name="twitter:image" content="[^"]*"/,
            `<meta name="twitter:image" content="${viz.thumbnail}"`
          );
        }

        // kakao:title 변경
        modifiedContent = modifiedContent.replace(
          /<meta property="kakao:title" content="[^"]*"/,
          `<meta property="kakao:title" content="${viz.title} | AptViz - Aptos Visualizations & Analysis"`
        );

        // kakao:description 변경
        modifiedContent = modifiedContent.replace(
          /<meta property="kakao:description" content="[^"]*"/,
          `<meta property="kakao:description" content="${viz.description}"`
        );

        // kakao:image 변경
        if (viz.thumbnail) {
          modifiedContent = modifiedContent.replace(
            /<meta property="kakao:image" content="[^"]*"/,
            `<meta property="kakao:image" content="${viz.thumbnail}"`
          );
        }

        // 변경된 HTML을 visualization/[id]/index.html로 저장
        const outputPath = path.join(vizDir, 'index.html');
        fs.writeFileSync(outputPath, modifiedContent, 'utf-8');
        
        console.log(`✓ Generated meta tags for visualization ${viz.id}`);
      }
    },
  };
}
