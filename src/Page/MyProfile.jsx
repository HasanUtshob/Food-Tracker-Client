import React, { use, useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ThemeContext } from "../Context/ThemeContext";
import { 
  IoMdCloseCircle, 
  IoMdPerson, 
  IoMdMail, 
  IoMdCalendar,
  IoMdCamera,
  IoMdTime,
  IoMdCheckmarkCircle
} from "react-icons/io";
import { 
  MdEdit, 
  MdSave, 
  MdCake, 
  MdWc, 
  MdArrowBack,
  MdAccountCircle,
  MdVerified
} from "react-icons/md";
import { 
  FaUser, 
  FaEnvelope, 
  FaBirthdayCake, 
  FaVenusMars, 
  FaImage, 
  FaUtensils,
  FaStar,
  FaHeart,
  FaCrown
} from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import Loading from "../component/Loading";
import { Link } from "react-router";

const MyProfile = () => {
  const { User } = use(AuthContext);
  const { darkmode } = useContext(ThemeContext);
  const [showForm, setShowForm] = useState(false);
  const [userData, setuserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleForm = () => setShowForm(!showForm);

  const fetchUserData = async () => {
    const email = User?.email;
    if (email) {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://food-tracker-server-six.vercel.app/myinfo?email=${email}`,
          {
            headers: { Authorization: `Bearer ${User?.accessToken}` },
          }
        );
        setuserData(res.data[0]);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setIsLoading(false);
      }
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
      setIsLoading(true);
      const { data } = await axios.put(
        `https://food-tracker-server-six.vercel.app/users/${id}`,
        ProfileUpdate,
        {
          headers: { Authorization: `Bearer ${User?.accessToken}` },
        }
      );

      if (data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "🎉 Profile Updated Successfully!",
          text: "Your profile information has been updated.",
          showConfirmButton: false,
          timer: 2000,
          background: darkmode ? '#1f2937' : '#f0f9ff',
          color: darkmode ? '#f3f4f6' : '#1e40af'
        });
        setShowForm(false);
        fetchUserData();
      }
    } catch (error) {
      console.error("Update failed", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong! Please try again.",
        confirmButtonColor: '#ef4444',
        background: darkmode ? '#1f2937' : '#ffffff',
        color: darkmode ? '#f3f4f6' : '#1f2937'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData || isLoading) return <Loading />;

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGenderIcon = (gender) => {
    switch(gender?.toLowerCase()) {
      case 'male': return '👨';
      case 'female': return '👩';
      default: return '👤';
    }
  };

  const getGenderColor = (gender) => {
    switch(gender?.toLowerCase()) {
      case 'male': return 'from-blue-500 to-cyan-500';
      case 'female': return 'from-pink-500 to-rose-500';
      default: return 'from-purple-500 to-indigo-500';
    }
  };

  return (
    <div className={`min-h-screen py-4 sm:py-8 px-4 transition-colors duration-300 ${
      darkmode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-4xl sm:text-6xl opacity-10">🍽️</div>
        <div className="absolute top-40 right-20 text-3xl sm:text-4xl opacity-10">👨‍🍳</div>
        <div className="absolute bottom-40 left-20 text-4xl sm:text-5xl opacity-10">🥗</div>
        <div className="absolute bottom-20 right-10 text-2xl sm:text-3xl opacity-10">⭐</div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4"
        >
          <Link 
            to="/dashboard"
            className={`flex items-center gap-2 transition-colors duration-300 ${
              darkmode 
                ? 'text-gray-300 hover:text-blue-400' 
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <MdArrowBack />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
          
          <div className={`inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg ${
            darkmode
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
          }`}>
            <FaUser className="animate-pulse" />
            <span className="hidden sm:inline">MY PROFILE</span>
            <span className="sm:hidden">PROFILE</span>
            <FaUser className="animate-pulse" />
          </div>
        </motion.div>

        {/* Main Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden relative ${
            darkmode 
              ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700' 
              : 'bg-white/80 backdrop-blur-sm border border-blue-100'
          }`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 right-4 text-2xl sm:text-4xl">🍎</div>
            <div className="absolute bottom-4 left-4 text-xl sm:text-3xl">🥘</div>
          </div>

          {/* Header Section */}
          <div className={`relative px-4 sm:px-8 py-6 ${
            darkmode
              ? 'bg-gradient-to-r from-gray-700 to-gray-600'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600'
          }`}>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* Profile Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative flex-shrink-0"
              >
                <img
                  src={userData?.photo || '/default-avatar.png'}
                  alt="Profile"
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover shadow-xl"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData?.name || 'User')}&background=6366f1&color=fff&size=128`;
                  }}
                />
                <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <MdVerified className="text-white text-xs sm:text-sm" />
                </div>
              </motion.div>

              {/* User Info */}
              <div className="text-center sm:text-left text-white flex-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 truncate">
                  {userData?.name || 'Food Lover'}
                </h1>
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-xs sm:text-sm opacity-90">
                  <div className="flex items-center gap-2">
                    <FaEnvelope />
                    <span className="truncate max-w-48 sm:max-w-none">{userData?.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCrown />
                    <span>Food Tracker Member</span>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleForm}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 backdrop-blur-sm flex-shrink-0"
                title={showForm ? "Close" : "Edit Profile"}
              >
                {showForm ? <IoMdCloseCircle size={20} /> : <MdEdit size={20} />}
              </motion.button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-4 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Personal Info Cards */}
              <motion.div
                whileHover={{ y: -5 }}
                className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 ${
                  darkmode 
                    ? 'bg-gray-700/50 border border-gray-600' 
                    : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-xl ${
                    darkmode ? 'bg-blue-600' : 'bg-blue-500'
                  } text-white flex-shrink-0`}>
                    <FaBirthdayCake size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className={`font-semibold text-sm sm:text-base ${darkmode ? 'text-gray-200' : 'text-gray-800'}`}>
                      Date of Birth
                    </h3>
                    <p className={`text-xs sm:text-sm truncate ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {formatDate(userData?.dob)}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 ${
                  darkmode 
                    ? 'bg-gray-700/50 border border-gray-600' 
                    : 'bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-xl bg-gradient-to-r ${getGenderColor(userData?.gender)} text-white flex-shrink-0`}>
                    <FaVenusMars size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className={`font-semibold text-sm sm:text-base ${darkmode ? 'text-gray-200' : 'text-gray-800'}`}>
                      Gender
                    </h3>
                    <p className={`text-xs sm:text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {getGenderIcon(userData?.gender)} {userData?.gender || 'Not specified'}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg transition-all duration-300 sm:col-span-2 lg:col-span-1 ${
                  darkmode 
                    ? 'bg-gray-700/50 border border-gray-600' 
                    : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-xl ${
                    darkmode ? 'bg-green-600' : 'bg-green-500'
                  } text-white flex-shrink-0`}>
                    <IoMdTime size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className={`font-semibold text-sm sm:text-base ${darkmode ? 'text-gray-200' : 'text-gray-800'}`}>
                      Member Since
                    </h3>
                    <p className={`text-xs sm:text-sm truncate ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {formatDate(userData?.creationTime)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats Section */}
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
              darkmode 
                ? 'bg-gradient-to-r from-gray-700/50 to-gray-600/50 border border-gray-600' 
                : 'bg-gradient-to-r from-blue-100/50 to-indigo-100/50 border border-blue-200'
            }`}>
              <div className="text-center">
                <div className={`text-xl sm:text-2xl font-bold ${darkmode ? 'text-blue-400' : 'text-blue-600'}`}>
                  🍽️
                </div>
                <p className={`text-xs ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Food Lover
                </p>
              </div>
              <div className="text-center">
                <div className={`text-xl sm:text-2xl font-bold ${darkmode ? 'text-green-400' : 'text-green-600'}`}>
                  ⭐
                </div>
                <p className={`text-xs ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Active User
                </p>
              </div>
              <div className="text-center">
                <div className={`text-xl sm:text-2xl font-bold ${darkmode ? 'text-purple-400' : 'text-purple-600'}`}>
                  🏆
                </div>
                <p className={`text-xs ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Organizer
                </p>
              </div>
              <div className="text-center">
                <div className={`text-xl sm:text-2xl font-bold ${darkmode ? 'text-pink-400' : 'text-pink-600'}`}>
                  💝
                </div>
                <p className={`text-xs ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Verified
                </p>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`border-t overflow-hidden ${
                  darkmode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50/50'
                }`}
              >
                <div className="p-4 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${
                      darkmode ? 'bg-blue-600' : 'bg-blue-500'
                    } text-white flex-shrink-0`}>
                      <MdEdit size={20} />
                    </div>
                    <div className="min-w-0">
                      <h3 className={`text-xl sm:text-2xl font-bold ${darkmode ? 'text-gray-200' : 'text-gray-800'}`}>
                        Edit Your Profile
                      </h3>
                      <p className={`text-sm ${darkmode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Update your personal information
                      </p>
                    </div>
                  </div>

                  <form onSubmit={MyProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {/* Full Name */}
                      <div>
                        <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                          darkmode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          <FaUser className="text-blue-500" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          defaultValue={userData?.name}
                          placeholder="Enter your full name"
                          className={`w-full rounded-xl border p-3 sm:p-4 text-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            darkmode 
                              ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400' 
                              : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                          }`}
                        />
                      </div>

                      {/* Email (Read-only) */}
                      <div>
                        <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                          darkmode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          <FaEnvelope className="text-green-500" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="userEmail"
                          value={userData?.email}
                          readOnly
                          className={`w-full rounded-xl border p-3 sm:p-4 text-sm cursor-not-allowed ${
                            darkmode 
                              ? 'border-gray-600 bg-gray-600 text-gray-400' 
                              : 'border-gray-300 bg-gray-100 text-gray-500'
                          }`}
                        />
                      </div>

                      {/* Date of Birth */}
                      <div>
                        <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                          darkmode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          <FaBirthdayCake className="text-purple-500" />
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dob"
                          defaultValue={userData?.dob}
                          className={`w-full rounded-xl border p-3 sm:p-4 text-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            darkmode 
                              ? 'border-gray-600 bg-gray-700 text-gray-200' 
                              : 'border-gray-300 bg-white text-gray-900'
                          }`}
                        />
                      </div>

                      {/* Gender */}
                      <div>
                        <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                          darkmode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          <FaVenusMars className="text-pink-500" />
                          Gender
                        </label>
                        <select
                          name="gender"
                          defaultValue={userData?.gender}
                          className={`w-full rounded-xl border p-3 sm:p-4 text-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            darkmode 
                              ? 'border-gray-600 bg-gray-700 text-gray-200' 
                              : 'border-gray-300 bg-white text-gray-900'
                          }`}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">👨 Male</option>
                          <option value="female">👩 Female</option>
                          <option value="other">👤 Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Photo URL */}
                    <div>
                      <label className={`flex items-center gap-2 text-sm font-semibold mb-2 ${
                        darkmode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <FaImage className="text-orange-500" />
                        Profile Photo URL
                      </label>
                      <input
                        type="url"
                        name="photo"
                        defaultValue={userData?.photo}
                        placeholder="https://example.com/your-photo.jpg"
                        className={`w-full rounded-xl border p-3 sm:p-4 text-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                          darkmode 
                            ? 'border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400' 
                            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                        isLoading
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:shadow-xl'
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Updating...
                        </>
                      ) : (
                        <>
                          <MdSave />
                          Save Changes
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default MyProfile;
