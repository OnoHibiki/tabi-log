import sqlite3

DATABASE_FILE = "tabilog.db"


def get_db_connection():
    conn = sqlite3.connect(DATABASE_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def initialize_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
            CREATE TABLE IF NOT EXISTS travel_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                location TEXT,
                notes TEXT,
                image_filename TEXT,
                ai_comment TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
    """)
    conn.commit()
    conn.close()

    print(f"データベース '{DATABASE_FILE}' が初期化されました。")


if __name__ == '__main__':
    initialize_db()