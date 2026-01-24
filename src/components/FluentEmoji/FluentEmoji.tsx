'use client';

import {
    Volume2,
    Check,
    Lightbulb,
    Puzzle,
    Target,
    MessageCircle,
    Pin,
    FileText,
    BookOpen,
    Pencil,
    GraduationCap,
    Brain,
    Rocket,
    Star,
    Flame,
    Sparkles,
    type LucideIcon,
} from 'lucide-react';

// Icon name type
type IconName =
    | 'speaker'
    | 'check'
    | 'lightbulb'
    | 'puzzle'
    | 'target'
    | 'speech'
    | 'pin'
    | 'memo'
    | 'book'
    | 'pencil'
    | 'graduate'
    | 'brain'
    | 'rocket'
    | 'star'
    | 'fire'
    | 'sparkles'
    | 'one'
    | 'two'
    | 'three';

// Map our names to Lucide icons
const ICON_MAP: Record<IconName, LucideIcon | null> = {
    'speaker': Volume2,
    'check': Check,
    'lightbulb': Lightbulb,
    'puzzle': Puzzle,
    'target': Target,
    'speech': MessageCircle,
    'pin': Pin,
    'memo': FileText,
    'book': BookOpen,
    'pencil': Pencil,
    'graduate': GraduationCap,
    'brain': Brain,
    'rocket': Rocket,
    'star': Star,
    'fire': Flame,
    'sparkles': Sparkles,
    // Numbers will use colored circles with numbers
    'one': null,
    'two': null,
    'three': null,
};

// Color for each category
const CATEGORY_COLORS: Record<string, string> = {
    grammar: '#32b4d9',
    spoken: '#E879A0',
    writing: '#5BBD8C',
};

interface FluentEmojiProps {
    name: IconName;
    size?: number;
    alt?: string;
    className?: string;
    color?: string;
}

// Number badge component
function NumberBadge({ number, size, color }: { number: number; size: number; color: string }) {
    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: size,
                height: size,
                borderRadius: '50%',
                background: color,
                color: 'white',
                fontSize: size * 0.55,
                fontWeight: 700,
                fontFamily: 'var(--font-en)',
            }}
        >
            {number}
        </span>
    );
}

export function FluentEmoji({ name, size = 24, className, color }: FluentEmojiProps) {
    // Handle number badges
    if (name === 'one' || name === 'two' || name === 'three') {
        const number = name === 'one' ? 1 : name === 'two' ? 2 : 3;
        const badgeColor = color || CATEGORY_COLORS.grammar;
        return <NumberBadge number={number} size={size} color={badgeColor} />;
    }

    const Icon = ICON_MAP[name];

    if (!Icon) {
        console.warn(`Icon not found: ${name}`);
        return null;
    }

    return (
        <span
            className={className}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Icon
                size={size}
                color={color}
                strokeWidth={2}
            />
        </span>
    );
}

// Re-export the type
export type { IconName as EmojiName };

// Convenient preset components
export function SpeakerEmoji({ size = 20, color }: { size?: number; color?: string }) {
    return <FluentEmoji name="speaker" size={size} color={color} />;
}

export function CheckEmoji({ size = 20, color }: { size?: number; color?: string }) {
    return <FluentEmoji name="check" size={size} color={color} />;
}
