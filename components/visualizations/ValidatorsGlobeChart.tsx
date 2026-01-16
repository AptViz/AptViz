import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import Globe from 'react-globe.gl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  validatorRegions,
  validatorConnections,
  continentStats,
  totalValidators,
  totalCountries,
  ValidatorRegion
} from '../../visualizations/validators-distribution';

// 다국어 텍스트
const TEXTS = {
  ko: {
    totalValidators: '전체 Validator',
    countries: '국가',
    hint: '지구본을 드래그하여 회전하고, 노드를 클릭하면 상세 정보를 볼 수 있습니다',
    legend1: '노드 크기는 해당 지역의 Validator 수에 비례합니다',
    legend2: '연결선은 노드 간 블록 전파를 나타냅니다',
    regionStats: '지역별 분포',
    validators: 'Validators',
  },
  en: {
    totalValidators: 'Total Validators',
    countries: 'Countries',
    hint: 'Drag to rotate, click nodes for details',
    legend1: 'Node size is proportional to validator count in each region',
    legend2: 'Arcs represent block propagation between nodes',
    regionStats: 'Regional Distribution',
    validators: 'Validators',
  }
};

export const ValidatorsGlobeChart: React.FC = () => {
  const globeEl = useRef<any>(null);
  const [selectedRegion, setSelectedRegion] = useState<ValidatorRegion | null>(null);
  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const [isClient, setIsClient] = useState(false);
  const t = TEXTS[lang];

  // 클라이언트 사이드 렌더링 확인
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 지구본 초기 설정
  useEffect(() => {
    if (globeEl.current) {
      // 초기 시점 설정 (아시아-태평양 중심)
      globeEl.current.pointOfView({ lat: 20, lng: 100, altitude: 2.5 }, 1000);

      // 자동 회전
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      globeEl.current.controls().enableZoom = true;
      globeEl.current.controls().minDistance = 150;
      globeEl.current.controls().maxDistance = 500;
    }
  }, [isClient]);

  // 노드 데이터 변환
  const pointsData = useMemo(() =>
    validatorRegions.map(region => ({
      ...region,
      size: Math.sqrt(region.count) * 0.15 + 0.3,
      altitude: 0.01,
    })), []);

  // Arc 데이터
  const arcsData = useMemo(() =>
    validatorConnections.map((conn, i) => ({
      ...conn,
      arcAlt: 0.3 + Math.random() * 0.2,
      arcDashLength: 0.4,
      arcDashGap: 0.2,
      arcDashAnimateTime: 2000 + Math.random() * 1000,
    })), []);

  // 노드 클릭 핸들러
  const handlePointClick = useCallback((point: any) => {
    const region = validatorRegions.find(r => r.id === point.id);
    if (region) {
      setSelectedRegion(region);
      if (globeEl.current) {
        globeEl.current.pointOfView({ lat: region.lat, lng: region.lng, altitude: 1.8 }, 1000);
      }
    }
  }, []);

  // 노드 호버 레이블
  const getPointLabel = useCallback((point: any) => {
    const region = validatorRegions.find(r => r.id === point.id);
    if (!region) return '';
    return `
      <div style="
        background: rgba(0,0,0,0.85);
        padding: 12px 16px;
        border-radius: 8px;
        font-family: system-ui, -apple-system, sans-serif;
        min-width: 150px;
      ">
        <div style="font-size: 14px; font-weight: 600; color: white; margin-bottom: 4px;">
          ${lang === 'ko' ? region.nameKo : region.name}
        </div>
        <div style="font-size: 24px; font-weight: 700; color: ${region.color};">
          ${region.count}
        </div>
        <div style="font-size: 11px; color: #9ca3af;">
          ${region.percentage}% of network
        </div>
      </div>
    `;
  }, [lang]);

  if (!isClient) {
    return (
      <div className="w-full h-[600px] bg-gray-900 rounded-xl flex items-center justify-center">
        <div className="text-white">Loading Globe...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 헤더 통계 */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex gap-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400">
                  {t.totalValidators}
                </h3>
                {/* 언어 토글 */}
                <div className="flex items-center bg-gray-700 rounded-full p-0.5">
                  <button
                    onClick={() => setLang('ko')}
                    className={`px-2 py-0.5 text-xs font-medium rounded-full transition-all ${
                      lang === 'ko'
                        ? 'bg-white text-gray-900'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    KO
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    className={`px-2 py-0.5 text-xs font-medium rounded-full transition-all ${
                      lang === 'en'
                        ? 'bg-white text-gray-900'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>
              <p className="font-serif text-5xl text-white">
                {totalValidators}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-1">
                {t.countries}
              </h3>
              <p className="font-serif text-5xl text-teal-400">
                {totalCountries}
              </p>
            </div>
          </div>

          {/* 대륙별 분포 */}
          <div className="flex flex-wrap gap-2">
            {continentStats.slice(0, 4).map((stat) => (
              <div
                key={stat.name}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 rounded-full border border-gray-700"
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stat.color }} />
                <span className="text-xs font-medium text-gray-300">
                  {lang === 'ko' ? stat.nameKo : stat.name}
                </span>
                <span className="text-xs font-bold text-white">
                  {stat.count}
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

      {/* 3D 지구본 */}
      <div className="relative bg-gray-900 rounded-xl overflow-hidden" style={{ height: '600px' }}>
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

          // 노드 (포인트)
          pointsData={pointsData}
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          pointAltitude="altitude"
          pointRadius="size"
          pointLabel={getPointLabel}
          onPointClick={handlePointClick}

          // Arc (연결선)
          arcsData={arcsData}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor="color"
          arcAltitude="arcAlt"
          arcStroke={0.5}
          arcDashLength="arcDashLength"
          arcDashGap="arcDashGap"
          arcDashAnimateTime="arcDashAnimateTime"

          // 분위기 효과
          atmosphereColor="#0d9488"
          atmosphereAltitude={0.25}

          // 크기
          width={typeof window !== 'undefined' ? Math.min(window.innerWidth - 64, 1200) : 800}
          height={600}
        />

        {/* 지역 상세 정보 패널 */}
        <AnimatePresence>
          {selectedRegion && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-4 right-4 bg-black/80 backdrop-blur-md rounded-xl p-5 border border-gray-700 w-64"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-bold text-white">
                    {lang === 'ko' ? selectedRegion.nameKo : selectedRegion.name}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {lang === 'ko' ? selectedRegion.name : ''}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRegion(null)}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t.validators}</p>
                  <p className="text-3xl font-bold" style={{ color: selectedRegion.color }}>
                    {selectedRegion.count}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Network Share</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedRegion.percentage}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: selectedRegion.color }}
                      />
                    </div>
                    <span className="text-sm font-medium text-white">
                      {selectedRegion.percentage}%
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-700">
                  <p className="text-xs text-gray-500">
                    Lat: {selectedRegion.lat.toFixed(4)}, Lng: {selectedRegion.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 지역별 분포 차트 */}
      <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-4">
          {t.regionStats}
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {continentStats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white p-4 rounded-lg border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: stat.color }}
                />
                <span className="text-xs font-medium text-gray-600">
                  {lang === 'ko' ? stat.nameKo : stat.name}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
              <p className="text-xs text-gray-400">{stat.percentage}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* 범례 */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <ul className="text-xs text-gray-500 space-y-1">
          <li>• {t.legend1}</li>
          <li>• {t.legend2}</li>
        </ul>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            {lang === 'ko' ? '데이터 출처' : 'Data Sources'}:{' '}
            <a href="https://explorer.aptoslabs.com/validators" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
              Aptos Explorer
            </a>
            ,{' '}
            <a href="https://aptosfoundation.org" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
              Aptos Foundation
            </a>
            {' '}({lang === 'ko' ? '2026년 1월 기준' : 'as of Jan 2026'})
          </p>
        </div>
      </div>
    </div>
  );
};
