'use client';

import { useParams, useRouter } from 'next/navigation';
import { LessonHeader } from '@/components/Header/Header';
import { Button } from '@/components/Button/Button';
import { FluentEmoji } from '@/components/FluentEmoji/FluentEmoji';
import { LessonArticleSchema } from '@/components/SEO/Schema';
import { useProgress } from '@/hooks/useProgress';
import { getLessonById, getNextLesson } from '@/lib/lessons';
import type { ChunksStep, FormStep, NuanceStep, ComparisonStep } from '@/lib/types';
import styles from './page.module.css';

export default function SummaryPage() {
    const params = useParams();
    const router = useRouter();
    const lessonId = params.id as string;

    const { markLessonComplete, markLessonIncomplete, isLessonComplete } = useProgress();
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

    // Extract data from steps
    const summaryStep = lesson.steps.find(s => s.type === 'summary');
    const formStep = lesson.steps.find(s => s.type === 'form') as FormStep | undefined;
    const nuanceStep = lesson.steps.find(s => s.type === 'nuance') as NuanceStep | undefined;
    const comparisonStep = lesson.steps.find(s => s.type === 'comparison') as ComparisonStep | undefined;
    const chunksStep = lesson.steps.find(s => s.type === 'chunks') as ChunksStep | undefined;

    const handleComplete = () => {
        markLessonComplete(lessonId);
    };

    const handleUncomplete = () => {
        if (confirm('完了を取り消しますか？')) {
            markLessonIncomplete(lessonId);
        }
    };

    const handleNextLesson = () => {
        if (nextLesson) {
            router.push(`/lesson/${nextLesson.id}`);
        }
    };

    return (
        <>
            <LessonArticleSchema
                title={lesson.title}
                description={summaryStep && 'content' in summaryStep ? summaryStep.content : `${lesson.title}のまとめ`}
                lessonId={lessonId}
                category={lesson.categoryLabel}
            />
            <LessonHeader title={lesson.title} />
            <main className={`container ${styles.main}`}>
                <div className={styles.card}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>{lesson.title} ─ まとめ</h1>
                        {isComplete && (
                            <span className={styles.badge}>
                                <FluentEmoji name="check" size={16} /> 完了
                            </span>
                        )}
                    </div>

                    {summaryStep && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <FluentEmoji name="pin" size={20} />
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
                                <FluentEmoji name="memo" size={20} />
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

                    {nuanceStep && nuanceStep.points.length > 0 && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <FluentEmoji name="lightbulb" size={20} />
                                ニュアンス
                            </h2>
                            <ul className={styles.nuanceList}>
                                {nuanceStep.points.slice(0, 3).map((point, i) => (
                                    <li key={i} className={styles.nuanceItem}>
                                        <strong>{point.heading}</strong>
                                        <span>{point.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {comparisonStep && comparisonStep.pairs.length > 0 && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <FluentEmoji name="book" size={20} />
                                教科書 vs ネット
                            </h2>
                            <div className={styles.comparisonList}>
                                {comparisonStep.pairs.slice(0, 2).map((pair, i) => (
                                    <div key={i} className={styles.comparisonItem}>
                                        <div className={styles.textbook}>{pair.textbook}</div>
                                        <div className={styles.arrow}>→</div>
                                        <div className={styles.real}>{pair.real}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {chunksStep && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <FluentEmoji name="speech" size={20} />
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

                    {lesson.netTip && (
                        <section className={styles.tipSection}>
                            <h2 className={styles.tipTitle}>
                                <FluentEmoji name="target" size={18} /> ネットでは
                            </h2>
                            <p className={styles.tipContent}>
                                {lesson.netTip}
                            </p>
                        </section>
                    )}

                    <div className={styles.actions}>
                        {!isComplete && (
                            <Button
                                variant="primary"
                                category={lesson.category}
                                onClick={handleComplete}
                                fullWidth
                            >
                                完了にする <FluentEmoji name="check" size={18} />
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

                        <div className={styles.subActions}>
                            <Button
                                variant="secondary"
                                href={`/lesson/${lessonId}`}
                            >
                                もう一度学ぶ
                            </Button>

                            {isComplete && (
                                <Button variant="ghost" onClick={handleUncomplete}>
                                    完了を取り消す
                                </Button>
                            )}

                            <Button variant="ghost" href="/">
                                一覧へ
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
