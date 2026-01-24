import type { FormStep as FormStepType, Category } from '@/lib/types';
import styles from './steps.module.css';

interface Props {
    step: FormStepType;
    category: Category;
}

export function FormStep({ step, category }: Props) {
    const patternClass = category === 'spoken'
        ? styles.patternSpoken
        : category === 'writing'
            ? styles.patternWriting
            : styles.pattern;

    return (
        <div>
            <h2 className={styles.stepTitle}>{step.title}</h2>

            {/* 初心者向け導入説明 */}
            {step.intro && (
                <p className={styles.formIntro}>{step.intro}</p>
            )}

            {/* 文の分解表示 */}
            {step.breakdown && step.breakdown.length > 0 && (
                <div className={styles.breakdownContainer}>
                    <div className={styles.breakdownParts}>
                        {step.breakdown.map((item, i) => (
                            <div key={i} className={styles.breakdownItem}>
                                <span className={styles.breakdownPart}>{item.part}</span>
                                <span className={styles.breakdownRole}>{item.role}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className={`${styles.pattern} ${patternClass}`}>
                {step.pattern}
            </div>
            <div className={styles.exampleList}>
                {step.examples.map((example, i) => (
                    <div key={i} className={styles.exampleItem}>
                        <div className={styles.exampleEn}>{example.en}</div>
                        <div className={styles.exampleJa}>{example.ja}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
