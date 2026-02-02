import json
import glob
import os

data_dir = "/Users/daito/Desktop/anti/net-eibunpo/src/data/lessons"
json_files = sorted(glob.glob(os.path.join(data_dir, "*.json")))

print(f"Found {len(json_files)} json files in {data_dir}\n")

all_lessons = []

for file_path in json_files:
    filename = os.path.basename(file_path)
    if filename == "backup": continue
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lessons = json.load(f)
            print(f"=== {filename} ({len(lessons)} lessons) ===")
            for lesson in lessons:
                title = lesson.get('title', 'No Title')
                steps = lesson.get('steps', [])
                summary_content = ""
                form_intro = ""
                
                for step in steps:
                    if step.get('type') == 'summary':
                        summary_content = step.get('content', '')
                    if step.get('type') == 'form':
                        form_intro = step.get('intro', '')
                
                print(f"  - {title}")
                # print(f"    Summary: {summary_content[:100]}..." if len(summary_content) > 100 else f"    Summary: {summary_content}")
                
                all_lessons.append({
                    'file': filename,
                    'title': title,
                    'summary': summary_content,
                    'form_intro': form_intro
                })
            print("\n")
            
    except Exception as e:
        print(f"Error reading {filename}: {e}")

print(f"Total lessons: {len(all_lessons)}")
