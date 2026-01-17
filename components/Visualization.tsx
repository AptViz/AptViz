import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScrollReveal } from './ui/ScrollReveal';

interface TimelineEvent {
  x: number;
  y: number;
  date: string;
  title: string;
  description: string;
  year: string;
  newsId?: string; // 뉴스 페이지 연결용
}

// 두 선이 교차하는 지점에 이벤트 배치 (더 넓은 간격)
const timelineEvents: TimelineEvent[] = [
  // 2022
  { x: 150, y: 140, year: "2022", date: "3월~7월", title: "대규모 투자 유치", description: "a16z, Tiger Global 등 $400M 투자" },
  { x: 400, y: 140, year: "2022", date: "10월 12일", title: "Aptos Genesis", description: "Aptos 제네시스 발생" },
  { x: 650, y: 140, year: "2022", date: "10월 18일", title: "메인넷 런칭", description: "Aptos 메인넷 공식 런칭" },
  { x: 900, y: 140, year: "2022", date: "11월", title: "주요 파트너십", description: "Google Cloud, Circle, Coinbase 파트너십" },
  // 2023
  { x: 1200, y: 140, year: "2023", date: "1월", title: "ATH $19.90", description: "APT 토큰 사상 최고가 기록" },
  { x: 1450, y: 140, year: "2023", date: "연중", title: "글로벌 해커톤", description: "싱가포르, 네덜란드, 인도 등 개최" },
  { x: 1700, y: 140, year: "2023", date: "연중", title: "기술 안정화", description: "4 TPS에서 네트워크 안정성 확보" },
  // 2024
  { x: 2000, y: 140, year: "2024", date: "6월", title: "NBCUniversal", description: "미디어/엔터 분야 장기 파트너십" },
  { x: 2250, y: 140, year: "2024", date: "10월", title: "일본 진출", description: "HashPalette 인수, 일본 시장 진출" },
  { x: 2500, y: 140, year: "2024", date: "11월", title: "BlackRock BUIDL", description: "블랙록 BUIDL 펀드 앱토스 확장" },
  { x: 2750, y: 140, year: "2024", date: "12월", title: "Avery Ching CEO", description: "새로운 CEO 취임" },
  // 2025 - 뉴스 연결
  { x: 3050, y: 140, year: "2025", date: "1월", title: "Native USDC", description: "USDC 런칭, DAA 100만 돌파", newsId: "native-usdc-2025" },
  { x: 3300, y: 140, year: "2025", date: "9월", title: "Velociraptr", description: "블록 타임 0.5초 미만 달성", newsId: "velociraptr-2025" },
  { x: 3550, y: 140, year: "2025", date: "10월", title: "RWA $1.2B", description: "온체인 RWA 자산 12억 달러 돌파", newsId: "rwa-1-2b-2025" },
  { x: 3800, y: 140, year: "2025", date: "12월 28일", title: "50ms 블록타임", description: "Baby Raptr로 50ms 미만 달성", newsId: "block-time-50ms-2025" },
  // 2026 - 뉴스 연결
  { x: 4100, y: 140, year: "2026", date: "1월 14일", title: "APT 선물", description: "미국 최초 규제권 내 APT 선물 출시", newsId: "apt-futures-2026" },
  { x: 4350, y: 140, year: "2026", date: "1월 14일", title: "일일 매출 $1M", description: "앱토스 앱들 일일 매출 100만 달러", newsId: "daily-revenue-1m-2026" },
];

// 연도별 구분선 위치
const yearMarkers = [
  { x: 50, year: "2022" },
  { x: 1100, year: "2023" },
  { x: 1900, year: "2024" },
  { x: 2950, year: "2025" },
  { x: 4000, year: "2026" },
];

// 부드럽게 흐르는 첫 번째 선 (위에서 시작해서 교차점에서 만남)
const line1Path = `
  M0,200
  C75,200 75,80 150,140
  S300,200 400,140
  S550,80 650,140
  S800,200 900,140
  S1050,80 1200,140
  S1350,200 1450,140
  S1600,80 1700,140
  S1850,200 2000,140
  S2150,80 2250,140
  S2400,200 2500,140
  S2650,80 2750,140
  S2900,200 3050,140
  S3200,80 3300,140
  S3450,200 3550,140
  S3700,80 3800,140
  S3950,200 4100,140
  S4250,80 4350,140
  S4450,200 4500,180
`;

// 부드럽게 흐르는 두 번째 선 (아래에서 시작해서 교차점에서 만남)
const line2Path = `
  M0,80
  C75,80 75,200 150,140
  S300,80 400,140
  S550,200 650,140
  S800,80 900,140
  S1050,200 1200,140
  S1350,80 1450,140
  S1600,200 1700,140
  S1850,80 2000,140
  S2150,200 2250,140
  S2400,80 2500,140
  S2650,200 2750,140
  S2900,80 3050,140
  S3200,200 3300,140
  S3450,80 3550,140
  S3700,200 3800,140
  S3950,80 4100,140
  S4250,200 4350,140
  S4450,80 4500,100
`;

interface EventPointProps {
  event: TimelineEvent;
  index: number;
  onNavigate: (newsId: string) => void;
}

