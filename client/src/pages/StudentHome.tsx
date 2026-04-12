import { useLocation } from "wouter";
import { Zap, BookOpen, Trophy, Flame, ArrowRight, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";

export default function StudentHome() {
  const [, setLocation] = useLocation();
  const { t } = useI18n();

  // Mock student data
  const studentData = {
    name: "Alex Chen",
    level: 12,
    xp: 4250,
    xpToNextLevel: 5000,
    streak: 7,
    completedToday: false,
  };

  const nextQuests = [
    { id: 1, title: "Functions & Methods", difficulty: "Medium", icon: "🎯", progress: 60 },
    { id: 2, title: "Object-Oriented Programming", difficulty: "Hard", icon: "🚀", progress: 0 },
    { id: 3, title: "Error Handling", difficulty: "Medium", icon: "🛡️", progress: 40 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white shadow-xl border-4 border-yellow-400">
          <div className="flex items-center justify-between gap-6 flex-col md:flex-row">
            <div>
              <p className="text-indigo-100 font-semibold text-sm md:text-base mb-2">Welcome back!</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{studentData.name} 🎮</h1>
              <p className="text-indigo-100 text-base md:text-lg">
                {studentData.completedToday ? (
                  <>✅ You've completed today's quest! Keep the streak alive! 🔥</>
                ) : (
                  <>You have a {studentData.streak}-day streak! Complete today's quest to keep it going! 🔥</>
                )}
              </p>
            </div>
            <div className="text-center bg-white/20 rounded-lg px-6 py-4 backdrop-blur">
              <p className="text-indigo-100 text-sm font-semibold">Level</p>
              <p className="text-5xl font-bold">{studentData.level}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Zap, label: "XP to Next Level", value: `${studentData.xp}/${studentData.xpToNextLevel}`, color: "from-yellow-400 to-orange-500" },
            { icon: Flame, label: "Current Streak", value: `${studentData.streak} days`, color: "from-red-400 to-orange-500" },
            { icon: Trophy, label: "Level", value: studentData.level, color: "from-purple-400 to-pink-500" },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
              >
                <Icon className="w-8 h-8 mb-3 opacity-80" />
                <p className="text-sm font-semibold opacity-90">{stat.label}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* XP Progress */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 shadow-lg border-2 border-yellow-300 dark:border-yellow-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-500" /> XP Progress
            </h3>
            <span className="text-sm md:text-base font-semibold text-gray-600 dark:text-gray-400">
              {Math.round((studentData.xp / studentData.xpToNextLevel) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full transition-all duration-500 flex items-center justify-end pr-3"
              style={{ width: `${(studentData.xp / studentData.xpToNextLevel) * 100}%` }}
            >
              <span className="text-xs font-bold text-white">{Math.round((studentData.xp / studentData.xpToNextLevel) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Next Quests */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 shadow-lg border-2 border-purple-300 dark:border-purple-500">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-purple-500" /> What's Next?
          </h3>
          <div className="space-y-4">
            {nextQuests.map((quest) => (
              <button
                key={quest.id}
                onClick={() => setLocation("/archipelago")}
                className="w-full p-4 md:p-6 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-300 dark:border-purple-600 hover:shadow-lg transition-all transform hover:scale-102 text-left"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{quest.icon}</span>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">{quest.title}</h4>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        quest.difficulty === "Hard"
                          ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                          : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                      }`}>
                        {quest.difficulty}
                      </span>
                    </div>
                    {quest.progress > 0 && (
                      <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all"
                          style={{ width: `${quest.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                  <ArrowRight className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => setLocation("/archipelago")}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-lg flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5" /> Start Learning
          </Button>
          <Button
            onClick={() => setLocation("/student/dashboard")}
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-lg flex items-center justify-center gap-2"
          >
            <Trophy className="w-5 h-5" /> View Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
