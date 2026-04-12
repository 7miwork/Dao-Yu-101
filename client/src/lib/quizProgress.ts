export interface QuizAttempt {
  lessonId: number;
  score: number;
  percentage: number;
  xpEarned: number;
  passed: boolean;
  timestamp: number;
  attemptNumber: number;
}

export interface StudentProgress {
  totalXP: number;
  completedLessons: number[];
  quizAttempts: QuizAttempt[];
  lastUpdated: number;
}

const STORAGE_KEY = 'dao-yu-student-progress';
const DEFAULT_PROGRESS: StudentProgress = {
  totalXP: 0,
  completedLessons: [],
  quizAttempts: [],
  lastUpdated: Date.now()
};

export function getProgress(): StudentProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { ...DEFAULT_PROGRESS };
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading progress from localStorage:', error);
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveProgress(progress: StudentProgress): void {
  try {
    progress.lastUpdated = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress to localStorage:', error);
  }
}

export function recordQuizAttempt(
  lessonId: number,
  score: number,
  totalQuestions: number,
  xpEarned: number,
  passingScore: number
): QuizAttempt {
  const progress = getProgress();
  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= passingScore;

  // Find previous attempts for this lesson
  const previousAttempts = progress.quizAttempts.filter(a => a.lessonId === lessonId);
  const attemptNumber = previousAttempts.length + 1;

  const attempt: QuizAttempt = {
    lessonId,
    score,
    percentage,
    xpEarned,
    passed,
    timestamp: Date.now(),
    attemptNumber
  };

  progress.quizAttempts.push(attempt);
  progress.totalXP += xpEarned;

  // Mark lesson as completed if passed
  if (passed && !progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
  }

  saveProgress(progress);
  return attempt;
}

export function getQuizAttemptsForLesson(lessonId: number): QuizAttempt[] {
  const progress = getProgress();
  return progress.quizAttempts.filter(a => a.lessonId === lessonId);
}

export function getBestAttemptForLesson(lessonId: number): QuizAttempt | null {
  const attempts = getQuizAttemptsForLesson(lessonId);
  if (attempts.length === 0) return null;

  // Return the attempt with highest score
  return attempts.reduce((best, current) => 
    current.percentage > best.percentage ? current : best
  );
}

export function isLessonCompleted(lessonId: number): boolean {
  const progress = getProgress();
  return progress.completedLessons.includes(lessonId);
}

export function getTotalXP(): number {
  return getProgress().totalXP;
}

export function getCompletedLessonsCount(): number {
  return getProgress().completedLessons.length;
}

export function getCompletionPercentage(totalLessons: number): number {
  const completed = getCompletedLessonsCount();
  return Math.round((completed / totalLessons) * 100);
}

export function resetProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting progress:', error);
  }
}

export function exportProgress(): string {
  const progress = getProgress();
  return JSON.stringify(progress, null, 2);
}

export function importProgress(jsonData: string): boolean {
  try {
    const imported = JSON.parse(jsonData);
    // Validate structure
    if (
      typeof imported.totalXP === 'number' &&
      Array.isArray(imported.completedLessons) &&
      Array.isArray(imported.quizAttempts)
    ) {
      saveProgress(imported);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error importing progress:', error);
    return false;
  }
}
