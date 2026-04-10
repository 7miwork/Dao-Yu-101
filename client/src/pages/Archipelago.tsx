import { useLocation } from "wouter";
import { ISLANDS } from "@/data/lessons";
import { Zap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Archipelago() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-200 to-cyan-300 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating clouds */}
        <div className="absolute top-10 left-10 w-24 h-12 bg-white rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-32 h-16 bg-white rounded-full opacity-50 animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-14 bg-white rounded-full opacity-40 animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Navigation Header */}
      <nav className="relative z-50 border-b-4 border-yellow-400 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-3 hover:scale-110 transition-transform duration-200"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg border-4 border-white transform hover:rotate-12 transition-transform">
              <span className="text-2xl">🎮</span>
            </div>
            <span className="text-3xl font-black text-white drop-shadow-lg">Dao-Yu-101</span>
          </button>
          <Button
            onClick={() => setLocation("/")}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold border-2 border-white shadow-lg transform hover:scale-105 transition-transform"
          >
            ← Home
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Title and Intro */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white shadow-lg border-4 border-yellow-400 mb-6 transform hover:scale-105 transition-transform">
            <span className="text-3xl">🏝️</span>
            <span className="text-xl font-bold text-blue-600">Coding Archipelago</span>
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white drop-shadow-lg mb-4 leading-tight">
            Welcome to Your Adventure!
          </h1>
          <p className="text-2xl text-white drop-shadow-md font-bold max-w-2xl mx-auto mb-6">
            🗺️ Explore islands of learning, master coding challenges, and become a legendary developer!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="px-6 py-3 bg-yellow-300 rounded-full font-bold text-lg text-gray-900 shadow-lg">
              ⚔️ 15 Epic Quests
            </div>
            <div className="px-6 py-3 bg-green-400 rounded-full font-bold text-lg text-white shadow-lg">
              🏆 Earn Badges
            </div>
            <div className="px-6 py-3 bg-purple-400 rounded-full font-bold text-lg text-white shadow-lg">
              🎯 Level Up
            </div>
          </div>
        </div>

        {/* Islands Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {ISLANDS.map((island, idx) => (
            <div
              key={island.id}
              onClick={() => setLocation(`/island/${island.id}`)}
              className="group cursor-pointer transform hover:scale-110 transition-all duration-300 animate-fadeInUp"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Island Card */}
              <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl border-8 border-yellow-300 bg-gradient-to-b from-sky-300 to-cyan-200">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663478416494/22D8SNdaaK7GRVegDmfBBL/island-card-bg-JV6ziEsNwUPUErj9htqcAH.webp')`,
                  }}
                ></div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-6">
                  {/* Top - Island Icon */}
                  <div className="text-7xl drop-shadow-lg transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    {island.icon}
                  </div>

                  {/* Bottom - Info */}
                  <div className="space-y-3">
                    <h2 className="text-3xl font-black text-white drop-shadow-lg leading-tight">
                      {island.name.split(":")[1].trim()}
                    </h2>
                    <p className="text-white font-bold drop-shadow-md line-clamp-2">
                      {island.description}
                    </p>

                    {/* Stats */}
                    <div className="flex gap-3 flex-wrap">
                      <div className="px-4 py-2 bg-yellow-300 rounded-full font-bold text-gray-900 shadow-lg">
                        {island.lessons.length} Levels
                      </div>
                      <div className="px-4 py-2 bg-green-400 rounded-full font-bold text-white shadow-lg">
                        {island.lessons.length * 60}m
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-yellow-300 font-black text-lg drop-shadow-md group-hover:gap-4 transition-all">
                      <span>START QUEST</span>
                      <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* How to Play Section */}
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl p-8 md:p-12 border-8 border-white shadow-2xl mb-8">
          <h2 className="text-4xl md:text-5xl font-black text-white drop-shadow-lg mb-8 text-center">
            🎮 How to Play
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "1️⃣", title: "Choose an Island", desc: "Click on an island to see all available quests" },
              { num: "2️⃣", title: "Complete Levels", desc: "Work through each coding challenge step by step" },
              { num: "3️⃣", title: "Earn Rewards", desc: "Unlock badges and level up as you progress!" },
            ].map((step, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border-4 border-yellow-300 text-center transform hover:scale-105 transition-transform">
                <div className="text-6xl mb-3">{step.num}</div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-700 font-bold">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Banner */}
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl p-8 md:p-12 border-8 border-white shadow-2xl text-center">
          <p className="text-3xl md:text-4xl font-black text-white drop-shadow-lg mb-4">
            ✨ Ready to become a Coding Legend? ✨
          </p>
          <p className="text-xl text-white font-bold drop-shadow-md mb-6">
            Each island brings new challenges, new skills, and new adventures. Let's go!
          </p>
          <Button
            onClick={() => {
              if (ISLANDS.length > 0) {
                setLocation(`/island/${ISLANDS[0].id}`);
              }
            }}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-black text-xl px-8 py-4 rounded-full border-4 border-white shadow-lg transform hover:scale-110 transition-all"
          >
            🚀 START YOUR ADVENTURE
          </Button>
        </div>
      </section>
    </div>
  );
}
