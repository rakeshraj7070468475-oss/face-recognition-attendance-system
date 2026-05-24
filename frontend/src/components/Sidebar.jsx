import {
  LayoutDashboard,
  UserPlus,
  ClipboardList,
  Users,
  LogOut,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  signOut
} from "firebase/auth";

import {
  auth
} from "../firebase";

export default function Sidebar() {

  const location = useLocation();

  const navigate = useNavigate();

  // =====================================
  // NAVIGATION ITEMS
  // =====================================

  const navItems = [

    {
      name: "Dashboard",
      path: "/teacher-dashboard",
      icon: LayoutDashboard,
    },

    {
      name: "Register",
      path: "/register",
      icon: UserPlus,
    },

    {
      name: "Attendance",
      path: "/attendance",
      icon: ClipboardList,
    },

    {
      name: "Students",
      path: "/students",
      icon: Users,
    },

  ];

  // =====================================
  // LOGOUT
  // =====================================

  const logout = async () => {

    await signOut(auth);

    navigate("/");

  };

  return (

    <div className="hidden md:flex w-64 min-h-screen bg-[#0F1115] border-r border-white/5 flex-col justify-between">

      {/* ================================= */}
      {/* TOP */}
      {/* ================================= */}

      <div>

        {/* LOGO */}

        <div className="px-6 pt-8 pb-10 border-b border-white/5">

          <h1 className="text-white text-xl font-semibold tracking-tight">

            FRAS

          </h1>

          <p className="text-zinc-500 text-sm mt-1">

            Enterprise Attendance Platform

          </p>

        </div>

        {/* NAVIGATION */}

        <div className="px-4 pt-6 space-y-1">

          {navItems.map((item) => {

            const Icon = item.icon;

            const active =
              location.pathname === item.path;

            return (

              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3
                  px-4 py-3 rounded-xl
                  text-sm font-medium
                  transition-all duration-200
                  border

                  ${
                    active
                      ? "bg-white text-black border-white"
                      : "text-zinc-400 border-transparent hover:bg-white/5 hover:text-white"
                  }
                `}
              >

                <Icon size={18} />

                <span>
                  {item.name}
                </span>

              </Link>

            );

          })}

        </div>

      </div>

      {/* ================================= */}
      {/* BOTTOM */}
      {/* ================================= */}

      <div className="p-4 border-t border-white/5">

        {/* SYSTEM STATUS */}

        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 mb-4">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-zinc-500 text-xs uppercase tracking-wide">

                System

              </p>

              <h2 className="text-white font-medium mt-1">

                Operational

              </h2>

            </div>

            <div className="w-3 h-3 rounded-full bg-emerald-400" />

          </div>

        </div>

        {/* LOGOUT */}

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 py-3 rounded-xl text-sm font-medium transition"
        >

          <LogOut size={16} />

          Logout

        </button>

      </div>

    </div>

  );
}