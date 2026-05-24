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

export default function StudentLogin() {

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

      navigate("/student-dashboard");

    } catch (err) {

      console.error(err);

      setError("Invalid Credentials");

    }

  };

  return (

    <div className="min-h-screen bg-[#060606] text-white flex overflow-hidden">

      {/* LEFT */}

      <div className="hidden lg:flex w-[50%] relative overflow-hidden items-center justify-center border-r border-white/5">

        {/* BACKGROUND */}

        <div className="absolute inset-0">

          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-violet-500/10 blur-[120px]" />

          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-fuchsia-500/10 blur-[120px]" />

        </div>

        {/* GLASS PANEL */}

        <div
          className="
            relative
            z-10
            w-[500px]
            rounded-[40px]
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
            p-12
          "
        >

          <div className="text-sm uppercase tracking-[0.3em] text-zinc-500 mb-8">

            Student Access

          </div>

          <h1
            className="
              text-7xl
              leading-[0.95]
              tracking-tight
              font-semibold
            "
          >

            Access
            your
            attendance.

          </h1>

          <p
            className="
              mt-8
              text-zinc-400
              leading-relaxed
              text-lg
            "
          >

            View realtime attendance records,
            recognition logs and classroom activity
            from a unified student dashboard.

          </p>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex-1 flex items-center justify-center px-8 relative">

        <div
          className="
            w-full
            max-w-md
            bg-[#101014]
            border
            border-white/5
            rounded-[32px]
            p-10
          "
        >

          <div className="mb-10">

            <div className="text-sm uppercase tracking-[0.3em] text-zinc-600 mb-4">

              Authentication

            </div>

            <h2 className="text-5xl font-semibold">

              Student Login

            </h2>

          </div>

          <div className="space-y-5">

            <input
              type="email"
              placeholder="Student email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                h-16
                px-6
                rounded-2xl
                bg-[#17171c]
                border
                border-white/5
                focus:border-violet-400/40
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
                bg-[#17171c]
                border
                border-white/5
                focus:border-violet-400/40
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
                bg-violet-500
                hover:bg-violet-400
                transition-all
                duration-300
                font-semibold
                text-lg
              "
            >

              Access Dashboard

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