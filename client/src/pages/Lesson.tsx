import { useLocation, useRoute } from "wouter";
import { getIslandById, getLessonById } from "@/data/lessons";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Target, Lightbulb, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Lesson() {
  const [match, params] = useRoute("/island/:islandId/lesson/:lessonId");
  const [, setLocation] = useLocation();

  if (!match) return null;

  const islandId = parseInt(params?.islandId || "0");
  const lessonId = parseInt(params?.lessonId || "0");

  const island = getIslandById(islandId);
  const lesson = getLessonById(islandId, lessonId);

  if (!island || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Lesson Not Found</h1>
          <Button onClick={() => setLocation(`/island/${islandId}`)} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Back to Island
          </Button>
        </div>
      </div>
    );
  }

  // Get previous and next lessons
  const currentIndex = island.lessons.findIndex(l => l.id === lesson.id);
  const previousLesson = currentIndex > 0 ? island.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < island.lessons.length - 1 ? island.lessons[currentIndex + 1] : null;

  const handlePreviousLesson = () => {
    if (previousLesson) {
      setLocation(`/island/${islandId}/lesson/${previousLesson.id}`);
    }
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      setLocation(`/island/${islandId}/lesson/${nextLesson.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation(`/island/${islandId}`)}
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
            onClick={() => setLocation(`/island/${islandId}`)}
            variant="outline"
            className="border-gray-300 dark:border-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Island
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Lesson Header */}
        <div className="mb-12 animate-fadeInUp">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <button
              onClick={() => setLocation("/archipelago")}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Archipelago
            </button>
            <span>/</span>
            <button
              onClick={() => setLocation(`/island/${islandId}`)}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              {island.name}
            </button>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-semibold">Lesson {lesson.number}</span>
          </div>

          {/* Lesson Title and Meta */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 text-white font-bold text-lg">
                {lesson.number}
              </span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                  {lesson.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Phase: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{lesson.phase}</span>
                </p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-700">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700 dark:text-gray-300">{lesson.duration} minutes</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-700">
                <Target className="w-5 h-5 text-indigo-500" />
                <span className="text-gray-700 dark:text-gray-300">Lesson {lesson.number} of {island.lessons.length}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
            <div
              className="bg-gradient-to-r from-indigo-600 to-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${(lesson.number / island.lessons.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Progress: {lesson.number} of {island.lessons.length} lessons
          </p>
        </div>

        {/* Lesson Content */}
        <div className="space-y-8">
          {/* Objective */}
          <section className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Objective</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {lesson.objective}
            </p>
          </section>

          {/* What Students Learn */}
          <section className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">What Students Learn</h2>
            </div>
            <ul className="space-y-3">
              {lesson.whatStudentsLearn.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-semibold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Explanation */}
          <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Explanation</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {lesson.explanation}
            </p>
          </section>

          {/* Student Activity */}
          <section className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Student Activity</h2>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-6 rounded">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {lesson.studentActivity}
              </p>
            </div>
          </section>

          {/* Teacher Tip */}
          <section className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Teacher Tip</h2>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/20 border-l-4 border-purple-500 p-6 rounded">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {lesson.teacherTip}
              </p>
            </div>
          </section>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-between">
          <Button
            onClick={handlePreviousLesson}
            disabled={!previousLesson}
            className={`flex-1 py-6 text-lg ${
              previousLesson
                ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous Lesson
          </Button>

          <Button
            onClick={() => setLocation(`/island/${islandId}`)}
            className="flex-1 py-6 text-lg bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Back to Lesson List
          </Button>

          <Button
            onClick={handleNextLesson}
            disabled={!nextLesson}
            className={`flex-1 py-6 text-lg ${
              nextLesson
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
            }`}
          >
            Next Lesson
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Completion Message */}
        {!nextLesson && (
          <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-8 border border-green-200 dark:border-green-800 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              🎉 You've reached the final lesson!
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Congratulations on completing all {island.lessons.length} lessons in {island.name}. You've learned valuable programming skills!
            </p>
            <Button
              onClick={() => setLocation("/archipelago")}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Explore More Islands
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
