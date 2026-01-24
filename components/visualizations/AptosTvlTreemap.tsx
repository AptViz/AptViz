import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  aptosTvlData,
  totalAptosTvl,
  sortedTvlCategories,
  tvlCategoryColors,
  TvlAppData
} from '../../visualizations/aptos-tvl-treemap';

// 다국어 텍스트
const TEXTS = {
  ko: {
    totalTvl: '총 TVL (Total Value Locked)',
    hint: '각 영역을 클릭하면 상세 정보를 볼 수 있습니다',
    legend: '데이터 출처: DefiLlama (2026년 1월 기준)',
    tvlLabel: 'TVL',
    change1mLabel: '1개월 변화',
    change7dLabel: '7일 변화',
    categoryLabel: '카테고리',
  },
  en: {
    totalTvl: 'Total TVL (Total Value Locked)',
    hint: 'Click on each area to see details',
    legend: 'Data source: DefiLlama (as of Jan 2026)',
    tvlLabel: 'TVL',
    change1mLabel: '1m Change',
    change7dLabel: '7d Change',
    categoryLabel: 'Category',
  }
};

// 금액 포맷팅
const formatValue = (value: number): string => {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toLocaleString()}`;
};

// 변화율 포맷팅
const formatChange = (change: number | undefined): string => {
  if (change === undefined) return '';
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
};

// 트리맵 노드 타입
interface TreemapNode {
  id: string;
  name: string;
  nameKo?: string;
  value: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  category: string;
  categoryKo: string;
  app?: TvlAppData;
  change1m?: number;
}

// Squarify 알고리즘
const squarify = (
  items: { id: string; value: number; color: string; name: string; nameKo?: string; category: string; categoryKo: string; app?: TvlAppData; change1m?: number }[],
  x: number,
  y: number,
  width: number,
  height: number
): TreemapNode[] => {
  if (items.length === 0) return [];

  const total = items.reduce((sum, item) => sum + item.value, 0);
  const result: TreemapNode[] = [];

  if (items.length === 1) {
    return [{
      ...items[0],
      x,
      y,
      width,
      height,
    }];
  }

  const sorted = [...items].sort((a, b) => b.value - a.value);
  const isHorizontal = width >= height;
  const mainSize = isHorizontal ? width : height;
  const crossSize = isHorizontal ? height : width;

  let row: typeof items = [];
  let rowTotal = 0;
  let rowWidth = 0;

  for (const item of sorted) {
    const testRow = [...row, item];
    const testTotal = rowTotal + item.value;
    const testWidth = (testTotal / total) * mainSize;

    const currentWorst = row.length > 0 ? getWorstRatio(row, rowTotal, total, mainSize, crossSize) : Infinity;
    const newWorst = getWorstRatio(testRow, testTotal, total, mainSize, crossSize);

    if (row.length === 0 || newWorst <= currentWorst) {
      row = testRow;
      rowTotal = testTotal;
      rowWidth = testWidth;
    } else {
      break;
    }
  }

  let offset = 0;
  for (const item of row) {
    const itemSize = (item.value / rowTotal) * crossSize;

    if (isHorizontal) {
      result.push({
        ...item,
        x,
        y: y + offset,
        width: rowWidth,
        height: itemSize,
      });
    } else {
      result.push({
        ...item,
        x: x + offset,
        y,
        width: itemSize,
        height: rowWidth,
      });
    }
    offset += itemSize;
  }

  const remaining = sorted.filter(item => !row.includes(item));
  if (remaining.length > 0) {
    if (isHorizontal) {
      result.push(...squarify(remaining, x + rowWidth, y, width - rowWidth, height));
    } else {
      result.push(...squarify(remaining, x, y + rowWidth, width, height - rowWidth));
    }
  }

  return result;
};

const getWorstRatio = (
  row: { value: number }[],
  rowTotal: number,
  total: number,
  mainSize: number,
  crossSize: number
): number => {
  const rowWidth = (rowTotal / total) * mainSize;
  let worst = 0;

  for (const item of row) {
    const itemHeight = (item.value / rowTotal) * crossSize;
    const ratio = rowWidth > itemHeight ? rowWidth / itemHeight : itemHeight / rowWidth;
    worst = Math.max(worst, ratio);
  }

  return worst;
};

type ModalType = { type: 'app'; app: TvlAppData } | null;

export const AptosTvlTreemap: React.FC = () => {
  const [modal, setModal] = useState<ModalType>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const t = TEXTS[lang];

  const viewBox = { width: 1000, height: 600 };

  // 앱별 트리맵 노드 생성
  const appNodes = useMemo(() => {
    const items = aptosTvlData.map(app => ({
      id: app.name,
      value: app.tvl,
      color: tvlCategoryColors[app.category] || '#64748b',
      name: app.name,
      nameKo: app.nameKo,
      category: app.category,
      categoryKo: app.categoryKo,
      app,
      change1m: app.change1m,
    }));

    return squarify(items, 0, 0, viewBox.width, viewBox.height);
  }, []);

  const handleAppClick = (node: TreemapNode, e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.app) {
      setModal({ type: 'app', app: node.app });
    }
  };

  const getFontSize = (width: number, height: number, text: string): number => {
    const minDim = Math.min(width, height);
    const textLength = text.length;
    const baseSize = minDim / 3.5;
    const adjusted = Math.min(baseSize, (width * 0.85) / (textLength * 0.55));
    return Math.max(9, Math.min(adjusted, 18));
  };

  const shouldShowText = (width: number, height: number): boolean => {
    return width > 45 && height > 28;
  };

  const shouldShowChange = (width: number, height: number): boolean => {
    return width > 55 && height > 40;
  };

  return (
    <div className="w-full">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-slate-800 to-gray-900 rounded-lg p-6 mb-6 border border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400">
                {t.totalTvl}
              </h3>
              <div className="flex items-center bg-gray-700 rounded-full p-0.5">
                <button
                  onClick={() => setLang('ko')}
                  className={`px-2 py-0.5 text-xs font-medium rounded-full transition-all ${
                    lang === 'ko'
                      ? 'bg-white text-gray-900'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  KO
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-2 py-0.5 text-xs font-medium rounded-full transition-all ${
                    lang === 'en'
                      ? 'bg-white text-gray-900'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
            <p className="font-mono text-4xl md:text-5xl text-white font-bold">
              {formatValue(totalAptosTvl)}
            </p>
          </div>

          {/* 카테고리 범례 */}
          <div className="flex flex-wrap gap-2">
            {sortedTvlCategories.slice(0, 6).map((cat) => (
              <div
                key={cat.category}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 rounded-full border border-gray-600"
              >
                <div
                  className="w-2.5 h-2.5 rounded-sm"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-xs font-medium text-gray-300">
                  {lang === 'ko' ? cat.categoryKo : cat.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 안내 문구 */}
      <p className="text-sm text-gray-500 text-center mb-4">
        {t.hint}
      </p>

      {/* 트리맵 */}
      <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
        <svg
          viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
          className="w-full h-auto"
          style={{ minHeight: '500px' }}
        >
          {appNodes.map((node, index) => {
            const isHovered = hoveredNode === node.id;
            const fontSize = getFontSize(node.width, node.height, node.name);
            const showText = shouldShowText(node.width, node.height);
            const showChange = shouldShowChange(node.width, node.height);
            const hasPositiveChange = node.change1m !== undefined && node.change1m >= 0;
            const hasNegativeChange = node.change1m !== undefined && node.change1m < 0;

            let bgColor = node.color;
            if (hasPositiveChange) {
              bgColor = '#16a34a';
            } else if (hasNegativeChange) {
              bgColor = '#dc2626';
            }

            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.015 }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={(e) => handleAppClick(node, e)}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x={node.x + 1}
                  y={node.y + 1}
                  width={Math.max(0, node.width - 2)}
                  height={Math.max(0, node.height - 2)}
                  fill={bgColor}
                  fillOpacity={isHovered ? 1 : 0.85}
                  stroke={isHovered ? 'white' : '#1f2937'}
                  strokeWidth={isHovered ? 2 : 1}
                  rx={2}
                  className="transition-all duration-150"
                />

                {showText && (
                  <>
                    <text
                      x={node.x + node.width / 2}
                      y={node.y + node.height / 2 - (showChange ? 8 : 0)}
                      fontSize={fontSize}
                      fontWeight="bold"
                      fill="white"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="pointer-events-none"
                      style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                    >
                      {node.name}
                    </text>

                    {showChange && node.change1m !== undefined && (
                      <text
                        x={node.x + node.width / 2}
                        y={node.y + node.height / 2 + fontSize - 4}
                        fontSize={Math.max(10, fontSize - 3)}
                        fontWeight="600"
                        fill={hasPositiveChange ? '#bbf7d0' : '#fecaca'}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="pointer-events-none"
                      >
                        {formatChange(node.change1m)}
                      </text>
                    )}
                  </>
                )}
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* 범례 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded"></div>
            <span>{lang === 'ko' ? '양의 성장률' : 'Positive growth'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded"></div>
            <span>{lang === 'ko' ? '음의 성장률' : 'Negative growth'}</span>
          </div>
          <span className="ml-auto">{t.legend}</span>
        </div>
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
              {modal.type === 'app' && (
                <div>
                  <div
                    className="p-6 border-b"
                    style={{ backgroundColor: tvlCategoryColors[modal.app.category] + '15' }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded"
                          style={{ backgroundColor: tvlCategoryColors[modal.app.category] }}
                        />
                        <span className="text-sm text-gray-500">
                          {lang === 'ko' ? modal.app.categoryKo : modal.app.category}
                        </span>
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

                    <h2 className="font-serif text-2xl font-bold text-gray-900">
                      {modal.app.name}
                    </h2>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* TVL */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                        {t.tvlLabel}
                      </h4>
                      <p
                        className="font-mono text-3xl font-bold"
                        style={{ color: tvlCategoryColors[modal.app.category] }}
                      >
                        {formatValue(modal.app.tvl)}
                      </p>
                    </div>

                    {/* 1개월 변화 */}
                    {modal.app.change1m !== undefined && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                          {t.change1mLabel}
                        </h4>
                        <p className={`text-xl font-bold ${modal.app.change1m >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                          {formatChange(modal.app.change1m)}
                        </p>
                      </div>
                    )}

                    {/* 7일 변화 */}
                    {modal.app.change7d !== undefined && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                          {t.change7dLabel}
                        </h4>
                        <p className={`text-xl font-bold ${modal.app.change7d >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                          {formatChange(modal.app.change7d)}
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
