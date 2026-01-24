import Link from 'next/link';
import type { Metadata } from 'next';
import { FluentEmoji } from '@/components/FluentEmoji/FluentEmoji';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'このサイトについて | ネット英文法',
    description: 'ネット英文法のコンセプト、学習理論、使い方について説明します。教科書英語を知らなくても基本から学べます。',
};

export default function AboutPage() {
    return (
        <main className={`container ${styles.main}`}>
            <div className={styles.hero}>
                <h1 className={styles.title}>ネット英文法について</h1>
                <p className={styles.subtitle}>
                    教科書英語とネットで使う英語の違いを学ぶ
                </p>
            </div>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>コンセプト</h2>
                <div className={styles.content}>
                    <p>
                        「ネット英文法」は、教科書では学べない「リアルな英語」を体系的に学べるサイトです。
                    </p>
                    <p>
                        SNSのツイート、配信者のしゃべり、チャットでのやりとり。
                        これらで使われる英語は、教科書の英語とはかなり違います。
                    </p>
                    <p>
                        縮約形（gonna, wanna）、省略（主語を抜く）、カジュアルなニュアンス。
                        こういった「ネットの英語」を、文法項目ごとに整理して学べるようにしました。
                    </p>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>こんな人におすすめ</h2>
                <div className={styles.content}>
                    <ul className={styles.simpleList}>
                        <li>英語の配信やSNSを見て「聞き取れない」「読めない」と感じる</li>
                        <li>教科書英語は習ったけど、あやふやになっている</li>
                        <li>ネイティブっぽい英語を自分でも使ってみたい</li>
                        <li>文法を基礎からやり直したい</li>
                    </ul>
                    <p className={styles.note}>
                        ※ 教科書英語を完璧に覚えていなくても大丈夫。各レッスンで基本から丁寧に説明しています。
                    </p>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>このサイトで学べること</h2>
                <div className={styles.content}>
                    <ul className={styles.list}>
                        <li>
                            <span className={styles.listIcon}>
                                <FluentEmoji name="one" size={24} />
                            </span>
                            <div className={styles.listContent}>
                                <div className={styles.listTitle}>基本の文法</div>
                                <div className={styles.listDesc}>
                                    肯定文・否定文から仮定法まで、基本文法をネット視点で再解釈
                                </div>
                            </div>
                        </li>
                        <li>
                            <span className={styles.listIcon}>
                                <FluentEmoji name="two" size={24} />
                            </span>
                            <div className={styles.listContent}>
                                <div className={styles.listTitle}>話し言葉の文法</div>
                                <div className={styles.listDesc}>
                                    gonna, wanna などの縮約、省略、つなぎ言葉など配信で聞くパターン
                                </div>
                            </div>
                        </li>
                        <li>
                            <span className={styles.listIcon}>
                                <FluentEmoji name="three" size={24} />
                            </span>
                            <div className={styles.listContent}>
                                <div className={styles.listTitle}>書くときのトーン</div>
                                <div className={styles.listDesc}>
                                    SNSで自然に見える書き方、淡々としたスタイル、断定を避ける表現
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>学習の考え方</h2>
                <div className={styles.content}>
                    <ul className={styles.list}>
                        <li>
                            <span className={styles.listIcon}>
                                <FluentEmoji name="lightbulb" size={24} />
                            </span>
                            <div className={styles.listContent}>
                                <div className={styles.listTitle}>文脈で覚える</div>
                                <div className={styles.listDesc}>
                                    文法ルールを暗記するのではなく、「どういう場面で使うか」を文脈ごと理解する
                                </div>
                            </div>
                        </li>
                        <li>
                            <span className={styles.listIcon}>
                                <FluentEmoji name="puzzle" size={24} />
                            </span>
                            <div className={styles.listContent}>
                                <div className={styles.listTitle}>チャンクで覚える</div>
                                <div className={styles.listDesc}>
                                    「I&apos;ve been meaning to...」のように、かたまりで覚えてそのまま使う
                                </div>
                            </div>
                        </li>
                        <li>
                            <span className={styles.listIcon}>
                                <FluentEmoji name="target" size={24} />
                            </span>
                            <div className={styles.listContent}>
                                <div className={styles.listTitle}>認知負荷を下げる</div>
                                <div className={styles.listDesc}>
                                    1画面1要素で進行。情報を詰め込みすぎず、少しずつステップを進める
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
                        <li><strong>〇〇ってなに？</strong>：まずはポイントを把握</li>
                        <li><strong>基本のカタチ</strong>：文の構造を分解して理解</li>
                        <li><strong>ニュアンス</strong>：使い分けやコツを学ぶ</li>
                        <li><strong>教科書 vs ネット</strong>：違いを比較</li>
                        <li><strong>よく使うフレーズ</strong>：そのまま使えるチャンク</li>
                        <li><strong>例文</strong>：実際の使用例を見る</li>
                        <li><strong>やってみよう</strong>：自分で練習</li>
                    </ol>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>使い方</h2>
                <div className={styles.content}>
                    <p>
                        トップページからレッスンを選んで、ステップを順に進めていきます。
                        最後まで到達したら「完了」がつきます。
                    </p>
                    <p>
                        どの項目からでも始められますが、上から順に進めると効率的です。
                        前の項目で学んだ内容を前提にしている部分があるためです。
                    </p>
                    <p>
                        完了したレッスンは何度でも復習できます。
                        忘れたころに戻ってくるのがおすすめです。
                    </p>
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
