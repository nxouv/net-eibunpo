import Link from 'next/link';
import type { Metadata } from 'next';
import { FluentEmoji } from '@/components/FluentEmoji/FluentEmoji';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'このサイトはなに？ | ネット英文法',
    description: 'ネット英文法のコンセプトと使い方。教科書英語を知らなくても基本から学べます。',
};

export default function AboutPage() {
    return (
        <main className={`container ${styles.main}`}>
            <div className={styles.hero}>
                <h1 className={styles.title}>ネット英文法</h1>
                <p className={styles.subtitle}>
                    教科書では学べない「リアルな英語」を学ぶ
                </p>
            </div>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>このサイトについて</h2>
                <div className={styles.content}>
                    <p>
                        SNS、配信、チャットで使われる英語は教科書とはかなり違います。
                    </p>
                    <p>
                        gonna, wanna などの縮約、主語の省略、カジュアルなニュアンス。
                        このサイトでは、そんな「ネット英語」を文法項目ごとに整理して学べます。
                    </p>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>こんな人におすすめ</h2>
                <div className={styles.content}>
                    <ul className={styles.simpleList}>
                        <li>配信やSNSで「聞き取れない」「読めない」と感じる</li>
                        <li>教科書英語は習ったけどあやふやになっている</li>
                        <li>ネイティブっぽい英語を使ってみたい</li>
                    </ul>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>このサイトの特徴</h2>
                <div className={styles.content}>
                    <ul className={styles.list}>
                        <li>
                            <span className={styles.listIcon}>
                                <FluentEmoji name="target" size={20} />
                            </span>
                            <div className={styles.listContent}>
                                <div className={styles.listTitle}>1画面1要素</div>
                                <div className={styles.listDesc}>
                                    情報を詰め込みすぎず、少しずつステップを進める
                                </div>
                            </div>
                        </li>
                        <li>
                            <span className={styles.listIcon}>
                                <FluentEmoji name="puzzle" size={20} />
                            </span>
                            <div className={styles.listContent}>
                                <div className={styles.listTitle}>チャンクで覚える</div>
                                <div className={styles.listDesc}>
                                    フレーズをかたまりで覚えてそのまま使う
                                </div>
                            </div>
                        </li>
                        <li>
                            <span className={styles.listIcon}>
                                <FluentEmoji name="lightbulb" size={20} />
                            </span>
                            <div className={styles.listContent}>
                                <div className={styles.listTitle}>文脈で理解</div>
                                <div className={styles.listDesc}>
                                    ルール暗記ではなく使用場面でイメージ
                                </div>
                            </div>
                        </li>
                        <li>
                            <span className={styles.listIcon}>
                                <FluentEmoji name="book" size={20} />
                            </span>
                            <div className={styles.listContent}>
                                <div className={styles.listTitle}>教科書との差分</div>
                                <div className={styles.listDesc}>
                                    既知の知識と新しい知識の橋渡し
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>学べること</h2>
                <div className={styles.content}>
                    <ul className={styles.list}>
                        <li>
                            <span className={styles.listIcon}>
                                <FluentEmoji name="book" size={20} />
                            </span>
                            <div className={styles.listContent}>
                                <div className={styles.listTitle}>基本の文法</div>
                                <div className={styles.listDesc}>
                                    肯定文・否定文から仮定法まで、ネット視点で再解釈
                                </div>
                            </div>
                        </li>
                        <li>
                            <span className={styles.listIcon}>
                                <FluentEmoji name="speech" size={20} />
                            </span>
                            <div className={styles.listContent}>
                                <div className={styles.listTitle}>話し言葉の文法</div>
                                <div className={styles.listDesc}>
                                    gonna, wanna、省略、つなぎ言葉など
                                </div>
                            </div>
                        </li>
                        <li>
                            <span className={styles.listIcon}>
                                <FluentEmoji name="memo" size={20} />
                            </span>
                            <div className={styles.listContent}>
                                <div className={styles.listTitle}>書くときのトーン</div>
                                <div className={styles.listDesc}>
                                    SNSで自然に見える書き方、断定を避ける表現
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>レッスンの流れ</h2>
                <div className={styles.content}>
                    <ol className={styles.flowList}>
                        <li><strong>ポイント</strong>：まず要点を把握</li>
                        <li><strong>基本のカタチ</strong>：文の構造を理解</li>
                        <li><strong>ニュアンス</strong>：使い分けやコツ</li>
                        <li><strong>教科書 vs ネット</strong>：違いを比較</li>
                        <li><strong>よく使うフレーズ</strong>：そのまま使える表現</li>
                        <li><strong>例文</strong>：実際の使用例</li>
                        <li><strong>やってみよう</strong>：練習</li>
                    </ol>
                </div>
            </section>

            <div className={styles.cta}>
                <Link href="/" className={styles.backLink}>
                    ← レッスン一覧へ
                </Link>
            </div>
        </main>
    );
}
