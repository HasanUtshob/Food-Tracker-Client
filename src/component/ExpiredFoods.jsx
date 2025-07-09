import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loading from "./Loading";

const ExpiredFoods = () => {
  const [expireDate, setexpireDate] = useState([]);
  const { loading, setloading } = use(AuthContext);
  useEffect(() => {
    const expireFood = async () => {
      const res = await axios.get(
        "https://food-tracker-server-six.vercel.app/nearly-expire"
      );
      setexpireDate(res.data);
      setloading(false);
    };

    expireFood();
  }, [setloading]);

  if (loading) return <Loading></Loading>;

  return (
    <div className="w-11/12 md:w-10/12 mx-auto my-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 drop-shadow-lg">
        ❌ Expired Foods
      </h1>

      {expireDate.length === 0 ? (
        <p className="text-center text-gray-500 text-lg italic">
          No expired foods found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {expireDate.map((food) => (
            <div
              key={food._id}
              className="bg-white rounded-2xl shadow-xl border border-red-300 p-5 transform hover:scale-[1.02] hover:shadow-2xl transition duration-300 relative"
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
                <span className="font-medium">Category:</span> {food?.category}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Quantity:</span> {food?.Quantity}
              </p>
              <p className="text-sm text-red-600 font-semibold mb-3">
                Expired on: {new Date(food?.ExpiryDate).toLocaleDateString()}
              </p>

              <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded shadow">
                ❌ Expired
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpiredFoods;
