'use client';

import { useParams, useRouter } from 'next/navigation';
import { LessonHeader } from '@/components/Header/Header';
import { Button } from '@/components/Button/Button';
import { FluentEmoji } from '@/components/FluentEmoji/FluentEmoji';
import { useProgress } from '@/hooks/useProgress';
import { getLessonById, getNextLesson } from '@/lib/lessons';
import type { ChunksStep, FormStep } from '@/lib/types';
import styles from './page.module.css';

export default function SummaryPage() {
    const params = useParams();
    const router = useRouter();
    const lessonId = params.id as string;

    const { markLessonComplete, isLessonComplete } = useProgress();
    const lesson = getLessonById(lessonId);
    const nextLesson = getNextLesson(lessonId);

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

    const isComplete = isLessonComplete(lessonId);

    // Extract summary data from steps
    const summaryStep = lesson.steps.find(s => s.type === 'summary');
    const formStep = lesson.steps.find(s => s.type === 'form') as FormStep | undefined;
    const chunksStep = lesson.steps.find(s => s.type === 'chunks') as ChunksStep | undefined;

    const handleComplete = () => {
        markLessonComplete(lessonId);
    };

    const handleNextLesson = () => {
        if (nextLesson) {
            router.push(`/lesson/${nextLesson.id}`);
        }
    };

    return (
        <>
            <LessonHeader title={lesson.title} />
            <main className={`container ${styles.main}`}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>{lesson.title} ─ まとめ</h1>
                        {isComplete && (
                            <span className={styles.badge}>
                                <FluentEmoji name="check" size={14} /> 完了
                            </span>
                        )}
                    </div>

                    {summaryStep && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <FluentEmoji name="pin" size={18} />
                                ポイント
                            </h2>
                            <div className={styles.content}>
                                {summaryStep.content}
                            </div>
                        </section>
                    )}

                    {formStep && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <FluentEmoji name="memo" size={18} />
                                基本のカタチ
                            </h2>
                            <div className={styles.pattern}>
                                {typeof formStep.pattern === 'string'
                                    ? formStep.pattern
                                    : formStep.pattern.map((p, i) => (
                                        <div key={i}>{p.label}: {p.pattern}</div>
                                    ))}
                            </div>
                        </section>
                    )}

                    {chunksStep && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <FluentEmoji name="speech" size={18} />
                                よく使うフレーズ
                            </h2>
                            <div className={styles.chunkList}>
                                {chunksStep.items.slice(0, 5).map((item, i) => (
                                    <span key={i} className={styles.chunk}>
                                        {item.en}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className={styles.tipSection}>
                        <h2 className={styles.tipTitle}>
                            <FluentEmoji name="lightbulb" size={16} /> ネットでは
                        </h2>
                        <p className={styles.tipContent}>
                            縮約形が普通。主語の省略もよくある。
                            教科書通りに言うと逆に不自然に聞こえることも。
                        </p>
                    </section>

                    <div className={styles.actions}>
                        {!isComplete && (
                            <Button
                                variant="primary"
                                category={lesson.category}
                                onClick={handleComplete}
                                fullWidth
                            >
                                完了にする <FluentEmoji name="check" size={16} />
                            </Button>
                        )}

                        {isComplete && nextLesson && (
                            <Button
                                variant="primary"
                                category={nextLesson.category}
                                onClick={handleNextLesson}
                                fullWidth
                            >
                                次のレッスンへ →
                            </Button>
                        )}

                        <Button
                            variant="secondary"
                            href={`/lesson/${lessonId}`}
                            fullWidth={isComplete && !nextLesson}
                        >
                            もう一度学ぶ
                        </Button>

                        <Button variant="ghost" href="/">
                            一覧へ
                        </Button>
                    </div>
                </div>
            </main>
        </>
    );
}
