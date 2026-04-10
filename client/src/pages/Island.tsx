import { useLocation, useRoute } from "wouter";
import { getIslandById } from "@/data/lessons";
import { ArrowRight, BookOpen, Clock, Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Island() {
  const [match, params] = useRoute("/island/:id");
  const [, setLocation] = useLocation();
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  if (!match) return null;

  const islandId = parseInt(params?.id || "0");
  const island = getIslandById(islandId);

  if (!island) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Island Not Found</h1>
          <Button onClick={() => setLocation("/archipelago")} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Back to Archipelago
          </Button>
        </div>
      </div>
    );
  }

  // Group lessons by phase
  const lessonsByPhase = island.lessons.reduce((acc, lesson) => {
    if (!acc[lesson.phase]) {
      acc[lesson.phase] = [];
    }
    acc[lesson.phase].push(lesson);
    return acc;
  }, {} as Record<string, typeof island.lessons>);

  const phases = Object.keys(lessonsByPhase);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation("/archipelago")}
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
            onClick={() => setLocation("/archipelago")}
            variant="outline"
            className="border-gray-300 dark:border-gray-700"
          >
            ← Back to Archipelago
          </Button>
        </div>
      </nav>

      {/* Island Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="mb-12 animate-fadeInUp">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-6xl">{island.icon}</div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                {island.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {island.description}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Lessons</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {island.lessons.length}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Duration</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {island.lessons.length * 60}m
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-indigo-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Phases</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {phases.length}
              </p>
            </div>
          </div>
        </div>

        {/* Lessons by Phase */}
        <div className="space-y-6">
          {phases.map((phase) => (
            <div key={phase} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              {/* Phase Header */}
              <button
                onClick={() => setExpandedPhase(expandedPhase === phase ? null : phase)}
                className="w-full bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 hover:from-indigo-100 hover:to-blue-100 dark:hover:from-indigo-900/50 dark:hover:to-blue-900/50 px-6 py-4 flex items-center justify-between transition-colors"
              >
                <div className="text-left">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {phase}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {lessonsByPhase[phase].length} lessons
                  </p>
                </div>
                <ChevronRight
                  className={`w-6 h-6 text-indigo-600 dark:text-indigo-400 transition-transform ${
                    expandedPhase === phase ? "rotate-90" : ""
                  }`}
                />
              </button>

              {/* Lessons List */}
              {expandedPhase === phase && (
                <div className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-slate-800">
                  {lessonsByPhase[phase].map((lesson) => (
                    <div
                      key={lesson.id}
                      onClick={() => setLocation(`/island/${islandId}/lesson/${lesson.id}`)}
                      className="p-6 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex-shrink-0">
                              {lesson.number}
                            </span>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {lesson.title}
                            </h3>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 ml-11 text-sm text-gray-600 dark:text-gray-400">
                            <span className="inline-flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {lesson.duration} min
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                              {lesson.phase}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Info */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Learning Path
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This island is designed to take you from beginner to advanced programmer. Each lesson builds on the previous one, introducing new concepts and challenges.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">What You'll Learn:</h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  Block-based programming fundamentals
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  Loops and control flow
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  Conditional logic and decision-making
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Projects:</h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Build structures and paths
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Navigate mazes and obstacles
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Design and code a complete village
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
