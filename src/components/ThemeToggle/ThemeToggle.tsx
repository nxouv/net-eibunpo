'use client';

import { useState, useEffect } from 'react';
import styles from './ThemeToggle.module.css';

type Theme = 'light' | 'dark';

// Simple SVG icons (no external dependencies)
const SunIcon = () => (
    <svg className={`${styles.icon} ${styles.sunIcon}`} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
);

const MoonIcon = () => (
    <svg className={`${styles.icon} ${styles.moonIcon}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);



export function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('theme') as Theme | null;
        if (saved && (saved === 'light' || saved === 'dark')) {
            setTheme(saved);
            applyTheme(saved);
        } else {
            // デフォルトはライトモード
            applyTheme('light');
        }
    }, []);

    const applyTheme = (newTheme: Theme) => {
        const root = document.documentElement;
        root.setAttribute('data-theme', newTheme);
    };

    const toggleTheme = () => {
        const next: Theme = theme === 'light' ? 'dark' : 'light';
        setTheme(next);
        localStorage.setItem('theme', next);
        applyTheme(next);
    };

    if (!mounted) {
        return <div className={styles.toggle} style={{ visibility: 'hidden' }} />;
    }

    const label = theme === 'light' ? 'ライト' : 'ダーク';

    return (
        <button
            className={styles.toggle}
            onClick={toggleTheme}
            data-theme={theme}
            aria-label={`テーマ切り替え: 現在${label}`}
            title={label}
        >


            {/* Sliding knob with icon */}
            <div className={styles.knob}>
                {theme === 'light' && <SunIcon />}
                {theme === 'dark' && <MoonIcon />}
            </div>

            <span className={styles.tooltip}>{label}</span>
        </button>
    );
}
