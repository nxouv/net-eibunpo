'use client';

import { TopHeader } from '@/components/Header/Header';
import { LessonCard } from '@/components/Card/Card';
import { useProgress } from '@/hooks/useProgress';
import { getLessonsByCategory, getCategoryStats } from '@/lib/lessons';
import type { Category } from '@/lib/types';
import styles from './page.module.css';

export default function HomePage() {
  const { isLoaded, isLessonComplete, resetProgress, getCompletedCount } = useProgress();

  const categoryStats = getCategoryStats();
  const totalLessons = categoryStats.reduce((sum, c) => sum + c.total, 0);

  // Get all lesson IDs for counting
  const allLessonIds = categoryStats.flatMap(({ category }) =>
    getLessonsByCategory(category).map(l => l.id)
  );
  const completedCount = isLoaded ? getCompletedCount(allLessonIds) : 0;

  const handleReset = () => {
    if (confirm('進捗をリセットしますか？この操作は取り消せません。')) {
      resetProgress();
    }
  };

  return (
    <>
      <TopHeader completedCount={completedCount} totalCount={totalLessons} />
      <main className={`container ${styles.main}`}>
        <section className={styles.hero}>
          <h1 className="visually-hidden">ネット英文法 - ネットで使える英語の文法学習サイト</h1>
          <p className={styles.heroTagline}>
            SNS・配信・チャットで使う英語を学ぶ
          </p>
        </section>

        {categoryStats.map(({ category, label, total }) => (
          <CategorySection
            key={category}
            category={category}
            label={label}
            total={total}
            isLessonComplete={isLessonComplete}
            getCompletedCount={getCompletedCount}
            isLoaded={isLoaded}
          />
        ))}

        <div className={styles.resetButton}>
          <button
            className={styles.resetButtonInner}
            onClick={handleReset}
          >
            進捗をリセット
          </button>
        </div>
      </main>
    </>
  );
}

interface CategorySectionProps {
  category: Category;
  label: string;
  total: number;
  isLessonComplete: (id: string) => boolean;
  getCompletedCount: (ids: string[]) => number;
  isLoaded: boolean;
}

function CategorySection({
  category,
  label,
  total,
  isLessonComplete,
  getCompletedCount,
  isLoaded
}: CategorySectionProps) {
  const lessons = getLessonsByCategory(category);
  const lessonIds = lessons.map(l => l.id);
  const completed = isLoaded ? getCompletedCount(lessonIds) : 0;

  return (
    <section className={`${styles.categorySection} ${styles[category]}`}>
      <div className={styles.categoryHeader}>
        <h2 className={styles.categoryTitle}>{label}</h2>
        <span className={styles.categoryProgress}>
          {completed}/{total}完了
        </span>
      </div>
      <div className={styles.lessonGrid}>
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            id={lesson.id}
            title={lesson.title}
            isComplete={isLoaded ? isLessonComplete(lesson.id) : false}
            category={category}
          />
        ))}
      </div>
    </section>
  );
}
