import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const visualizations = [
  {
    id: '1',
    title: 'RWA Partnership Ecosystem',
    description: 'Aptos의 Real World Asset 토큰화 파트너십 생태계 지도',
    thumbnail: 'https://www.aptviz.xyz/images/RWA.png',
  },
];

function generateHTML(viz, baseHTML) {
  let html = baseHTML;

  // og:title 변경
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${viz.title} | AptViz - Aptos Visualizations & Analysis"`
  );

  // og:description 변경
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${viz.description}"`
  );

  // og:image 변경
  html = html.replace(
    /<meta property="og:image" content="[^"]*"/,
    `<meta property="og:image" content="${viz.thumbnail}"`
  );

  // og:url 변경
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="https://www.aptviz.xyz/visualization/${viz.id}"`
  );

  // twitter 태그
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${viz.title} | AptViz - Aptos Visualizations & Analysis"`
  );

  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${viz.description}"`
  );

  html = html.replace(
    /<meta name="twitter:image" content="[^"]*"/,
    `<meta name="twitter:image" content="${viz.thumbnail}"`
  );

  // kakao 태그
  html = html.replace(
    /<meta property="kakao:title" content="[^"]*"/,
    `<meta property="kakao:title" content="${viz.title} | AptViz - Aptos Visualizations & Analysis"`
  );

  html = html.replace(
    /<meta property="kakao:description" content="[^"]*"/,
    `<meta property="kakao:description" content="${viz.description}"`
  );

  html = html.replace(
    /<meta property="kakao:image" content="[^"]*"/,
    `<meta property="kakao:image" content="${viz.thumbnail}"`
  );

  return html;
}

async function main() {
  const distDir = path.join(__dirname, '..', 'dist');
  const indexPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexPath)) {
    console.error('dist/index.html을 찾을 수 없습니다. npm run build를 먼저 실행하세요.');
    process.exit(1);
  }

  const baseHTML = fs.readFileSync(indexPath, 'utf-8');

  for (const viz of visualizations) {
    const vizDir = path.join(distDir, 'visualization', viz.id);
    const vizIndexPath = path.join(vizDir, 'index.html');

    // 디렉토리 생성
    if (!fs.existsSync(vizDir)) {
      fs.mkdirSync(vizDir, { recursive: true });
    }

    // HTML 생성 및 저장
    const vizHTML = generateHTML(viz, baseHTML);
    fs.writeFileSync(vizIndexPath, vizHTML, 'utf-8');

    console.log(`✓ Generated ${vizIndexPath}`);
  }

  console.log(`\n✓ 모든 visualization 페이지에 대한 메타 태그가 생성되었습니다.`);
}

main().catch(console.error);
