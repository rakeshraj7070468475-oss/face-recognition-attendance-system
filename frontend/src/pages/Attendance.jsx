import {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import {
  Search,
  Download,
  Activity,
  Users,
  CheckCircle2,
} from "lucide-react";

export default function Attendance() {

  const [logs, setLogs] =
    useState([]);

  const [search, setSearch] =
    useState("");

  // =====================================
  // FETCH LOGS
  // =====================================

  const fetchLogs = async () => {

    try {

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/attendance`
      );

      setLogs(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchLogs();

  }, []);

  // =====================================
  // FILTERED LOGS
  // =====================================

  const filteredLogs = useMemo(() => {

    return logs.filter((log) =>
      log.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [logs, search]);

  // =====================================
  // STATS
  // =====================================

  const totalLogs = logs.length;

  const uniqueStudents =
    new Set(
      logs.map((log) => log.name)
    ).size;

  const todayAttendance =
    logs.filter((log) =>
      log.status === "Present"
    ).length;

  return (

    <div className="min-h-screen bg-[#06070A] text-white relative overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute top-[-200px] left-[-120px] w-[420px] h-[420px] bg-cyan-500/10 blur-[140px]" />

        <div className="absolute bottom-[-200px] right-[-120px] w-[420px] h-[420px] bg-violet-500/10 blur-[140px]" />

      </div>

      {/* CONTENT */}

      <div className="relative z-10 p-6 lg:p-10">

        {/* HEADER */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-10">

          <div>

            <p className="uppercase tracking-[0.3em] text-zinc-500 text-xs mb-3">

              Attendance Monitoring

            </p>

            <h1 className="text-5xl font-semibold tracking-tight">

              Attendance Logs

            </h1>

            <p className="text-zinc-500 text-lg mt-4 max-w-2xl">

              Realtime attendance records and
              recognition activity across the system.

            </p>

          </div>

          {/* ACTIONS */}

          <div className="flex items-center gap-3">

            <a
              href={`${import.meta.env.VITE_API_URL}/export-attendance`}
              target="_blank"
              rel="noreferrer"
              className="
                flex
                items-center
                gap-3
                px-5
                py-4
                rounded-2xl
                bg-white
                text-black
                font-semibold
                hover:scale-105
                transition
              "
            >

              <Download size={18} />

              Export CSV

            </a>

          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* TOTAL LOGS */}

          <div className="bg-white/[0.03] rounded-[28px] p-6 backdrop-blur-2xl">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-500 text-sm">

                  Total Logs

                </p>

                <h2 className="text-5xl font-semibold mt-4">

                  {totalLogs}

                </h2>

              </div>

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-cyan-500/10
                  flex
                  items-center
                  justify-center
                "
              >

                <Activity
                  size={24}
                  className="text-cyan-400"
                />

              </div>

            </div>

          </div>

          {/* UNIQUE STUDENTS */}

          <div className="bg-white/[0.03] rounded-[28px] p-6 backdrop-blur-2xl">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-500 text-sm">

                  Unique Students

                </p>

                <h2 className="text-5xl font-semibold mt-4">

                  {uniqueStudents}

                </h2>

              </div>

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-violet-500/10
                  flex
                  items-center
                  justify-center
                "
              >

                <Users
                  size={24}
                  className="text-violet-400"
                />

              </div>

            </div>

          </div>

          {/* VERIFIED */}

          <div className="bg-white/[0.03] rounded-[28px] p-6 backdrop-blur-2xl">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-500 text-sm">

                  Verified Today

                </p>

                <h2 className="text-5xl font-semibold mt-4 text-emerald-400">

                  {todayAttendance}

                </h2>

              </div>

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-emerald-500/10
                  flex
                  items-center
                  justify-center
                "
              >

                <CheckCircle2
                  size={24}
                  className="text-emerald-400"
                />

              </div>

            </div>

          </div>

        </div>

        {/* TABLE SECTION */}

        <div className="bg-white/[0.03] rounded-[32px] backdrop-blur-2xl overflow-hidden">

          {/* TOPBAR */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 p-8 border-b border-white/5">

            <div>

              <p className="text-zinc-500 text-sm mb-2">

                Recognition Records

              </p>

              <h2 className="text-3xl font-semibold">

                Live Attendance Feed

              </h2>

            </div>

            {/* SEARCH */}

            <div
              className="
                flex
                items-center
                gap-4
                bg-black/30
                rounded-2xl
                px-5
                h-14
                min-w-[320px]
              "
            >

              <Search
                size={18}
                className="text-zinc-500"
              />

              <input
                type="text"
                placeholder="Search student..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="
                  bg-transparent
                  outline-none
                  w-full
                  text-white
                "
              />

            </div>

          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-white/5 text-zinc-500">

                  <th className="text-left py-5 px-8 font-medium">

                    Student

                  </th>

                  <th className="text-left py-5 px-8 font-medium">

                    Time

                  </th>

                  <th className="text-left py-5 px-8 font-medium">

                    Status

                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredLogs.length === 0 && (

                  <tr>

                    <td
                      colSpan="3"
                      className="text-center py-20 text-zinc-500"
                    >

                      No attendance records found

                    </td>

                  </tr>

                )}

                {filteredLogs.map((log, index) => (

                  <tr
                    key={index}
                    className="
                      border-b
                      border-white/5
                      hover:bg-white/[0.02]
                      transition
                    "
                  >

                    {/* STUDENT */}

                    <td className="py-5 px-8">

                      <div className="flex items-center gap-4">

                        <div
                          className="
                            w-12
                            h-12
                            rounded-2xl
                            bg-gradient-to-br
                            from-cyan-400
                            to-blue-500
                            flex
                            items-center
                            justify-center
                            font-semibold
                          "
                        >

                          {log.name
                            ?.charAt(0)
                            ?.toUpperCase()}

                        </div>

                        <div>

                          <h2 className="font-medium text-lg">

                            {log.name}

                          </h2>

                          <p className="text-zinc-500 text-sm">

                            Face verified

                          </p>

                        </div>

                      </div>

                    </td>

                    {/* TIME */}

                    <td className="py-5 px-8">

                      <div>

                        <p className="font-medium">

                          {log.time}

                        </p>

                        <p className="text-zinc-500 text-sm mt-1">

                          Realtime record

                        </p>

                      </div>

                    </td>

                    {/* STATUS */}

                    <td className="py-5 px-8">

                      <span
                        className="
                          inline-flex
                          items-center
                          gap-2
                          bg-emerald-500/10
                          border
                          border-emerald-500/20
                          text-emerald-400
                          px-4
                          py-2
                          rounded-xl
                          text-sm
                          font-medium
                        "
                      >

                        <div className="w-2 h-2 rounded-full bg-emerald-400" />

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

  );

}