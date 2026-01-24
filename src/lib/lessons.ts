import type { Lesson, Category } from './types';

// JSONファイルをインポート
import grammarData from '@/data/lessons/grammar.json';
import spokenData from '@/data/lessons/spoken.json';
import writingData from '@/data/lessons/writing.json';

// 全レッスンを取得
export function getAllLessons(): Lesson[] {
    const grammar = grammarData as Lesson[];
    const spoken = spokenData as Lesson[];
    const writing = writingData as Lesson[];

    return [...grammar, ...spoken, ...writing];
}

// カテゴリ別にレッスンを取得
export function getLessonsByCategory(category: Category): Lesson[] {
    const lessons = getAllLessons();
    return lessons
        .filter(lesson => lesson.category === category)
        .sort((a, b) => a.order - b.order);
}

// IDでレッスンを取得
export function getLessonById(id: string): Lesson | undefined {
    return getAllLessons().find(lesson => lesson.id === id);
}

// 全レッスンIDを取得（静的生成用）
export function getAllLessonIds(): string[] {
    return getAllLessons().map(lesson => lesson.id);
}

// 次のレッスンを取得
export function getNextLesson(currentId: string): Lesson | undefined {
    const lessons = getAllLessons().sort((a, b) => {
        // カテゴリ順：grammar → spoken → writing
        const categoryOrder: Record<Category, number> = {
            grammar: 0,
            spoken: 1,
            writing: 2,
        };
        if (a.category !== b.category) {
            return categoryOrder[a.category] - categoryOrder[b.category];
        }
        return a.order - b.order;
    });

    const currentIndex = lessons.findIndex(lesson => lesson.id === currentId);
    if (currentIndex === -1 || currentIndex === lessons.length - 1) {
        return undefined;
    }
    return lessons[currentIndex + 1];
}

// カテゴリ別の統計
export function getCategoryStats(): Array<{
    category: Category;
    label: string;
    total: number;
}> {
    return [
        { category: 'grammar', label: '基本の文法', total: getLessonsByCategory('grammar').length },
        { category: 'spoken', label: '話し言葉の文法', total: getLessonsByCategory('spoken').length },
        { category: 'writing', label: '書くときのトーン', total: getLessonsByCategory('writing').length },
    ];
}
