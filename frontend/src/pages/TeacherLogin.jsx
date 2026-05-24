import { useState } from "react";

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  auth
} from "../firebase";

import {
  useNavigate
} from "react-router-dom";

export default function TeacherLogin() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const login = async () => {

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/teacher-dashboard");

    } catch (err) {

      console.error(err);

      setError("Invalid Credentials");

    }

  };

  return (

    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden">

      {/* LEFT */}

      <div className="hidden lg:flex w-[55%] border-r border-white/5 relative overflow-hidden">

        {/* GLOW */}

        <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-cyan-500/10 blur-[140px]" />

        <div className="absolute bottom-[-200px] right-[-100px] w-[400px] h-[400px] bg-blue-500/10 blur-[140px]" />

        {/* CONTENT */}

        <div className="relative z-10 flex flex-col justify-between p-20">

          <div>

            <div className="text-xs tracking-[0.35em] uppercase text-zinc-600 mb-16">

              Teacher Access

            </div>

            <h1
              className="
                text-[92px]
                leading-[0.92]
                tracking-[-5px]
                font-semibold
                max-w-2xl
              "
            >

              Manage
              attendance
              smarter.

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

              Centralized analytics, realtime face
              recognition tracking and secure classroom
              management for faculty members.

            </p>

          </div>

          <div className="flex gap-10">

            <div>

              <div className="text-4xl font-bold">

                99.9%

              </div>

              <div className="text-zinc-600 mt-2">

                Accuracy

              </div>

            </div>

            <div>

              <div className="text-4xl font-bold">

                Live

              </div>

              <div className="text-zinc-600 mt-2">

                Monitoring

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex-1 flex items-center justify-center px-8 relative">

        {/* BACKGROUND */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.06),transparent_35%)]" />

        {/* LOGIN CARD */}

        <div
          className="
            relative
            z-10
            w-full
            max-w-md
            bg-[#0d0d10]
            border
            border-white/5
            rounded-[32px]
            p-10
            shadow-2xl
          "
        >

          <div className="mb-10">

            <div className="text-sm uppercase tracking-[0.3em] text-zinc-600 mb-5">

              Secure Portal

            </div>

            <h2 className="text-5xl font-semibold tracking-tight">

              Teacher Login

            </h2>

          </div>

          <div className="space-y-5">

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                h-16
                px-6
                rounded-2xl
                bg-[#121216]
                border
                border-white/5
                focus:border-cyan-400/50
                outline-none
                transition
                text-lg
              "
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                h-16
                px-6
                rounded-2xl
                bg-[#121216]
                border
                border-white/5
                focus:border-cyan-400/50
                outline-none
                transition
                text-lg
              "
            />

            <button
              onClick={login}
              className="
                w-full
                h-16
                rounded-2xl
                bg-cyan-400
                text-black
                font-semibold
                text-lg
                hover:scale-[1.02]
                transition-all
                duration-300
              "
            >

              Continue

            </button>

            {error && (

              <div
                className="
                  bg-red-500/10
                  border
                  border-red-500/20
                  text-red-400
                  p-4
                  rounded-2xl
                "
              >

                {error}

              </div>

            )}

          </div>

          <button
            onClick={() => navigate("/")}
            className="
              mt-8
              text-zinc-500
              hover:text-white
              transition
            "
          >

            ← Back

          </button>

        </div>

      </div>

    </div>

  );
}