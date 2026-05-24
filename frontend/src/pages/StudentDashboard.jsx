import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  auth
} from "../firebase";

export default function StudentDashboard() {

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

  // =========================================
  // FETCH DATA
  // =========================================

  const fetchStudentData = async () => {

    try {

      const user = auth.currentUser;

      if (!user) return;

      setStudentEmail(user.email);

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

  useEffect(() => {

    fetchStudentData();

  }, []);

  return (

    <div className="min-h-screen bg-[#07090D] text-white flex overflow-hidden">

      {/* ========================================= */}
      {/* SIDEBAR */}
      {/* ========================================= */}

      <div className="hidden lg:flex w-[260px] border-r border-white/5 bg-[#0B0D11] flex-col justify-between p-8">

        <div>

          <div className="mb-16">

            <p className="text-xs tracking-[0.3em] text-zinc-500 uppercase mb-5">

              Student Portal

            </p>

            <h1 className="text-4xl font-semibold leading-tight">

              Dashboard

            </h1>

          </div>

          <div className="space-y-3">

            <button className="w-full bg-white text-black rounded-2xl px-5 py-4 text-left font-medium">

              Overview

            </button>

            <button className="w-full hover:bg-white/5 text-zinc-400 rounded-2xl px-5 py-4 text-left transition">

              Attendance

            </button>

            <button className="w-full hover:bg-white/5 text-zinc-400 rounded-2xl px-5 py-4 text-left transition">

              Records

            </button>

            <button className="w-full hover:bg-white/5 text-zinc-400 rounded-2xl px-5 py-4 text-left transition">

              Analytics

            </button>

          </div>

        </div>

        {/* PROFILE */}

        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5">

          <div className="flex items-center gap-4">

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-gradient-to-br
                from-cyan-400
                to-blue-600
                flex
                items-center
                justify-center
                text-xl
                font-bold
              "
            >

              {studentName
                ?.charAt(0)
                ?.toUpperCase() || "S"}

            </div>

            <div>

              <h2 className="font-semibold">

                {studentName || "Loading..."}

              </h2>

              <p className="text-zinc-500 text-sm">

                Student Account

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================= */}
      {/* MAIN */}
      {/* ========================================= */}

      <div className="flex-1 overflow-auto">

        <div className="p-8 lg:p-10">

          {/* TOPBAR */}

          <div className="flex items-center justify-between mb-10">

            <div>

              <p className="text-zinc-500 uppercase tracking-[0.25em] text-xs mb-4">

                Attendance Workspace

              </p>

              <h1 className="text-5xl font-semibold tracking-[-0.04em]">

                Welcome back

              </h1>

            </div>

            <div
              className="
                hidden
                md:flex
                items-center
                gap-4
                bg-white/[0.03]
                border
                border-white/10
                rounded-3xl
                px-5
                py-4
              "
            >

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-gradient-to-br
                  from-violet-500
                  to-blue-500
                  flex
                  items-center
                  justify-center
                  font-semibold
                  text-lg
                "
              >

                {studentName
                  ?.charAt(0)
                  ?.toUpperCase() || "S"}

              </div>

              <div>

                <h2 className="font-medium">

                  {studentName || "Loading..."}

                </h2>

                <p className="text-zinc-500 text-sm">

                  {studentEmail}

                </p>

              </div>

            </div>

          </div>

          {/* HERO */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[34px]
              border
              border-white/10
              p-10
              mb-8
              bg-[#0F1117]
            "
          >

            {/* LIGHTS */}

            <div className="absolute -top-20 -right-20 w-[320px] h-[320px] bg-cyan-500/10 blur-[120px]" />

            <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-violet-500/10 blur-[120px]" />

            {/* CONTENT */}

            <div className="relative z-10 flex flex-col xl:flex-row xl:items-end xl:justify-between gap-10">

              {/* LEFT */}

              <div className="max-w-3xl">

                <div className="flex items-center gap-3 mb-6">

                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

                  <span className="text-sm text-zinc-500 tracking-[0.2em] uppercase">

                    Student Workspace

                  </span>

                </div>

                <h2 className="text-[58px] leading-[0.95] font-semibold tracking-[-0.05em] max-w-2xl">

                  Attendance
                  monitoring
                  built for
                  modern campuses.

                </h2>

                <p className="text-zinc-400 text-lg mt-8 leading-relaxed max-w-xl">

                  Access realtime attendance records,
                  monitor classroom presence and
                  track academic activity from one place.

                </p>

              </div>

              {/* RIGHT */}

              <div className="grid grid-cols-2 gap-4 min-w-[340px]">

                <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

                  <p className="text-zinc-500 text-sm mb-4">

                    Recognition Accuracy

                  </p>

                  <h2 className="text-4xl font-semibold">

                    99.9%

                  </h2>

                </div>

                <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 backdrop-blur-xl">

                  <p className="text-zinc-500 text-sm mb-4">

                    Active Sessions

                  </p>

                  <h2 className="text-4xl font-semibold">

                    24/7

                  </h2>

                </div>

                <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 backdrop-blur-xl col-span-2">

                  <div className="flex items-center justify-between mb-4">

                    <p className="text-zinc-500 text-sm">

                      System Status

                    </p>

                    <div className="flex items-center gap-2">

                      <div className="w-2 h-2 rounded-full bg-green-400" />

                      <span className="text-green-400 text-sm">

                        Online

                      </span>

                    </div>

                  </div>

                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">

                    <div className="h-full w-[82%] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            {/* PRESENT DAYS */}

            <div className="bg-[#101317] border border-white/5 rounded-[30px] p-7">

              <p className="text-zinc-500 mb-6">

                Present Days

              </p>

              <h2 className="text-6xl font-semibold text-green-400">

                {presentDays}

              </h2>

            </div>

            {/* ATTENDANCE */}

            <div className="bg-[#101317] border border-white/5 rounded-[30px] p-7">

              <p className="text-zinc-500 mb-6">

                Attendance Percentage

              </p>

              <h2 className="text-6xl font-semibold">

                {attendancePercentage}%

              </h2>

              <div className="mt-6 h-2 bg-white/5 rounded-full overflow-hidden">

                <div
                  className="
                    h-full
                    rounded-full
                    bg-white
                  "
                  style={{
                    width: `${attendancePercentage}%`,
                  }}
                />

              </div>

            </div>

            {/* STATUS */}

            <div className="bg-[#101317] border border-white/5 rounded-[30px] p-7">

              <p className="text-zinc-500 mb-6">

                Attendance Status

              </p>

              <h2
                className={`
                  text-3xl
                  font-semibold
                  ${
                    attendancePercentage >= 75
                      ? "text-green-400"
                      : "text-red-400"
                  }
                `}
              >

                {attendancePercentage >= 75
                  ? "Excellent"
                  : "Low Attendance"}

              </h2>

            </div>

          </div>

          {/* ATTENDANCE TABLE */}

          <div className="bg-[#101317] border border-white/5 rounded-[34px] overflow-hidden">

            {/* HEADER */}

            <div className="flex items-center justify-between p-8 border-b border-white/5">

              <div>

                <p className="text-zinc-500 mb-2">

                  Activity Logs

                </p>

                <h2 className="text-3xl font-semibold">

                  Attendance History

                </h2>

              </div>

              <div className="flex items-center gap-3">

                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

                <span className="text-green-400 font-medium">

                  Live Records

                </span>

              </div>

            </div>

            {/* TABLE */}

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b border-white/5 text-zinc-500">

                    <th className="text-left py-5 px-8 font-medium">

                      Date & Time

                    </th>

                    <th className="text-left py-5 px-8 font-medium">

                      Status

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {attendanceLogs.length === 0 && (

                    <tr>

                      <td
                        colSpan="2"
                        className="text-center py-20 text-zinc-500"
                      >

                        No attendance records found

                      </td>

                    </tr>

                  )}

                  {attendanceLogs.map((log, index) => (

                    <tr
                      key={index}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition"
                    >

                      <td className="py-5 px-8">

                        {log.time}

                      </td>

                      <td className="py-5 px-8">

                        <span
                          className="
                            bg-green-500/10
                            text-green-400
                            border
                            border-green-500/20
                            px-4
                            py-2
                            rounded-xl
                            text-sm
                            font-medium
                          "
                        >

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

      </div>

    </div>

  );

}