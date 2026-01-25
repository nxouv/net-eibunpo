import Script from 'next/script';

interface WebsiteSchemaProps {
    name: string;
    description: string;
    url: string;
}

export function WebsiteSchema({ name, description, url }: WebsiteSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name,
        description,
        url,
        inLanguage: 'ja',
    };

    return (
        <Script
            id="website-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface CourseSchemaProps {
    name: string;
    description: string;
    provider: string;
    url: string;
}

export function CourseSchema({ name, description, provider, url }: CourseSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name,
        description,
        provider: {
            '@type': 'Organization',
            name: provider,
        },
        url,
        inLanguage: 'ja',
        isAccessibleForFree: true,
    };

    return (
        <Script
            id="course-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface ArticleSchemaProps {
    headline: string;
    description: string;
    url: string;
}

export function ArticleSchema({
    headline,
    description,
    url,
}: ArticleSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline,
        description,
        url,
        inLanguage: 'ja',
        author: {
            '@type': 'Person',
            name: 'なな太郎',
            url: 'https://x.com/nxouv',
        },
        publisher: {
            '@type': 'Organization',
            name: 'ネット英文法',
        },
    };

    return (
        <Script
            id="article-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// AboutPage用のスキーマ
interface AboutPageSchemaProps {
    name: string;
    description: string;
    url: string;
}

export function AboutPageSchema({ name, description, url }: AboutPageSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name,
        description,
        url,
        inLanguage: 'ja',
        mainEntity: {
            '@type': 'WebSite',
            name: 'ネット英文法',
            url: 'https://net-eibunpo.nanataro.app',
        },
    };

    return (
        <Script
            id="about-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// レッスン（まとめページ）用のスキーマ
interface LessonArticleSchemaProps {
    title: string;
    description: string;
    lessonId: string;
    category: string;
}

export function LessonArticleSchema({ title, description, lessonId, category }: LessonArticleSchemaProps) {
    const url = `https://net-eibunpo.nanataro.app/lesson/${lessonId}/summary`;

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': url,
        headline: `${title}【まとめ】- ${category}`,
        description,
        url,
        inLanguage: 'ja',
        author: {
            '@type': 'Person',
            name: 'なな太郎',
            url: 'https://x.com/nxouv',
        },
        publisher: {
            '@type': 'Organization',
            name: 'ネット英文法',
            url: 'https://net-eibunpo.nanataro.app',
        },
        isPartOf: {
            '@type': 'WebSite',
            name: 'ネット英文法',
            url: 'https://net-eibunpo.nanataro.app',
        },
        about: {
            '@type': 'Thing',
            name: '英語文法',
        },
        learningResourceType: 'lesson',
        educationalLevel: '初級〜中級',
        isAccessibleForFree: true,
    };

    return (
        <Script
            id="lesson-article-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
