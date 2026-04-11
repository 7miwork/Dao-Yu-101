import { useLocation } from "wouter";
import { Zap, Trophy, BookOpen, Target, Flame, Star } from "lucide-react";
import StudentLayout from "@/layouts/StudentLayout";
import { useI18n } from "@/contexts/I18nContext";

export default function StudentDashboard() {
  const [, setLocation] = useLocation();
  const { t } = useI18n();

  // Mock student data
  const studentData = {
    name: "Alex Chen",
    level: 12,
    xp: 4250,
    xpToNextLevel: 5000,
    streak: 7,
    badges: 8,
    completedLessons: 24,
    totalLessons: 15,
  };

  const recentActivity = [
    { icon: "✅", title: "Completed: Variables & Data Types", time: "2 hours ago" },
    { icon: "🏆", title: "Earned Badge: Loop Master", time: "1 day ago" },
    { icon: "⬆️", title: "Leveled Up to Level 12", time: "2 days ago" },
    { icon: "🔥", title: "7-Day Streak Active", time: "Ongoing" },
  ];

  const upcomingQuests = [
    { id: 1, title: "Functions & Methods", progress: 60, difficulty: "Medium", icon: "🎯" },
    { id: 2, title: "Object-Oriented Programming", progress: 0, difficulty: "Hard", icon: "🚀" },
    { id: 3, title: "Error Handling", progress: 40, difficulty: "Medium", icon: "🛡️" },
  ];

  return (
    <StudentLayout>
      <div className="p-4 md:p-8 space-y-8 md:space-y-12">
        {/* Welcome Hero */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-6 md:p-10 text-white shadow-xl animate-slideInDown">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-indigo-100 font-semibold text-sm md:text-base mb-2">Welcome back, adventurer!</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                {studentData.name} 🎮
              </h1>
              <p className="text-indigo-100 text-base md:text-lg">
                You're on a {studentData.streak}-day learning streak! Keep it up! 🔥
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold">{studentData.level}</div>
              <p className="text-indigo-100 font-semibold">LEVEL</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: Zap, label: "XP", value: `${studentData.xp}/${studentData.xpToNextLevel}`, color: "from-yellow-400 to-orange-500" },
            { icon: Trophy, label: "Badges", value: studentData.badges, color: "from-purple-400 to-pink-500" },
            { icon: Flame, label: "Streak", value: `${studentData.streak} days`, color: "from-red-400 to-orange-500" },
            { icon: BookOpen, label: "Lessons", value: `${studentData.completedLessons}/15`, color: "from-blue-400 to-cyan-500" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 md:p-6 text-white shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 transition-transform`}
            >
              <stat.icon className="w-6 h-6 md:w-8 md:h-8 mb-2 opacity-80" />
              <p className="text-xs md:text-sm font-semibold opacity-90">{stat.label}</p>
              <p className="text-xl md:text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* XP Progress Bar */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 shadow-lg border-2 border-yellow-300 dark:border-yellow-500">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              XP Progress to Next Level
            </h3>
            <span className="text-sm md:text-base font-semibold text-gray-600 dark:text-gray-400">
              {studentData.xp} / {studentData.xpToNextLevel}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 md:h-6 overflow-hidden">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${(studentData.xp / studentData.xpToNextLevel) * 100}%` }}
            >
              <span className="text-xs font-bold text-white">{Math.round((studentData.xp / studentData.xpToNextLevel) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 shadow-lg border-2 border-green-300 dark:border-green-500">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-green-500" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-700 hover:shadow-md transition-shadow">
                  <span className="text-3xl flex-shrink-0">{activity.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">{activity.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 shadow-lg border-2 border-blue-300 dark:border-blue-500">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-500" />
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Current Streak</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{studentData.streak} 🔥</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Total Badges</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">{studentData.badges} 🏆</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Lessons Done</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">{studentData.completedLessons}/15 ✅</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Quests */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 shadow-lg border-2 border-purple-300 dark:border-purple-500">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-500" />
            Your Next Quests
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {upcomingQuests.map((quest) => (
              <button
                key={quest.id}
                onClick={() => setLocation("/archipelago")}
                className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-300 dark:border-purple-600 hover:shadow-lg transition-all transform hover:scale-105 text-left"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{quest.icon}</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    quest.difficulty === "Hard"
                      ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                      : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                  }`}>
                    {quest.difficulty}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">{quest.title}</h4>
                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all"
                    style={{ width: `${quest.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-semibold">{quest.progress}% Complete</p>
              </button>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setLocation("/archipelago")}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-lg"
          >
            🚀 Start Learning Quest
          </button>
          <button
            onClick={() => setLocation("/leaderboard")}
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-lg"
          >
            🏆 View Leaderboard
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}
