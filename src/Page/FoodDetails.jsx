import axios from "axios";
import React, { useState, useContext } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Countdown from "react-countdown";

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
      .post(`http://localhost:3000/fooddetails/${data._id}`, form)
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
    <div className="flex items-center justify-center px-4 md:px-0 relative min-h-screen bg-gray-100">
      <section className="p-6 md:p-12 lg:p-24 bg-white rounded-xl shadow-lg w-full max-w-6xl mt-10">
        <div className="flex justify-end">
          <Countdown date={new Date(data?.ExpiryDate)} renderer={renderer} />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 bg-[#F4F3F0] p-5 rounded-2xl">
          {/* Image */}
          <figure className="w-full lg:w-[250px]">
            <img
              className="w-full h-[250px] md:h-[300px] object-cover rounded-2xl shadow-2xl"
              src={data.FoodImage}
              alt={data.FoodTitle}
            />
          </figure>

          {/* Text Info */}
          <div className="text-gray-700 space-y-2 w-full">
            <h2 className="text-2xl md:text-3xl font-bold">{data.FoodTitle}</h2>
            <p className="font-medium">Category: {data.category}</p>
            <p className="font-medium">Quantity: {data.Quantity}</p>
            <p className="font-medium">Added Date: {data.AddedDate}</p>
            <p className="font-medium">Expiry Date: {data.ExpiryDate}</p>
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {data.Description}
            </p>

            {/* Note Section */}
            <div className="mt-6 p-4 bg-white rounded-xl shadow border border-gray-200">
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
      </section>

      {/* Floating Button */}
      <button
        onClick={() => setShowNoteBox(!showNoteBox)}
        className={`fixed bottom-6 right-6 ${
          isOwner
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        } text-white px-4 py-3 rounded-full shadow-lg transition duration-300`}
        disabled={!isOwner}
        title={!isOwner ? "You are not allowed to add note to this item." : ""}
      >
        + Add Note
      </button>

      {/* Floating Note Box */}
      {showNoteBox && (
        <form
          onSubmit={handleNoteSubmit}
          className="fixed bottom-20 right-6 bg-white p-5 rounded-xl shadow-2xl w-72 border border-gray-200 z-50"
        >
          <h3 className="text-lg font-semibold mb-2">Add Note</h3>
          <div className="mb-3">
            <label className="block text-sm mb-1">Note:</label>
            <textarea
              name="notetext"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              rows="3"
              className="border w-full px-2 py-1 rounded focus:outline-none focus:ring"
              placeholder="Write something..."
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowNoteBox(false)}
              className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FoodDetails;
