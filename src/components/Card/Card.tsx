import Link from 'next/link';
import styles from './Card.module.css';
import type { Category } from '@/lib/types';

interface CardProps {
    children: React.ReactNode;
    category?: Category;
    className?: string;
    onClick?: () => void;
}

export function Card({ children, category, className, onClick }: CardProps) {
    const classNames = [
        styles.card,
        category && styles[category],
        onClick && styles.clickable,
        className,
    ].filter(Boolean).join(' ');

    return (
        <div
            className={classNames}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {children}
        </div>
    );
}

// Lesson card for top page
interface LessonCardProps {
    id: string;
    title: string;
    isComplete: boolean;
    category: Category;
}

export function LessonCard({ id, title, isComplete, category }: LessonCardProps) {
    const cardClasses = [
        styles.card,
        styles.lessonCard,
        styles[category],
        isComplete && styles.lessonCardComplete,
    ].filter(Boolean).join(' ');

    return (
        <Link
            href={`/lesson/${id}`}
            className={cardClasses}
        >
            <div className={`${styles.lessonIcon} ${isComplete ? styles.lessonIconComplete : styles.lessonIconIncomplete}`}>
                {isComplete ? '✓' : ''}
            </div>
            <span className={styles.lessonTitle}>{title}</span>
            <span className={styles.lessonArrow}>→</span>
        </Link>
    );
}

// Step card for lesson content
interface StepCardProps {
    children: React.ReactNode;
    category?: Category;
}

export function StepCard({ children, category }: StepCardProps) {
    return (
        <div className={`${styles.card} ${styles.stepCard} ${category ? styles[category] : ''}`}>
            {children}
        </div>
    );
}
