import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useI18n } from "@/contexts/I18nContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Home() {
  const [, setLocation] = useLocation();
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-200 to-cyan-300 relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none hidden sm:block">
        <div className="absolute top-10 left-10 w-24 h-12 bg-white rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-32 h-16 bg-white rounded-full opacity-50 animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-14 bg-white rounded-full opacity-40 animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Navigation Header */}
      <nav className="relative z-50 border-b-4 border-yellow-400 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-2">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 sm:gap-3 hover:scale-110 transition-transform duration-200 flex-shrink-0"
          >
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg border-4 border-white transform hover:rotate-12 transition-transform">
              <span className="text-xl sm:text-2xl">🎮</span>
            </div>
            <span className="text-xl sm:text-3xl font-black text-white drop-shadow-lg hidden xs:inline">Dao-Yu-101</span>
          </button>
          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSwitcher />
            <Button
              onClick={() => setLocation("/login")}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold border-2 border-white shadow-lg text-xs sm:text-sm px-2 sm:px-4 py-2"
            >
              🔐 SIGN IN
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 md:py-16 lg:py-20">
        {/* Title and Intro */}
        <div className="text-center mb-8 md:mb-16 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white shadow-lg border-4 border-yellow-400 mb-4 sm:mb-6 transform hover:scale-105 transition-transform">
            <span className="text-2xl sm:text-3xl">🏝️</span>
            <span className="text-sm sm:text-xl font-bold text-blue-600">Coding Archipelago</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-lg mb-3 sm:mb-4 leading-tight">
            Welcome to Your Adventure!
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white drop-shadow-md font-bold max-w-2xl mx-auto mb-4 sm:mb-6 px-2">
            🗺️ Explore islands of learning, master coding challenges, and become a legendary developer!
          </p>
          <div className="flex justify-center gap-2 sm:gap-4 flex-wrap px-2 mb-6 sm:mb-8">
            <div className="px-3 sm:px-6 py-2 sm:py-3 bg-yellow-300 rounded-full font-bold text-xs sm:text-lg text-gray-900 shadow-lg">
              ⚔️ 15 Quests
            </div>
            <div className="px-3 sm:px-6 py-2 sm:py-3 bg-green-400 rounded-full font-bold text-xs sm:text-lg text-white shadow-lg">
              🏆 Badges
            </div>
            <div className="px-3 sm:px-6 py-2 sm:py-3 bg-purple-400 rounded-full font-bold text-xs sm:text-lg text-white shadow-lg">
              🎯 Level Up
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            <Button
              onClick={() => setLocation("/archipelago")}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-black text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full border-4 border-white shadow-lg transform hover:scale-110 transition-all"
            >
              🚀 START ADVENTURE
            </Button>
            <Button
              onClick={() => setLocation("/login")}
              className="bg-white hover:bg-gray-100 text-gray-900 font-black text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full border-4 border-yellow-400 shadow-lg transform hover:scale-110 transition-all"
            >
              🔐 SIGN IN
            </Button>
          </div>
        </div>

        {/* How to Play Section */}
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border-6 sm:border-8 border-white shadow-2xl mb-6 md:mb-8 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-lg mb-6 md:mb-8 text-center">
            🎮 How to Play
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { num: "1️⃣", title: "Choose an Island", desc: "Click on an island to see all available quests" },
              { num: "2️⃣", title: "Complete Levels", desc: "Work through each coding challenge step by step" },
              { num: "3️⃣", title: "Earn Rewards", desc: "Unlock badges and level up as you progress!" },
            ].map((step, idx) => (
              <div key={idx} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border-4 border-yellow-300 text-center transform hover:scale-105 transition-transform animate-fadeInUp" style={{ animationDelay: `${0.15 + idx * 0.05}s` }}>
                <div className="text-5xl sm:text-6xl mb-2 sm:mb-3">{step.num}</div>
                <h3 className="text-lg sm:text-2xl font-black text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-700 font-bold text-sm sm:text-base">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 md:mb-8">
          {[
            {
              icon: "⚡",
              title: "Gamified Learning",
              desc: "Experience learning like never before with quests, badges, and levels",
            },
            {
              icon: "👥",
              title: "Multi-Role System",
              desc: "Student, teacher, parent, and admin dashboards for everyone",
            },
            {
              icon: "🏆",
              title: "Achievement System",
              desc: "Earn badges, climb leaderboards, and celebrate victories",
            },
            {
              icon: "🌍",
              title: "Global Learning",
              desc: "Connect with students worldwide in a shared learning community",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-yellow-300 to-orange-300 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-6 border-white shadow-2xl transform hover:scale-105 transition-all animate-fadeInUp"
              style={{ animationDelay: `${0.25 + idx * 0.05}s` }}
            >
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 drop-shadow-md mb-2">{feature.title}</h3>
              <p className="text-gray-900 font-bold text-sm sm:text-base">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border-6 sm:border-8 border-white shadow-2xl animate-fadeInUp" style={{ animationDelay: "0.45s" }}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-lg mb-6 md:mb-8 text-center">
            ✨ Why Choose Dao-Yu-101? ✨
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border-4 border-yellow-300 shadow-lg">
              <h4 className="text-lg sm:text-2xl font-black text-gray-900 mb-3 sm:mb-4">🎯 For Students:</h4>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "Engaging island-based learning",
                  "Instant feedback on challenges",
                  "Earn badges and rewards",
                  "Compete on leaderboards",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 font-bold text-gray-700 text-sm sm:text-base">
                    <span className="text-xl">✨</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border-4 border-green-400 shadow-lg">
              <h4 className="text-lg sm:text-2xl font-black text-gray-900 mb-3 sm:mb-4">👨‍🏫 For Teachers:</h4>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "Track student progress",
                  "Manage classes easily",
                  "Customize learning paths",
                  "Real-time analytics",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 font-bold text-gray-700 text-sm sm:text-base">
                    <span className="text-xl">🚀</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border-6 sm:border-8 border-white shadow-2xl text-center">
          <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white drop-shadow-lg mb-3 sm:mb-4">
            🎉 Ready to Start Your Journey? 🎉
          </p>
          <p className="text-base sm:text-lg md:text-xl text-white font-bold drop-shadow-md mb-4 sm:mb-6 px-2">
            Join thousands of students learning to code through epic island adventures!
          </p>
          <Button
            onClick={() => setLocation("/archipelago")}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-black text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full border-4 border-white shadow-lg transform hover:scale-110 transition-all"
          >
            🗺️ EXPLORE ARCHIPELAGO
          </Button>
        </div>
      </section>
    </div>
  );
}