const EventPoint: React.FC<EventPointProps> = ({ event, index, onNavigate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasNews = !!event.newsId;

  const handleClick = () => {
    if (event.newsId) {
      onNavigate(event.newsId);
    }
  };

  return (
    <g
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ cursor: hasNews ? 'pointer' : 'default' }}
    >
      {/* 투명한 히트 영역 (더 넓게) */}
      <circle
        cx={event.x}
        cy={event.y}
        r="25"
        fill="transparent"
        style={{ cursor: hasNews ? 'pointer' : 'default' }}
      />

      {/* Pulse animation on hover */}
      {isHovered && (
        <motion.circle
          cx={event.x}
          cy={event.y}
          r="25"
          fill="#0d9488"
          opacity="0.15"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Outer ring on hover */}
      {isHovered && (
        <motion.circle
          cx={event.x}
          cy={event.y}
          r="12"
          fill="none"
          stroke="#0d9488"
          strokeWidth="2"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Main point */}
      <motion.circle
        cx={event.x}
        cy={event.y}
        r={isHovered ? 7 : 5}
        fill={isHovered ? "#0d9488" : "#FFFFFF"}
        stroke="#0d9488"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 + index * 0.08, type: "spring" }}
        style={{ cursor: hasNews ? 'pointer' : 'default' }}
      />

      {/* News indicator (small badge for linked events) */}
      {hasNews && !isHovered && (
        <motion.circle
          cx={event.x + 8}
          cy={event.y - 8}
          r="4"
          fill="#f59e0b"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7 + index * 0.08 }}
        />
      )}

      {/* Tooltip */}
      {isHovered && (
        <g style={{ pointerEvents: 'none' }}>
          {/* Tooltip background */}
          <motion.rect
            x={event.x - 130}
            y={event.y - 105}
            width="260"
            height={hasNews ? 95 : 80}
            rx="6"
            fill="#1a1a1a"
            filter="drop-shadow(0 4px 12px rgba(0,0,0,0.3))"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
          />
          {/* Arrow */}
          <motion.polygon
            points={`${event.x - 10},${event.y - 20} ${event.x + 10},${event.y - 20} ${event.x},${event.y - 8}`}
            fill="#1a1a1a"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          />
          {/* Year badge */}
          <motion.rect
            x={event.x - 118}
            y={event.y - 95}
            width="42"
            height="20"
            rx="3"
            fill="#0d9488"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <motion.text
            x={event.x - 97}
            y={event.y - 81}
            fill="#ffffff"
            fontSize="11"
            fontFamily="monospace"
            textAnchor="middle"
            fontWeight="600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {event.year}
          </motion.text>
          {/* Date */}
          <motion.text
            x={event.x - 68}
            y={event.y - 81}
            fill="#9ca3af"
            fontSize="11"
            fontFamily="monospace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {event.date}
          </motion.text>
          {/* Title */}
          <motion.text
            x={event.x}
            y={event.y - 57}
            fill="#ffffff"
            fontSize="14"
            fontWeight="600"
            fontFamily="Georgia, serif"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {event.title}
          </motion.text>
          {/* Description */}
          <motion.text
            x={event.x}
            y={event.y - 37}
            fill="#a1a1aa"
            fontSize="12"
            fontFamily="system-ui, sans-serif"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {event.description}
          </motion.text>
          {/* Click hint for news */}
          {hasNews && (
            <motion.text
              x={event.x}
              y={event.y - 18}
              fill="#f59e0b"
              fontSize="10"
              fontFamily="system-ui, sans-serif"
              textAnchor="middle"
              fontWeight="500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Click to read more →
            </motion.text>
          )}
        </g>
      )}
    </g>
  );
};

export const Visualization: React.FC = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleNavigateToNews = (newsId: string) => {
    navigate(`/news/${newsId}`);
    window.scrollTo(0, 0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'circle') return;
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <section className="bg-white py-32 border-t border-gray-100">
      <div className="container mx-auto px-8">
        <ScrollReveal width="100%">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-100 pb-8">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl text-journal-black mb-4">
                The Journey of <span className="italic text-journal-accent">Speed</span>
              </h2>
              <p className="font-sans text-journal-gray max-w-lg font-light">
                From genesis to the fastest L1. Hover over the points to explore Aptos milestones.
              </p>
            </div>
            <div className="font-mono text-xs text-journal-gray mt-4 md:mt-0">
              2022 — 2026 // DRAG TO EXPLORE
            </div>
          </div>
        </ScrollReveal>

        <div
          ref={scrollRef}
          className="relative w-full bg-[#FAFAFA] rounded-sm border border-gray-100 overflow-x-auto no-scrollbar"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          style={{
            userSelect: 'none',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          <svg
            viewBox="0 0 4600 280"
            className="w-[4600px] h-[280px]"
            preserveAspectRatio="xMinYMid slice"
          >
            {/* Year markers */}
            {yearMarkers.map((marker) => (
              <g key={marker.year}>
                <line
                  x1={marker.x}
                  y1="30"
                  x2={marker.x}
                  y2="250"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="6,6"
                />
                <text
                  x={marker.x + 20}
                  y="50"
                  fill="#9ca3af"
                  fontSize="14"
                  fontFamily="monospace"
                  fontWeight="600"
                >
                  {marker.year}
                </text>
              </g>
            ))}

            {/* Line 2 (background - gray) */}
            <motion.path
              d={line2Path}
              fill="none"
              stroke="#d1d5db"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 4, delay: 0.2, ease: "easeInOut" }}
            />

            {/* Line 1 (main - teal) */}
            <motion.path
              d={line1Path}
              fill="none"
              stroke="#0d9488"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 3.5, ease: "easeInOut" }}
            />

            {/* Event points at intersections */}
            {timelineEvents.map((event, index) => (
              <EventPoint
                key={index}
                event={event}
                index={index}
                onNavigate={handleNavigateToNews}
              />
            ))}
          </svg>
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center mt-6">
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="font-mono text-xs text-gray-400"
          >
            ← DRAG TO EXPLORE →
          </motion.div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white border-2 border-teal-500" />
            <span className="font-mono text-xs text-gray-400">Milestone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-white border-2 border-teal-500" />
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500" />
            </div>
            <span className="font-mono text-xs text-gray-400">News Available</span>
          </div>
        </div>
      </div>
    </section>
  );
};
