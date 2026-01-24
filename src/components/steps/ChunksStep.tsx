'use client';

import type { ChunksStep as ChunksStepType, Category } from '@/lib/types';
import { useSpeech } from '@/hooks/useSpeech';
import { IconButton } from '@/components/Button/Button';
import { FluentEmoji } from '@/components/FluentEmoji/FluentEmoji';
import styles from './steps.module.css';

interface Props {
    step: ChunksStepType;
    category: Category;
}

export function ChunksStep({ step }: Props) {
    const { speak } = useSpeech();

    return (
        <div>
            <h2 className={styles.stepTitle}>{step.title}</h2>
            <div className={styles.chunkList}>
                {step.items.map((item, i) => (
                    <div key={i} className={styles.chunkItem}>
                        <span className={styles.chunkEn}>{item.en}</span>
                        <span className={styles.chunkJa}>{item.ja}</span>
                        <IconButton
                            label={`${item.en}を読み上げ`}
                            onClick={() => speak(item.en)}
                            className={styles.speakButton}
                        >
                            <FluentEmoji name="speaker" size={18} />
                        </IconButton>
                    </div>
                ))}
            </div>
        </div>
    );
}
