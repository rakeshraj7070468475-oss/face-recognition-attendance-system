import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function Students() {

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =========================================
  // FETCH STUDENTS
  // =========================================

  const fetchStudents = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        `${API}/students`
      );

      if (!response.ok) {

        throw new Error(
          "Failed to fetch students"
        );

      }

      const data = await response.json();

      console.log(
        "Students API:",
        data
      );

      if (Array.isArray(data)) {

        setStudents(data);

      } else {

        setStudents([]);

      }

    } catch (err) {

      console.log(err);

      setError(
        "Cannot load students"
      );

    } finally {

      setLoading(false);

    }

  };

  // =========================================
  // DELETE STUDENT
  // =========================================

  const deleteStudent = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this student?"
    );

    if (!confirmDelete) return;

    try {

      const response = await fetch(

        `${API}/delete-student/${id}`,

        {
          method: "DELETE",
        }

      );

      if (!response.ok) {

        throw new Error(
          "Delete failed"
        );

      }

      fetchStudents();

    } catch (err) {

      console.log(err);

      alert(
        "Failed to delete"
      );

    }

  };

  // =========================================
  // LOAD DATA
  // =========================================

  useEffect(() => {

    fetchStudents();

  }, []);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center text-3xl font-bold">

        Loading Students...

      </div>

    );

  }

  // =========================================
  // ERROR
  // =========================================

  if (error) {

    return (

      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center text-2xl font-bold">

        {error}

      </div>

    );

  }

  // =========================================
  // MAIN UI
  // =========================================

  return (

    <div className="min-h-screen bg-black text-white p-6 md:p-10">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10">

        <div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">

            Registered Students

          </h1>

          <p className="text-gray-400 mt-2 text-lg">

            Manage enrolled students

          </p>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 px-6 py-5 rounded-3xl w-fit">

          <p className="text-gray-400 text-sm">

            Total Students

          </p>

          <h2 className="text-4xl font-bold mt-1">

            {students.length}

          </h2>

        </div>

      </div>

      {/* ================================= */}
      {/* EMPTY STATE */}
      {/* ================================= */}

      {students.length === 0 ? (

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">

          <h2 className="text-3xl font-bold">

            No Students Registered

          </h2>

          <p className="text-gray-400 mt-3">

            Register students to see them here

          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {students.map((student) => (

            <div
              key={student.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition-all duration-300"
            >

              {/* ========================== */}
              {/* IMAGE */}
              {/* ========================== */}

              <div className="flex justify-center mb-5">

                <img

                  src={student.image}

                  alt={student.name}

                  onError={(e) => {

                    console.log(
                      "IMAGE LOAD FAILED:",
                      student.image
                    );

                    e.target.src =
                      "https://via.placeholder.com/150?text=No+Image";

                  }}

                  className="w-28 h-28 rounded-3xl object-cover border border-zinc-700 shadow-lg"

                />

              </div>

              {/* ========================== */}
              {/* NAME */}
              {/* ========================== */}

              <h2 className="text-3xl font-bold text-center">

                {student.name}

              </h2>

              {/* ========================== */}
              {/* EMAIL */}
              {/* ========================== */}

              <p className="text-gray-400 text-center mt-2 break-all">

                {student.email}

              </p>

              {/* ========================== */}
              {/* DELETE BUTTON */}
              {/* ========================== */}

              <button

                onClick={() =>
                  deleteStudent(student.id)
                }

                className="w-full mt-8 bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-2xl py-4 font-semibold text-lg"

              >

                Delete Student

              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}