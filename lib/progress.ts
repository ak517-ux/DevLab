// lib/progress.ts

export interface UserProgress {
  completedLessons: string[];
  completedModules: number[];
}

const PROGRESS_KEY = 'devlab_progress';

export function getUserProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return { completedLessons: [], completedModules: [] };
  }
  
  const saved = localStorage.getItem(PROGRESS_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return { completedLessons: [], completedModules: [] };
}

export function saveUserProgress(progress: UserProgress) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function completeLesson(lessonId: string) {
  const progress = getUserProgress();
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    saveUserProgress(progress);
  }
}

export function isLessonCompleted(lessonId: string): boolean {
  const progress = getUserProgress();
  return progress.completedLessons.includes(lessonId);
}

export function getModuleProgress(moduleId: number, lessons: { id: string }[]): number {
  const progress = getUserProgress();
  const completedInModule = lessons.filter(lesson => 
    progress.completedLessons.includes(lesson.id)
  ).length;
  return lessons.length > 0 ? (completedInModule / lessons.length) * 100 : 0;
}

export function getCourseProgress(modules: { lessons: { id: string }[] }[]): number {
  const progress = getUserProgress();
  let totalLessons = 0;
  let completedCount = 0;
  
  modules.forEach(module => {
    module.lessons.forEach(lesson => {
      totalLessons++;
      if (progress.completedLessons.includes(lesson.id)) {
        completedCount++;
      }
    });
  });
  
  return totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
}