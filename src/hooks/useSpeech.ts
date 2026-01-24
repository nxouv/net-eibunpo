'use client';

import { useCallback, useRef } from 'react';

export function useSpeech() {
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    const speak = useCallback((text: string) => {
        // 前の発話を停止
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }

        if (typeof window === 'undefined' || !window.speechSynthesis) {
            console.warn('Speech synthesis not supported');
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9; // 少しゆっくり
        utterance.pitch = 1;

        // 英語の音声を優先的に選択
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(
            voice => voice.lang.startsWith('en') && voice.name.includes('Samantha')
        ) || voices.find(
            voice => voice.lang.startsWith('en-US')
        ) || voices.find(
            voice => voice.lang.startsWith('en')
        );

        if (englishVoice) {
            utterance.voice = englishVoice;
        }

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    }, []);

    const stop = useCallback(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    }, []);

    return { speak, stop };
}
