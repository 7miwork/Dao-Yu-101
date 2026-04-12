import { useState, useEffect } from 'react';
import { ChevronRight, CheckCircle, XCircle, Zap } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';
import { QuizQuestion, LessonQuiz } from '@/data/quizzes';
import { recordQuizAttempt } from '@/lib/quizProgress';

interface QuizProps {
  quiz: LessonQuiz;
  onComplete: (score: number, percentage: number, xpEarned: number) => void;
  onSkip?: () => void;
}

export default function Quiz({ quiz, onComplete, onSkip }: QuizProps) {
  const { t } = useI18n();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const question = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  const handleSelectAnswer = (index: number) => {
    if (!isAnswered) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setAnswers([...answers, selectedAnswer]);
    setIsAnswered(true);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Calculate final score
      let correct = 0;
      for (let i = 0; i < answers.length; i++) {
        if (answers[i] === quiz.questions[i].correctAnswer) {
          correct++;
        }
      }
      const percentage = Math.round((correct / quiz.questions.length) * 100);
      const passed = percentage >= quiz.passingScore;
      const xpEarned = passed ? quiz.xpReward : Math.floor(quiz.xpReward * 0.5);

      // Record attempt in localStorage
      recordQuizAttempt(quiz.lessonId, correct, quiz.questions.length, xpEarned, quiz.passingScore);

      onComplete(correct, percentage, xpEarned);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowFeedback(false);
    }
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6">
      {/* Quiz Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            🎯 {t('quiz.title', 'Quiz')}
          </h2>
          <span className="text-sm md:text-base font-semibold text-indigo-600 dark:text-indigo-400">
            {currentQuestion + 1} / {quiz.questions.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-lg border-2 border-indigo-300 dark:border-indigo-600 mb-8">
        {/* Difficulty Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
            question.difficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {question.difficulty === 'easy' ? '⭐ Easy' :
             question.difficulty === 'medium' ? '⭐⭐ Medium' :
             '⭐⭐⭐ Hard'}
          </span>
        </div>

        {/* Question Text */}
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {question.question}
        </h3>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              disabled={isAnswered}
              className={`w-full p-4 md:p-5 rounded-xl text-left font-semibold transition-all duration-200 border-2 ${
                selectedAnswer === index
                  ? isAnswered
                    ? isCorrect
                      ? 'bg-green-100 border-green-500 text-green-900 dark:bg-green-900 dark:border-green-400 dark:text-green-100'
                      : 'bg-red-100 border-red-500 text-red-900 dark:bg-red-900 dark:border-red-400 dark:text-red-100'
                    : 'bg-indigo-100 border-indigo-500 text-indigo-900 dark:bg-indigo-900 dark:border-indigo-400 dark:text-indigo-100'
                  : isAnswered && index === question.correctAnswer
                  ? 'bg-green-100 border-green-500 text-green-900 dark:bg-green-900 dark:border-green-400 dark:text-green-100'
                  : 'bg-gray-100 border-gray-300 text-gray-900 hover:bg-gray-200 dark:bg-slate-700 dark:border-slate-600 dark:text-gray-100 dark:hover:bg-slate-600'
              } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {isAnswered && selectedAnswer === index && (
                  isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500" />
                  )
                )}
                {isAnswered && index === question.correctAnswer && selectedAnswer !== index && (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`p-4 md:p-5 rounded-xl mb-6 border-2 ${
            isCorrect
              ? 'bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-600'
              : 'bg-red-50 border-red-300 dark:bg-red-900/20 dark:border-red-600'
          }`}>
            <p className={`font-semibold mb-2 ${
              isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
            }`}>
              {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
            </p>
            <p className={`text-sm md:text-base ${
              isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
            }`}>
              {question.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-between">
        {onSkip && !isAnswered && (
          <button
            onClick={onSkip}
            className="px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold transition-colors"
          >
            {t('common.cancel', 'Skip Quiz')}
          </button>
        )}
        <div className="flex-1 flex gap-4">
          {isAnswered && (
            <button
              onClick={handleNextQuestion}
              className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              {isLastQuestion ? (
                <>
                  <span>🏁 {t('quiz.finish', 'Finish Quiz')}</span>
                </>
              ) : (
                <>
                  <span>{t('common.next', 'Next Question')}</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          )}
          {!isAnswered && (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>✓ {t('quiz.submit', 'Submit Answer')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
