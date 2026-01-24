import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  aptosAppsData,
  totalFees30d,
  sortedCategories,
  categoryColors,
  AppData
} from '../../visualizations/aptos-fees-treemap';
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
    totalFees: '총 30일 수수료 매출',
    totalTvl: '총 TVL',
    hint: '각 영역을 클릭하면 상세 정보를 볼 수 있습니다',
    legendFees: '데이터 출처: DefiLlama (2026년 1월 기준, 30일 Fees)',
    legendTvl: '데이터 출처: DefiLlama (2026년 1월 기준)',
    feesLabel: '30일 수수료 매출',
    tvlLabel: 'TVL',
    revenueLabel: '30일 Revenue',
    change1mLabel: '1개월 변화',
    change7dLabel: '7일 변화',
    categoryLabel: '카테고리',
    fees: 'Fees',
    tvl: 'TVL',
  },
  en: {
    totalFees: 'Total 30d Fees',
    totalTvl: 'Total TVL',
    hint: 'Click on each area to see details',
    legendFees: 'Data source: DefiLlama (as of Jan 2026, 30d Fees)',
    legendTvl: 'Data source: DefiLlama (as of Jan 2026)',
    feesLabel: '30d Fees',
    tvlLabel: 'TVL',
    revenueLabel: '30d Revenue',
    change1mLabel: '1m Change',
    change7dLabel: '7d Change',
    categoryLabel: 'Category',
    fees: 'Fees',
    tvl: 'TVL',
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
  value: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  category: string;
  categoryKo: string;
  change1m?: number;
  change7d?: number;
  revenue30d?: number;
}

