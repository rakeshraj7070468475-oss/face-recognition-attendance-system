from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from deepface import DeepFace

import sqlite3
import os
import csv
import glob
import re
import shutil
import smtplib

from datetime import datetime
from email.mime.text import MIMEText
from dotenv import load_dotenv

# =========================================
# LOAD ENV
# =========================================

load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
TEACHER_EMAIL = os.getenv("TEACHER_EMAIL")

BASE_URL = os.getenv(
    "BASE_URL",
    "http://127.0.0.1:8000"
)

# =========================================
# FASTAPI
# =========================================

app = FastAPI()

# =========================================
# CORS
# =========================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://facerecognitionsystema.netlify.app",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# =========================================
# BASE PATHS
# =========================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

UPLOAD_DIR = os.path.join(
    BASE_DIR,
    "uploads"
)

KNOWN_DIR = os.path.join(
    BASE_DIR,
    "known_faces"
)

UNKNOWN_DIR = os.path.join(
    BASE_DIR,
    "unknown_faces"
)

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)

os.makedirs(
    KNOWN_DIR,
    exist_ok=True
)

os.makedirs(
    UNKNOWN_DIR,
    exist_ok=True
)

# =========================================
# STATIC FILES
# =========================================

app.mount(
    "/uploads",
    StaticFiles(directory=UPLOAD_DIR),
    name="uploads"
)

# =========================================
# DATABASE
# =========================================

DB_PATH = os.path.join(
    BASE_DIR,
    "attendance.db"
)

conn = sqlite3.connect(
    DB_PATH,
    check_same_thread=False
)

cursor = conn.cursor()

# =========================================
# CREATE TABLES
# =========================================

cursor.execute(
    """

    CREATE TABLE IF NOT EXISTS students (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT,

        email TEXT UNIQUE,

        image_path TEXT

    )

    """
)

cursor.execute(
    """

    CREATE TABLE IF NOT EXISTS attendance (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        student_name TEXT,

        time TEXT,

        status TEXT

    )

    """
)

conn.commit()

# =========================================
# MEMORY
# =========================================

student_emails = {}

# =========================================
# LOAD EMAILS
# =========================================

try:

    cursor.execute(
        """

        SELECT name, email
        FROM students

        """
    )

    students = cursor.fetchall()

    for student in students:

        student_emails[
            student[0]
        ] = student[1]

except Exception as e:

    print(
        "Database Error:",
        e
    )

# =========================================
# CLEAR DEEPFACE CACHE
# =========================================

def clear_deepface_cache():

    try:

        pkl_files = glob.glob(
            os.path.join(
                BASE_DIR,
                "*.pkl"
            )
        )

        for file in pkl_files:

            try:

                os.remove(file)

            except Exception as e:

                print(
                    "PKL Delete Error:",
                    e
                )

    except Exception as e:

        print(
            "Cache Clear Error:",
            e
        )

# =========================================
# SEND EMAIL
# =========================================

def send_email(student_name):

    try:

        if not EMAIL_USER or not EMAIL_PASS:

            return

        student_email = student_emails.get(
            student_name
        )

        server = smtplib.SMTP(
            "smtp.gmail.com",
            587
        )

        server.starttls()

        server.login(
            EMAIL_USER,
            EMAIL_PASS
        )

        # =================================
        # TEACHER EMAIL
        # =================================

        if TEACHER_EMAIL:

            teacher_body = f"""
Attendance Marked Successfully

Student: {student_name}

Status: PRESENT

Time: {datetime.now()}
"""

            teacher_msg = MIMEText(
                teacher_body
            )

            teacher_msg["Subject"] = "Attendance Marked"

            teacher_msg["From"] = EMAIL_USER

            teacher_msg["To"] = TEACHER_EMAIL

            server.send_message(
                teacher_msg
            )

        # =================================
        # STUDENT EMAIL
        # =================================

        if student_email:

            student_body = f"""
Hello {student_name},

Your attendance has been marked successfully.

Status: PRESENT

Time: {datetime.now()}

Thank You
"""

            student_msg = MIMEText(
                student_body
            )

            student_msg["Subject"] = "Attendance Confirmation"

            student_msg["From"] = EMAIL_USER

            student_msg["To"] = student_email

            server.send_message(
                student_msg
            )

        server.quit()

    except Exception as e:

        print(
            "Email Error:",
            e
        )

# =========================================
# HOME
# =========================================

@app.get("/")

def home():

    return {

        "message":
        "Face Recognition Backend Running"

    }

# =========================================
# REGISTER STUDENT
# =========================================

@app.post("/register")

