import type { FormStep as FormStepType, Category, PatternItem } from '@/lib/types';
import styles from './steps.module.css';
import { Check, X } from 'lucide-react';

interface Props {
    step: FormStepType;
    category: Category;
}

// ハイライト部分を強調表示する関数
function highlightPattern(pattern: string, highlight?: string) {
    if (!highlight) return pattern;

    const parts = pattern.split(highlight);
    if (parts.length === 1) return pattern;

    return (
        <>
            {parts.map((part, i) => (
                <span key={i}>
                    {part}
                    {i < parts.length - 1 && (
                        <span className={styles.patternHighlight}>{highlight}</span>
                    )}
                </span>
            ))}
        </>
    );
}

export function FormStep({ step, category }: Props) {
    const isPatternArray = Array.isArray(step.pattern);

    // カテゴリごとの色クラス
    const categoryColorClass = category === 'spoken'
        ? styles.patternContainerSpoken
        : category === 'writing'
            ? styles.patternContainerWriting
            : '';

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

            {/* パターン表示（新形式：配列） */}
            {isPatternArray && (
                <div className={`${styles.patternContainer} ${categoryColorClass}`}>
                    {(step.pattern as PatternItem[]).map((item, i) => (
                        <div key={i} className={styles.patternRow}>
                            <span className={`${styles.patternLabel} ${item.label === '肯定' || item.label === '基本'
                                    ? styles.patternLabelPositive
                                    : styles.patternLabelNegative
                                }`}>
                                {item.label === '肯定' || item.label === '基本' ? (
                                    <Check size={14} />
                                ) : (
                                    <X size={14} />
                                )}
                                {item.label}
                            </span>
                            <span className={styles.patternText}>
                                {highlightPattern(item.pattern, item.highlight)}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* パターン表示（旧形式：文字列） */}
            {!isPatternArray && (
                <div className={`${styles.pattern} ${category === 'spoken' ? styles.patternSpoken
                        : category === 'writing' ? styles.patternWriting
                            : ''
                    }`}>
                    {step.pattern as string}
                </div>
            )}

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
