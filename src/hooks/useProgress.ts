'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Progress } from '@/lib/types';

const STORAGE_KEY = 'net-eibunpo-progress';

const DEFAULT_PROGRESS: Progress = {
    completedLessons: [],
    currentLesson: null,
    currentStep: 0,
    lastAccessedAt: new Date().toISOString(),
};

export function useProgress() {
    const [progress, setProgress] = useState<Progress>(DEFAULT_PROGRESS);
    const [isLoaded, setIsLoaded] = useState(false);

    // 初期読み込み
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                setProgress(JSON.parse(saved));
            }
        } catch (e) {
            console.error('Failed to load progress:', e);
        }
        setIsLoaded(true);
    }, []);

    // 保存
    const saveProgress = useCallback((newProgress: Progress) => {
        try {
            const updated = {
                ...newProgress,
                lastAccessedAt: new Date().toISOString(),
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            setProgress(updated);
        } catch (e) {
            console.error('Failed to save progress:', e);
        }
    }, []);

    // レッスン完了をマーク
    const markLessonComplete = useCallback((lessonId: string) => {
        setProgress(prev => {
            if (prev.completedLessons.includes(lessonId)) {
                return prev;
            }
            const newProgress = {
                ...prev,
                completedLessons: [...prev.completedLessons, lessonId],
            };
            saveProgress(newProgress);
            return newProgress;
        });
    }, [saveProgress]);

    // 現在のレッスンとステップを更新
    const updateCurrentPosition = useCallback((lessonId: string, step: number) => {
        setProgress(prev => {
            const newProgress = {
                ...prev,
                currentLesson: lessonId,
                currentStep: step,
            };
            saveProgress(newProgress);
            return newProgress;
        });
    }, [saveProgress]);

    // レッスンが完了しているか確認
    const isLessonComplete = useCallback((lessonId: string) => {
        return progress.completedLessons.includes(lessonId);
    }, [progress.completedLessons]);

    // 進捗をリセット
    const resetProgress = useCallback(() => {
        saveProgress(DEFAULT_PROGRESS);
    }, [saveProgress]);

    // 完了数を取得
    const getCompletedCount = useCallback((lessonIds: string[]) => {
        return lessonIds.filter(id => progress.completedLessons.includes(id)).length;
    }, [progress.completedLessons]);

    return {
        progress,
        isLoaded,
        markLessonComplete,
        updateCurrentPosition,
        isLessonComplete,
        resetProgress,
        getCompletedCount,
    };
}
