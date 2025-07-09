import { Link, NavLink } from "react-router";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../component/Loading";
import Swal from "sweetalert2";
import axios from "axios";

const Navbar = () => {
  const { User, SignOut, loading } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    const email = User?.email;
    if (email) {
      const res = await axios.get(
        `https://food-tracker-server-six.vercel.app/users?email=${email}`,
        {
          headers: { Authorization: `Bearer ${User?.accessToken}` },
        }
      );
      setUserData(res.data[0]);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [User]);

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

  if (loading) return <Loading />;

  return (
    <div className="navbar bg-base-100 shadow-md px-5 md:px-10 lg:px-20 lg:h-16">
      <div className="navbar-start">
        {/* Hamburger Menu */}
        <div className="dropdown">
          <label tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-20 mt-3 w-52 p-3 shadow-lg space-y-2"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <Link to="/Fridge">Fridge</Link>
            </li>

            {/* MOBILE: Show login/register if not logged in */}
            {!User && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/registration">Register</Link>
                </li>
              </>
            )}

            {/* Logged in mobile menu */}
            {User && (
              <>
                <li>
                  <NavLink to="/addfood">Add Food</NavLink>
                </li>
                <li>
                  <NavLink to="/myfood">My Food</NavLink>
                </li>
              </>
            )}

            {/* Dark Mode Toggle (Mobile) */}
            <li>
              <label className="swap swap-rotate cursor-pointer flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      document.documentElement.setAttribute(
                        "data-theme",
                        "dark"
                      );
                    } else {
                      document.documentElement.setAttribute(
                        "data-theme",
                        "light"
                      );
                    }
                  }}
                />
                <span className="text-sm">Dark Mode</span>
              </label>
            </li>
          </ul>
        </div>

        {/* Logo */}
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
              transition: {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          >
            NutriTrack
          </motion.h1>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-6 text-lg font-medium">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/Fridge">Fridge</NavLink>
          </li>

          {User && (
            <>
              <li>
                <NavLink to="/addfood">Add Food</NavLink>
              </li>
              <li>
                <NavLink to="/myfood">My Food</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Navbar end */}
      <div className="navbar-end flex items-center gap-4">
        {/* Dark Mode Toggle only on large screens */}
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
            <path d="M5.64 17l-.71.71a1 1 0 001.41 1.41l.71-.71a1 1 0 00-1.41-1.41zM12 5a1 1 0 00-1-1V3a1 1 0 002 0v1a1 1 0 00-1 1zM19 12h1a1 1 0 000-2h-1a1 1 0 000 2zM12 19a1 1 0 001-1v-1a1 1 0 10-2 0v1a1 1 0 001 1z" />
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow-lg mt-3 w-52 p-2"
            >
              <li>
                <span className="font-semibold">
                  {userData?.name || "User"}
                </span>
              </li>
              <li>
                <Link to="/myprofile">My Profile</Link>
              </li>
              <li>
                <button onClick={handleSignOut}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          // Desktop login/register buttons, nicely styled and visible only lg+
          <div className="hidden lg:flex gap-3">
            <Link
              to="/login"
              className="btn btn-outline border-blue-500 text-blue-600 hover:bg-blue-50 transition"
            >
              Login
            </Link>
            <Link
              to="/registration"
              className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
