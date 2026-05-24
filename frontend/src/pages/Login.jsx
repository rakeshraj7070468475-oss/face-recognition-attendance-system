import { motion } from "framer-motion";

import {
  ShieldCheck,
  GraduationCap,
  ScanFace
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function RoleSelect() {

  const navigate = useNavigate();

  return (

    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center px-6">

      {/* BACKGROUND GLOW */}

      <div className="absolute w-[600px] h-[600px] bg-cyan-500/10 blur-[180px] rounded-full top-[-200px] left-[-200px]" />

      <div className="absolute w-[500px] h-[500px] bg-purple-500/10 blur-[160px] rounded-full bottom-[-200px] right-[-200px]" />

      {/* GRID */}

      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* MAIN CONTENT */}

      <motion.div

        initial={{
          opacity: 0,
          y: 40
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.8
        }}

        className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center"
      >

        {/* LEFT SIDE */}

        <div>

          <div className="flex items-center gap-4 mb-6">

            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center border border-cyan-400/30 shadow-lg shadow-cyan-500/20">

              <ScanFace className="text-cyan-400 w-8 h-8" />

            </div>

            <div>

              <h1 className="text-5xl font-black text-white">

                FRAS

              </h1>

              <p className="text-zinc-500 tracking-[3px] text-sm">

                AI ATTENDANCE SYSTEM

              </p>

            </div>

          </div>

          <h2 className="text-6xl font-black text-white leading-tight">

            Secure <br />

            Face Recognition <br />

            Platform

          </h2>

          <p className="text-zinc-400 mt-8 text-lg leading-relaxed max-w-xl">

            Advanced biometric attendance system with
            real-time AI recognition, automated tracking,
            secure authentication, and enterprise-grade
            monitoring infrastructure.

          </p>

        </div>

        {/* RIGHT SIDE */}

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">

          <h3 className="text-3xl font-bold text-white mb-8">

            Access Portal

          </h3>

          <div className="space-y-6">

            {/* TEACHER */}

            <motion.button

              whileHover={{
                scale: 1.02
              }}

              whileTap={{
                scale: 0.98
              }}

              onClick={() =>
                navigate("/teacher-login")
              }

              className="group w-full bg-white/5 hover:bg-cyan-500 transition-all duration-300 border border-white/10 rounded-3xl p-6 flex items-center justify-between"
            >

              <div className="flex items-center gap-5">

                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center">

                  <ShieldCheck className="text-cyan-400 group-hover:text-black" />

                </div>

                <div className="text-left">

                  <h4 className="text-xl font-bold text-white group-hover:text-black">

                    Teacher Access

                  </h4>

                  <p className="text-zinc-400 group-hover:text-black/70 text-sm">

                    Administrative dashboard

                  </p>

                </div>

              </div>

            </motion.button>

            {/* STUDENT */}

            <motion.button

              whileHover={{
                scale: 1.02
              }}

              whileTap={{
                scale: 0.98
              }}

              onClick={() =>
                navigate("/student-login")
              }

              className="group w-full bg-white/5 hover:bg-purple-500 transition-all duration-300 border border-white/10 rounded-3xl p-6 flex items-center justify-between"
            >

              <div className="flex items-center gap-5">

                <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center">

                  <GraduationCap className="text-purple-400 group-hover:text-black" />

                </div>

                <div className="text-left">

                  <h4 className="text-xl font-bold text-white group-hover:text-black">

                    Student Access

                  </h4>

                  <p className="text-zinc-400 group-hover:text-black/70 text-sm">

                    Attendance & records

                  </p>

                </div>

              </div>

            </motion.button>

          </div>

          <div className="mt-8 text-center text-zinc-500 text-sm">

            Enterprise biometric authentication system

          </div>

        </div>

      </motion.div>

    </div>
  );
}