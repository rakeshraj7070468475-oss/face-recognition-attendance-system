import {
  useState
} from "react";

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  auth
} from "../firebase";

import { useNavigate } from "react-router-dom";

export default function Login() {

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

      // =================================
      // ROLE CHECK
      // =================================

      if (
        email === "teacher@gmail.com"
      ) {

        navigate("/teacher-dashboard");

      } else {

        navigate("/student-dashboard");

      }

    } catch (err) {

      console.error(err);

      setError("Invalid Credentials");

    }

  };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center text-white">

      <div className="bg-zinc-900 p-10 rounded-3xl border border-zinc-800 w-full max-w-md">

        <h1 className="text-4xl font-bold mb-8">

          Login

        </h1>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-zinc-800 p-4 rounded-2xl outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-zinc-800 p-4 rounded-2xl outline-none"
          />

          <button
            onClick={login}
            className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:scale-105 transition"
          >

            Login

          </button>

          {error && (

            <div className="bg-red-500/20 text-red-400 p-4 rounded-2xl">

              {error}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}