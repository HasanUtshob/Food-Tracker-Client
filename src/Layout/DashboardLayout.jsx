import { Outlet, Link, NavLink } from "react-router";
import { useContext, useEffect, useState, useCallback } from "react";
import { FaBars, FaTimes, FaPlus, FaList, FaHome, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const { User, SignOut } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const fetchUserData = useCallback(async () => {
    const email = User?.email;
    if (email) {
      try {
        const res = await axios.get(
          `http://localhost:3000/users?email=${email}`,
          {
            headers: { Authorization: `Bearer ${User?.accessToken}` },
          }
        );
        setUserData(res.data[0]);
      } catch (error) {
        console.error("Failed to load user data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [User?.email, User?.accessToken]);

  useEffect(() => {
    fetchUserData();
  }, [User, fetchUserData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  const handleSignOut = () => {
    SignOut().then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sign Out Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setUserData(null);
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:sticky top-0 left-0 md:h-screen h-full bg-white shadow-md z-50 w-64 transform transition-transform duration-300 ${
    open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
  }`}
      >
        {/* Logo */}
        <div className="p-4 flex justify-between items-center border-b">
          <Link to="/">
            <motion.h1
              className="font-extrabold text-2xl md:text-3xl"
              animate={{
                color: [
                  "#ab3939",
                  "#d59b2f",
                  "#a9df33",
                  "#21a762",
                  "#16adc8",
                  "#1d51c8",
                  "#9a52e3",
                  "#d852e3",
                ],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              NutriTrack
            </motion.h1>
          </Link>

          <button
            className="md:hidden text-gray-600"
            onClick={() => setOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4 space-y-2">
          <NavLink
            to="/dashboard/home"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded hover:bg-blue-100 ${
                isActive ? "bg-blue-200 font-semibold" : ""
              }`
            }
          >
            <FaHome /> Dashboard Home
          </NavLink>
          <NavLink
            to="/dashboard/myprofile"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded hover:bg-blue-100 ${
                isActive ? "bg-blue-200 font-semibold" : ""
              }`
            }
          >
           <FaUserCircle /> My Profile
          </NavLink>
          <NavLink
            to="/dashboard/addfood"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded hover:bg-blue-100 ${
                isActive ? "bg-blue-200 font-semibold" : ""
              }`
            }
          >
            <FaPlus /> Add Food
          </NavLink>

          <NavLink
            to="/dashboard/myfood"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded hover:bg-blue-100 ${
                isActive ? "bg-blue-200 font-semibold" : ""
              }`
            }
          >
            <FaList /> My Food
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="navbar sticky top-0 z-30 bg-white shadow-sm border-b px-4 md:px-6 min-h-12 h-17 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Toggle */}
            <button
              className="btn btn-ghost md:hidden"
              onClick={() => setOpen(true)}
            >
              <FaBars size={20} />
            </button>

            {/* Greeting */}
            <motion.h2
              className="text-lg md:text-xl font-bold text-green-800 truncate"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {getGreeting()}, {userData?.name || "User"} 👋
            </motion.h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <label className="swap swap-rotate cursor-pointer hidden lg:block">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    document.documentElement.setAttribute("data-theme", "dark");
                  } else {
                    document.documentElement.setAttribute("data-theme", "light");
                  }
                }}
              />
              <svg
                className="swap-off fill-current w-8 h-8 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64 17l-.71.71a1 1 0 001.41 1.41l.71-.71a1 1 0 00-1.41-1.41z" />
              </svg>
              <svg
                className="swap-on fill-current w-8 h-8 text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64 13a1 1 0 00-1.05-.14 8 8 0 01-3.37.73 8.15 8.15 0 01-5.11-3.81 8.59 8.59 0 01.25-2 1 1 0 00-1.34-1.34A10.14 10.14 0 1022 14.05a1 1 0 00-.36-.05z" />
              </svg>
            </label>

            {User ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full border border-blue-300 overflow-hidden">
                    <img
                      alt="User"
                      src={userData?.photo || "/default-avatar.png"}
                    />
                  </div>
                </label>
                  <ul
    tabIndex={0}
    className="menu menu-sm dropdown-content bg-white text-gray-700 rounded-xl shadow-lg mt-3 w-56 p-3 border border-gray-100"
  >
    <li className="mb-2">
      <div className="flex flex-col items-center gap-1">
        <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300 shadow">
          <img
            alt="User"
            src={userData?.photo || "/default-avatar.png"}
          />
        </div>
        <span className="font-bold text-blue-600">
          {userData?.name || "User"}
        </span>
        <small className="text-gray-500">
          {userData?.email || "Email not found"}
        </small>
      </div>
    </li>
    <div className="divider my-1"></div>
    <li>
      <button
        onClick={handleSignOut}
        className="flex items-center gap-2 text-red-500 hover:bg-red-50 rounded-lg px-2 py-1 transition"
      >
        <i className="fa-solid fa-right-from-bracket"></i> Logout
      </button>
    </li>
  </ul>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="btn btn-outline border-blue-500 text-blue-600 hover:bg-blue-50"
                >
                  Login
                </Link>
                <Link
                  to="/registration"
                  className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Outlet */}
        <div className="p-4 md:p-6 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
