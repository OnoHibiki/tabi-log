# AWSはお金がかかるため、一旦FastAPI

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import get_db_connection 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3000"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

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
            {"id": 1, "title": "【ダミー】京都食べ歩き","location": "京都", "notes": "抹茶スイーツを堪能。清水寺の紅葉が最高でした!", "created_at": "2025-11-01T10:00:00" },
            {"id": 2, "title": "【ダミー】システム設計合宿", "location": "箱根", "notes": "アーキテクチャ設計について議論。温泉でリフレッシュ！", "created_at": "2025-10-20T15:30:00"},
        ]

    return logs

@app.post("/api/logs")
def create_travel_log(log: TravelLogCreate):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO travel_logs (title, location, notes) VALUES (?, ?, ?)",
        (log.title, log.location, log.notes)
    )
    conn.commit()

    new_id = cursor.lastrowid
    conn.close()

    return{"id": new_id, "message": "記録を保存しました"}

@app.delete("/api/logs/{log_id}")
def delete_travel_log(log_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM travel_logs WHERE id = ?", (log_id,))

    conn.commit()
    conn.close()

    return {"message": f"ID{log_id}の記録を削除しました"}