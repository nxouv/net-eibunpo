import type { ComparisonStep as ComparisonStepType, Category } from '@/lib/types';
import styles from './steps.module.css';

interface Props {
    step: ComparisonStepType;
    category: Category;
}

export function ComparisonStep({ step }: Props) {
    return (
        <div>
            <h2 className={styles.stepTitle}>{step.title}</h2>
            <div className={styles.comparisonList}>
                {step.pairs.map((pair, i) => (
                    <div key={i} className={styles.comparisonItem}>
                        <div className={styles.comparisonRow}>
                            <div className={`${styles.comparisonLabel} ${styles.comparisonTextbook}`}>
                                教科書
                            </div>
                            <div className={styles.comparisonText}>{pair.textbook}</div>
                        </div>
                        <div className={styles.comparisonRow}>
                            <div className={`${styles.comparisonLabel} ${styles.comparisonReal}`}>
                                ネット
                            </div>
                            <div className={styles.comparisonText}>{pair.real}</div>
                        </div>
                        <div className={styles.comparisonNote}>{pair.note}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
