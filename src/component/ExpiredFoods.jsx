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
    <div className="w-11/12 md:w-10/12 mx-auto my-10">
      <h1 className="text-3xl font-bold text-center mb-6">❌ Expired Foods</h1>

      {expireDate.length === 0 ? (
        <p className="text-center text-gray-500">No expired foods found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {expireDate.map((food) => (
            <div
              key={food._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg border border-red-200 relative"
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
              <p className="text-sm text-gray-600 mb-1">
                Expired on:{" "}
                <span className="text-red-600 font-semibold">
                  {new Date(food?.ExpiryDate).toLocaleDateString()}
                </span>
              </p>

              <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
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
