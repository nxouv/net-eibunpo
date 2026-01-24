import type { Metadata } from 'next';
import { getLessonById } from '@/lib/lessons';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const lesson = getLessonById(id);

    if (!lesson) {
        return {
            title: 'レッスンが見つかりません | ネット英文法',
        };
    }

    const categoryLabels: Record<string, string> = {
        grammar: '基本の文法',
        spoken: '話し言葉の文法',
        writing: '書くときのトーン',
    };

    const categoryLabel = categoryLabels[lesson.category] || '';
    const summaryStep = lesson.steps.find(s => s.type === 'summary');
    const description = summaryStep && 'content' in summaryStep
        ? `${summaryStep.content} よく使うフレーズと使い方のポイントをまとめました。`
        : `${lesson.title}の要点まとめ。ネット英語での使い方、ニュアンス、よく使うフレーズを解説。`;

    return {
        title: `${lesson.title}【まとめ】- ${categoryLabel} | ネット英文法`,
        description,
    };
}

export default function SummaryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div data-hide-footer="false">{children}</div>;
}
