import ollama
import asyncio
import json

async def stream_reasoning(prompt: str, websocket, agent: str):
    loop = asyncio.get_event_loop()

    def run_ollama():
        return ollama.chat(
            model="llama3",
            messages=[{"role": "user", "content": prompt}],
            stream=False
        )

    response = await loop.run_in_executor(None, run_ollama)
    full_text = response['message']['content']

    words = full_text.split()
    for word in words:
        message = json.dumps({
            "agent": agent,
            "type": "reasoning",
            "content": {
                "text": word + " ",
                "severity": "LOW",
                "category": "reasoning",
                "value": 0
            }
        })
        await websocket.send_text(message)
        await asyncio.sleep(0.05)