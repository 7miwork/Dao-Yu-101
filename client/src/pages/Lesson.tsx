import { useLocation, useRoute } from "wouter";
import { getIslandById, getLessonById } from "@/data/lessons";
import { BookOpen } from "lucide-react";
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-300 to-cyan-300">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-4">Quest Not Found</h1>
          <Button onClick={() => setLocation(`/island/${islandId}`)} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold">
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

  const progressPercent = (lesson.number / island.lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-200 to-cyan-300 relative overflow-hidden">
      {/* Navigation Header */}
      <nav className="relative z-50 border-b-4 border-yellow-400 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setLocation(`/island/${islandId}`)}
            className="flex items-center gap-3 hover:scale-110 transition-transform"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <span className="text-2xl">🎮</span>
            </div>
            <span className="text-3xl font-black text-white drop-shadow-lg">Dao-Yu-101</span>
          </button>
          <Button
            onClick={() => setLocation(`/island/${islandId}`)}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold border-2 border-white shadow-lg"
          >
            ← Back
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Lesson Header */}
        <div className="mb-8 animate-fadeInUp">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm font-bold text-white drop-shadow-md mb-6 flex-wrap">
            <button
              onClick={() => setLocation("/archipelago")}
              className="hover:underline"
            >
              🏝️ Archipelago
            </button>
            <span>/</span>
            <button
              onClick={() => setLocation(`/island/${islandId}`)}
              className="hover:underline"
            >
              {island.name.split(":")[1].trim()}
            </button>
            <span>/</span>
            <span>Quest {lesson.number}</span>
          </div>

          {/* Lesson Title and Badge */}
          <div className="mb-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 border-8 border-white shadow-2xl">
            <div className="flex items-center gap-6 mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 text-white font-black text-5xl flex items-center justify-center border-4 border-white shadow-lg drop-shadow-lg">
                {lesson.number}
              </div>
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-lg mb-2">
                  {lesson.title}
                </h1>
                <p className="text-xl text-white font-bold drop-shadow-md">
                  Phase: <span className="text-yellow-300">{lesson.phase}</span>
                </p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-3 bg-yellow-300 rounded-full font-bold text-gray-900 shadow-lg border-2 border-white">
                ⏱️ {lesson.duration} minutes
              </div>
              <div className="px-6 py-3 bg-green-400 rounded-full font-bold text-white shadow-lg border-2 border-white">
                🎯 Quest {lesson.number} of {island.lessons.length}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-full p-2 border-4 border-yellow-400 shadow-lg mb-2">
            <div
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-6 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-white font-bold drop-shadow-md text-center">
            Progress: {lesson.number} of {island.lessons.length} Quests
          </p>
        </div>

        {/* Lesson Content */}
        <div className="space-y-6 mb-12">
          {/* Objective */}
          <div className="bg-gradient-to-br from-blue-400 to-cyan-400 rounded-3xl p-8 border-6 border-white shadow-2xl animate-fadeInUp">
            <h2 className="text-3xl font-black text-white drop-shadow-lg mb-4 flex items-center gap-3">
              <span className="text-5xl">🎯</span>
              Your Mission
            </h2>
            <p className="text-xl text-white font-bold drop-shadow-md leading-relaxed">
              {lesson.objective}
            </p>
          </div>

          {/* What Students Learn */}
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl p-8 border-6 border-white shadow-2xl animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-3xl font-black text-white drop-shadow-lg mb-6 flex items-center gap-3">
              <span className="text-5xl">💡</span>
              What You'll Learn
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {lesson.whatStudentsLearn.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4 border-4 border-yellow-300 shadow-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl flex-shrink-0">✨</span>
                    <p className="font-bold text-gray-900">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-3xl p-8 border-6 border-white shadow-2xl animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-3xl font-black text-gray-900 drop-shadow-lg mb-4 flex items-center gap-3">
              <span className="text-5xl">📚</span>
              The Story
            </h2>
            <p className="text-lg text-gray-900 font-bold leading-relaxed drop-shadow-md">
              {lesson.explanation}
            </p>
          </div>

          {/* Student Activity */}
          <div className="bg-gradient-to-br from-pink-400 to-red-400 rounded-3xl p-8 border-6 border-white shadow-2xl animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-3xl font-black text-white drop-shadow-lg mb-4 flex items-center gap-3">
              <span className="text-5xl">⚡</span>
              Your Challenge
            </h2>
            <div className="bg-white rounded-2xl p-6 border-4 border-yellow-300 shadow-lg">
              <p className="text-lg text-gray-900 font-bold leading-relaxed">
                {lesson.studentActivity}
              </p>
            </div>
          </div>

          {/* Teacher Tip */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-8 border-6 border-white shadow-2xl animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
            <h2 className="text-3xl font-black text-white drop-shadow-lg mb-4 flex items-center gap-3">
              <span className="text-5xl">💬</span>
              Pro Tip
            </h2>
            <div className="bg-white rounded-2xl p-6 border-4 border-yellow-300 shadow-lg">
              <p className="text-lg text-gray-900 font-bold leading-relaxed">
                {lesson.teacherTip}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between mb-8 animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
          <Button
            onClick={handlePreviousLesson}
            disabled={!previousLesson}
            className={`flex-1 py-6 text-lg font-black border-4 rounded-2xl transform hover:scale-105 transition-all ${
              previousLesson
                ? "bg-blue-500 hover:bg-blue-600 text-white border-white shadow-lg"
                : "bg-gray-300 text-gray-600 border-gray-400 cursor-not-allowed"
            }`}
          >
            ⬅️ Previous Quest
          </Button>

          <Button
            onClick={() => setLocation(`/island/${islandId}`)}
            className="flex-1 py-6 text-lg font-black bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-4 border-white shadow-lg rounded-2xl transform hover:scale-105 transition-all"
          >
            🏝️ Back to Island
          </Button>

          <Button
            onClick={handleNextLesson}
            disabled={!nextLesson}
            className={`flex-1 py-6 text-lg font-black border-4 rounded-2xl transform hover:scale-105 transition-all ${
              nextLesson
                ? "bg-green-500 hover:bg-green-600 text-white border-white shadow-lg"
                : "bg-gray-300 text-gray-600 border-gray-400 cursor-not-allowed"
            }`}
          >
            Next Quest ➡️
          </Button>
        </div>

        {/* Completion Message */}
        {!nextLesson && (
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl p-8 md:p-12 border-8 border-white shadow-2xl text-center animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
            <div className="text-8xl mb-4 animate-bounce">🎉</div>
            <h3 className="text-4xl font-black text-white drop-shadow-lg mb-4">
              QUEST COMPLETE!
            </h3>
            <p className="text-2xl text-white font-bold drop-shadow-md mb-6">
              You've conquered all {island.lessons.length} quests on this island! You're a true Coding Legend! 🏆
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                onClick={() => setLocation("/archipelago")}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-black text-lg px-8 py-4 rounded-full border-4 border-white shadow-lg transform hover:scale-110 transition-all"
              >
                🗺️ Explore More Islands
              </Button>
              <Button
                onClick={() => setLocation(`/island/${islandId}`)}
                className="bg-white hover:bg-gray-100 text-gray-900 font-black text-lg px-8 py-4 rounded-full border-4 border-yellow-400 shadow-lg transform hover:scale-110 transition-all"
              >
                🔄 Review Quests
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
