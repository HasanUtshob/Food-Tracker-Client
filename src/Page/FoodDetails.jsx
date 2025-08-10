import axios from "axios";
import React, { useState, useContext } from "react";
import { useLoaderData, Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Countdown from "react-countdown";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCalendarAlt, 
  FaClock, 
  FaTag, 
  FaWeight, 
  FaUser, 
  FaStickyNote, 
  FaArrowLeft,
  FaExclamationTriangle,
  FaCheckCircle,
  FaHeart,
  FaShare,
  FaEdit
} from "react-icons/fa";

const FoodDetails = () => {
  const data = useLoaderData();
  const { User } = useContext(AuthContext);
  const [showNoteBox, setShowNoteBox] = useState(false);
  const [noteText, setNoteText] = useState("");
  const isOwner = data?.email === User?.email;

  const handleNoteSubmit = (e) => {
    e.preventDefault();

    const note = e.target.notetext.value;
    const form = { note };

    axios
      .post(
        `https://food-tracker-server-six.vercel.app/fooddetails/${data._id}`,
        form
      )
      .then(() => {
        setShowNoteBox(false);
        window.location.reload();
      });
  };

  // Calculate expiry status
  const getExpiryStatus = () => {
    const today = new Date();
    const expiryDate = new Date(data?.ExpiryDate);
    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) {
      return { status: 'expired', color: 'text-red-600', bgColor: 'bg-red-100', icon: FaExclamationTriangle };
    } else if (daysUntilExpiry <= 3) {
      return { status: 'expiring', color: 'text-yellow-600', bgColor: 'bg-yellow-100', icon: FaClock };
    } else {
      return { status: 'fresh', color: 'text-green-600', bgColor: 'bg-green-100', icon: FaCheckCircle };
    }
  };

  const expiryInfo = getExpiryStatus();

  // Countdown Renderer
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full">
          <FaExclamationTriangle className="animate-pulse" />
          <span className="font-semibold">Expired</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
          <FaClock className="animate-pulse" />
          <span className="font-semibold">
            {days}d {hours}h {minutes}m {seconds}s
          </span>
        </div>
      );
    }
  };

  const InfoCard = ({ icon: Icon, label, value, color = "text-gray-700" }) => ( // eslint-disable-line react/prop-types
    <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
        <Icon className="text-white text-sm" />
      </div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{label}</p>
        <p className={`font-semibold ${color}`}>{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link 
            to="/fridge"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            <FaArrowLeft />
            <span className="font-medium">Back to Fridge</span>
          </Link>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Hero Section */}
          <div className="relative">
            <div className="absolute top-6 right-6 z-10">
              <Countdown date={new Date(data?.ExpiryDate)} renderer={renderer} />
            </div>
            
            <div className="absolute top-6 left-6 z-10">
              <div className={`flex items-center gap-2 px-3 py-2 ${expiryInfo.bgColor} ${expiryInfo.color} rounded-full`}>
                <expiryInfo.icon className="text-sm" />
                <span className="text-sm font-semibold capitalize">{expiryInfo.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                  <img
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    src={data.FoodImage}
                    alt={data.FoodTitle}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </motion.div>

              {/* Content Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-4xl font-black text-gray-800 mb-2 leading-tight">
                    {data.FoodTitle}
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {data.Description || "No description available for this food item."}
                  </p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InfoCard 
                    icon={FaTag} 
                    label="Category" 
                    value={data.category} 
                  />
                  <InfoCard 
                    icon={FaWeight} 
                    label="Quantity" 
                    value={data.Quantity} 
                  />
                  <InfoCard 
                    icon={FaCalendarAlt} 
                    label="Added Date" 
                    value={new Date(data.AddedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} 
                  />
                  <InfoCard 
                    icon={FaClock} 
                    label="Expiry Date" 
                    value={new Date(data.ExpiryDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} 
                    color={expiryInfo.color}
                  />
                </div>

                {/* Owner Info */}
                {data.email && (
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                        <FaUser className="text-white text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Added By</p>
                        <p className="font-semibold text-gray-700">{data.email}</p>
                        {isOwner && (
                          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full mt-1">
                            You own this item
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Notes Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-8 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                <FaStickyNote className="text-white text-lg" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Notes & Comments</h2>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              {data.note ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaCalendarAlt />
                      <span>
                        {data.Date
                          ? new Date(data.Date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : "No date available"}
                      </span>
                    </div>
                    {isOwner && (
                      <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                        <FaEdit />
                        Edit
                      </button>
                    )}
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border-l-4 border-blue-500">
                    <p className="text-gray-700 leading-relaxed italic">"{data.note}"</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No notes yet</h3>
                  <p className="text-gray-500 mb-4">
                    {isOwner 
                      ? "Add a note to keep track of important information about this food item."
                      : "The owner hasn't added any notes for this item yet."
                    }
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Action Button */}
      {isOwner && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNoteBox(!showNoteBox)}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 z-40"
          title="Add a note"
        >
          <FaStickyNote className="text-xl" />
        </motion.button>
      )}

      {/* Note Modal */}
      <AnimatePresence>
        {showNoteBox && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowNoteBox(false)}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <form
                onSubmit={handleNoteSubmit}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                    <FaStickyNote className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Add Note</h3>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Note
                  </label>
                  <textarea
                    name="notetext"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Write something about this food item..."
                    required
                  />
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowNoteBox(false)}
                    className="px-6 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all duration-300"
                  >
                    Save Note
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FoodDetails;
