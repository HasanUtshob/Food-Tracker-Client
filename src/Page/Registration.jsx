import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const Registration = () => {
  const { handleRegister } = use(AuthContext);
  const [errorMassage, seterrorMassage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const handleregform = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const { email, password, ...restFormData } = Object.fromEntries(
      formData.entries()
    );

    const regextest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/;
    if (regextest.test(password) === false) {
      seterrorMassage(
        "Password must have at least One UpperCase One LowerCase Use at least One Special Charecter & more then 6 longer"
      );
      return;
    }
    // firebase verify

    handleRegister(email, password)
      .then((result) => {
        // send userinfo database
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
                title: "Account Created Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
            // console.log(data.data);
            // console.log(result);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="relative px-4 py-10 mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div className="max-w-md mx-auto text-white">
          <form onSubmit={handleregform}>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  className="font-semibold text-sm text-gray-400 pb-1 block"
                  htmlFor="fullname"
                >
                  Full Name
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full  text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  type="text"
                  id="fullname"
                  name="name"
                  placeholder="Enter Your Full name"
                />
              </div>
              <div>
                <label
                  className="font-semibold text-sm text-gray-400 pb-1 block"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full  text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                />
              </div>
              <div>
                <label
                  className="font-semibold text-sm text-gray-400 pb-1 block"
                  htmlFor="photourl"
                >
                  Photo Url
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full  text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  type="text"
                  id="photourl"
                  name="photo"
                  placeholder="Enter your Photo Url"
                />
              </div>
              <div>
                <label
                  className="font-semibold text-sm text-gray-400 pb-1 block"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full  text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                />
                <p className="text-red-500 text-sm">{errorMassage}</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  className="font-semibold text-sm text-gray-400 pb-1 block"
                  htmlFor="dob"
                >
                  Date of Birth
                </label>
                <input
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full  text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  type="date"
                  id="dob"
                  name="dob"
                />
              </div>
              <div>
                <label
                  className="font-semibold text-sm text-gray-400 pb-1 block"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <select
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  id="gender"
                  name="gender"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="flex  items-center gap-1.5">
              <input type="checkbox" name="" id="" />
              <span className="text-black ml-2">Accept terms & Condition</span>
            </div>
            <div className="my-5">
              <button
                className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            <Link
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
              to="/login"
            >
              have an account? Log in
            </Link>
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
