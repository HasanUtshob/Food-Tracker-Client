import { Link, NavLink } from "react-router";
import { motion } from "motion/react";
import { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../component/Loading";
import Swal from "sweetalert2";
import axios from "axios";

const Navber = () => {
  const { User, SignOut, loading } = use(AuthContext);
  const [userData, setuserData] = useState(null);

  const fetchUserData = async () => {
    const email = User?.email;
    if (email) {
      const res = await axios.get(
        `https://food-tracker-server-six.vercel.app/users?email=${email}`,
        {
          headers: { Authorization: `Bearer ${User?.accessToken}` },
        }
      );
      setuserData(res.data[0]);
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
    });
  };

  if (loading) return <Loading></Loading>;
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <Link to="/allplants">All Plants</Link>
            </li>
            {User && (
              <>
                <li>
                  <NavLink to="/addplant">Add Plant</NavLink>
                </li>
                <li>
                  <NavLink to="/myplants">My Plants</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link to="/">
          <motion.h1
            className="font-bold text-2xl "
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
              transition: { duration: 4, repeat: Infinity },
            }}
          >
            NutriTrack
          </motion.h1>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
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

      {/* Dark Mode Toggle + User or Auth Buttons */}
      <div className="navbar-end flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <label className="swap swap-rotate cursor-pointer">
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
          {/* Sun Icon */}
          <svg
            className="swap-off fill-current w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64 17l-.71.71a1 1 0 001.41 1.41l.71-.71a1 1 0 00-1.41-1.41zM12 5a1 1 0 00-1-1V3a1 1 0 002 0v1a1 1 0 00-1 1zm7 7h1a1 1 0 100-2h-1a1 1 0 000 2zm-7 7a1 1 0 001-1v-1a1 1 0 10-2 0v1a1 1 0 001 1zm6.36-4.64a1 1 0 001.41-1.41l-.71-.71a1 1 0 10-1.41 1.41l.71.71zM12 9a3 3 0 110 6 3 3 0 010-6z" />
          </svg>
          {/* Moon Icon */}
          <svg
            className="swap-on fill-current w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64 13a1 1 0 00-1.05-.14 8 8 0 01-3.37.73 8.15 8.15 0 01-5.11-3.81 8.59 8.59 0 01.25-2 1 1 0 00-1.34-1.34A10.14 10.14 0 1022 14.05a1 1 0 00-.36-.05z" />
          </svg>
        </label>
        {User ? (
          <div className="dropdown dropdown-bottom dropdown-end">
            <label
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={userData?.photo} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">{userData?.name}</a>
              </li>
              <li>
                <Link to="/myprofile">My Profile</Link>
              </li>
              <li>
                <Link onClick={handleSignOut}>Logout</Link>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline">
              Login
            </Link>
            <Link to="/registration" className="btn btn-primary">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navber;
