import { MetadataRoute } from 'next';
import { getAllLessons } from '@/lib/lessons';

const BASE_URL = 'https://net-eibunpo.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const lessons = getAllLessons();
    const currentDate = new Date();

    // 静的ページ
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];

    // レッスンのまとめページ（メインコンテンツ）
    const lessonSummaryPages: MetadataRoute.Sitemap = lessons.map((lesson) => ({
        url: `${BASE_URL}/lesson/${lesson.id}/summary`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [...staticPages, ...lessonSummaryPages];
}
