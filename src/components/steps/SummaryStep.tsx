import type { SummaryStep as SummaryStepType } from '@/lib/types';
import styles from './steps.module.css';

interface Props {
    step: SummaryStepType;
    lessonTitle?: string; // レッスンタイトルを受け取る
}

export function SummaryStep({ step, lessonTitle }: Props) {
    // タイトルを動的に生成: "〇〇ってなに？"
    const displayTitle = lessonTitle
        ? `${lessonTitle}ってなに？`
        : step.title;

    return (
        <div>
            <h2 className={styles.stepTitle}>{displayTitle}</h2>
            <p className={styles.summaryContent}>{step.content}</p>
        </div>
    );
}
