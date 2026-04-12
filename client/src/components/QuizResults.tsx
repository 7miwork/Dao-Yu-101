import { useState, useEffect } from 'react';
import { Trophy, Zap, Star, ChevronRight } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  percentage: number;
  xpEarned: number;
  passingScore: number;
  lessonTitle: string;
  onContinue: () => void;
}

export default function QuizResults({
  score,
  totalQuestions,
  percentage,
  xpEarned,
  passingScore,
  lessonTitle,
  onContinue
}: QuizResultsProps) {
  const { t } = useI18n();
  const [showAnimation, setShowAnimation] = useState(false);
  const [displayXP, setDisplayXP] = useState(0);

  const passed = percentage >= passingScore;

  useEffect(() => {
    setShowAnimation(true);
    // Animate XP counter
    const interval = setInterval(() => {
      setDisplayXP(prev => {
        if (prev < xpEarned) {
          return Math.min(prev + Math.ceil(xpEarned / 20), xpEarned);
        }
        return prev;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [xpEarned]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6">
      {/* Result Header */}
      <div className={`text-center mb-8 transform transition-all duration-700 ${
        showAnimation ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      }`}>
        {passed ? (
          <>
            <div className="text-6xl md:text-7xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              {t('quiz.passed', 'Quiz Passed!')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('quiz.excellentWork', 'Excellent work, adventurer!')}
            </p>
          </>
        ) : (
          <>
            <div className="text-6xl md:text-7xl mb-4">📚</div>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">
              {t('quiz.tryAgain', 'Try Again')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('quiz.keepLearning', 'Keep learning and try again!')}
            </p>
          </>
        )}
      </div>

      {/* Results Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        {/* Score Card */}
        <div className={`bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-white shadow-lg transform transition-all duration-700 ${
          showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold opacity-90">Score</span>
            <Trophy className="w-5 h-5" />
          </div>
          <p className="text-4xl font-bold">{score}/{totalQuestions}</p>
          <p className="text-xs opacity-75 mt-1">Questions Correct</p>
        </div>

        {/* Percentage Card */}
        <div className={`bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-6 text-white shadow-lg transform transition-all duration-700 delay-100 ${
          showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold opacity-90">Accuracy</span>
            <Star className="w-5 h-5" />
          </div>
          <p className="text-4xl font-bold">{percentage}%</p>
          <p className="text-xs opacity-75 mt-1">
            {passed ? '✅ Passed' : '❌ Not Passed'}
          </p>
        </div>

        {/* XP Card */}
        <div className={`bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg transform transition-all duration-700 delay-200 ${
          showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold opacity-90">XP Earned</span>
            <Zap className="w-5 h-5" />
          </div>
          <p className="text-4xl font-bold">+{displayXP}</p>
          <p className="text-xs opacity-75 mt-1">Experience Points</p>
        </div>
      </div>

      {/* Lesson Info */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 md:p-8 shadow-lg border-2 border-indigo-300 dark:border-indigo-600 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          📖 Lesson: {lessonTitle}
        </h3>

        {/* Performance Breakdown */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {t('quiz.performance', 'Performance')}
              </span>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                {percentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  passed
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                    : 'bg-gradient-to-r from-amber-400 to-orange-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Passing Score Info */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {t('quiz.passingScore', 'Passing Score')}
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {passingScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Feedback Messages */}
      {passed && (
        <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-300 dark:border-green-600 rounded-xl p-4 md:p-6 mb-8">
          <p className="text-green-800 dark:text-green-200 font-semibold mb-2">
            🌟 {t('quiz.greatJob', 'Great Job!')}
          </p>
          <p className="text-green-700 dark:text-green-300 text-sm">
            {t('quiz.passedMessage', 'You have successfully completed this lesson! Your XP has been added to your profile.')}
          </p>
        </div>
      )}

      {!passed && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-600 rounded-xl p-4 md:p-6 mb-8">
          <p className="text-amber-800 dark:text-amber-200 font-semibold mb-2">
            💡 {t('quiz.reviewLesson', 'Review & Try Again')}
          </p>
          <p className="text-amber-700 dark:text-amber-300 text-sm">
            {t('quiz.notPassedMessage', 'Review the lesson content and try the quiz again. You earned partial XP for your effort!')}
          </p>
        </div>
      )}

      {/* Continue Button */}
      <button
        onClick={onContinue}
        className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl"
      >
        <span>
          {passed ? '🏝️ Continue to Next Lesson' : '📚 Review Lesson'}
        </span>
        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
