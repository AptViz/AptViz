import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { rwaPartnerCategories, totalRWATvl } from '../../visualizations/rwa-partnerships';
import { PartnerCategory, Partner } from '../../visualizations/types';

// 다국어 텍스트
const TEXTS = {
  ko: {
    totalTvl: 'Total RWA TVL',
    hint: '💡 버블을 클릭하면 상세 정보를 볼 수 있습니다',
    legend1: '노드 크기는 TVL(Total Value Locked)에 비례합니다',
    legend2: '데이터 출처: RWA.xyz, DefiLlama (2026년 1월 기준)',
    tvlLabel: '운용 자산 (TVL)',
    descLabel: '설명',
    tokensLabel: '주요 토큰',
    notePrefix: '📝',
  },
  en: {
    totalTvl: 'Total RWA TVL',
    hint: '💡 Click on bubbles to see details',
    legend1: 'Node size is proportional to TVL (Total Value Locked)',
    legend2: 'Data source: RWA.xyz, DefiLlama (as of Jan 2026)',
    tvlLabel: 'Assets Under Management (TVL)',
    descLabel: 'Description',
    tokensLabel: 'Key Tokens',
    notePrefix: '📝',
  }
};

// 파트너 로고 파일 매핑
const PARTNER_LOGOS: { [key: string]: string } = {
  'BlackRock': '/images/logos/blackrock.png',
  'Franklin Templeton': '/images/logos/franklin-templeton.png',
  'Securitize': '/images/logos/securitize.png',
  'PACT': '/images/logos/pact.png',
  'Ondo Finance': '/images/logos/ondo-finance.png',
  'KAIO': '/images/logos/kaio.png',
  'Anchorage Digital': '/images/logos/anchorage-digital.png',
  'Coinbase Custody': '/images/logos/coinbase.png',
  'Copper': '/images/logos/copper.png',
  'BitGo': '/images/logos/bitgo.png',
  'Tether': '/images/logos/tether.png',
  'Circle': '/images/logos/circle.png',
  'LayerZero': '/images/logos/layerzero.png',
  'Wormhole': '/images/logos/wormhole.png',
  'RWA.xyz': '/images/logos/rwa-xyz.png',
  'Petra': '/images/logos/petra.png',
};

// TVL 포맷팅 함수
const formatTVL = (tvl: number): string => {
  if (tvl >= 1_000_000_000) return `$${(tvl / 1_000_000_000).toFixed(2)}B`;
  if (tvl >= 1_000_000) return `$${(tvl / 1_000_000).toFixed(1)}M`;
  if (tvl >= 1_000) return `$${(tvl / 1_000).toFixed(1)}K`;
  if (tvl === 0) return '-';
  return `$${tvl.toLocaleString()}`;
};

// TVL 기반 노드 크기 계산
const getNodeRadius = (tvl: number, maxTvl: number): number => {
  if (tvl === 0) return 28;
  const minR = 32;
  const maxR = 55;
  const ratio = Math.sqrt(tvl / maxTvl);
  return minR + ratio * (maxR - minR);
};

// 카테고리별 레이아웃
const categoryLayouts: { [key: string]: { cx: number; cy: number; r: number } } = {
  'asset-managers': { cx: 170, cy: 200, r: 140 },
  'rwa-platforms': { cx: 500, cy: 180, r: 180 },
  'infrastructure': { cx: 820, cy: 220, r: 130 },
  'liquidity-bridge': { cx: 160, cy: 480, r: 140 },
  'data-analytics': { cx: 500, cy: 530, r: 90 },
  'other': { cx: 800, cy: 500, r: 80 },
};

// 버블 내 파트너 위치 계산
const getPartnerPositions = (
  partners: Partner[],
  bubbleCx: number,
  bubbleCy: number,
  bubbleR: number,
  maxTvl: number
): { x: number; y: number; r: number; partner: Partner }[] => {
  const positions: { x: number; y: number; r: number; partner: Partner }[] = [];
  const sorted = [...partners].sort((a, b) => b.tvl - a.tvl);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  
  sorted.forEach((partner, i) => {
    const nodeR = getNodeRadius(partner.tvl, maxTvl);
    const angle = i * goldenAngle;
    const dist = Math.sqrt(i + 0.5) * (bubbleR * 0.55) / Math.sqrt(partners.length);
    
    let x = bubbleCx + Math.cos(angle) * dist;
    let y = bubbleCy + Math.sin(angle) * dist;
    
    const maxDist = bubbleR - nodeR * 0.3;
    const currentDist = Math.sqrt((x - bubbleCx) ** 2 + (y - bubbleCy) ** 2);
    if (currentDist > maxDist) {
      const scale = maxDist / currentDist;
      x = bubbleCx + (x - bubbleCx) * scale;
      y = bubbleCy + (y - bubbleCy) * scale;
    }
    
    positions.push({ x, y, r: nodeR, partner });
  });
  
  return positions;
};

