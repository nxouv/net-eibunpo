import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.links}>
                    <Link href="/about" className={styles.link}>
                        このサイトについて
                    </Link>
                </div>
                <div className={styles.author}>
                    <span>Made by</span>
                    <a
                        href="https://x.com/nxouv"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg
                            className={styles.xIcon}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        なな太郎
                    </a>
                </div>
            </div>
        </footer>
    );
}
