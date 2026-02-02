'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LessonHeader } from '@/components/Header/Header';
import { StepCard } from '@/components/Card/Card';
import { ProgressDots } from '@/components/ProgressDots/ProgressDots';
import { Button } from '@/components/Button/Button';
import { useProgress } from '@/hooks/useProgress';
import { getLessonById } from '@/lib/lessons';

// Step components
import { SummaryStep } from '@/components/steps/SummaryStep';
import { FormStep } from '@/components/steps/FormStep';
import { NuanceStep } from '@/components/steps/NuanceStep';
import { ComparisonStep } from '@/components/steps/ComparisonStep';
import { ChunksStep } from '@/components/steps/ChunksStep';
import { ExamplesStep } from '@/components/steps/ExamplesStep';
import { PracticeStep } from '@/components/steps/PracticeStep';

import type { LessonStep as LessonStepType, Category } from '@/lib/types';
import styles from './page.module.css';

export default function LessonPage() {
    const params = useParams();
    const router = useRouter();
    const lessonId = params.id as string;

    const [currentStep, setCurrentStep] = useState(0);
    const { updateCurrentPosition } = useProgress();

    const lesson = getLessonById(lessonId);

    useEffect(() => {
        if (lesson) {
            updateCurrentPosition(lessonId, currentStep);
        }
    }, [lessonId, currentStep, lesson, updateCurrentPosition]);

    // Canonical URL設定: まとめページを正規URLとして指定
    useEffect(() => {
        const canonicalUrl = `${window.location.origin}/lesson/${lessonId}/summary`;
        let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

        // 既存のlinkを追跡（クリーンアップ用）
        const createdLink = !link;

        if (!link) {
            link = document.createElement('link');
            link.rel = 'canonical';
            document.head.appendChild(link);
        }
        link.href = canonicalUrl;

        return () => {
            // クリーンアップ: 自分で作成したlinkのみ削除
            if (createdLink) {
                const existingLink = document.querySelector('link[rel="canonical"]');
                if (existingLink && existingLink.parentNode) {
                    existingLink.parentNode.removeChild(existingLink);
                }
            }
        };
    }, [lessonId]);

    if (!lesson) {
        return (
            <>
                <LessonHeader title="レッスンが見つかりません" />
                <main className={`container ${styles.main}`}>
                    <p>このレッスンは存在しません。</p>
                    <Button href="/" variant="secondary">トップへ戻る</Button>
                </main>
            </>
        );
    }

    const totalSteps = lesson.steps.length;
    const step = lesson.steps[currentStep];
    const isLastStep = currentStep >= totalSteps - 1;

    // ガード: stepがundefinedの場合はまとめページにリダイレクト
    useEffect(() => {
        if (!step && lesson) {
            router.push(`/lesson/${lessonId}/summary`);
        }
    }, [step, lesson, lessonId, router]);

    const handleNext = () => {
        if (isLastStep) {
            router.push(`/lesson/${lessonId}/summary`);
        } else {
            setCurrentStep(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };


    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    // stepがない場合はリダイレクト中なので何も表示しない
    if (!step) {
        return null;
    }

    return (
        <>
            <LessonHeader title={lesson.title} />
            <main className={styles.main}>
                <div className={`container ${styles.stepContainer}`}>
                    <div className={styles.stepContent}>
                        <StepCard category={lesson.category}>
                            <StepRenderer step={step} category={lesson.category} lessonTitle={lesson.title} />

                            <ProgressDots
                                total={totalSteps}
                                current={currentStep}
                                category={lesson.category}
                            />
                        </StepCard>
                    </div>
                    <div className={styles.navigation}>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {currentStep > 0 && (
                                <Button
                                    variant="secondary"
                                    onClick={handlePrev}
                                    style={{ flex: 1 }}
                                >
                                    ← 戻る
                                </Button>
                            )}
                            <Button
                                variant="primary"
                                category={lesson.category}
                                onClick={handleNext}
                                style={{ flex: currentStep > 0 ? 2 : 1 }}
                                fullWidth={currentStep === 0}
                            >
                                {isLastStep ? 'まとめへ →' : '次へ →'}
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

interface StepRendererProps {
    step: LessonStepType;
    category: Category;
    lessonTitle: string;
}

function StepRenderer({ step, category, lessonTitle }: StepRendererProps) {
    switch (step.type) {
        case 'summary':
            return <SummaryStep step={step} lessonTitle={lessonTitle} />;
        case 'form':
            return <FormStep step={step} category={category} />;
        case 'nuance':
            return <NuanceStep step={step} />;
        case 'comparison':
            return <ComparisonStep step={step} category={category} />;
        case 'chunks':
            return <ChunksStep step={step} category={category} />;
        case 'examples':
            return <ExamplesStep step={step} category={category} />;
        case 'practice':
            return <PracticeStep step={step} category={category} />;
        default:
            return <div>Unknown step type</div>;
    }
}
