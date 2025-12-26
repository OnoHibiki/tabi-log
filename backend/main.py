# AWSはお金がかかるため、一旦FastAPI
import shutil
import uuid
import os
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from database import get_db_connection 

from google import genai
from PIL import Image

from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3000"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)


GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
client = genai.Client(api_key=GOOGLE_API_KEY)

class TravelLogCreate(BaseModel):
    title: str
    location: str
    notes: str

@app.get("/")
def read_root():
    return{
        "message" : "Hello from Local FastAPI BackEnd!",
        "status"  : "success"
    }

@app.get("/api/hello")
def read_hello():
    return {
        "message" : "PythonとNext.jsが繋がりました!"
    }

@app.get("/api/logs")
def get_travel_logs():
    conn = get_db_connection()
    logs_cursor = conn.execute('SELECT * FROM travel_logs ORDER BY created_at DESC').fetchall()
    logs = [dict(log) for log in logs_cursor]
    conn.close()

    if not logs:
        return[
           {"id": 1, "title": "まだない","location":  "まだない", "notes": "まだない!", "created_at": "2025-11-01T10:00:00" },
        ]

    return logs

@app.post("/api/logs")
async def create_travel_log(
    title: str = Form(...),
    location: str = Form(...),
    notes: str = Form(...),
    image: UploadFile = File(None) # 画像は必須ではない（NoneでもOK）
):
    """
    画像付きで旅の記録をデータベースに保存する
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    
    image_filename = None
    ai_comment = None

    # 画像が送られてきた場合の処理
    if image:
        # 1. ファイル名が被らないようにユニークなIDをつける
        # (例: "550e8400-e29b..._photo.jpg")
        filename = f"{uuid.uuid4()}_{image.filename}"
        
        # 2. 保存先のパスを決める
        file_location = f"static/{filename}"
        
        # 3. ファイルを実際に保存する
        with open(file_location, "wb+") as file_object:
            shutil.copyfileobj(image.file, file_object)
            
        # データベース保存用にファイル名を記録
        image_filename = filename

        try:
            print("AIが画像を分析中...")

            pil_image = Image.open(file_location)

            prompt = f"""
            あなたはこの旅の参加者です。
            この写真と、ユーザのメモ「{title}」,「{location}」「{notes}」をもとに、
            5、7、5のいい感じの俳句（川柳）を作成してください。
            
            そのあと、その俳句の補足や情景描写を短く解説してください。

            【重要】出力フォーマットは厳密に以下を守ってください：
            
            俳句テキスト
            ---SPLIT---
            解説テキスト
            """
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=[prompt, pil_image]
            )
            
            ai_comment = response.text.strip()
            print(f"AI俳句: {ai_comment}")
        
        except Exception as e :
            print(f"AIエラー！:{e}")
            ai_comment = "AI俳句の生成に失敗しました..."

    # データをINSERT（画像ファイル名も追加）
    cursor.execute(
        "INSERT INTO travel_logs (title, location, notes, image_filename, ai_comment) VALUES (?, ?, ?, ?, ?)",
        (title, location, notes, image_filename, ai_comment)
    )
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    
    return {"id": new_id, "message": "記録を保存しました！"}

@app.delete("/api/logs/{log_id}")
def delete_travel_log(log_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM travel_logs WHERE id = ?", (log_id,))

    conn.commit()
    conn.close()

    return {"message": f"ID{log_id}の記録を削除しました"}