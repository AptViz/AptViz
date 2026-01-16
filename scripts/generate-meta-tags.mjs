import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const visualizations = [
  {
    id: '1',
    title: 'RWA Partnership Ecosystem',
    description: 'Aptos의 Real World Asset 토큰화 파트너십 생태계 지도',
    thumbnail: 'https://www.aptviz.xyz/visualization/RWA.png',
  },
];

const newsItems = [
  {
    id: '1',
    title: 'Bitnomial, 미국 최초 CFTC 규제 Aptos(APT) 선물 출시',
    titleEn: 'Bitnomial Launches First U.S.-Regulated Aptos (APT) Futures',
    description: '시카고 기반 암호화폐 거래소 Bitnomial이 미국 최초로 CFTC 규제를 받는 APT 선물 계약을 출시',
    thumbnail: 'https://www.aptviz.xyz/news/news-1-bitnomial-apt-futures.png',
  },
];

function generateHTML(item, baseHTML, type) {
  let html = baseHTML;
  const urlPath = type === 'visualization' ? `visualization/${item.id}` : `news/${item.id}`;
  const title = item.titleEn ? `${item.title} | ${item.titleEn}` : item.title;

  // og:title 변경
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${title} | AptViz"`
  );

  // og:description 변경
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${item.description}"`
  );

  // og:image 변경
  html = html.replace(
    /<meta property="og:image" content="[^"]*"/,
    `<meta property="og:image" content="${item.thumbnail}"`
  );

  // og:url 변경
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="https://www.aptviz.xyz/${urlPath}"`
  );

  // twitter 태그
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${title} | AptViz"`
  );

  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${item.description}"`
  );

  html = html.replace(
    /<meta name="twitter:image" content="[^"]*"/,
    `<meta name="twitter:image" content="${item.thumbnail}"`
  );

  html = html.replace(
    /<meta name="twitter:url" content="[^"]*"/,
    `<meta name="twitter:url" content="https://www.aptviz.xyz/${urlPath}"`
  );

  // kakao 태그
  html = html.replace(
    /<meta property="kakao:title" content="[^"]*"/,
    `<meta property="kakao:title" content="${title} | AptViz"`
  );

  html = html.replace(
    /<meta property="kakao:description" content="[^"]*"/,
    `<meta property="kakao:description" content="${item.description}"`
  );

  html = html.replace(
    /<meta property="kakao:image" content="[^"]*"/,
    `<meta property="kakao:image" content="${item.thumbnail}"`
  );

  // <title> 태그 변경
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${title} | AptViz</title>`
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

  // Visualization 페이지 생성
  for (const viz of visualizations) {
    const vizDir = path.join(distDir, 'visualization', viz.id);
    const vizIndexPath = path.join(vizDir, 'index.html');

    if (!fs.existsSync(vizDir)) {
      fs.mkdirSync(vizDir, { recursive: true });
    }

    const vizHTML = generateHTML(viz, baseHTML, 'visualization');
    fs.writeFileSync(vizIndexPath, vizHTML, 'utf-8');

    console.log(`✓ Generated ${vizIndexPath}`);
  }

  // News 페이지 생성
  for (const news of newsItems) {
    const newsDir = path.join(distDir, 'news', news.id);
    const newsIndexPath = path.join(newsDir, 'index.html');

    if (!fs.existsSync(newsDir)) {
      fs.mkdirSync(newsDir, { recursive: true });
    }

    const newsHTML = generateHTML(news, baseHTML, 'news');
    fs.writeFileSync(newsIndexPath, newsHTML, 'utf-8');

    console.log(`✓ Generated ${newsIndexPath}`);
  }

  console.log(`\n✓ 모든 페이지에 대한 메타 태그가 생성되었습니다.`);
}

main().catch(console.error);