// 모달 타입 정의
type ModalType = 
  | { type: 'category'; category: PartnerCategory }
  | { type: 'partner'; partner: Partner; category: PartnerCategory }
  | null;

export const RWAPartnershipChart: React.FC = () => {
  const [modal, setModal] = useState<ModalType>(null);
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const t = TEXTS[lang];
  
  const maxTvl = useMemo(() => {
    return Math.max(...rwaPartnerCategories.flatMap(cat => cat.partners.map(p => p.tvl)));
  }, []);

  const viewBox = { width: 1000, height: 680 };
  const center = { x: 500, y: 360 };

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (category: PartnerCategory, e: React.MouseEvent) => {
    e.stopPropagation();
    setModal({ type: 'category', category });
  };

  // 파트너 클릭 핸들러
  const handlePartnerClick = (partner: Partner, category: PartnerCategory, e: React.MouseEvent) => {
    e.stopPropagation();
    setModal({ type: 'partner', partner, category });
  };

  return (
    <div className="w-full">
      {/* 총 TVL 헤더 */}
      <div className="bg-gradient-to-r from-teal-50 to-indigo-50 rounded-lg p-6 mb-6 border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-sm font-bold tracking-widest uppercase text-gray-500">
                {t.totalTvl}
              </h3>
              {/* 언어 토글 */}
              <div className="flex items-center bg-gray-100 rounded-full p-0.5">
                <button
                  onClick={() => setLang('ko')}
                  className={`px-2 py-0.5 text-xs font-medium rounded-full transition-all ${
                    lang === 'ko' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  KO
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-2 py-0.5 text-xs font-medium rounded-full transition-all ${
                    lang === 'en' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
            <p className="font-serif text-4xl md:text-5xl text-journal-black">
              {formatTVL(totalRWATvl)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {rwaPartnerCategories.slice(0, 5).map((cat) => (
              <button 
                key={cat.id}
                onClick={(e) => handleCategoryClick(cat, e)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-xs font-medium text-gray-700">
                  {lang === 'ko' ? cat.titleKo : cat.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 안내 문구 */}
      <p className="text-sm text-gray-500 text-center mb-4">
        {t.hint}
      </p>

      {/* 메인 버블 시각화 */}
      <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-xl border border-gray-200" style={{ overflow: 'visible' }}>
        <svg 
          viewBox={`0 0 ${viewBox.width} ${viewBox.height}`} 
          className="w-full h-auto"
          style={{ minHeight: '600px' }}
        >
          <defs>
            {rwaPartnerCategories.map((cat) => (
              <radialGradient key={`grad-${cat.id}`} id={`grad-${cat.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={cat.color} stopOpacity="0.12" />
                <stop offset="70%" stopColor={cat.color} stopOpacity="0.06" />
                <stop offset="100%" stopColor={cat.color} stopOpacity="0.02" />
              </radialGradient>
            ))}
            
            <filter id="nodeShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
            </filter>
            
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* 중앙 장식 */}
          <circle cx={center.x} cy={center.y} r="75" fill="none" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.3" />

          {/* 연결선 */}
          {rwaPartnerCategories.map((category) => {
            const layout = categoryLayouts[category.id];
            if (!layout) return null;
            return (
              <motion.line
                key={`line-${category.id}`}
                x1={center.x}
                y1={center.y}
                x2={layout.cx}
                y2={layout.cy}
                stroke={category.color}
                strokeWidth="1"
                strokeDasharray="3,3"
                opacity="0.25"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            );
          })}

          {/* 카테고리 버블들 */}
          {rwaPartnerCategories.map((category, catIndex) => {
            const layout = categoryLayouts[category.id] || { cx: center.x, cy: center.y, r: 100 };
            const partnerPositions = getPartnerPositions(
              category.partners,
              layout.cx,
              layout.cy,
              layout.r,
              maxTvl
            );
            
            return (
              <g key={category.id}>
                {/* 카테고리 버블 배경 (클릭 가능) */}
                <motion.circle
                  cx={layout.cx}
                  cy={layout.cy}
                  r={layout.r}
                  fill={`url(#grad-${category.id})`}
                  stroke={category.color}
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: catIndex * 0.1, duration: 0.6, ease: "easeOut" }}
                  onClick={(e) => handleCategoryClick(category, e as any)}
                  style={{ cursor: 'pointer' }}
                  className="hover:stroke-opacity-80"
                />
                
                {/* 카테고리 레이블 */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: catIndex * 0.1 + 0.3 }}
                  onClick={(e) => handleCategoryClick(category, e as any)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* 레이블 배경 */}
                  <rect
                    x={layout.cx - (layout.r > 100 ? 70 : 55)}
                    y={layout.cy - layout.r + 6}
                    width={layout.r > 100 ? 140 : 110}
                    height={layout.r > 100 ? 38 : 32}
                    rx={6}
                    fill="white"
                    fillOpacity={0.92}
                    filter="url(#nodeShadow)"
                  />
                  <text
                    x={layout.cx}
                    y={layout.cy - layout.r + 20}
                    textAnchor="middle"
                    fontSize={layout.r > 100 ? "13" : "11"}
                    fontWeight="bold"
                    fill={category.color}
                  >
                    {lang === 'ko' ? category.titleKo : category.title}
                  </text>
                  <text
                    x={layout.cx}
                    y={layout.cy - layout.r + (layout.r > 100 ? 35 : 32)}
                    textAnchor="middle"
                    fontSize={layout.r > 100 ? "10" : "8"}
                    fill="#9ca3af"
                  >
                    {lang === 'ko' ? category.title : ''}
                  </text>
                </motion.g>

                {/* 파트너 노드들 */}
                {partnerPositions.map(({ x, y, r, partner }, partnerIndex) => {
                  const logoUrl = PARTNER_LOGOS[partner.name];
                  const logoSize = r * 1.5;
                  
                  return (
                    <motion.g
                      key={`${category.id}-${partner.name}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        delay: catIndex * 0.1 + partnerIndex * 0.04 + 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }}
                      onClick={(e) => handlePartnerClick(partner, category, e as any)}
                      style={{ cursor: 'pointer' }}
                      className="hover:opacity-90"
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={r}
                        fill="white"
                        stroke={category.color}
                        strokeWidth={2}
                        filter="url(#nodeShadow)"
                        className="transition-all duration-200 hover:stroke-[3px]"
                      />
                      
                      <defs>
                        <clipPath id={`clip-${category.id}-${partner.name.replace(/\s+/g, '-')}`}>
                          <circle cx={x} cy={y} r={r - 3} />
                        </clipPath>
                      </defs>
                      
                      <image
                        href={logoUrl}
                        x={x - logoSize / 2}
                        y={y - logoSize / 2}
                        width={logoSize}
                        height={logoSize}
                        clipPath={`url(#clip-${category.id}-${partner.name.replace(/\s+/g, '-')})`}
                        className="pointer-events-none"
                        preserveAspectRatio="xMidYMid meet"
                      />
                      
                      {partner.tvl > 0 && r > 35 && (
                        <g className="pointer-events-none">
                          <rect
                            x={x - 28}
                            y={y + r - 10}
                            width={56}
                            height={16}
                            rx={8}
                            fill="white"
                            stroke={category.color}
                            strokeWidth={1.5}
                            opacity={0.95}
                          />
                          <text
                            x={x}
                            y={y + r + 2}
                            textAnchor="middle"
                            fontSize="9"
                            fontWeight="600"
                            fill="#374151"
                          >
                            {formatTVL(partner.tvl)}
                          </text>
                        </g>
                      )}
                    </motion.g>
                  );
                })}
              </g>
            );
          })}

          {/* 중앙 APT 로고 */}
          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.5 }}
          >
            <circle 
              cx={center.x} 
              cy={center.y} 
              r="58" 
              fill="white" 
              stroke="#0d9488" 
              strokeWidth="3"
              filter="url(#glow)"
            />
            
            {/* 클리핑 마스크 */}
            <defs>
              <clipPath id="clip-aptos-center">
                <circle cx={center.x} cy={center.y} r="54" />
              </clipPath>
            </defs>
            
            {/* 앱토스 로고 이미지 */}
            <image
              href="/images/logos/aptos.png"
              x={center.x - 50}
              y={center.y - 50}
              width={100}
              height={100}
              clipPath="url(#clip-aptos-center)"
              preserveAspectRatio="xMidYMid meet"
            />
          </motion.g>
        </svg>
      </div>

      {/* 범례 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <ul className="text-xs text-gray-500 space-y-1">
          <li>• {t.legend1}</li>
          <li>• {t.legend2}</li>
        </ul>
      </div>

      {/* 모달 */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 카테고리 모달 */}
              {modal.type === 'category' && (
                <div>
                  <div 
                    className="p-6 border-b"
                    style={{ backgroundColor: modal.category.color + '10' }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: modal.category.color }}
                        />
                        <div>
                          <h2 className="font-serif text-xl font-bold text-gray-900">
                            {lang === 'ko' ? modal.category.titleKo : modal.category.title}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {lang === 'ko' ? modal.category.title : ''}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setModal(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">{modal.category.description}</p>
                    <p className="font-mono text-2xl font-bold mt-3" style={{ color: modal.category.color }}>
                      {formatTVL(modal.category.partners.reduce((sum, p) => sum + p.tvl, 0))}
                    </p>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    {modal.category.partners.map((partner) => (
                      <button
                        key={partner.name}
                        onClick={() => setModal({ type: 'partner', partner, category: modal.category })}
                        className="w-full p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all bg-gray-50/50 text-left"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <img 
                              src={PARTNER_LOGOS[partner.name]} 
                              alt={partner.name}
                              className="w-10 h-10 rounded-full object-contain bg-white border border-gray-200"
                            />
                            <div>
                              <h4 className="font-bold text-gray-900">{partner.name}</h4>
                              <p className="text-xs text-gray-500">
                                {lang === 'ko' ? partner.nameKo : ''}
                              </p>
                            </div>
                          </div>
                          {partner.tvl > 0 && (
                            <span 
                              className="font-mono text-sm font-bold"
                              style={{ color: modal.category.color }}
                            >
                              {formatTVL(partner.tvl)}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 파트너 모달 */}
              {modal.type === 'partner' && (
                <div>
                  <div 
                    className="p-6 border-b"
                    style={{ backgroundColor: modal.category.color + '10' }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => setModal({ type: 'category', category: modal.category })}
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {lang === 'ko' ? modal.category.titleKo : modal.category.title}
                      </button>
                      <button
                        onClick={() => setModal(null)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <img 
                        src={PARTNER_LOGOS[modal.partner.name]} 
                        alt={modal.partner.name}
                        className="w-16 h-16 rounded-xl object-contain bg-white border border-gray-200 p-2"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-serif text-2xl font-bold text-gray-900">
                            {lang === 'ko' ? modal.partner.nameKo : modal.partner.name}
                          </h2>
                          {modal.partner.url && (
                            <a 
                              href={modal.partner.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                              title={modal.partner.url}
                            >
                              <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                              </svg>
                            </a>
                          )}
                        </div>
                        <p className="text-gray-500">
                          {lang === 'ko' ? modal.partner.name : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-5">
                    {/* TVL */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                        {lang === 'ko' ? '운용 자산 (TVL)' : 'Total Value Locked (TVL)'}
                      </h4>
                      <p className="font-mono text-3xl font-bold" style={{ color: modal.category.color }}>
                        {modal.partner.tvl > 0 ? formatTVL(modal.partner.tvl) : 'N/A'}
                      </p>
                    </div>
                    
                    {/* 설명 */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                        {lang === 'ko' ? '설명' : 'Description'}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {modal.partner.description}
                      </p>
                    </div>
                    
                    {/* 토큰 */}
                    {modal.partner.tokens.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                          {lang === 'ko' ? '주요 토큰' : 'Main Tokens'}
                        </h4>
                        <div className="flex gap-2 flex-wrap">
                          {modal.partner.tokens.map((token) => (
                            <span 
                              key={token}
                              className="px-3 py-1.5 rounded-full text-sm font-mono font-medium"
                              style={{ 
                                backgroundColor: modal.category.color + '20',
                                color: modal.category.color 
                              }}
                            >
                              {token}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* 비고 */}
                    {modal.partner.note && (
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500 italic">
                          📝 {modal.partner.note}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
