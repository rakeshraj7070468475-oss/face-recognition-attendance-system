import { useState } from "react";

import axios from "axios";

export default function Register() {

  const [studentName, setStudentName] =
    useState("");

  const [studentEmail, setStudentEmail] =
    useState("");

  const [studentImage, setStudentImage] =
    useState(null);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const registerStudent = async () => {

    // =====================================
    // VALIDATION
    // =====================================

    if (
      !studentName ||
      !studentEmail ||
      !studentImage
    ) {

      setError("Fill all fields");

      return;
    }

    try {

      setError("");

      setMessage("");

      // =====================================
      // FORM DATA
      // =====================================

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

      // =====================================
      // API REQUEST
      // =====================================

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

      // =====================================
      // HANDLE DUPLICATE STUDENT
      // =====================================

      if (response.data.error) {

        setError(response.data.error);

        return;
      }

      // =====================================
      // SUCCESS
      // =====================================

      setMessage(
        response.data.message
      );

      // =====================================
      // RESET FORM
      // =====================================

      setStudentName("");

      setStudentEmail("");

      setStudentImage(null);

    } catch (error) {

      console.error(error);

      setError("Registration Failed");

    }

  };

  return (

    <div className="p-8 text-white min-h-screen bg-black">

      {/* ================================= */}
      {/* TITLE */}
      {/* ================================= */}

      <h1 className="text-5xl font-bold mb-8">

        Register Student

      </h1>

      {/* ================================= */}
      {/* CARD */}
      {/* ================================= */}

      <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 max-w-2xl">

        <div className="space-y-5">

          {/* ================================= */}
          {/* NAME */}
          {/* ================================= */}

          <input
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) =>
              setStudentName(
                e.target.value
              )
            }
            className="w-full bg-zinc-800 p-4 rounded-2xl outline-none"
          />

          {/* ================================= */}
          {/* EMAIL */}
          {/* ================================= */}

          <input
            type="email"
            placeholder="Student Email"
            value={studentEmail}
            onChange={(e) =>
              setStudentEmail(
                e.target.value
              )
            }
            className="w-full bg-zinc-800 p-4 rounded-2xl outline-none"
          />

          {/* ================================= */}
          {/* IMAGE */}
          {/* ================================= */}

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setStudentImage(
                e.target.files[0]
              )
            }
            className="w-full bg-zinc-800 p-4 rounded-2xl"
          />

          {/* ================================= */}
          {/* BUTTON */}
          {/* ================================= */}

          <button
            onClick={registerStudent}
            className="bg-white text-black px-6 py-4 rounded-2xl font-bold hover:scale-105 transition"
          >

            Register Student

          </button>

          {/* ================================= */}
          {/* SUCCESS MESSAGE */}
          {/* ================================= */}

          {message && (

            <div className="bg-green-500/20 text-green-400 p-4 rounded-2xl">

              {message}

            </div>

          )}

          {/* ================================= */}
          {/* ERROR MESSAGE */}
          {/* ================================= */}

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