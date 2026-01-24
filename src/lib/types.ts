// ========================================
// レッスンデータの型定義
// ========================================

// カテゴリ
export type Category = 'grammar' | 'spoken' | 'writing';

export const CATEGORY_LABELS: Record<Category, string> = {
  grammar: '基本の文法',
  spoken: '話し言葉の文法',
  writing: '書くときのトーン',
};

// ========================================
// ステップの型定義
// ========================================

// ポイント
export interface SummaryStep {
  type: 'summary';
  title: string;
  content: string;
}

// 基本のカタチ
export interface PatternItem {
  label: string;      // ラベル（例: "肯定", "否定"）
  pattern: string;    // パターン（例: "主語 + 動詞"）
  highlight?: string; // ハイライトする部分（例: "don't"）
}

export interface FormStep {
  type: 'form';
  title: string;
  intro?: string; // 初心者向けの導入説明
  // patternは文字列（旧形式）または配列（新形式）に対応
  pattern: string | PatternItem[];
  breakdown?: Array<{
    part: string;   // 文の一部（例: "I", "don't", "like"）
    role: string;   // 役割の説明（例: "主語", "否定", "動詞"）
  }>;
  examples: Array<{
    en: string;
    ja: string;
  }>;
}

// ニュアンス
export interface NuanceStep {
  type: 'nuance';
  title: string;
  points: Array<{
    heading: string;
    text: string;
  }>;
}

// 教科書 vs ネット
export interface ComparisonStep {
  type: 'comparison';
  title: string;
  pairs: Array<{
    textbook: string;
    real: string;
    note: string;
  }>;
}

// よく使うフレーズ
export interface ChunksStep {
  type: 'chunks';
  title: string;
  items: Array<{
    en: string;
    ja: string;
  }>;
}

// 例文
export interface ExamplesStep {
  type: 'examples';
  title: string;
  items: Array<{
    en: string;
    ja: string;
    context: string;
  }>;
}

// 練習問題
export interface PracticeItem {
  type: 'translate' | 'convert' | 'expand';
  instruction: string;
  question: string;
  answers: string[];
  explanation: string;
}

export interface PracticeStep {
  type: 'practice';
  title: string;
  items: PracticeItem[];
}

// ステップのユニオン型
export type LessonStep =
  | SummaryStep
  | FormStep
  | NuanceStep
  | ComparisonStep
  | ChunksStep
  | ExamplesStep
  | PracticeStep;

// ========================================
// レッスンの型定義
// ========================================

export interface Lesson {
  id: string;
  category: Category;
  categoryLabel: string;
  title: string;
  order: number;
  steps: LessonStep[];
  netTip?: string;
}

// ========================================
// 進捗データの型定義
// ========================================

export interface Progress {
  completedLessons: string[];
  currentLesson: string | null;
  currentStep: number;
  lastAccessedAt: string;
}

export const DEFAULT_PROGRESS: Progress = {
  completedLessons: [],
  currentLesson: null,
  currentStep: 0,
  lastAccessedAt: new Date().toISOString(),
};
