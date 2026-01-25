'use client';

import type { ExamplesStep as ExamplesStepType, Category } from '@/lib/types';
import { useSpeech } from '@/hooks/useSpeech';
import { IconButton } from '@/components/Button/Button';
import { FluentEmoji } from '@/components/FluentEmoji/FluentEmoji';
import styles from './steps.module.css';

interface Props {
    step: ExamplesStepType;
    category: Category;
}

export function ExamplesStep({ step }: Props) {
    const { speak } = useSpeech();

    return (
        <div>
            <h2 className={styles.stepTitle}>{step.title}</h2>
            <div className={styles.examplesListFull}>
                {step.items.map((item, i) => (
                    <div key={i} className={styles.exampleCard}>
                        <div className={styles.exampleHeader}>
                            <span className={styles.exampleContext}>{item.context}</span>
                            <IconButton
                                label={`${item.en}を読み上げ`}
                                onClick={() => speak(item.en)}
                            >
                                <FluentEmoji name="speaker" size={20} />
                            </IconButton>
                        </div>
                        <p className={styles.exampleEnFull}>{item.en}</p>
                        <p className={styles.exampleJaFull}>{item.ja}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
