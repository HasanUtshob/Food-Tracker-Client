import axios from "axios";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { Link } from "react-router";

const NearlyExpire = () => {
  const [foods, setfoods] = useState([]);
  console.log(foods);
  useEffect(() => {
    const loadFood = async () => {
      const res = await axios.get("http://localhost:3000/nearly-expire");
      console.log("Data from API:", res.data);
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
      <div className="w-11/12 md:w-10/12 mx-auto my-10">
        <h1 className="text-3xl font-bold text-center mb-6">
          🕒 Nearly Expiring Foods
        </h1>

        {foods.length === 0 ? (
          <p className="text-center text-gray-500">
            No nearly expiring foods found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {foods.map((food) => (
              <div
                key={food._id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition border"
              >
                <img
                  src={food?.FoodImage}
                  alt={food?.FoodTitle}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold">{food?.FoodTitle}</h2>
                <p className="text-sm text-gray-600 mb-1">
                  Category: {food?.category}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Quantity: {food?.Quantity}
                </p>
                <p className="text-sm text-red-500 font-medium mb-2">
                  <Countdown
                    date={new Date(food?.ExpiryDate)}
                    renderer={renderer}
                  />
                </p>
                <Link to={`/fooddetails/${food?._id}`}>
                  <button className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm">
                    See Details
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
