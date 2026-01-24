import type { SummaryStep as SummaryStepType } from '@/lib/types';
import styles from './steps.module.css';

interface Props {
    step: SummaryStepType;
}

export function SummaryStep({ step }: Props) {
    return (
        <div>
            <h2 className={styles.stepTitle}>{step.title}</h2>
            <p className={styles.summaryContent}>{step.content}</p>
        </div>
    );
}
