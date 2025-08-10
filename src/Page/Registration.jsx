import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Registration = () => {
  const { handleRegister } = useContext(AuthContext);
  const [errorMassage, setErrorMassage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegForm = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const { email, password, ...restFormData } = Object.fromEntries(
      formData.entries()
    );

    const regextest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;

    if (!regextest.test(password)) {
      setErrorMassage(
        "Password must have at least 1 uppercase, 1 lowercase, 1 special character & 6+ characters."
      );
      return;
    }

    handleRegister(email, password)
      .then((result) => {
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });

        const userInfo = {
          email,
          ...restFormData,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        };

        axios
          .post("https://food-tracker-server-six.vercel.app/users", userInfo)
          .then((data) => {
            if (data.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Account Created Successfully!",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: error.message,
        });
      });
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 px-6 py-12"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="max-w-2xl w-full bg-white p-10 rounded-3xl shadow-2xl"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">
          🚀 Create Your Account
        </h2>

        <form onSubmit={handleRegForm} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Full Name"
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Photo URL
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Profile Photo Link"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
              {errorMassage && (
                <p className="text-red-500 text-sm mt-1">{errorMassage}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Gender
              </label>
              <select
                name="gender"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male ♂️</option>
                <option value="female">Female ♀️</option>
                <option value="other">Other 🌈</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <input type="checkbox" required />
            <span className="text-gray-700 text-sm">
              I agree to the terms & conditions
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center justify-between mt-6 text-sm">
          <span className="w-1/5 border-b border-gray-300"></span>
          <Link
            to="/login"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Already have an account? Log In
          </Link>
          <span className="w-1/5 border-b border-gray-300"></span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Registration;
