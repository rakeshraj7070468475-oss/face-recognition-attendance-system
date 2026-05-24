import { useState } from "react";

import axios from "axios";

import {
  Upload,
  User,
  Mail,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function Register() {

  const [studentName, setStudentName] =
    useState("");

  const [studentEmail, setStudentEmail] =
    useState("");

  const [studentImage, setStudentImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // =====================================
  // REGISTER
  // =====================================

  const registerStudent = async () => {

    if (
      !studentName ||
      !studentEmail ||
      !studentImage
    ) {

      setError("Fill all fields");

      return;

    }

    try {

      setLoading(true);

      setError("");

      setMessage("");

      const formData = new FormData();

      formData.append(
        "name",
        studentName
      );

      formData.append(
        "email",
        studentEmail
      );

      formData.append(
        "file",
        studentImage
      );

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      if (response.data.error) {

        setError(response.data.error);

        return;

      }

      setMessage(
        response.data.message
      );

      setStudentName("");

      setStudentEmail("");

      setStudentImage(null);

      setPreview("");

    } catch (error) {

      console.error(error);

      setError("Registration Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="relative min-h-screen bg-[#06070A] text-white overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute inset-0 pointer-events-none -z-10">

        <div className="absolute top-[-250px] left-[-180px] w-[520px] h-[520px] bg-cyan-500/10 blur-[160px]" />

        <div className="absolute bottom-[-250px] right-[-180px] w-[520px] h-[520px] bg-violet-500/10 blur-[160px]" />

      </div>

      {/* CONTENT */}

      <div className="p-6 lg:p-10">

        {/* HEADER */}

        <div className="mb-10">

          <p className="uppercase tracking-[0.3em] text-zinc-500 text-xs mb-3">

            Enrollment System

          </p>

          <h1 className="text-5xl font-semibold tracking-tight">

            Register Student

          </h1>

          <p className="text-zinc-500 text-lg mt-4 max-w-2xl leading-relaxed">

            Add students into the biometric attendance
            infrastructure using facial identity enrollment.

          </p>

        </div>

        {/* GRID */}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

          {/* LEFT */}

          <div className="xl:col-span-7">

            <div
              className="
                bg-white/[0.03]
                backdrop-blur-2xl
                rounded-[34px]
                p-8
                border
                border-white/5
              "
            >

              {/* NAME */}

              <div className="mb-6">

                <label className="block text-sm text-zinc-500 mb-3">

                  Student Name

                </label>

                <div
                  className="
                    h-16
                    rounded-2xl
                    bg-black/30
                    flex
                    items-center
                    gap-4
                    px-5
                  "
                >

                  <User
                    size={20}
                    className="text-zinc-500"
                  />

                  <input
                    type="text"
                    placeholder="Enter student name"
                    value={studentName}
                    onChange={(e) =>
                      setStudentName(
                        e.target.value
                      )
                    }
                    className="
                      bg-transparent
                      outline-none
                      w-full
                      text-lg
                    "
                  />

                </div>

              </div>

              {/* EMAIL */}

              <div className="mb-8">

                <label className="block text-sm text-zinc-500 mb-3">

                  Student Email

                </label>

                <div
                  className="
                    h-16
                    rounded-2xl
                    bg-black/30
                    flex
                    items-center
                    gap-4
                    px-5
                  "
                >

                  <Mail
                    size={20}
                    className="text-zinc-500"
                  />

                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={studentEmail}
                    onChange={(e) =>
                      setStudentEmail(
                        e.target.value
                      )
                    }
                    className="
                      bg-transparent
                      outline-none
                      w-full
                      text-lg
                    "
                  />

                </div>

              </div>

              {/* IMAGE */}

              <div>

                <label className="text-sm text-zinc-500 mb-3 block">

                  Facial Scan

                </label>

                <label
                  className="
                    relative
                    h-[360px]
                    rounded-[34px]
                    overflow-hidden
                    cursor-pointer
                    bg-[#0B0D11]
                    border
                    border-white/5
                    flex
                    items-center
                    justify-center
                    group
                  "
                >

                  {/* CORNERS */}

                  <div className="absolute top-5 left-5 w-14 h-14 border-l-2 border-t-2 border-cyan-400/70 rounded-tl-2xl" />

                  <div className="absolute top-5 right-5 w-14 h-14 border-r-2 border-t-2 border-cyan-400/70 rounded-tr-2xl" />

                  <div className="absolute bottom-5 left-5 w-14 h-14 border-l-2 border-b-2 border-cyan-400/70 rounded-bl-2xl" />

                  <div className="absolute bottom-5 right-5 w-14 h-14 border-r-2 border-b-2 border-cyan-400/70 rounded-br-2xl" />

                  {/* SCAN LINE */}

                  {!preview && (

                    <div
                      className="
                        absolute
                        left-0
                        right-0
                        top-1/2
                        h-[2px]
                        bg-cyan-400/70
                        animate-pulse
                      "
                    />

                  )}

                  {/* PREVIEW */}

                  {preview ? (

                    <img
                      src={preview}
                      alt="Preview"
                      className="
                        absolute
                        inset-0
                        w-full
                        h-full
                        object-cover
                      "
                    />

                  ) : (

                    <div className="text-center z-10">

                      <div
                        className="
                          w-24
                          h-24
                          rounded-[28px]
                          bg-cyan-500/10
                          flex
                          items-center
                          justify-center
                          mx-auto
                          mb-6
                          group-hover:scale-110
                          transition
                        "
                      >

                        <Upload
                          size={42}
                          className="text-cyan-400"
                        />

                      </div>

                      <h2 className="text-3xl font-semibold mb-3">

                        Upload Facial Scan

                      </h2>

                      <p className="text-zinc-500 max-w-md mx-auto leading-relaxed">

                        High resolution frontal image
                        required for biometric enrollment
                        and facial mapping.

                      </p>

                    </div>

                  )}

                  {/* DARK OVERLAY */}

                  {preview && (

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  )}

                  {/* STATUS */}

                  {preview && (

                    <div
                      className="
                        absolute
                        bottom-5
                        left-5
                        right-5
                        z-20
                        bg-black/50
                        backdrop-blur-2xl
                        rounded-2xl
                        p-5
                        border
                        border-white/10
                        flex
                        items-center
                        justify-between
                      "
                    >

                      <div>

                        <p className="text-zinc-500 text-sm">

                          Scan Status

                        </p>

                        <h2 className="font-semibold mt-1">

                          Identity Ready

                        </h2>

                      </div>

                      <div className="flex items-center gap-3">

                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                        <span className="text-emerald-400 text-sm">

                          Verified

                        </span>

                      </div>

                    </div>

                  )}

                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {

                      const file =
                        e.target.files[0];

                      if (!file) return;

                      setStudentImage(file);

                      setPreview(
                        URL.createObjectURL(file)
                      );

                    }}
                  />

                </label>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="xl:col-span-5 space-y-6">

            {/* TERMINAL */}

            <div
              className="
                bg-white/[0.03]
                backdrop-blur-2xl
                rounded-[34px]
                p-8
                border
                border-white/5
              "
            >

              <p className="text-zinc-500 text-sm mb-3">

                Enrollment Terminal

              </p>

              <h2 className="text-4xl font-semibold leading-tight">

                Biometric
                identity
                registration.

              </h2>

              <div className="mt-8 space-y-5">

                {/* FACE DETECTION */}

                <div className="bg-black/30 rounded-2xl p-5">

                  <div className="flex items-center justify-between mb-3">

                    <span className="text-zinc-400">

                      Face Detection

                    </span>

                    <span className="text-emerald-400">

                      Active

                    </span>

                  </div>

                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">

                    <div className="h-full w-full bg-emerald-400 rounded-full" />

                  </div>

                </div>

                {/* ENGINE */}

                <div className="bg-black/30 rounded-2xl p-5">

                  <div className="flex items-center justify-between mb-3">

                    <span className="text-zinc-400">

                      Recognition Engine

                    </span>

                    <span className="text-cyan-400">

                      Online

                    </span>

                  </div>

                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">

                    <div className="h-full w-[92%] bg-cyan-400 rounded-full" />

                  </div>

                </div>

                {/* STATUS */}

                <div className="bg-black/30 rounded-2xl p-5 flex items-center justify-between">

                  <span className="text-zinc-400">

                    Enrollment State

                  </span>

                  <span className="text-white font-medium">

                    Ready

                  </span>

                </div>

              </div>

            </div>

            {/* ACTION */}

            <div
              className="
                bg-white/[0.03]
                backdrop-blur-2xl
                rounded-[34px]
                p-8
                border
                border-white/5
              "
            >

              <button
                onClick={registerStudent}
                disabled={loading}
                className="
                  w-full
                  h-16
                  rounded-2xl
                  bg-white
                  text-black
                  text-lg
                  font-semibold
                  hover:scale-[1.02]
                  transition
                  disabled:opacity-50
                "
              >

                {loading
                  ? "Registering..."
                  : "Register Student"}

              </button>

              {/* SUCCESS */}

              {message && (

                <div
                  className="
                    mt-6
                    bg-emerald-500/10
                    border
                    border-emerald-500/20
                    text-emerald-400
                    rounded-2xl
                    p-5
                    flex
                    items-center
                    gap-3
                  "
                >

                  <CheckCircle2 size={20} />

                  <span>

                    {message}

                  </span>

                </div>

              )}

              {/* ERROR */}

              {error && (

                <div
                  className="
                    mt-6
                    bg-red-500/10
                    border
                    border-red-500/20
                    text-red-400
                    rounded-2xl
                    p-5
                    flex
                    items-center
                    gap-3
                  "
                >

                  <AlertTriangle size={20} />

                  <span>

                    {error}

                  </span>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}