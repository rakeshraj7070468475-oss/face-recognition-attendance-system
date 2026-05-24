import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  Search,
  Trash2,
  Users,
  ShieldCheck,
  Activity,
} from "lucide-react";

const API =
  import.meta.env.VITE_API_URL;

export default function Students() {

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  // =====================================
  // FETCH STUDENTS
  // =====================================

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

      const data =
        await response.json();

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

  // =====================================
  // DELETE STUDENT
  // =====================================

  const deleteStudent = async (id) => {

    const confirmDelete =
      window.confirm(
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

  // =====================================
  // LOAD
  // =====================================

  useEffect(() => {

    fetchStudents();

  }, []);

  // =====================================
  // FILTER
  // =====================================

  const filteredStudents =
    useMemo(() => {

      return students.filter(
        (student) =>
          student.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [students, search]);

  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <div className="min-h-screen bg-[#06070A] text-white flex items-center justify-center text-3xl font-semibold">

        Loading Students...

      </div>

    );

  }

  // =====================================
  // ERROR
  // =====================================

  if (error) {

    return (

      <div className="min-h-screen bg-[#06070A] text-red-400 flex items-center justify-center text-2xl font-semibold">

        {error}

      </div>

    );

  }

  // =====================================
  // MAIN UI
  // =====================================

  return (

    <div className="relative min-h-screen bg-[#06070A] text-white overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute inset-0 pointer-events-none -z-10">

        <div className="absolute top-[-250px] left-[-150px] w-[500px] h-[500px] bg-cyan-500/10 blur-[160px]" />

        <div className="absolute bottom-[-250px] right-[-150px] w-[500px] h-[500px] bg-violet-500/10 blur-[160px]" />

      </div>

      {/* CONTENT */}

      <div className="p-6 lg:p-10">

        {/* HEADER */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-10">

          <div>

            <p className="uppercase tracking-[0.3em] text-zinc-500 text-xs mb-3">

              Biometric Registry

            </p>

            <h1 className="text-5xl font-semibold tracking-tight">

              Registered Students

            </h1>

            <p className="text-zinc-500 text-lg mt-4 max-w-2xl">

              Manage enrolled students and
              monitor biometric identity records.

            </p>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-3 gap-4">

            <div className="bg-white/[0.03] rounded-3xl p-5 min-w-[150px]">

              <p className="text-zinc-500 text-sm">

                Students

              </p>

              <h2 className="text-4xl font-semibold mt-3">

                {students.length}

              </h2>

            </div>

            <div className="bg-white/[0.03] rounded-3xl p-5 min-w-[150px]">

              <p className="text-zinc-500 text-sm">

                Active

              </p>

              <h2 className="text-4xl font-semibold mt-3 text-emerald-400">

                {students.length}

              </h2>

            </div>

            <div className="bg-white/[0.03] rounded-3xl p-5 min-w-[150px]">

              <p className="text-zinc-500 text-sm">

                Status

              </p>

              <h2 className="text-2xl font-semibold mt-5 text-cyan-400">

                Online

              </h2>

            </div>

          </div>

        </div>

        {/* TERMINAL */}

        <div className="bg-white/[0.03] rounded-[34px] overflow-hidden backdrop-blur-2xl">

          {/* TOPBAR */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 p-8 border-b border-white/5">

            <div>

              <p className="text-zinc-500 text-sm mb-2">

                Identity Database

              </p>

              <h2 className="text-3xl font-semibold">

                Student Registry

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
                  setSearch(
                    e.target.value
                  )
                }
                className="
                  bg-transparent
                  outline-none
                  w-full
                "
              />

            </div>

          </div>

          {/* EMPTY */}

          {filteredStudents.length === 0 ? (

            <div className="p-20 text-center">

              <div
                className="
                  w-24
                  h-24
                  rounded-[28px]
                  bg-white/[0.03]
                  flex
                  items-center
                  justify-center
                  mx-auto
                  mb-8
                "
              >

                <Users
                  size={42}
                  className="text-zinc-500"
                />

              </div>

              <h2 className="text-4xl font-semibold">

                No Students Found

              </h2>

              <p className="text-zinc-500 mt-4 text-lg">

                Register students to populate
                the biometric database.

              </p>

            </div>

          ) : (

            <div className="divide-y divide-white/5">

              {filteredStudents.map(
                (student) => (

                  <div
                    key={student.id}
                    className="
                      p-6
                      hover:bg-white/[0.02]
                      transition
                    "
                  >

                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

                      {/* LEFT */}

                      <div className="flex items-center gap-5">

                        {/* IMAGE */}

                        <div className="relative">

                          <img
                            src={student.image}
                            alt={student.name}
                            onError={(e) => {

                              e.target.src =
                                "https://via.placeholder.com/150";

                            }}
                            className="
                              w-24
                              h-24
                              rounded-[28px]
                              object-cover
                              border
                              border-white/10
                            "
                          />

                          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-4 border-[#06070A]" />

                        </div>

                        {/* INFO */}

                        <div>

                          <div className="flex items-center gap-3">

                            <h2 className="text-3xl font-semibold">

                              {student.name}

                            </h2>

                            <div
                              className="
                                px-3
                                py-1
                                rounded-xl
                                bg-emerald-500/10
                                text-emerald-400
                                text-xs
                                font-medium
                                border
                                border-emerald-500/20
                              "
                            >

                              VERIFIED

                            </div>

                          </div>

                          <p className="text-zinc-500 mt-3 text-lg">

                            {student.email}

                          </p>

                          <div className="flex items-center gap-6 mt-5">

                            <div className="flex items-center gap-2 text-zinc-400 text-sm">

                              <ShieldCheck size={16} />

                              Recognition Enabled

                            </div>

                            <div className="flex items-center gap-2 text-zinc-400 text-sm">

                              <Activity size={16} />

                              Identity Synced

                            </div>

                          </div>

                        </div>

                      </div>

                      {/* RIGHT */}

                      <div className="flex items-center gap-4">

                        <div className="hidden lg:block text-right">

                          <p className="text-zinc-500 text-sm">

                            Registry Status

                          </p>

                          <h2 className="text-emerald-400 font-semibold mt-2">

                            Active

                          </h2>

                        </div>

                        <button
                          onClick={() =>
                            deleteStudent(
                              student.id
                            )
                          }
                          className="
                            h-14
                            px-6
                            rounded-2xl
                            bg-red-500/10
                            border
                            border-red-500/20
                            text-red-400
                            hover:bg-red-500/20
                            transition
                            flex
                            items-center
                            gap-3
                            font-medium
                          "
                        >

                          <Trash2 size={18} />

                          Delete

                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}