import Webcam from "react-webcam";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import axios from "axios";


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const API = import.meta.env.VITE_API_URL;

export default function Dashboard() {

  const webcamRef = useRef(null);

  const intervalRef = useRef(null);

  // =========================================
  // STATES
  // =========================================

  const [person, setPerson] =
    useState("Waiting...");

  const [confidence, setConfidence] =
    useState(0);

  const [status, setStatus] =
    useState("Monitoring");

  const [attendanceLogs, setAttendanceLogs] =
    useState([]);

  const [totalStudents, setTotalStudents] =
    useState(0);

  const [presentToday, setPresentToday] =
    useState(0);

  const [unknownDetected, setUnknownDetected] =
    useState(false);

  // =========================================
  // ANALYTICS
  // =========================================

  const analyticsData = [

    {
      name: "Mon",
      attendance: 12,
    },

    {
      name: "Tue",
      attendance: 18,
    },

    {
      name: "Wed",
      attendance: 14,
    },

    {
      name: "Thu",
      attendance: 21,
    },

    {
      name: "Fri",
      attendance: presentToday,
    },

  ];

  // =========================================
  // FETCH ATTENDANCE
  // =========================================

  const fetchAttendance = async () => {

    try {

      const response = await axios.get(
        `${API}/attendance`
      );

      const logs = Array.isArray(response.data)
        ? response.data
        : [];

      setAttendanceLogs(logs);

      setPresentToday(logs.length);

    } catch (error) {

      console.error(error);

    }

  };

  // =========================================
  // FETCH STUDENTS
  // =========================================

  const fetchStudents = async () => {

    try {

      const response = await axios.get(
        `${API}/students`
      );

      const students = Array.isArray(response.data)
        ? response.data
        : [];

      setTotalStudents(students.length);

    } catch (error) {

      console.error(error);

    }

  };

  // =========================================
  // CLEAR ATTENDANCE
  // =========================================

  const clearAttendance = async () => {

    const confirmClear =
      window.confirm(
        "Clear attendance records?"
      );

    if (!confirmClear) return;

    try {

      await axios.delete(
        `${API}/clear-attendance`
      );

      setAttendanceLogs([]);

      setPresentToday(0);

      alert("Attendance cleared");

    } catch (error) {

      console.error(error);

      alert("Failed to clear logs");

    }

  };

  // =========================================
  // CLEAR ALL DATA
  // =========================================

  const clearAllData = async () => {

    const confirmDelete =
      window.confirm(
        "Delete ALL system data?"
      );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `${API}/clear-all-data`
      );

      setAttendanceLogs([]);

      setPresentToday(0);

      setTotalStudents(0);

      setPerson("Waiting...");

      setConfidence(0);

      alert("All data deleted");

    } catch (error) {

      console.error(error);

      alert("Failed to delete data");

    }

  };

  // =========================================
  // FACE RECOGNITION
  // =========================================

  const recognizeFace = async () => {

    try {

      if (!webcamRef.current) return;

      const imageSrc =
        webcamRef.current.getScreenshot();

      if (!imageSrc) return;

      const blob = await fetch(imageSrc)
        .then((res) => res.blob());

      const formData = new FormData();

      formData.append(
        "file",
        blob,
        "capture.jpg"
      );

      const response = await axios.post(
        `${API}/recognize`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      const data = response.data;

      setPerson(
        data.person || "Unknown"
      );

      setConfidence(
        Math.round(data.confidence || 0)
      );

      if (data.person === "Unknown") {

        setUnknownDetected(true);

        setStatus("Unknown Face");

      } else {

        setUnknownDetected(false);

        setStatus("Monitoring");

      }

      await fetchAttendance();

      await fetchStudents();

    } catch (error) {

      console.error(error);

      setStatus("Backend Error");

    }

  };

  // =========================================
  // INITIAL LOAD
  // =========================================

  useEffect(() => {

    fetchAttendance();

    fetchStudents();

  }, []);

  // =========================================
  // AUTO LOOP
  // =========================================

  useEffect(() => {

    intervalRef.current = setInterval(() => {

      recognizeFace();

    }, 5000);

    return () => {

      if (intervalRef.current) {

        clearInterval(
          intervalRef.current
        );

      }

    };

  }, []);

  return (

    <div className="relative min-h-screen bg-[#06070A] text-white overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute inset-0 -z-10 pointer-events-none">

        <div className="absolute top-[-250px] left-[-150px] w-[500px] h-[500px] bg-cyan-500/10 blur-[140px]" />

        <div className="absolute bottom-[-250px] right-[-150px] w-[500px] h-[500px] bg-violet-500/10 blur-[140px]" />

      </div>

      {/* CONTENT */}

      <div className="p-6 lg:p-8">

        {/* TOPBAR */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">

          <div>

            <p className="uppercase tracking-[0.25em] text-zinc-500 text-xs mb-3">

              Attendance Control Center

            </p>

            <h1 className="text-4xl font-semibold tracking-tight">

              Operations Dashboard

            </h1>

          </div>

          {/* ACTIONS */}

          <div className="flex flex-wrap items-center gap-3">

            <div
              className="
                flex
                items-center
                gap-3
                bg-emerald-500/10
                border
                border-emerald-500/20
                px-4
                py-3
                rounded-2xl
              "
            >

              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

              <span className="text-sm text-emerald-400 font-medium">

                System Active

              </span>

            </div>

            <a
              href={`${API}/export-attendance`}
              target="_blank"
              rel="noreferrer"
              className="
                px-5
                py-3
                rounded-2xl
                bg-white
                text-black
                font-semibold
                text-sm
                hover:scale-105
                transition
              "
            >

              Export CSV

            </a>

            <button
              onClick={clearAttendance}
              className="
                px-5
                py-3
                rounded-2xl
                bg-red-500/10
                border
                border-red-500/20
                text-red-400
                font-medium
                text-sm
                hover:bg-red-500/20
                transition
              "
            >

              Clear Logs

            </button>

            <button
              onClick={clearAllData}
              className="
                px-5
                py-3
                rounded-2xl
                bg-red-600
                text-white
                font-medium
                text-sm
                hover:bg-red-700
                transition
              "
            >

              Delete Data

            </button>

          </div>

        </div>

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">

          {/* CAMERA */}

          <div className="xl:col-span-8">

            <div
              className="
                relative
                overflow-hidden
                rounded-[30px]
                bg-black
                min-h-[620px]
              "
            >

              {/* WEBCAM */}

              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                mirrored={true}
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                "
                videoConstraints={{
                  width: 1280,
                  height: 720,
                  facingMode: "user",
                }}
              />

              {/* OVERLAY */}

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* TOP HUD */}

              <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between">

                <div
                  className="
                    bg-black/40
                    backdrop-blur-xl
                    border
                    border-white/10
                    px-4
                    py-3
                    rounded-2xl
                    flex
                    items-center
                    gap-3
                  "
                >

                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                  <span className="text-sm font-medium">

                    Live Recognition Feed

                  </span>

                </div>

                <div
                  className="
                    bg-black/40
                    backdrop-blur-xl
                    border
                    border-white/10
                    px-4
                    py-3
                    rounded-2xl
                    text-sm
                  "
                >

                  1280 × 720

                </div>

              </div>

              {/* FACE INFO */}

              <div className="absolute bottom-5 left-5 z-20">

                <div
                  className="
                    bg-black/50
                    backdrop-blur-2xl
                    border
                    border-white/10
                    rounded-[26px]
                    p-6
                    min-w-[340px]
                  "
                >

                  <p className="text-zinc-400 text-sm mb-2">

                    Current Recognition

                  </p>

                  <h2 className="text-5xl font-semibold">

                    {person}

                  </h2>

                  <div className="mt-6">

                    <div className="flex justify-between text-sm mb-2">

                      <span className="text-zinc-400">

                        Confidence

                      </span>

                      <span>

                        {confidence}%

                      </span>

                    </div>

                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">

                      <div
                        className="
                          h-full
                          rounded-full
                          bg-gradient-to-r
                          from-cyan-400
                          to-blue-500
                        "
                        style={{
                          width: `${confidence}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT PANEL */}

          <div className="xl:col-span-4 space-y-6">

            {/* STATUS */}

            <div className="bg-white/[0.03] rounded-[26px] p-6">

              <p className="text-zinc-500 text-sm">

                Monitoring Status

              </p>

              <h2
                className={`text-3xl font-semibold mt-4 ${
                  unknownDetected
                    ? "text-red-400"
                    : "text-emerald-400"
                }`}
              >

                {unknownDetected
                  ? "Unknown Face"
                  : "Monitoring Active"}

              </h2>

              <div className="grid grid-cols-2 gap-4 mt-8">

                <div className="bg-black/30 rounded-2xl p-4">

                  <p className="text-zinc-500 text-sm">

                    Students

                  </p>

                  <h3 className="text-3xl font-semibold mt-3">

                    {totalStudents}

                  </h3>

                </div>

                <div className="bg-black/30 rounded-2xl p-4">

                  <p className="text-zinc-500 text-sm">

                    Present

                  </p>

                  <h3 className="text-3xl font-semibold mt-3 text-emerald-400">

                    {presentToday}

                  </h3>

                </div>

              </div>

            </div>

            {/* ACTIVITY */}

            <div className="bg-white/[0.03] rounded-[26px] p-6">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h2 className="text-2xl font-semibold">

                    Recent Activity

                  </h2>

                  <p className="text-zinc-500 text-sm mt-1">

                    Live attendance feed

                  </p>

                </div>

                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

              </div>

              <div className="space-y-5 max-h-[420px] overflow-y-auto pr-2">

                {attendanceLogs.length > 0 ? (

                  attendanceLogs
                    .slice(0, 10)
                    .map((log, index) => (

                      <div
                        key={index}
                        className="
                          flex
                          items-start
                          justify-between
                          border-b
                          border-white/5
                          pb-4
                        "
                      >

                        <div>

                          <p className="font-medium text-lg">

                            {log.name}

                          </p>

                          <p className="text-zinc-500 text-sm mt-1">

                            Attendance verified

                          </p>

                        </div>

                        <span className="text-zinc-500 text-sm">

                          {log.time}

                        </span>

                      </div>

                    ))

                ) : (

                  <p className="text-zinc-500 text-sm">

                    No attendance records found

                  </p>

                )}

              </div>

            </div>

          </div>

        </div>

        {/* ANALYTICS */}

        <div className="bg-white/[0.03] rounded-[30px] p-8">

          <div className="flex items-center justify-between mb-10">

            <div>

              <p className="text-zinc-500 text-sm mb-2">

                Weekly Monitoring

              </p>

              <h2 className="text-3xl font-semibold">

                Attendance Analytics

              </h2>

            </div>

            <div className="flex items-center gap-2">

              <div className="w-2 h-2 rounded-full bg-cyan-400" />

              <span className="text-zinc-400 text-sm">

                Live Data

              </span>

            </div>

          </div>

          <div className="w-full h-[380px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={analyticsData}>

                <CartesianGrid
                  vertical={false}
                  stroke="#18181B"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  stroke="#71717A"
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  stroke="#71717A"
                />

                <Tooltip
                  contentStyle={{
                    background: "#111318",
                    border: "1px solid #27272A",
                    borderRadius: "14px",
                  }}
                />

                <Bar
                  dataKey="attendance"
                  radius={[12, 12, 0, 0]}
                  fill="#22D3EE"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>

  );

}