#!/usr/bin/env python3
"""
レッスンコンテンツの説明文を改善するスクリプト
- 体言止め・省略形を自然な完結文に修正
- 全体の文脈を保ちながら改善
"""

import json
import re
from pathlib import Path

def improve_text(text: str) -> str:
    """テキストを自然な完結文に改善"""
    if not text:
        return text
    
    result = text
    
    # 具体的な改善パターン（順序が重要）
    replacements = [
        # 「〜ことも。」パターン
        ('省略されることも。', '省略されることもある。'),
        ('疑問文になることも。', '疑問文になることもある。'),
        ('省略することも。', '省略することもある。'),
        ('確信を表すことも。', '確信を表すこともある。'),
        ('曖昧にすることも。', '曖昧にすることもある。'),
        ('確認することも。', '確認することもある。'),
        ('短縮することも。', '短縮することもある。'),
        ('省くことも。', '省くこともある。'),
        ('使うことも。', '使うこともある。'),
        ('なることも。', 'なることもある。'),
        
        # 「縮約形。」パターン
        ('ほぼ100%縮約形。', 'ほぼ100%縮約形が使われる。'),
        
        # 「ニュアンス。」パターン - 文末のみ
        ('継続のニュアンス。', '継続のニュアンスがある。'),
        ('控えめなニュアンス。', '控えめなニュアンスを持つ。'),
        
        # 「〜とか。」パターン  
        ('とか。', 'などがある。'),
        
        # その他のパターン
        ('知らないと聞き取れない。', '知らないと聞き取れないことが多い。'),
        ('避ける。', '避けた方がいい。'),
    ]
    
    for old, new in replacements:
        result = result.replace(old, new)
    
    return result


def improve_lesson(lesson: dict) -> dict:
    """1つのレッスンの内容を改善"""
    
    for step in lesson.get('steps', []):
        step_type = step.get('type')
        
        # summary タイプ
        if step_type == 'summary' and 'content' in step:
            step['content'] = improve_text(step['content'])
        
        # form タイプ
        if step_type == 'form' and 'intro' in step:
            step['intro'] = improve_text(step['intro'])
        
        # nuance タイプ
        if step_type == 'nuance':
            for point in step.get('points', []):
                if 'text' in point:
                    point['text'] = improve_text(point['text'])
        
        # comparison タイプ
        if step_type == 'comparison':
            for pair in step.get('pairs', []):
                if 'note' in pair:
                    pair['note'] = improve_text(pair['note'])
    
    # netTip の改善
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
        else:
            print(f"File not found: {filepath}")


if __name__ == '__main__':
    main()
