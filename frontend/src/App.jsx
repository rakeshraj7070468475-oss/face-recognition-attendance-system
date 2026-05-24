import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import ProtectedRoute from "./components/ProtectedRoute";

import RoleSelect from "./pages/RoleSelect";

import TeacherLogin from "./pages/TeacherLogin";

import StudentLogin from "./pages/StudentLogin";

import Dashboard from "./pages/Dashboard";

import Register from "./pages/Register";

import Attendance from "./pages/Attendance";

import Students from "./pages/Students";

import StudentDashboard from "./pages/StudentDashboard";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ================================= */}
        {/* ROLE SELECT */}
        {/* ================================= */}

        <Route
          path="/"
          element={<RoleSelect />}
        />

        {/* ================================= */}
        {/* TEACHER LOGIN */}
        {/* ================================= */}

        <Route
          path="/login-teacher"
          element={<TeacherLogin />}
        />

        {/* ================================= */}
        {/* STUDENT LOGIN */}
        {/* ================================= */}

        <Route
          path="/login-student"
          element={<StudentLogin />}
        />

        {/* ================================= */}
        {/* TEACHER DASHBOARD */}
        {/* ================================= */}

        <Route
          path="/teacher-dashboard"
          element={

            <ProtectedRoute>

              <div className="flex bg-[#0B0D11] min-h-screen text-white">

                {/* SIDEBAR */}

                <Sidebar />

                {/* MAIN */}

                <main className="flex-1 overflow-auto">

                  <Dashboard />

                </main>

              </div>

            </ProtectedRoute>

          }
        />

        {/* ================================= */}
        {/* REGISTER */}
        {/* ================================= */}

        <Route
          path="/register"
          element={

            <ProtectedRoute>

              <div className="flex bg-[#0B0D11] min-h-screen text-white">

                <Sidebar />

                <main className="flex-1 overflow-auto">

                  <Register />

                </main>

              </div>

            </ProtectedRoute>

          }
        />

        {/* ================================= */}
        {/* ATTENDANCE */}
        {/* ================================= */}

        <Route
          path="/attendance"
          element={

            <ProtectedRoute>

              <div className="flex bg-[#0B0D11] min-h-screen text-white">

                <Sidebar />

                <main className="flex-1 overflow-auto">

                  <Attendance />

                </main>

              </div>

            </ProtectedRoute>

          }
        />

        {/* ================================= */}
        {/* STUDENTS */}
        {/* ================================= */}

        <Route
          path="/students"
          element={

            <ProtectedRoute>

              <div className="flex bg-[#0B0D11] min-h-screen text-white">

                <Sidebar />

                <main className="flex-1 overflow-auto">

                  <Students />

                </main>

              </div>

            </ProtectedRoute>

          }
        />

        {/* ================================= */}
        {/* STUDENT DASHBOARD */}
        {/* ================================= */}

        <Route
          path="/student-dashboard"
          element={

            <ProtectedRoute>

              <div className="bg-[#0B0D11] min-h-screen text-white">

                <StudentDashboard />

              </div>

            </ProtectedRoute>

          }
        />

        {/* ================================= */}
        {/* FALLBACK */}
        {/* ================================= */}

        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    </BrowserRouter>

  );

}