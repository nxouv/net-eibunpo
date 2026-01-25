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
    datePublished?: string;
    dateModified?: string;
}

export function ArticleSchema({
    headline,
    description,
    url,
    datePublished = '2026-01-19',
    dateModified = '2026-01-25',
}: ArticleSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline,
        description,
        url,
        datePublished,
        dateModified,
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
