import axios from "axios";
import React, { useState, useContext } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Countdown from "react-countdown";
import { motion, AnimatePresence } from "framer-motion";

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
      .then((response) => {
        // console.log(response.data);
        setShowNoteBox(false);
        window.location.reload();
      });
  };

  // Countdown Renderer
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <p className="text-red-600 font-semibold">❌ Expired</p>;
    } else {
      return (
        <p className="text-sm font-medium text-gray-700 mt-2">
          ⏳ Expires in:{" "}
          <span className="font-semibold text-blue-600">
            {days}d {hours}h {minutes}m {seconds}s
          </span>
        </p>
      );
    }
  };

  return (
    <div className="flex items-center justify-center px-4 md:px-0 relative min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <motion.section
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="p-6 md:p-12 lg:p-24 bg-white rounded-3xl shadow-2xl w-full max-w-6xl mt-10"
      >
        <div className="flex justify-end mb-4">
          <Countdown date={new Date(data?.ExpiryDate)} renderer={renderer} />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 bg-[#F4F3F0] p-8 rounded-3xl shadow-inner transition-transform hover:scale-[1.02]">
          <figure className="w-full lg:w-[280px]">
            <img
              className="w-full h-[250px] md:h-[320px] object-cover rounded-3xl shadow-xl border"
              src={data.FoodImage}
              alt={data.FoodTitle}
            />
          </figure>

          <div className="text-gray-700 space-y-3 w-full">
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
              {data.FoodTitle}
            </h2>
            <p className="font-medium text-gray-600">
              <strong className="text-gray-800">Category:</strong>{" "}
              {data.category}
            </p>
            <p className="font-medium text-gray-600">
              <strong className="text-gray-800">Quantity:</strong>{" "}
              {data.Quantity}
            </p>
            <p className="font-medium text-gray-600">
              <strong className="text-gray-800">Added Date:</strong>{" "}
              {data.AddedDate}
            </p>
            <p className="font-medium text-gray-600">
              <strong className="text-gray-800">Expiry Date:</strong>{" "}
              {data.ExpiryDate}
            </p>
            <p className="italic text-gray-700">
              <strong>Description:</strong> {data.Description}
            </p>

            <div className="mt-6 p-5 bg-white rounded-2xl shadow border border-gray-200 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Note</h3>
              {data.note ? (
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium text-gray-700">Date:</span>{" "}
                    {data.Date
                      ? new Date(data.Date).toLocaleDateString()
                      : "No date"}
                  </p>
                  <p className="italic text-gray-700">“{data.note}”</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No note added yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowNoteBox(!showNoteBox)}
        className={`fixed bottom-6 right-6 ${
          isOwner
            ? "bg-blue-600 hover:bg-blue-700 shadow-blue-400/50"
            : "bg-gray-400 cursor-not-allowed"
        } text-white px-5 py-4 rounded-full shadow-xl transition-all duration-300`}
        disabled={!isOwner}
        title={!isOwner ? "You are not allowed to add note to this item." : ""}
      >
        + Add Note
      </motion.button>

      {/* Floating Note Box */}
      <AnimatePresence>
        {showNoteBox && (
          <motion.form
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleNoteSubmit}
            className="fixed bottom-24 right-6 bg-white p-5 rounded-2xl shadow-2xl w-72 border border-gray-200 z-50"
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Add Note
            </h3>
            <div className="mb-3">
              <label className="block text-sm mb-1 text-gray-700">Note:</label>
              <textarea
                name="notetext"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows="3"
                className="border w-full px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Write something..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNoteBox(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm"
              >
                Save
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FoodDetails;
