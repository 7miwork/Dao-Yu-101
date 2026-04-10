import { useLocation } from "wouter";
import { ISLANDS } from "@/data/lessons";
import { ArrowRight, MapPin, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Archipelago() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Dao-Yu-101
            </span>
          </button>
          <Button
            onClick={() => setLocation("/")}
            variant="outline"
            className="border-gray-300 dark:border-gray-700"
          >
            ← Back Home
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            <span>Coding Archipelago</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            Welcome to the Archipelago
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore islands of learning, each filled with coding challenges, creative projects, and hands-on activities. Choose your starting island and begin your journey!
          </p>
        </div>

        {/* Islands Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {ISLANDS.map((island) => (
            <div
              key={island.id}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setLocation(`/island/${island.id}`)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${island.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>

              {/* Content */}
              <div className="relative p-8 h-full flex flex-col justify-between">
                {/* Icon and Title */}
                <div>
                  <div className="text-6xl mb-4">{island.icon}</div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {island.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {island.description}
                  </p>
                </div>

                {/* Lesson Count and CTA */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full"></span>
                    <span>{island.lessons.length} lessons available</span>
                  </div>
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold group-hover:gap-3 transition-all">
                    <span>Explore Island</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Hover Border Animation */}
              <div className={`absolute inset-0 border-2 border-transparent bg-gradient-to-br ${island.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}></div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 rounded-2xl p-8 border border-indigo-200 dark:border-indigo-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            How to Use the Archipelago
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-indigo-600 text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Choose an Island
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Click on an island card to explore its lessons and content.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Browse Lessons
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  View all lessons available on the island with descriptions and difficulty levels.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-cyan-600 text-white font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  Learn & Build
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Click a lesson to view full content and start learning with hands-on activities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
