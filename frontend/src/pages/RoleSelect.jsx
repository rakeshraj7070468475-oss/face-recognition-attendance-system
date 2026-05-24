import { useNavigate } from "react-router-dom";

export default function RoleSelect() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-[#0b0b0c] text-white flex overflow-hidden">

      {/* LEFT SECTION */}

      <div className="hidden lg:flex w-[58%] border-r border-white/5 px-20 py-16 flex-col justify-between">

        {/* TOP */}

        <div>

          <div className="text-xs tracking-[0.35em] uppercase text-zinc-600 mb-16">

            Face Recognition Attendance System

          </div>

          <div className="max-w-2xl">

            <h1
              className="
                text-[96px]
                leading-[0.92]
                tracking-[-5px]
                font-semibold
                text-zinc-100
              "
            >

              Attendance
              infrastructure
              for institutions.

            </h1>

            <p
              className="
                mt-10
                text-zinc-500
                text-xl
                leading-relaxed
                max-w-xl
              "
            >

              Enterprise-grade biometric attendance and
              identity verification platform designed for
              universities and modern organizations.

            </p>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="flex gap-16">

          <div>

            <div className="text-4xl font-semibold">

              99.9%

            </div>

            <div className="text-zinc-600 mt-2">

              Recognition accuracy

            </div>

          </div>

          <div>

            <div className="text-4xl font-semibold">

              Realtime

            </div>

            <div className="text-zinc-600 mt-2">

              Attendance tracking

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SECTION */}

      <div className="flex-1 px-10 lg:px-20 py-16 flex flex-col justify-center">

        <div className="mb-14">

          <div className="text-sm uppercase tracking-[0.3em] text-zinc-600 mb-6">

            Access

          </div>

          <h2
            className="
              text-5xl
              lg:text-6xl
              tracking-tight
              font-semibold
            "
          >

            Select portal

          </h2>

        </div>

        <div className="space-y-5 max-w-xl">

          {/* TEACHER */}

          <button
            onClick={() => navigate("/login-teacher")}
            className="
              w-full
              p-8
              border
              border-white/5
              hover:border-white/15
              bg-[#111112]
              hover:bg-[#141416]
              transition-all
              duration-300
              text-left
              rounded-3xl
              group
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <div className="text-3xl font-medium">

                  Teacher Portal

                </div>

                <div className="text-zinc-500 mt-3 text-lg">

                  Attendance management and analytics

                </div>

              </div>

              <div
                className="
                  text-zinc-700
                  text-3xl
                  group-hover:text-white
                  transition
                "
              >

                →

              </div>

            </div>

          </button>

          {/* STUDENT */}

          <button
            onClick={() => navigate("/login-student")}
            className="
              w-full
              p-8
              border
              border-white/5
              hover:border-white/15
              bg-[#111112]
              hover:bg-[#141416]
              transition-all
              duration-300
              text-left
              rounded-3xl
              group
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <div className="text-3xl font-medium">

                  Student Portal

                </div>

                <div className="text-zinc-500 mt-3 text-lg">

                  Attendance records and access history

                </div>

              </div>

              <div
                className="
                  text-zinc-700
                  text-3xl
                  group-hover:text-white
                  transition
                "
              >

                →

              </div>

            </div>

          </button>

        </div>

      </div>

    </div>

  );
}