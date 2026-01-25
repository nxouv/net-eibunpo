#!/usr/bin/env python3
"""
説明文を句点→改行スタイルに変換するスクリプト
対象: summary, nuance text, form intro, netTip
"""

import json
import re
from pathlib import Path

def convert_to_line_break_style(text: str) -> str:
    """句点を改行に変換（最後の句点は削除）"""
    if not text:
        return text
    
    # 句点（。）を改行に変換
    # ただし、括弧内の句点は変換しない
    result = text
    
    # まず「。」の後にテキストが続く場合は改行に変換
    # 最後の「。」は単に削除
    
    # 「。」で分割して改行で結合（最後の空要素は除外）
    parts = result.split('。')
    
    # 空文字列を除外
    parts = [p.strip() for p in parts if p.strip()]
    
    # 改行で結合（句点なし）
    result = '\n'.join(parts)
    
    return result


def process_lesson(lesson: dict) -> dict:
    """レッスンの説明文を変換"""
    
    for step in lesson.get('steps', []):
        step_type = step.get('type')
        
        # summary タイプ
        if step_type == 'summary' and 'content' in step:
            step['content'] = convert_to_line_break_style(step['content'])
        
        # form タイプ
        if step_type == 'form' and 'intro' in step:
            step['intro'] = convert_to_line_break_style(step['intro'])
        
        # nuance タイプ
        if step_type == 'nuance':
            for point in step.get('points', []):
                if 'text' in point:
                    point['text'] = convert_to_line_break_style(point['text'])
    
    # netTip の変換
    if 'netTip' in lesson:
        lesson['netTip'] = convert_to_line_break_style(lesson['netTip'])
    
    return lesson


def process_file(filepath: Path):
    """JSONファイルを処理"""
    print(f"Processing: {filepath}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        lessons = json.load(f)
    
    converted_lessons = [process_lesson(lesson) for lesson in lessons]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(converted_lessons, f, ensure_ascii=False, indent=2)
    
    print(f"  Converted {len(lessons)} lessons")


def main():
    base_path = Path('/Users/daito/Desktop/anti/net-eibunpo/src/data/lessons')
    
    files = ['grammar.json', 'spoken.json', 'writing.json']
    
    for filename in files:
        filepath = base_path / filename
        if filepath.exists():
            process_file(filepath)


if __name__ == '__main__':
    main()
