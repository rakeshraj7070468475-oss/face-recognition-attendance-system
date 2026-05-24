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

  // ====================================
  // STATES
  // ====================================

  const [person, setPerson] =
    useState("Waiting...");

  const [confidence, setConfidence] =
    useState(0);

  const [status, setStatus] =
    useState("System Active");

  const [attendanceLogs, setAttendanceLogs] =
    useState([]);

  const [totalStudents, setTotalStudents] =
    useState(0);

  const [presentToday, setPresentToday] =
    useState(0);

  const [unknownDetected, setUnknownDetected] =
    useState(false);

  // ====================================
  // ANALYTICS
  // ====================================

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
      attendance: 10,
    },

    {
      name: "Thu",
      attendance: 22,
    },

    {
      name: "Fri",
      attendance: presentToday,
    },
  ];

  // ====================================
  // FETCH ATTENDANCE
  // ====================================

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

      setAttendanceLogs([]);

      setPresentToday(0);

    }

  };

  // ====================================
  // FETCH STUDENTS
  // ====================================

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

      setTotalStudents(0);

    }

  };

  // ====================================
  // CLEAR ATTENDANCE
  // ====================================

  const clearAttendance = async () => {

    const confirmClear =
      window.confirm(
        "Clear all attendance records?"
      );

    if (!confirmClear) return;

    try {

      await axios.delete(
        `${API}/clear-attendance`
      );

      setAttendanceLogs([]);

      setPresentToday(0);

      alert("Attendance Cleared");

    } catch (error) {

      console.error(error);

      alert(
        "Failed to clear attendance"
      );

    }

  };

  // ====================================
  // CLEAR ALL DATA
  // ====================================

  const clearAllData = async () => {

    const confirmDelete =
      window.confirm(
        "Delete ALL students, images and attendance data?"
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

      alert("All system data deleted");

    } catch (error) {

      console.error(error);

      alert("Failed to clear data");

    }

  };

  // ====================================
  // FACE RECOGNITION
  // ====================================

  const recognizeFace = async () => {

    try {

      if (!webcamRef.current) return;

      const imageSrc =
        webcamRef.current.getScreenshot();

      if (!imageSrc) return;

      setStatus("Processing Face...");

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

      setPerson(data.person || "Unknown");

      setConfidence(
        Math.round(data.confidence || 0)
      );

      if (data.person === "Unknown") {

        setUnknownDetected(true);

        setStatus(
          "Unknown Face Detected"
        );

      } else {

        setUnknownDetected(false);

        setStatus(
          "Monitoring Active"
        );

      }

      await fetchAttendance();

      await fetchStudents();

    } catch (error) {

      console.error(error);

      setStatus("Backend Error");

    }

  };

  // ====================================
  // INITIAL LOAD
  // ====================================

  useEffect(() => {

    fetchAttendance();

    fetchStudents();

  }, []);

  // ====================================
  // AUTO LOOP
  // ====================================

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

    <div className="min-h-screen bg-[#0B0D11] text-white">

      {/* HEADER */}

      <div className="border-b border-white/5 bg-[#0F1115] px-6 lg:px-10 py-5">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <p className="text-zinc-500 text-sm font-medium">

              Enterprise Attendance Platform

            </p>

            <h1 className="text-3xl font-semibold tracking-tight mt-1">

              Operations Dashboard

            </h1>

          </div>

          <div className="flex flex-wrap items-center gap-3">

            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl">

              <div className="w-2 h-2 rounded-full bg-emerald-400" />

              <span className="text-sm text-emerald-400 font-medium">

                System Active

              </span>

            </div>

            <a
              href={`${API}/export-attendance`}
              target="_blank"
              rel="noreferrer"
              className="bg-white text-black px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition"
            >

              Export CSV

            </a>

            <button
              onClick={clearAttendance}
              className="bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-red-500/20 transition"
            >

              Clear Logs

            </button>

            <button
              onClick={clearAllData}
              className="bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-red-700 transition"
            >

              Delete All Data

            </button>

          </div>

        </div>

      </div>

      {/* MAIN */}

      <div className="p-6 lg:p-10">

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          <div className="bg-[#111318] border border-white/5 rounded-2xl p-5">

            <p className="text-zinc-500 text-sm">

              Registered Students

            </p>

            <h2 className="text-3xl font-semibold mt-3">

              {totalStudents}

            </h2>

          </div>

          <div className="bg-[#111318] border border-white/5 rounded-2xl p-5">

            <p className="text-zinc-500 text-sm">

              Present Today

            </p>

            <h2 className="text-3xl font-semibold mt-3 text-emerald-400">

              {presentToday}

            </h2>

          </div>

          <div className="bg-[#111318] border border-white/5 rounded-2xl p-5">

            <p className="text-zinc-500 text-sm">

              Recognition Accuracy

            </p>

            <h2 className="text-3xl font-semibold mt-3">

              {confidence}%

            </h2>

          </div>

          <div className="bg-[#111318] border border-white/5 rounded-2xl p-5">

            <p className="text-zinc-500 text-sm">

              Monitoring State

            </p>

            <h2
              className={`text-xl font-semibold mt-3 ${
                unknownDetected
                  ? "text-red-400"
                  : "text-emerald-400"
              }`}
            >

              {status}

            </h2>

          </div>

        </div>

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">

          {/* CAMERA */}

          <div className="xl:col-span-7 bg-[#111318] border border-white/5 rounded-2xl overflow-hidden">

            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">

              <div>

                <h2 className="text-lg font-semibold">

                  Live Recognition Monitor

                </h2>

                <p className="text-zinc-500 text-sm mt-1">

                  Real-time facial verification stream

                </p>

              </div>

            </div>

            <div className="p-4">

              <div className="relative rounded-2xl overflow-hidden border border-white/5">

                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  mirrored={true}
                  className="w-full rounded-2xl"
                  videoConstraints={{
                    width: 1280,
                    height: 720,
                    facingMode: "user",
                  }}
                />

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="xl:col-span-5 space-y-6">

            {/* CURRENT */}

            <div className="bg-[#111318] border border-white/5 rounded-2xl p-6">

              <p className="text-zinc-500 text-sm">

                Current Recognition

              </p>

              <h2 className="text-3xl font-semibold mt-3">

                {person}

              </h2>

              <div className="mt-6">

                <div className="flex justify-between mb-2 text-sm">

                  <span className="text-zinc-500">

                    Confidence

                  </span>

                  <span>

                    {confidence}%

                  </span>

                </div>

                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-emerald-400 rounded-full"
                    style={{
                      width: `${confidence}%`,
                    }}
                  />

                </div>

              </div>

            </div>

            {/* RECENT ACTIVITY */}

            <div className="bg-[#111318] border border-white/5 rounded-2xl p-6">

              <h2 className="text-lg font-semibold mb-6">

                Recent Activity

              </h2>

              <div className="space-y-4 max-h-[320px] overflow-y-auto">

                {attendanceLogs.length > 0 ? (

                  attendanceLogs
                    .slice(0, 6)
                    .map((log, index) => (

                      <div
                        key={index}
                        className="flex items-start gap-4"
                      >

                        <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2" />

                        <div>

                          <p className="text-sm font-medium">

                            {log.name}

                          </p>

                          <p className="text-zinc-500 text-xs mt-1">

                            {log.time}

                          </p>

                        </div>

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

        {/* CHART */}

        <div className="bg-[#111318] border border-white/5 rounded-2xl p-6">

          <div className="mb-6">

            <h2 className="text-xl font-semibold">

              Attendance Analytics

            </h2>

            <p className="text-zinc-500 text-sm mt-1">

              Weekly attendance overview

            </p>

          </div>

          <div className="w-full h-[400px] min-w-0">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={analyticsData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1f2937"
                />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="attendance"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>

  );

}