// Squarify 알고리즘
const squarify = (
  items: { id: string; value: number; color: string; name: string; category: string; categoryKo: string; change1m?: number; change7d?: number; revenue30d?: number }[],
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

type ViewMode = 'fees' | 'tvl';

type ModalType = {
  name: string;
  category: string;
  categoryKo: string;
  value: number;
  change1m?: number;
  change7d?: number;
  revenue30d?: number;
  color: string;
} | null;

export const AptosFeesTreemap: React.FC = () => {
  const [modal, setModal] = useState<ModalType>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const [viewMode, setViewMode] = useState<ViewMode>('fees');
  const t = TEXTS[lang];

  const viewBox = { width: 1000, height: 600 };

  // 현재 모드에 따른 데이터
  const currentData = viewMode === 'fees' ? aptosAppsData : aptosTvlData;
  const currentTotal = viewMode === 'fees' ? totalFees30d : totalAptosTvl;
  const currentCategories = viewMode === 'fees' ? sortedCategories : sortedTvlCategories;
  const currentColors = viewMode === 'fees' ? categoryColors : tvlCategoryColors;

  // 카테고리별 트리맵 노드 (헤더용)
  const categoryNodes = useMemo(() => {
    const items = currentCategories.map(cat => ({
      id: cat.category,
      value: viewMode === 'fees' ? (cat as typeof sortedCategories[0]).totalFees : (cat as typeof sortedTvlCategories[0]).totalTvl,
      color: cat.color,
      name: cat.category,
      category: cat.category,
      categoryKo: cat.categoryKo,
    }));

    return squarify(items, 0, 0, viewBox.width, viewBox.height);
  }, [viewMode, currentCategories]);

  // 각 카테고리 내 앱별 트리맵 노드 생성
  const appNodesByCategory = useMemo(() => {
    const result: Record<string, TreemapNode[]> = {};

    categoryNodes.forEach(catNode => {
      const categoryApps = currentData.filter(app => app.category === catNode.category);

      if (categoryApps.length === 0) return;

      // 헤더 영역 (카테고리 노드의 상단 18px)
      const headerHeight = Math.min(22, catNode.height * 0.12);
      const contentY = catNode.y + headerHeight;
      const contentHeight = catNode.height - headerHeight;

      const items = categoryApps.map(app => ({
        id: app.name,
        value: viewMode === 'fees' ? (app as AppData).fees30d : (app as TvlAppData).tvl,
        color: catNode.color,
        name: app.name,
        category: app.category,
        categoryKo: app.categoryKo,
        change1m: app.change1m,
        change7d: viewMode === 'tvl' ? (app as TvlAppData).change7d : undefined,
        revenue30d: viewMode === 'fees' ? (app as AppData).revenue30d : undefined,
      }));

      result[catNode.category] = squarify(
        items,
        catNode.x,
        contentY,
        catNode.width,
        contentHeight
      );
    });

    return result;
  }, [viewMode, currentData, categoryNodes]);

  const handleAppClick = (node: TreemapNode, e: React.MouseEvent) => {
    e.stopPropagation();
    setModal({
      name: node.name,
      category: node.category,
      categoryKo: node.categoryKo,
      value: node.value,
      change1m: node.change1m,
      change7d: node.change7d,
      revenue30d: node.revenue30d,
      color: node.color,
    });
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

  const shouldShowValue = (width: number, height: number): boolean => {
    return width > 65 && height > 45;
  };

  return (
    <div className="w-full">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-slate-800 to-gray-900 rounded-lg p-6 mb-6 border border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400">
                {viewMode === 'fees' ? t.totalFees : t.totalTvl}
              </h3>
              {/* 언어 토글 */}
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
              {formatValue(currentTotal)}
            </p>
          </div>

          {/* Fees / TVL 토글 */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('fees')}
                className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${
                  viewMode === 'fees'
                    ? 'bg-teal-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t.fees}
              </button>
              <button
                onClick={() => setViewMode('tvl')}
                className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${
                  viewMode === 'tvl'
                    ? 'bg-teal-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t.tvl}
              </button>
            </div>
          </div>
        </div>

        {/* 카테고리 범례 */}
        <div className="flex flex-wrap gap-2 mt-4">
          {currentCategories.slice(0, 8).map((cat) => (
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
          <AnimatePresence mode="wait">
            {categoryNodes.map((catNode, catIndex) => {
              const headerHeight = Math.min(22, catNode.height * 0.12);
              const apps = appNodesByCategory[catNode.category] || [];
              const showHeader = catNode.width > 60 && catNode.height > 40;

              return (
                <motion.g
                  key={`${viewMode}-cat-${catNode.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: catIndex * 0.02 }}
                >
                  {/* 카테고리 헤더 배경 */}
                  {showHeader && (
                    <>
                      <rect
                        x={catNode.x + 1}
                        y={catNode.y + 1}
                        width={Math.max(0, catNode.width - 2)}
                        height={headerHeight - 1}
                        fill={catNode.color}
                        fillOpacity={0.95}
                      />
                      <text
                        x={catNode.x + 6}
                        y={catNode.y + headerHeight / 2 + 1}
                        fontSize={Math.min(12, catNode.width / 8)}
                        fontWeight="bold"
                        fill="white"
                        dominantBaseline="middle"
                        className="pointer-events-none"
                        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                      >
                        {lang === 'ko' ? catNode.categoryKo : catNode.category}
                      </text>
                    </>
                  )}

                  {/* 카테고리 내 앱들 */}
                  {apps.map((node, index) => {
                    const isHovered = hoveredNode === node.id;
                    const fontSize = getFontSize(node.width, node.height, node.name);
                    const showText = shouldShowText(node.width, node.height);
                    const showValue = shouldShowValue(node.width, node.height);

                    return (
                      <motion.g
                        key={`${viewMode}-${node.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: catIndex * 0.02 + index * 0.01 }}
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
                          fill={node.color}
                          fillOpacity={isHovered ? 1 : 0.75}
                          stroke={isHovered ? 'white' : '#1f2937'}
                          strokeWidth={isHovered ? 2 : 1}
                          rx={2}
                          className="transition-all duration-150"
                        />

                        {showText && (
                          <>
                            {/* 앱 이름 */}
                            <text
                              x={node.x + node.width / 2}
                              y={node.y + node.height / 2 - (showValue ? 8 : 0)}
                              fontSize={fontSize}
                              fontWeight="bold"
                              fill="white"
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="pointer-events-none"
                              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}
                            >
                              {node.name}
                            </text>

                            {/* 금액 표시 */}
                            {showValue && (
                              <text
                                x={node.x + node.width / 2}
                                y={node.y + node.height / 2 + fontSize - 4}
                                fontSize={Math.max(10, fontSize - 3)}
                                fontWeight="600"
                                fill="rgba(255,255,255,0.85)"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="pointer-events-none"
                              >
                                {formatValue(node.value)}
                              </text>
                            )}
                          </>
                        )}
                      </motion.g>
                    );
                  })}
                </motion.g>
              );
            })}
          </AnimatePresence>
        </svg>
      </div>

      {/* 범례 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-500">
          {viewMode === 'fees' ? t.legendFees : t.legendTvl}
        </p>
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
              <div
                className="p-6 border-b"
                style={{ backgroundColor: modal.color + '15' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: modal.color }}
                    />
                    <span className="text-sm text-gray-500">
                      {lang === 'ko' ? modal.categoryKo : modal.category}
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
                  {modal.name}
                </h2>
              </div>

              <div className="p-6 space-y-5">
                {/* 값 */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    {viewMode === 'fees' ? t.feesLabel : t.tvlLabel}
                  </h4>
                  <p
                    className="font-mono text-3xl font-bold"
                    style={{ color: modal.color }}
                  >
                    {formatValue(modal.value)}
                  </p>
                </div>

                {/* 1개월 변화 */}
                {modal.change1m !== undefined && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      {t.change1mLabel}
                    </h4>
                    <p className={`text-xl font-bold ${modal.change1m >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {formatChange(modal.change1m)}
                    </p>
                  </div>
                )}

                {/* 7일 변화 (TVL 전용) */}
                {viewMode === 'tvl' && modal.change7d !== undefined && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      {t.change7dLabel}
                    </h4>
                    <p className={`text-xl font-bold ${modal.change7d >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {formatChange(modal.change7d)}
                    </p>
                  </div>
                )}

                {/* 30일 Revenue (Fees 전용) */}
                {viewMode === 'fees' && modal.revenue30d !== undefined && modal.revenue30d > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      {t.revenueLabel}
                    </h4>
                    <p className="font-mono text-xl font-bold text-gray-700">
                      {formatValue(modal.revenue30d)}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
