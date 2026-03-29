import { useState } from "react";
import { useLocation } from "wouter";
import { BookOpen, LogOut, Zap, Trophy, Users, Menu, X, Home, Map, Award, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authService, User } from "@/lib/auth-service";
import { useI18n } from "@/contexts/I18nContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface IslandData {
  id: number;
  name: string;
  emoji: string;
  level: number;
  completed: boolean;
  progress: number;
  x: number;
  y: number;
}

const islands: IslandData[] = [
  { id: 1, name: "Mathematics Kingdom", emoji: "🏝️", level: 1, completed: true, progress: 85, x: 20, y: 30 },
  { id: 2, name: "English Literature", emoji: "📚", level: 2, completed: true, progress: 60, x: 60, y: 25 },
  { id: 3, name: "Science Lab", emoji: "🔬", level: 3, completed: false, progress: 40, x: 40, y: 70 },
  { id: 4, name: "History Voyage", emoji: "⚓", level: 4, completed: false, progress: 20, x: 75, y: 60 },
  { id: 5, name: "Art Studio", emoji: "🎨", level: 5, completed: false, progress: 0, x: 85, y: 35 },
];

export default function StudentDashboard({ user }: { user: User }) {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedIsland, setSelectedIsland] = useState<IslandData | null>(null);
  const { t } = useI18n();

  const handleLogout = async () => {
    await authService.logout();
    setLocation("/");
  };

  const stats = [
    { label: "XP", value: "2,450", icon: "⚡", color: "from-amber-500 to-orange-500" },
    { label: "Level", value: "5", icon: "🎯", color: "from-indigo-500 to-blue-500" },
    { label: "Streak", value: "12", icon: "🔥", color: "from-red-500 to-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-indigo-600 to-purple-600 text-white z-50 transform transition-transform md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">Dao-Yu</span>
          </div>

          <nav className="space-y-2">
            {[
              { icon: <Home className="w-5 h-5" />, label: "Home", active: true },
              { icon: <Map className="w-5 h-5" />, label: "Archipelago", active: false },
              { icon: <Trophy className="w-5 h-5" />, label: "Achievements", active: false },
              { icon: <Users className="w-5 h-5" />, label: "Friends", active: false },
            ].map((item, idx) => (
              <button
                key={idx}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  item.active
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6 space-y-3">
            <Button
              onClick={handleLogout}
              className="w-full bg-white/20 hover:bg-white/30 text-white border-0"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-white/20 bg-white/10 backdrop-blur-xl">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-gray-900 dark:text-white"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user.firstName}! 🎮
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <img src={user.avatar} alt={user.firstName} className="w-10 h-10 rounded-full shadow-md" />
            </div>
          </div>
        </header>

        {/* Stats Bar */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-white/20 text-center hover:shadow-xl transition"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Archipelago Map */}
          <div className="bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-3xl p-8 border-2 border-cyan-200 dark:border-cyan-800 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🗺️ Your Learning Archipelago</h2>

            {/* SVG Map */}
            <div className="relative w-full h-96 bg-gradient-to-b from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl border border-cyan-200 dark:border-cyan-800 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                {/* Water waves pattern */}
                <defs>
                  <pattern id="waves" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M0,10 Q5,5 10,10 T20,10" stroke="rgba(59,130,246,0.1)" fill="none" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#waves)" />

                {/* Islands */}
                {islands.map((island) => (
                  <g key={island.id}>
                    {/* Island shadow */}
                    <circle cx={island.x} cy={island.y + 1} r="4" fill="rgba(0,0,0,0.1)" />

                    {/* Island */}
                    <circle
                      cx={island.x}
                      cy={island.y}
                      r="4"
                      fill={island.completed ? "#10b981" : "#f59e0b"}
                      className="cursor-pointer hover:r-5 transition"
                      onClick={() => setSelectedIsland(island)}
                    />

                    {/* Island label */}
                    <text
                      x={island.x}
                      y={island.y + 10}
                      textAnchor="middle"
                      fontSize="2"
                      fill="rgba(0,0,0,0.7)"
                      className="pointer-events-none"
                    >
                      {island.emoji}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Selected Island Details */}
            {selectedIsland && (
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-white/20">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedIsland.emoji} {selectedIsland.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Level {selectedIsland.level}</p>
                  </div>
                  <button
                    onClick={() => setSelectedIsland(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Progress</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold">{selectedIsland.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-blue-500 h-3 rounded-full transition-all"
                        style={{ width: `${selectedIsland.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white">
                      {selectedIsland.completed ? "Review" : "Start Learning"}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View Lessons
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Islands List */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {islands.map((island) => (
                <button
                  key={island.id}
                  onClick={() => setSelectedIsland(island)}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-white/20 hover:border-indigo-300 dark:hover:border-indigo-700 transition text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{island.emoji}</span>
                    {island.completed && <span className="text-green-500">✓</span>}
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{island.name}</h4>
                  <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full"
                      style={{ width: `${island.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">{island.progress}% Complete</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