async def register_student(

    name: str = Form(...),

    email: str = Form(...),

    file: UploadFile = File(...)

):

    try:

        # =================================
        # CHECK EXISTING STUDENT
        # =================================

        cursor.execute(
            """

            SELECT *
            FROM students

            WHERE email = ?

            """,

            (email,)
        )

        existing = cursor.fetchone()

        if existing:

            return {

                "error":
                "Student already exists"

            }

        # =================================
        # SAFE FILE NAME
        # =================================

        timestamp = datetime.now().strftime(
            "%Y%m%d_%H%M%S"
        )

        extension = file.filename.split(".")[-1]

        safe_name = re.sub(
            r'[^a-zA-Z0-9]',
            '_',
            name
        )

        filename = f"{safe_name}_{timestamp}.{extension}"

        # =================================
        # SAFE FOLDER NAME
        # =================================

        safe_folder_name = re.sub(
            r'[^a-zA-Z0-9]',
            '_',
            name
        )

        person_dir = os.path.join(
            KNOWN_DIR,
            safe_folder_name
        )

        os.makedirs(
            person_dir,
            exist_ok=True
        )

        # =================================
        # PATHS
        # =================================

        upload_path = os.path.join(
            UPLOAD_DIR,
            filename
        )

        known_path = os.path.join(
            person_dir,
            filename
        )

        # =================================
        # READ FILE
        # =================================

        contents = await file.read()

        # =================================
        # SAVE UPLOAD IMAGE
        # =================================

        with open(upload_path, "wb") as buffer:

            buffer.write(contents)

        # =================================
        # SAVE KNOWN IMAGE
        # =================================

        with open(known_path, "wb") as buffer:

            buffer.write(contents)

        # =================================
        # INSERT DATABASE
        # =================================

        cursor.execute(
            """

            INSERT INTO students (

                name,
                email,
                image_path

            )

            VALUES (?, ?, ?)

            """,

            (
                name,
                email,
                filename
            )

        )

        conn.commit()

        student_emails[
            name
        ] = email

        # =================================
        # CLEAR CACHE
        # =================================

        clear_deepface_cache()

        return {

            "message":
            "Student registered successfully"

        }

    except Exception as e:

        print(
            "REGISTER ERROR:",
            e
        )

        return {

            "error":
            str(e)

        }

# =========================================
# RECOGNIZE FACE
# =========================================

@app.post("/recognize")

async def recognize_face(
    file: UploadFile = File(...)
):

    try:

        timestamp = datetime.now().strftime(
            "%Y%m%d_%H%M%S"
        )

        temp_path = os.path.join(
            UPLOAD_DIR,
            f"temp_{timestamp}.jpg"
        )

        # =================================
        # SAVE TEMP IMAGE
        # =================================

        contents = await file.read()

        with open(temp_path, "wb") as buffer:

            buffer.write(contents)

        # =================================
        # FACE SEARCH
        # =================================

        result = DeepFace.find(

            img_path=temp_path,

            db_path=KNOWN_DIR,

            enforce_detection=False,

            detector_backend="opencv",

            model_name="Facenet512",

            distance_metric="cosine",

            silent=True

        )

        # =================================
        # NO MATCH
        # =================================

        if len(result) == 0 or len(result[0]) == 0:

            if os.path.exists(temp_path):

                os.remove(temp_path)

            return {

                "person": "Unknown",

                "confidence": 0

            }

        # =================================
        # BEST MATCH
        # =================================

        best_match = result[0].iloc[0]

        identity = best_match["identity"]

        distance = float(
            best_match["distance"]
        )

        print(
            "MATCH DISTANCE:",
            distance
        )

        # =================================
        # THRESHOLD
        # =================================

        threshold = 0.50

        # =================================
        # UNKNOWN FACE
        # =================================

        if distance > threshold:

            unknown_path = os.path.join(
                UNKNOWN_DIR,
                f"unknown_{timestamp}.jpg"
            )

            if os.path.exists(temp_path):

                shutil.copy(
                    temp_path,
                    unknown_path
                )

                os.remove(temp_path)

            return {

                "person": "Unknown",

                "confidence": 0

            }

        # =================================
        # EXTRACT NAME
        # =================================

        person_name = os.path.basename(
            os.path.dirname(identity)
        ).replace("_", " ")

        # =================================
        # CONFIDENCE
        # =================================

        confidence = round(
            (1 - distance) * 100,
            2
        )

        # =================================
        # CHECK TODAY ATTENDANCE
        # =================================

        today = datetime.now().strftime(
            "%Y-%m-%d"
        )

        cursor.execute(
            """

            SELECT *
            FROM attendance

            WHERE student_name = ?
            AND DATE(time) = ?

            """,

            (
                person_name,
                today
            )

        )

        already_marked = cursor.fetchone()

        # =================================
        # INSERT ATTENDANCE
        # =================================

        if not already_marked:

            current_time = str(
                datetime.now()
            )

            cursor.execute(
                """

                INSERT INTO attendance (

                    student_name,
                    time,
                    status

                )

                VALUES (?, ?, ?)

                """,

                (
                    person_name,
                    current_time,
                    "Present"
                )

            )

            conn.commit()

            send_email(
                person_name
            )

        # =================================
        # DELETE TEMP IMAGE
        # =================================

        if os.path.exists(temp_path):

            os.remove(temp_path)

        return {

            "person": person_name,

            "confidence": confidence

        }

    except Exception as e:

        print(
            "Recognition Error:",
            e
        )

        return {

            "person": "Error",

            "confidence": 0,

            "error": str(e)

        }

