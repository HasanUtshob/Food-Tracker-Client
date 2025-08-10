import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router"; // ✅ ঠিক করা হয়েছে
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion"; // ✅ এনিমেশন এর জন্য

const Login = () => {
  const { handleSignIn, User, SignWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password } = Object.fromEntries(formData.entries());

    try {
      const result = await handleSignIn(email, password);
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Signed in Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      const userInfo = {
        email,
        lastSignInTime: result.user?.metadata?.lastSignInTime,
      };

      await axios.patch(
        "http://localhost:3000/users",
        userInfo,
        {
          headers: {
            Authorization: `Bearer ${User?.accessToken}`,
          },
        }
      );
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid email or password!",
      });
    }
  };

  const handleSigninGoogle = () => {
    SignWithGoogle()
      .then((result) => {
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });

        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
          creationTime: result.user?.metadata?.creationTime,
          photo: result.user?.photoURL,
        };

        axios.post(
          "http://localhost:3000/users",
          userInfo,
          {
            headers: {
              Authorization: `Bearer ${User?.accessToken}`,
            },
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          👋 Welcome Back!
        </h2>

        <form onSubmit={handleLogIn} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="text-right text-sm">
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-transform transform hover:scale-105"
          >
            Log In
          </button>
        </form>

        <div className="flex items-center my-5">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm uppercase">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          onClick={handleSigninGoogle}
          className="flex items-center justify-center gap-3 w-full py-3 bg-white hover:bg-gray-100 border rounded-lg shadow-sm transition-transform transform hover:scale-105"
        >
          <img
            src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-semibold">
            Sign in with Google
          </span>
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/registration"
            className="text-blue-500 font-semibold hover:text-blue-700"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
