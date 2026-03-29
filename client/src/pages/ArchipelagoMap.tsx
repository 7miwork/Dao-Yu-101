import { useState } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, Zap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";

interface Island {
  id: number;
  name: string;
  emoji: string;
  progress: number;
  completed: boolean;
  x: number;
  y: number;
}

interface Archipelago {
  id: number;
  name: string;
  emoji: string;
  color: string;
  islands: Island[];
  x: number;
  y: number;
}

const archipelagos: Archipelago[] = [
  {
    id: 1,
    name: "Mathematics Kingdom",
    emoji: "🏝️",
    color: "from-amber-500 to-orange-500",
    x: 20,
    y: 30,
    islands: [
      { id: 101, name: "Algebra Basics", emoji: "📐", progress: 100, completed: true, x: 15, y: 25 },
      { id: 102, name: "Geometry", emoji: "🔺", progress: 85, completed: false, x: 25, y: 30 },
      { id: 103, name: "Calculus", emoji: "📊", progress: 60, completed: false, x: 20, y: 40 },
      { id: 104, name: "Statistics", emoji: "📈", progress: 0, completed: false, x: 30, y: 35 },
    ],
  },
  {
    id: 2,
    name: "English Literature",
    emoji: "📚",
    color: "from-blue-500 to-cyan-500",
    x: 60,
    y: 25,
    islands: [
      { id: 201, name: "Shakespeare", emoji: "🎭", progress: 75, completed: false, x: 55, y: 20 },
      { id: 202, name: "Poetry", emoji: "✍️", progress: 60, completed: false, x: 65, y: 25 },
      { id: 203, name: "Modern Novels", emoji: "📖", progress: 40, completed: false, x: 60, y: 35 },
      { id: 204, name: "Grammar", emoji: "🔤", progress: 90, completed: true, x: 70, y: 30 },
    ],
  },
  {
    id: 3,
    name: "Science Lab",
    emoji: "🔬",
    color: "from-green-500 to-emerald-500",
    x: 40,
    y: 70,
    islands: [
      { id: 301, name: "Physics", emoji: "⚛️", progress: 50, completed: false, x: 35, y: 65 },
      { id: 302, name: "Chemistry", emoji: "🧪", progress: 40, completed: false, x: 45, y: 70 },
      { id: 303, name: "Biology", emoji: "🧬", progress: 30, completed: false, x: 40, y: 80 },
      { id: 304, name: "Ecology", emoji: "🌿", progress: 20, completed: false, x: 50, y: 75 },
    ],
  },
  {
    id: 4,
    name: "History Voyage",
    emoji: "⚓",
    color: "from-purple-500 to-pink-500",
    x: 75,
    y: 60,
    islands: [
      { id: 401, name: "Ancient Rome", emoji: "🏛️", progress: 70, completed: false, x: 70, y: 55 },
      { id: 402, name: "Medieval Times", emoji: "🏰", progress: 55, completed: false, x: 80, y: 60 },
      { id: 403, name: "Renaissance", emoji: "🎨", progress: 45, completed: false, x: 75, y: 70 },
      { id: 404, name: "Modern Era", emoji: "🌍", progress: 25, completed: false, x: 85, y: 65 },
    ],
  },
  {
    id: 5,
    name: "Art Studio",
    emoji: "🎨",
    color: "from-red-500 to-rose-500",
    x: 85,
    y: 35,
    islands: [
      { id: 501, name: "Drawing", emoji: "✏️", progress: 0, completed: false, x: 80, y: 30 },
      { id: 502, name: "Painting", emoji: "🖌️", progress: 0, completed: false, x: 90, y: 35 },
      { id: 503, name: "Sculpture", emoji: "🗿", progress: 0, completed: false, x: 85, y: 45 },
      { id: 504, name: "Digital Art", emoji: "💻", progress: 0, completed: false, x: 95, y: 40 },
    ],
  },
];

