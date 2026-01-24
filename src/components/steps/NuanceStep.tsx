import type { NuanceStep as NuanceStepType } from '@/lib/types';
import styles from './steps.module.css';

interface Props {
    step: NuanceStepType;
}

export function NuanceStep({ step }: Props) {
    return (
        <div>
            <h2 className={styles.stepTitle}>{step.title}</h2>
            <div className={styles.pointList}>
                {step.points.map((point, i) => (
                    <div key={i} className={styles.pointItem}>
                        <h3 className={styles.pointHeading}>{point.heading}</h3>
                        <p className={styles.pointText}>{point.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
