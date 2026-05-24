import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  auth
} from "../firebase";

export default function StudentDashboard() {

  // =====================================
  // STATES
  // =====================================

  const [studentName, setStudentName] =
    useState("");

  const [studentEmail, setStudentEmail] =
    useState("");

  const [attendanceLogs, setAttendanceLogs] =
    useState([]);

  const [presentDays, setPresentDays] =
    useState(0);

  const [attendancePercentage, setAttendancePercentage] =
    useState(0);

  // =====================================
  // FETCH STUDENT DATA
  // =====================================

  const fetchStudentData = async () => {

    try {

      const user = auth.currentUser;

      if (!user) return;

      setStudentEmail(user.email);

      // =================================
      // FETCH STUDENTS
      // =================================

      const studentResponse =
        await axios.get(
  `${import.meta.env.VITE_API_URL}/students`
);

      const matchedStudent =
        studentResponse.data.find(
          (student) =>
            student.email === user.email
        );

      if (matchedStudent) {

        setStudentName(
          matchedStudent.name
        );

        // =============================
        // FETCH ATTENDANCE
        // =============================

        const attendanceResponse =
          await axios.get(
  `${import.meta.env.VITE_API_URL}/attendance`
);

        const studentAttendance =
          attendanceResponse.data.filter(
            (log) =>
              log.name ===
              matchedStudent.name
          );

        setAttendanceLogs(
          studentAttendance
        );

        setPresentDays(
          studentAttendance.length
        );

        // =============================
        // ATTENDANCE %
        // =============================

        const percentage =
          Math.min(
            (
              studentAttendance.length / 30
            ) * 100,
            100
          );

        setAttendancePercentage(
          percentage.toFixed(1)
        );

      }

    } catch (error) {

      console.error(error);

    }

  };

  // =====================================
  // LOAD
  // =====================================

  useEffect(() => {

    fetchStudentData();

  }, []);

  return (

    <div className="min-h-screen bg-black text-white p-8">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold">

          Student Dashboard

        </h1>

        <p className="text-zinc-500 mt-3 text-lg">

          Attendance Monitoring Portal

        </p>

      </div>

      {/* ================================= */}
      {/* PROFILE CARD */}
      {/* ================================= */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-10">

        <h2 className="text-3xl font-bold mb-6">

          Student Information

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* NAME */}

          <div className="bg-zinc-800 rounded-2xl p-5">

            <p className="text-zinc-400 text-sm">

              Student Name

            </p>

            <h2 className="text-2xl font-bold mt-2">

              {studentName || "Loading..."}

            </h2>

          </div>

          {/* EMAIL */}

          <div className="bg-zinc-800 rounded-2xl p-5">

            <p className="text-zinc-400 text-sm">

              Email Address

            </p>

            <h2 className="text-xl font-bold mt-2 break-all">

              {studentEmail}

            </h2>

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* STATS */}
      {/* ================================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* PRESENT DAYS */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <p className="text-zinc-400 text-sm">

            Present Days

          </p>

          <h2 className="text-5xl font-bold mt-3 text-green-400">

            {presentDays}

          </h2>

        </div>

        {/* ATTENDANCE % */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <p className="text-zinc-400 text-sm">

            Attendance Percentage

          </p>

          <h2 className="text-5xl font-bold mt-3">

            {attendancePercentage}%

          </h2>

        </div>

        {/* STATUS */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <p className="text-zinc-400 text-sm">

            Attendance Status

          </p>

          <h2
            className={`text-3xl font-bold mt-3 ${
              attendancePercentage >= 75
                ? "text-green-400"
                : "text-red-400"
            }`}
          >

            {attendancePercentage >= 75
              ? "Good Standing"
              : "Low Attendance"}

          </h2>

        </div>

      </div>

      {/* ================================= */}
      {/* ATTENDANCE HISTORY */}
      {/* ================================= */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-3xl font-bold">

            Attendance History

          </h2>

          <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl font-semibold">

            Live Attendance Records

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-zinc-800 text-zinc-400">

                <th className="text-left py-4">

                  Date & Time

                </th>

                <th className="text-left py-4">

                  Status

                </th>

              </tr>

            </thead>

            <tbody>

              {attendanceLogs.map((log, index) => (

                <tr
                  key={index}
                  className="border-b border-zinc-800"
                >

                  <td className="py-4">

                    {log.time}

                  </td>

                  <td className="py-4">

                    <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-xl text-sm font-semibold">

                      {log.status}

                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}