export default function ArchipelagoMap() {
  const [, setLocation] = useLocation();
  const [selectedArchipelago, setSelectedArchipelago] = useState<Archipelago | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const { t } = useI18n();

  const handleArchipelagoClick = (archipelago: Archipelago) => {
    setSelectedArchipelago(archipelago);
    setZoomLevel(2);
  };

  const handleIslandClick = (island: Island) => {
    setLocation(`/lesson/${island.id}`);
  };

  const handleBack = () => {
    setSelectedArchipelago(null);
    setZoomLevel(1);
  };

  const getViewBox = () => {
    if (selectedArchipelago) {
      return `0 0 100 100`;
    }
    return `0 0 100 100`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {selectedArchipelago ? (
            <>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-900 dark:text-white" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedArchipelago.emoji} {selectedArchipelago.name}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedArchipelago.islands.length} Topics
                  </p>
                </div>
              </div>
            </>
          ) : (
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">🗺️ Your Learning World</h1>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {!selectedArchipelago ? (
          // World Map View
          <div className="space-y-6">
            <div className="bg-gradient-to-b from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-3xl p-8 border-2 border-cyan-200 dark:border-cyan-800 shadow-xl">
              <svg
                className="w-full h-96 bg-gradient-to-b from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-2xl"
                viewBox={getViewBox()}
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Water pattern */}
                <defs>
                  <pattern id="waves" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M0,10 Q5,5 10,10 T20,10" stroke="rgba(59,130,246,0.1)" fill="none" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#waves)" />

                {/* Archipelagos */}
                {archipelagos.map((arch) => (
                  <g key={arch.id} onClick={() => handleArchipelagoClick(arch)} className="cursor-pointer">
                    {/* Archipelago shadow */}
                    <circle cx={arch.x} cy={arch.y + 1} r="6" fill="rgba(0,0,0,0.1)" />

                    {/* Archipelago circle */}
                    <circle
                      cx={arch.x}
                      cy={arch.y}
                      r="6"
                      fill={arch.color.split(" ")[0].replace("from-", "")}
                      className="hover:r-7 transition"
                      opacity="0.8"
                    />

                    {/* Archipelago emoji */}
                    <text
                      x={arch.x}
                      y={arch.y + 1}
                      textAnchor="middle"
                      fontSize="4"
                      fill="white"
                      fontWeight="bold"
                      className="pointer-events-none"
                    >
                      {arch.emoji}
                    </text>

                    {/* Label */}
                    <text
                      x={arch.x}
                      y={arch.y + 14}
                      textAnchor="middle"
                      fontSize="2.5"
                      fill="rgba(0,0,0,0.7)"
                      className="pointer-events-none font-bold"
                    >
                      {arch.name.split(" ")[0]}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Archipelago Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {archipelagos.map((arch) => {
                const completedIslands = arch.islands.filter((i) => i.completed).length;
                const avgProgress = Math.round(
                  arch.islands.reduce((sum, i) => sum + i.progress, 0) / arch.islands.length
                );

                return (
                  <button
                    key={arch.id}
                    onClick={() => handleArchipelagoClick(arch)}
                    className="card-modern p-6 text-left hover:shadow-xl transition-all hover:scale-105 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{arch.emoji}</div>
                      <span className="text-xs font-bold text-white bg-indigo-600 px-3 py-1 rounded-full">
                        {completedIslands}/{arch.islands.length}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{arch.name}</h3>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                            {avgProgress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full transition-all"
                            style={{ width: `${avgProgress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <BookOpen className="w-4 h-4" />
                        <span>{arch.islands.length} Topics</span>
                      </div>
                    </div>

                    <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white group-hover:shadow-lg transition">
                      Explore
                    </Button>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          // Archipelago Detail View
          <div className="space-y-6">
            {/* Archipelago Map */}
            <div className="bg-gradient-to-b from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-3xl p-8 border-2 border-cyan-200 dark:border-cyan-800 shadow-xl">
              <svg
                className="w-full h-96 bg-gradient-to-b from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-2xl"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <pattern id="waves2" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M0,10 Q5,5 10,10 T20,10" stroke="rgba(59,130,246,0.1)" fill="none" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#waves2)" />

                {/* Islands */}
                {selectedArchipelago.islands.map((island) => (
                  <g
                    key={island.id}
                    onClick={() => handleIslandClick(island)}
                    className="cursor-pointer"
                  >
                    {/* Island shadow */}
                    <circle cx={island.x} cy={island.y + 1} r="4" fill="rgba(0,0,0,0.1)" />

                    {/* Island */}
                    <circle
                      cx={island.x}
                      cy={island.y}
                      r="4"
                      fill={island.completed ? "#10b981" : "#f59e0b"}
                      className="hover:r-5 transition"
                    />

                    {/* Island emoji */}
                    <text
                      x={island.x}
                      y={island.y + 1}
                      textAnchor="middle"
                      fontSize="2"
                      fill="white"
                      fontWeight="bold"
                      className="pointer-events-none"
                    >
                      {island.emoji}
                    </text>

                    {/* Label */}
                    <text
                      x={island.x}
                      y={island.y + 10}
                      textAnchor="middle"
                      fontSize="1.5"
                      fill="rgba(0,0,0,0.6)"
                      className="pointer-events-none"
                    >
                      {island.name.split(" ")[0]}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Islands Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedArchipelago.islands.map((island) => (
                <button
                  key={island.id}
                  onClick={() => handleIslandClick(island)}
                  className="card-modern p-6 text-left hover:shadow-xl transition-all hover:scale-105 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{island.emoji}</div>
                    {island.completed && <span className="text-green-500 text-2xl">✓</span>}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{island.name}</h3>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                          {island.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${island.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span>+50 XP per lesson</span>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white group-hover:shadow-lg transition">
                    {island.completed ? "Review" : "Start Learning"}
                  </Button>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
