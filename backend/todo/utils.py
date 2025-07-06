import requests
import re

def get_local_llm_suggestions(task_name, task_description, context_text=''):
    prompt = f"""
You are a helpful assistant. Based on the following task details and daily context, suggest the most appropriate:

- Context (e.g., Work, Personal, Study)
- Category (e.g., Email, Meeting, Assignment)
- Priority (High/Medium/Low)
- Suggested Deadline (YYYY-MM-DD format)

Task Name: {task_name}
Task Description: {task_description}

🧠 Daily Context (messages, notes, emails):
{context_text}

Return your answer in this strict format:

Context: <...>
Category: <...>
Priority: <...>
Deadline: <YYYY-MM-DD>
"""

    try:
        response = requests.post(
            "http://127.0.0.1:1234/v1/chat/completions",
            headers={"Content-Type": "application/json"},
            json={
                "model": "llama-2-7b-chat",  # ✅ Your actual LM Studio model name
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.7,
                "max_tokens": 300
            }
        )

        result = response.json()
        print("🧠 Raw LLM JSON:", result)

        if 'choices' not in result or not result['choices']:
            raise Exception("Missing 'choices' in LLM response")

        message = result['choices'][0]['message']['content']
        print("\n🔍 Raw LLM Response:\n", message)

        suggestions = parse_llm_response(message)
        print("✅ Parsed Suggestions:", suggestions)
        return suggestions

    except Exception as e:
        print("❌ LLM error:", e)
        return {
            "context": "General",
            "category": "General",
            "priority": "Low",
            "deadline": None
        }

# Helper function to extract values from model output
def parse_llm_response(text):
    try:
        context = re.search(r"Context:\s*(.+)", text, re.IGNORECASE)
        category = re.search(r"Category:\s*(.+)", text, re.IGNORECASE)
        priority = re.search(r"Priority:\s*(.+)", text, re.IGNORECASE)
        deadline = re.search(r"Deadline:\s*([0-9]{4}-[0-9]{2}-[0-9]{2})", text)

        return {
            "context": context.group(1).strip() if context else "General",
            "category": category.group(1).strip() if category else "General",
            "priority": priority.group(1).strip() if priority else "Low",
            "deadline": deadline.group(1) if deadline else None
        }

    except Exception as e:
        print("❌ Parsing error:", e)
        return {
            "context": "General",
            "category": "General",
            "priority": "Low",
            "deadline": None
        }