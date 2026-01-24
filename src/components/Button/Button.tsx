import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import styles from './Button.module.css';
import type { Category } from '@/lib/types';

type BaseProps = {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    category?: Category;
    fullWidth?: boolean;
    children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: never;
    };

type ButtonAsLink = BaseProps &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
        href: string;
    };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
    const {
        variant = 'primary',
        size = 'medium',
        category,
        fullWidth = false,
        children,
        ...rest
    } = props;

    const classNames = [
        styles.button,
        styles[variant],
        size !== 'medium' && styles[size],
        fullWidth && styles.fullWidth,
        variant === 'primary' && category && styles[`primary${category.charAt(0).toUpperCase() + category.slice(1)}`],
    ].filter(Boolean).join(' ');

    if ('href' in rest && rest.href) {
        const { href, ...linkProps } = rest as ButtonAsLink;
        return (
            <Link href={href} className={classNames} {...linkProps}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classNames} {...(rest as ButtonAsButton)}>
            {children}
        </button>
    );
}

// Icon button for speech, etc.
type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    children: React.ReactNode;
};

export function IconButton({ label, children, ...props }: IconButtonProps) {
    return (
        <button
            className={styles.iconButton}
            aria-label={label}
            {...props}
        >
            {children}
        </button>
    );
}
