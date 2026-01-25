#!/usr/bin/env python3
"""
レッスンコンテンツの説明文を最終改善するスクリプト
"""

import json
from pathlib import Path

def improve_text(text: str) -> str:
    """テキストを自然な文章に改善"""
    if not text:
        return text
    
    result = text
    
    # 改善パターン
    replacements = [
        # 不自然な表現を修正
        ('避けた方がいい。', '避けるのが無難。'),
        ('知らないと聞き取れないことが多い。', '知らないと聞き取れない。'),
        ('押し付けがましさを避けた方がいい。', '押し付けがましさを避ける。'),
        
        # より自然な表現に
        ('ニュアンスがある。', 'ニュアンスになる。'),
        ('ニュアンスを持つ。', 'ニュアンスになる。'),
    ]
    
    for old, new in replacements:
        result = result.replace(old, new)
    
    return result


def improve_lesson(lesson: dict) -> dict:
    """1つのレッスンの内容を改善"""
    
    for step in lesson.get('steps', []):
        step_type = step.get('type')
        
        if step_type == 'summary' and 'content' in step:
            step['content'] = improve_text(step['content'])
        
        if step_type == 'form' and 'intro' in step:
            step['intro'] = improve_text(step['intro'])
        
        if step_type == 'nuance':
            for point in step.get('points', []):
                if 'text' in point:
                    point['text'] = improve_text(point['text'])
        
        if step_type == 'comparison':
            for pair in step.get('pairs', []):
                if 'note' in pair:
                    pair['note'] = improve_text(pair['note'])
    
    if 'netTip' in lesson:
        lesson['netTip'] = improve_text(lesson['netTip'])
    
    return lesson


def process_file(filepath: Path):
    """JSONファイルを処理"""
    print(f"Processing: {filepath}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        lessons = json.load(f)
    
    improved_lessons = [improve_lesson(lesson) for lesson in lessons]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(improved_lessons, f, ensure_ascii=False, indent=2)
    
    print(f"  Improved {len(lessons)} lessons")


def main():
    base_path = Path('/Users/daito/Desktop/anti/net-eibunpo/src/data/lessons')
    
    files = ['grammar.json', 'spoken.json', 'writing.json']
    
    for filename in files:
        filepath = base_path / filename
        if filepath.exists():
            process_file(filepath)


if __name__ == '__main__':
    main()
