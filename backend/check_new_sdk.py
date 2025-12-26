# backend/check_new_sdk.py
from google import genai

# ★ここにAPIキーを入れてください
GOOGLE_API_KEY = "AIzaSyBlXIab2dJKq355kTBAT24QFSfMmeoczw8"

client = genai.Client(api_key=GOOGLE_API_KEY)

print("🔍 利用可能なモデル一覧:")

try:
    # 単純にモデルの名前だけを全部表示します
    for m in client.models.list():
        print(f"名前: {m.name}")

except Exception as e:
    print(f"エラー: {e}")