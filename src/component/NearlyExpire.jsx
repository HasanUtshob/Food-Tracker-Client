import axios from "axios";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { Link } from "react-router";

const NearlyExpire = () => {
  const [foods, setfoods] = useState([]);
  useEffect(() => {
    const loadFood = async () => {
      const res = await axios.get(
        "https://food-tracker-server-six.vercel.app/nearly-expire"
      );
      setfoods(res.data);
    };
    loadFood();
  }, []);

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
    <div>
      <div className="w-11/12 md:w-10/12 mx-auto my-12">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 drop-shadow-lg">
          🕒 Nearly Expiring Foods
        </h1>

        {foods.length === 0 ? (
          <p className="text-center text-gray-500 text-lg italic">
            No nearly expiring foods found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {foods.map((food) => (
              <div
                key={food._id}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 p-5 transform hover:scale-[1.02] hover:shadow-2xl transition duration-300"
              >
                <img
                  src={food?.FoodImage}
                  alt={food?.FoodTitle}
                  className="w-full h-44 object-cover rounded-xl mb-4 shadow"
                />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {food?.FoodTitle}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Category:</span>{" "}
                  {food?.category}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Quantity:</span>{" "}
                  {food?.Quantity}
                </p>
                <p className="text-sm text-red-600 font-semibold mb-3">
                  <Countdown
                    date={new Date(food?.ExpiryDate)}
                    renderer={renderer}
                  />
                </p>

                <Link to={`/fooddetails/${food?._id}`}>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300">
                    🔍 See Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NearlyExpire;
