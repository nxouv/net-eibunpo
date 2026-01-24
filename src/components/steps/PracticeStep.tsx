'use client';

import { useState } from 'react';
import type { PracticeStep as PracticeStepType, PracticeItem, Category } from '@/lib/types';
import styles from './steps.module.css';

interface Props {
    step: PracticeStepType;
    category: Category;
}

export function PracticeStep({ step }: Props) {
    return (
        <div>
            <h2 className={styles.stepTitle}>{step.title}</h2>
            <div className={styles.practiceContainer}>
                {step.items.map((item, i) => (
                    <PracticeItemComponent key={i} item={item} />
                ))}
            </div>
        </div>
    );
}

interface PracticeItemComponentProps {
    item: PracticeItem;
}

function PracticeItemComponent({ item }: PracticeItemComponentProps) {
    const [userAnswer, setUserAnswer] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);
    const [judged, setJudged] = useState<'success' | 'retry' | null>(null);

    const handleShowAnswer = () => {
        setShowAnswer(true);
    };

    const handleJudge = (result: 'success' | 'retry') => {
        setJudged(result);
        if (result === 'retry') {
            // Reset after a short delay
            setTimeout(() => {
                resetState();
            }, 300);
        }
    };

    const resetState = () => {
        setShowAnswer(false);
        setJudged(null);
        setUserAnswer('');
    };

    return (
        <div className={styles.practiceItem}>
            <p className={styles.practiceInstruction}>{item.instruction}</p>
            <div className={styles.practiceQuestion}>{item.question}</div>

            <input
                type="text"
                className={styles.practiceInput}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="英語で書いてみよう..."
                disabled={showAnswer}
            />

            {!showAnswer ? (
                <button
                    className={styles.practiceShowAnswer}
                    onClick={handleShowAnswer}
                >
                    答えを見る
                </button>
            ) : (
                <div className={styles.practiceAnswer}>
                    <div className={styles.practiceAnswerLabel}>解答例</div>
                    <ul className={styles.practiceAnswerList}>
                        {item.answers.map((answer, i) => (
                            <li key={i}>{answer}</li>
                        ))}
                    </ul>
                    <p className={styles.practiceExplanation}>{item.explanation}</p>

                    {!judged && (
                        <div className={styles.practiceJudge}>
                            <button
                                className={`${styles.judgeButton} ${styles.judgeSuccess}`}
                                onClick={() => handleJudge('success')}
                            >
                                できた ✓
                            </button>
                            <button
                                className={`${styles.judgeButton} ${styles.judgeRetry}`}
                                onClick={() => handleJudge('retry')}
                            >
                                もう一度
                            </button>
                        </div>
                    )}

                    {judged === 'success' && (
                        <div className={styles.practiceComplete}>
                            <span className={styles.practiceCompleteText}>✓ よくできました！</span>
                            <button
                                className={styles.practiceResetButton}
                                onClick={resetState}
                            >
                                やり直す
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
