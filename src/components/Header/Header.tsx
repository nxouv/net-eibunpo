import Link from 'next/link';
import styles from './Header.module.css';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';

interface TopHeaderProps {
    completedCount: number;
    totalCount: number;
}

export function TopHeader({ completedCount, totalCount }: TopHeaderProps) {
    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <div className={styles.titleArea}>
                    <Link href="/" className={styles.siteTitle}>
                        ネット英文法
                    </Link>
                </div>
                <div className={styles.rightArea}>
                    <span className={styles.progress}>
                        {completedCount}/{totalCount}
                    </span>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}

interface LessonHeaderProps {
    title: string;
}

export function LessonHeader({ title }: LessonHeaderProps) {
    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <div className={styles.titleArea}>
                    <Link href="/" className={styles.backButton} aria-label="戻る">
                        ←
                    </Link>
                    <span className={styles.lessonTitle}>{title}</span>
                </div>
                <div className={styles.rightArea}>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
