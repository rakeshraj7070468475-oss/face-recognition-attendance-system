import {
  useNavigate
} from "react-router-dom";

export default function RoleSelect() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-black flex items-center justify-center text-white">

      <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl w-full max-w-lg">

        <h1 className="text-5xl font-bold text-center mb-10">

          Login Portal

        </h1>

        <div className="space-y-6">

          {/* TEACHER */}

          <button
            onClick={() =>
              navigate("/login-teacher")
            }
            className="w-full bg-white text-black py-5 rounded-2xl font-bold text-xl hover:scale-105 transition"
          >

            Teacher Login

          </button>

          {/* STUDENT */}

          <button
            onClick={() =>
              navigate("/login-student")
            }
            className="w-full bg-zinc-800 py-5 rounded-2xl font-bold text-xl hover:bg-zinc-700 transition"
          >

            Student Login

          </button>

        </div>

      </div>

    </div>
  );
}