# =========================================
# GET ATTENDANCE
# =========================================

@app.get("/attendance")

def get_attendance():

    try:

        cursor.execute(
            """

            SELECT
                student_name,
                time,
                status

            FROM attendance

            ORDER BY id DESC

            """
        )

        rows = cursor.fetchall()

        data = []

        for row in rows:

            data.append({

                "name": row[0],

                "time": row[1],

                "status": row[2]

            })

        return data

    except Exception as e:

        return {

            "error":
            str(e)

        }

# =========================================
# EXPORT CSV
# =========================================

@app.get("/export-attendance")

def export_attendance():

    try:

        file_path = os.path.join(
            BASE_DIR,
            "attendance.csv"
        )

        cursor.execute(
            """

            SELECT
                student_name,
                time,
                status

            FROM attendance

            ORDER BY id DESC

            """
        )

        rows = cursor.fetchall()

        with open(

            file_path,

            mode="w",

            newline="",

            encoding="utf-8"

        ) as file:

            writer = csv.writer(file)

            writer.writerow([

                "Student Name",
                "Time",
                "Status"

            ])

            writer.writerows(rows)

        return FileResponse(

            path=file_path,

            filename="attendance.csv",

            media_type="text/csv"

        )

    except Exception as e:

        return {

            "error":
            str(e)

        }

# =========================================
# GET STUDENTS
# =========================================

@app.get("/students")

def get_students():

    try:

        cursor.execute(
            """

            SELECT
                id,
                name,
                email,
                image_path

            FROM students

            ORDER BY id DESC

            """
        )

        rows = cursor.fetchall()

        data = []

        for row in rows:

            data.append({

                "id": row[0],

                "name": row[1],

                "email": row[2],

                "image":
                f"{BASE_URL}/uploads/{row[3]}?t={datetime.now().timestamp()}"

            })

        return data

    except Exception as e:

        return {

            "error":
            str(e)

        }

# =========================================
# DELETE STUDENT
# =========================================

@app.delete("/delete-student/{student_id}")

def delete_student(student_id: int):

    try:

        cursor.execute(
            """

            SELECT
                name,
                image_path

            FROM students

            WHERE id = ?

            """,

            (student_id,)
        )

        student = cursor.fetchone()

        if not student:

            return {

                "error":
                "Student not found"

            }

        student_name = student[0]

        image_name = student[1]

        cursor.execute(
            """

            DELETE FROM students

            WHERE id = ?

            """,

            (student_id,)
        )

        conn.commit()

        safe_folder_name = re.sub(
            r'[^a-zA-Z0-9]',
            '_',
            student_name
        )

        student_folder = os.path.join(
            KNOWN_DIR,
            safe_folder_name
        )

        if os.path.exists(student_folder):

            shutil.rmtree(
                student_folder
            )

        image_path = os.path.join(
            UPLOAD_DIR,
            image_name
        )

        if os.path.exists(image_path):

            os.remove(
                image_path
            )

        clear_deepface_cache()

        return {

            "message":
            "Student deleted successfully"

        }

    except Exception as e:

        return {

            "error":
            str(e)

        }

# =========================================
# CLEAR ATTENDANCE
# =========================================

@app.delete("/clear-attendance")

def clear_attendance():

    try:

        cursor.execute(
            """

            DELETE FROM attendance

            """
        )

        conn.commit()

        return {

            "message":
            "Attendance cleared"

        }

    except Exception as e:

        return {

            "error":
            str(e)

        }

# =========================================
# CLEAR ALL DATA
# =========================================

@app.delete("/clear-all-data")

def clear_all_data():

    try:

        cursor.execute(
            """

            DELETE FROM attendance

            """
        )

        cursor.execute(
            """

            DELETE FROM students

            """
        )

        conn.commit()

        student_emails.clear()

        for folder in [

            KNOWN_DIR,
            UPLOAD_DIR,
            UNKNOWN_DIR

        ]:

            if os.path.exists(folder):

                for item in os.listdir(folder):

                    item_path = os.path.join(
                        folder,
                        item
                    )

                    try:

                        if os.path.isdir(item_path):

                            shutil.rmtree(
                                item_path
                            )

                        else:

                            os.remove(
                                item_path
                            )

                    except Exception as e:

                        print(
                            "Delete Error:",
                            e
                        )

        clear_deepface_cache()

        return {

            "message":
            "All system data cleared"

        }

    except Exception as e:

        return {

            "error":
            str(e)

        }