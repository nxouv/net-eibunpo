import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.links}>
                    <Link href="/about" className={styles.link}>
                        このサイトはなに？
                    </Link>
                </div>
                <div className={styles.author}>
                    <a
                        href="https://x.com/nxouv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.authorLink}
                    >
                        なな太郎
                    </a>
                    <span>が作りました</span>
                </div>
            </div>
        </footer>
    );
}
