'use client';

import {
    Check,
    type LucideIcon,
} from 'lucide-react';
import { FluentEmoji as MicrosoftFluentEmoji } from '@lobehub/fluent-emoji';

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

// Map icon names to Lucide icons (for functional icons - check only)
const LUCIDE_ICON_MAP: Record<string, LucideIcon> = {
    'check': Check,
};

// Map icon names to Fluent Emoji characters
const EMOJI_MAP: Record<string, string> = {
    'speaker': '🔊',
    'lightbulb': '💡',
    'puzzle': '🧩',
    'target': '🎯',
    'speech': '💬',
    'pin': '📌',
    'memo': '📝',
    'book': '📖',
    'pencil': '✏️',
    'graduate': '🎓',
    'brain': '🧠',
    'rocket': '🚀',
    'star': '⭐',
    'fire': '🔥',
    'sparkles': '✨',
    'one': '1️⃣',
    'two': '2️⃣',
    'three': '3️⃣',
};

interface FluentEmojiProps {
    name: IconName;
    size?: number;
    alt?: string;
    className?: string;
    color?: string;
}

export function FluentEmoji({ name, size = 24, className, color }: FluentEmojiProps) {
    // Use Lucide for functional icons (speaker, check)
    if (LUCIDE_ICON_MAP[name]) {
        const Icon = LUCIDE_ICON_MAP[name];
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

    // Use Fluent Emoji for decorative emojis
    const emoji = EMOJI_MAP[name];
    if (emoji) {
        return (
            <MicrosoftFluentEmoji
                emoji={emoji}
                size={size}
                type="3d"
                className={className}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            />
        );
    }

    console.warn(`Icon not found: ${name}`);
    return null;
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
