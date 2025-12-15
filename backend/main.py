# AWSはお金がかかるため、一旦FastAPI

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import get_db_connection 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3000"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

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