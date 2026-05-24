Face Recognition Attendance System

AI-powered attendance management system using facial recognition with a modern React dashboard and FastAPI backend.

Features
Real-time face recognition attendance
Student registration with image upload
Attendance tracking dashboard
Automatic attendance marking
Email notifications
CSV attendance export
Student management system
Modern responsive UI
DeepFace + FaceNet512 recognition
Unknown face detection
Tech Stack
Frontend
React.js
Vite
Tailwind CSS
Firebase Authentication
Backend
FastAPI
DeepFace
OpenCV
SQLite
Python
AI / ML
FaceNet512
DeepFace
OpenCV Haar Cascade
Project Structure
FaceRecoginationSystem/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── requirements.txt
│   └── runtime.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── data_collection.py
├── face_recognition.py
├── train_model.py
│
├── .gitignore
├── package.json
└── README.md
Installation
Clone Repository
git clone https://github.com/rakeshraj7070468475-oss/face-recognition-attendance-system.git
cd face-recognition-attendance-system
Backend Setup
Create Virtual Environment
python -m venv .venv
Activate Virtual Environment
Windows PowerShell
.venv\Scripts\Activate.ps1
CMD
.venv\Scripts\activate
Install Dependencies
pip install -r backend/requirements.txt
Configure Environment Variables

Create:

backend/.env

Add:

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
TEACHER_EMAIL=teacher@gmail.com
Run Backend
cd backend
uvicorn main:app --reload

Backend runs on:

http://127.0.0.1:8000
Frontend Setup

Open new terminal.

cd frontend
Install Packages
npm install
Run Frontend
npm run dev

Frontend runs on:

http://localhost:5173
API Endpoints
Method	Endpoint	Description
POST	/register	Register student
POST	/recognize	Recognize face
GET	/students	Get all students
GET	/attendance	Get attendance
GET	/export-attendance	Export CSV
DELETE	/delete-student/{id}	Delete student
DELETE	/clear-attendance	Clear attendance
DELETE	/clear-all-data	Reset system
Face Recognition Pipeline
Upload student image
Store embeddings using DeepFace
Capture webcam image
Compare face embeddings
Match using cosine similarity
Mark attendance automatically
Screenshots
Dashboard

Add screenshot here:

screenshots/dashboard.png
Student Registration
screenshots/register.png
Attendance Page
screenshots/attendance.png
Deployment
Frontend

Deploy using:

Netlify
Backend

Deploy using:

Render
Known Limitations
Uses SQLite database
Local filesystem image storage
No cloud storage integration
No JWT authentication
Performance depends on hardware
DeepFace inference latency on CPU
Future Improvements
PostgreSQL integration
Docker deployment
JWT authentication
AWS S3 storage
Real-time webcam streaming
Multi-face attendance
Admin analytics dashboard
Mobile application
Author

Rakesh Singh

Portfolio:
Portfolio Website

GitHub:
GitHub Profile

License

This project is developed for educational and portfolio purposes
