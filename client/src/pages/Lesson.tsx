import { useState } from "react";
import { useLocation, useRoute } from "wouter";
import { getIslandById, getLessonById } from "@/data/lessons";
import { getQuizForLesson } from "@/data/quizzes";
import { Button } from "@/components/ui/button";
import Quiz from "@/components/Quiz";
import QuizResults from "@/components/QuizResults";
import { useI18n } from "@/contexts/I18nContext";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

export default function Lesson() {
  const [match, params] = useRoute("/island/:islandId/lesson/:lessonId");
  const [, setLocation] = useLocation();
  const { t } = useI18n();
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResults, setQuizResults] = useState<{
    score: number;
    percentage: number;
    xpEarned: number;
  } | null>(null);

  if (!match) return null;

  const islandId = parseInt(params?.islandId || "0");
  const lessonId = parseInt(params?.lessonId || "0");

  const island = getIslandById(islandId);
  const lesson = getLessonById(islandId, lessonId);
  const quiz = getQuizForLesson(lessonId);

  if (!island || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-300 to-cyan-300 px-4">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg mb-4">{t('errors.pageNotFound', 'Quest Not Found')}</h1>
          <Button onClick={() => setLocation(`/island/${islandId}`)} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold">
            {t('archipelago.backToIsland', 'Back to Island')}
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

  const handleQuizComplete = (score: number, percentage: number, xpEarned: number) => {
    setQuizResults({ score, percentage, xpEarned });
  };

  const handleContinueAfterQuiz = () => {
    if (nextLesson) {
      setLocation(`/island/${islandId}/lesson/${nextLesson.id}`);
    } else {
      setLocation(`/island/${islandId}`);
    }
  };

  const progressPercent = (lesson.number / island.lessons.length) * 100;

  // Show Quiz
  if (showQuiz && quiz && !quizResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => setShowQuiz(false)}
              className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-semibold mb-4"
            >
              <ChevronLeft className="w-5 h-5" />
              {t('common.back', 'Back to Lesson')}
            </button>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              🎯 {t('quiz.title', 'Quiz')}: {lesson.title}
            </h1>
          </div>

          {/* Quiz Component */}
          <Quiz
            quiz={quiz}
            onComplete={handleQuizComplete}
            onSkip={() => setShowQuiz(false)}
          />
        </div>
      </div>
    );
  }

  // Show Quiz Results
  if (quizResults && quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <QuizResults
            score={quizResults.score}
            totalQuestions={quiz.questions.length}
            percentage={quizResults.percentage}
            xpEarned={quizResults.xpEarned}
            passingScore={quiz.passingScore}
            lessonTitle={lesson.title}
            onContinue={handleContinueAfterQuiz}
          />
        </div>
      </div>
    );
  }

  // Show Lesson Content
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-200 to-cyan-300 relative overflow-hidden">
      {/* Navigation Header */}
      <nav className="relative z-50 border-b-4 border-yellow-400 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-2">
          <button
            onClick={() => setLocation(`/island/${islandId}`)}
            className="flex items-center gap-2 sm:gap-3 hover:scale-110 transition-transform flex-shrink-0"
          >
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <span className="text-xl sm:text-2xl">🏝️</span>
            </div>
            <span className="text-xl sm:text-3xl font-black text-white drop-shadow-lg hidden xs:inline">Dao-Yu-101</span>
          </button>
          <Button
            onClick={() => setLocation(`/island/${islandId}`)}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold border-2 border-white shadow-lg text-xs sm:text-sm px-2 sm:px-4 py-2"
          >
            ← {t('common.back', 'Back')}
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Lesson Header */}
        <div className="mb-6 sm:mb-8 animate-fadeInUp">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white drop-shadow-md mb-4 sm:mb-6 flex-wrap">
            <button
              onClick={() => setLocation("/archipelago")}
              className="hover:underline"
            >
              🏝️ {t('archipelago.codingArchipelago', 'Coding Archipelago')}
            </button>
            <span>→</span>
            <button
              onClick={() => setLocation(`/island/${islandId}`)}
              className="hover:underline"
            >
              {island.name}
            </button>
            <span>→</span>
            <span>{lesson.title}</span>
          </div>

          {/* Progress Bar */}
          <div className="mb-4 sm:mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl sm:text-4xl font-black text-white drop-shadow-lg">
                {lesson.number}. {lesson.title}
              </h2>
              <span className="text-xs sm:text-sm font-bold text-white drop-shadow-md bg-black/30 px-3 py-1 rounded-full">
                {lesson.number}/{island.lessons.length}
              </span>
            </div>
            <div className="w-full bg-white/40 rounded-full h-3 overflow-hidden border-2 border-white shadow-lg">
              <div
                className="bg-gradient-to-r from-yellow-300 to-orange-400 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Lesson Content Cards */}
        <div className="space-y-4 sm:space-y-6 mb-8">
          {/* Objective */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border-4 border-blue-400 hover:shadow-xl transition-shadow animate-slideInUp">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🎯</span>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{t('lesson.objective', 'Objective')}</h3>
            </div>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{lesson.objective}</p>
          </div>

          {/* What You Learn */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border-4 border-green-400 hover:shadow-xl transition-shadow animate-slideInUp" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">📚</span>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{t('lesson.whatYouLearn', 'What You\'ll Learn')}</h3>
            </div>
            <ul className="text-gray-700 text-sm sm:text-base leading-relaxed space-y-2">
              {lesson.whatStudentsLearn.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-green-500 font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Explanation */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border-4 border-purple-400 hover:shadow-xl transition-shadow animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">📖</span>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{t('lesson.explanation', 'The Story')}</h3>
            </div>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{lesson.explanation}</p>
          </div>

          {/* Student Activity */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border-4 border-orange-400 hover:shadow-xl transition-shadow animate-slideInUp" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🎮</span>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{t('lesson.studentActivity', 'Your Challenge')}</h3>
            </div>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{lesson.studentActivity}</p>
          </div>

          {/* Teacher Tip */}
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-4 sm:p-6 shadow-lg border-4 border-yellow-400 hover:shadow-xl transition-shadow animate-slideInUp" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">💡</span>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{t('lesson.teacherTip', 'Pro Tip')}</h3>
            </div>
            <p className="text-gray-800 text-sm sm:text-base leading-relaxed">{lesson.teacherTip}</p>
          </div>
        </div>

        {/* Quiz Button */}
        {quiz && !showQuiz && (
          <div className="mb-8 animate-slideInUp" style={{ animationDelay: '0.5s' }}>
            <button
              onClick={() => setShowQuiz(true)}
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 text-lg border-4 border-white"
            >
              <span>🎯 {t('quiz.startQuiz', 'Start Quiz')}</span>
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 sm:gap-4 mb-8 animate-slideInUp" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={handlePreviousLesson}
            disabled={!previousLesson}
            className="flex-1 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 border-2 border-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">{t('lesson.previousLesson', 'Previous')}</span>
          </button>

          <button
            onClick={handleNextLesson}
            disabled={!nextLesson}
            className="flex-1 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 border-2 border-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="hidden sm:inline">{t('lesson.nextLesson', 'Next')}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
