import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { IoMdCloseCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../component/Loading";

const MyProfile = () => {
  const { User } = use(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [userData, setuserData] = useState(null);

  const toggleForm = () => setShowForm(!showForm);

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

  const MyProfileUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const ProfileUpdate = Object.fromEntries(new FormData(form).entries());
    const id = userData._id;

    try {
      const { data } = await axios.put(
        `https://food-tracker-server-six.vercel.app/users/${id}`,
        ProfileUpdate,
        {
          headers: { Authorization: `Bearer ${User?.accessToken}` },
        }
      );

      if (data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setShowForm(false);
        fetchUserData();
      }
    } catch (error) {
      console.error("Update failed", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong!",
      });
    }
  };

  if (!userData) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-white to-gray-50 relative">
      {/* Profile Display */}
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 mb-8">
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-3xl font-bold text-gray-800">{userData?.name}</h2>
          <p className="text-gray-500 text-sm">📧 {userData?.email}</p>
          <p className="text-gray-500 text-sm">🎂 {userData?.dob || "N/A"}</p>
          <p className="text-gray-500 text-sm">⚧ {userData?.gender || "N/A"}</p>
          <p className="text-gray-500 text-xs">
            Created: {userData?.creationTime}
          </p>
          <p className="text-gray-500 text-xs">
            Last Sign In: {userData?.lastSignInTime}
          </p>
        </div>
        <img
          src={userData?.photo}
          alt="User"
          className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover shadow-md"
        />
      </div>

      {/* Edit Button */}
      <button
        onClick={toggleForm}
        className="absolute top-4 right-4 bg-white border border-gray-300 hover:bg-gray-800 hover:text-white text-gray-700 rounded-full p-2 shadow-md transition"
        title={showForm ? "Close" : "Edit Profile"}
      >
        {showForm ? <IoMdCloseCircle size={22} /> : <MdEdit size={22} />}
      </button>

      {/* Conditional Edit Form */}
      {showForm && (
        <div className="mt-10 p-6 sm:p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">
            Edit Your Profile
          </h3>

          <form onSubmit={MyProfileUpdate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={userData?.name}
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  name="userEmail"
                  value={userData?.email}
                  readOnly
                  className="w-full rounded-xl border border-gray-300 p-3 text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  defaultValue={userData?.dob}
                  className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">
                  Gender
                </label>
                <select
                  name="gender"
                  defaultValue={userData?.gender}
                  className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block mb-1 text-sm font-medium text-gray-600">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photo"
                  defaultValue={userData?.photo}
                  placeholder="Image URL"
                  className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition transform hover:scale-[1.02]"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
