import sqlite3

# =====================================
# CONNECT DATABASE
# =====================================

conn = sqlite3.connect(
    "attendance.db",
    check_same_thread=False
)

cursor = conn.cursor()

# =====================================
# CREATE STUDENTS TABLE
# =====================================

cursor.execute("""

CREATE TABLE IF NOT EXISTS students (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT,

    email TEXT,

    image_path TEXT

)

""")

# =====================================
# CREATE ATTENDANCE TABLE
# =====================================

cursor.execute("""

CREATE TABLE IF NOT EXISTS attendance (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    student_name TEXT,

    time TEXT,

    status TEXT

)

""")

conn.commit()