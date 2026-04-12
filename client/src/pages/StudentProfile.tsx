import { useLocation } from "wouter";
import { Mail, MapPin, Calendar, Trophy, Zap, Flame, BookOpen, Award, Edit2, Share2 } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";

export default function StudentProfile() {
  const [, setLocation] = useLocation();
  const { t } = useI18n();

  // Mock student profile data
  const studentProfile = {
    id: "student_001",
    name: "Alex Chen",
    email: "alex.chen@example.com",
    avatar: "🎮",
    joinDate: "January 15, 2024",
    school: "Riverside Academy",
    grade: "10th Grade",
    level: 12,
    xp: 4250,
    xpToNextLevel: 5000,
    streak: 7,
    totalBadges: 8,
    completedLessons: 24,
    totalLessons: 15,
    totalQuizzes: 18,
    quizzesCompleted: 15,
    averageScore: 87,
    bio: "Passionate about coding and learning new technologies. Love solving problems and building cool projects!",
  };

  const badges = [
    { id: 1, name: "First Quest", icon: "🎯", description: "Completed first lesson", earned: true, earnedDate: "Jan 20, 2024" },
    { id: 2, name: "Loop Master", icon: "🔄", description: "Completed all loop lessons", earned: true, earnedDate: "Feb 5, 2024" },
    { id: 3, name: "Function Expert", icon: "⚙️", description: "Mastered functions", earned: true, earnedDate: "Feb 15, 2024" },
    { id: 4, name: "Quiz Champion", icon: "🏆", description: "Scored 100% on 5 quizzes", earned: true, earnedDate: "Feb 20, 2024" },
    { id: 5, name: "Week Warrior", icon: "🔥", description: "7-day learning streak", earned: true, earnedDate: "Today" },
    { id: 6, name: "Island Explorer", icon: "🗺️", description: "Completed 3 islands", earned: false, earnedDate: null },
    { id: 7, name: "Code Ninja", icon: "🥷", description: "Completed 50 lessons", earned: false, earnedDate: null },
    { id: 8, name: "Master Coder", icon: "👑", description: "Reached level 20", earned: false, earnedDate: null },
  ];

  const recentAchievements = [
    { type: "badge", title: "Earned: Week Warrior", description: "7-day learning streak!", date: "Today", icon: "🔥" },
    { type: "lesson", title: "Completed: Object-Oriented Programming", description: "Quiz score: 92%", date: "2 days ago", icon: "✅" },
    { type: "level", title: "Leveled Up to Level 12", description: "You earned 250 XP!", date: "3 days ago", icon: "⬆️" },
    { type: "quiz", title: "Quiz Completed: Advanced Functions", description: "Score: 88/100", date: "4 days ago", icon: "📝" },
  ];

  const stats = [
    { label: "Current Level", value: studentProfile.level, icon: Trophy, color: "from-purple-500 to-pink-500" },
    { label: "Total XP", value: `${studentProfile.xp}/${studentProfile.xpToNextLevel}`, icon: Zap, color: "from-yellow-400 to-orange-500" },
    { label: "Learning Streak", value: `${studentProfile.streak} days`, icon: Flame, color: "from-red-400 to-orange-500" },
    { label: "Lessons Done", value: `${studentProfile.completedLessons}/15`, icon: BookOpen, color: "from-blue-400 to-cyan-500" },
    { label: "Badges Earned", value: studentProfile.totalBadges, icon: Award, color: "from-green-400 to-emerald-500" },
    { label: "Avg Quiz Score", value: `${studentProfile.averageScore}%`, icon: "📊", color: "from-indigo-400 to-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 p-4 md:p-8">
      {/* Profile Header Card */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white shadow-xl mb-8 border-4 border-yellow-400">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-24 md:w-32 h-24 md:h-32 bg-white rounded-full flex items-center justify-center text-6xl md:text-7xl shadow-lg border-4 border-yellow-300">
                {studentProfile.avatar}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">{studentProfile.name}</h1>
                  <p className="text-indigo-100 text-lg font-semibold flex items-center gap-2">
                    <MapPin className="w-5 h-5" /> {studentProfile.school} • {studentProfile.grade}
                  </p>
                </div>
                <div className="text-center bg-white/20 rounded-lg px-6 py-4 backdrop-blur">
                  <p className="text-indigo-100 text-sm font-semibold">Current Level</p>
                  <p className="text-5xl font-bold">{studentProfile.level}</p>
                </div>
              </div>
              <p className="text-indigo-100 flex items-center gap-2">
                <Calendar className="w-5 h-5" /> Joined {studentProfile.joinDate}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 w-full md:w-auto">
              <Button className="flex-1 md:flex-none bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg flex items-center gap-2">
                <Edit2 className="w-5 h-5" /> Edit
              </Button>
              <Button className="flex-1 md:flex-none bg-white/20 hover:bg-white/30 text-white font-bold rounded-lg flex items-center gap-2 border border-white">
                <Share2 className="w-5 h-5" /> Share
              </Button>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-8 pt-8 border-t-2 border-white/30">
            <p className="text-indigo-100 text-lg italic">"{studentProfile.bio}"</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = typeof stat.icon === 'string' ? null : stat.icon;
            return (
              <div
                key={idx}
                className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
              >
                {Icon ? <Icon className="w-8 h-8 mb-3 opacity-80" /> : <span className="text-3xl mb-3 block">{stat.icon as string}</span>}
                <p className="text-sm font-semibold opacity-90">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* XP Progress */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border-2 border-yellow-300 dark:border-yellow-500 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-500" /> XP Progress to Next Level
            </h3>
            <span className="text-lg font-semibold text-gray-600 dark:text-gray-400">
              {studentProfile.xp} / {studentProfile.xpToNextLevel}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full transition-all duration-500 flex items-center justify-end pr-3"
              style={{ width: `${(studentProfile.xp / studentProfile.xpToNextLevel) * 100}%` }}
            >
              <span className="text-sm font-bold text-white">{Math.round((studentProfile.xp / studentProfile.xpToNextLevel) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Achievements */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border-2 border-green-300 dark:border-green-500">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Trophy className="w-7 h-7 text-green-500" /> Recent Achievements
            </h3>
            <div className="space-y-4">
              {recentAchievements.map((achievement, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-700 hover:shadow-md transition-shadow"
                >
                  <span className="text-3xl flex-shrink-0">{achievement.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 dark:text-white text-lg">{achievement.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{achievement.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges Showcase */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border-2 border-purple-300 dark:border-purple-500">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Award className="w-7 h-7 text-purple-500" /> Badges ({studentProfile.totalBadges}/8)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg text-center transition-all transform hover:scale-110 ${
                    badge.earned
                      ? "bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 border-2 border-yellow-400 dark:border-yellow-600"
                      : "bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 opacity-60"
                  }`}
                >
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <p className="font-bold text-sm text-gray-900 dark:text-white">{badge.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{badge.description}</p>
                  {badge.earned && (
                    <p className="text-xs text-green-600 dark:text-green-400 font-semibold mt-2">✓ {badge.earnedDate}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button
            onClick={() => setLocation("/archipelago")}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-lg"
          >
            🚀 Continue Learning
          </Button>
          <Button
            onClick={() => setLocation("/student/dashboard")}
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-lg"
          >
            📊 Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
