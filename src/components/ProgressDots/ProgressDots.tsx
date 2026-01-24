import styles from './ProgressDots.module.css';
import type { Category } from '@/lib/types';

interface ProgressDotsProps {
    total: number;
    current: number;
    category?: Category;
}

export function ProgressDots({ total, current, category = 'grammar' }: ProgressDotsProps) {
    return (
        <div className={`${styles.dots} ${styles[category]}`}>
            {Array.from({ length: total }, (_, i) => (
                <div
                    key={i}
                    className={`${styles.dot} ${i < current ? styles.completed : ''} ${i === current ? styles.active : ''}`}
                    aria-label={i === current ? '現在のステップ' : i < current ? '完了' : '未完了'}
                />
            ))}
        </div>
    );
}
