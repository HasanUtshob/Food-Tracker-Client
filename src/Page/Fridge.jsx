import axios from "axios";
import { isBefore, parseISO } from "date-fns";
import React, { use, useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "../component/Loading";
import { AuthContext } from "../Context/AuthContext";

const Fridge = () => {
  const { loading, setloading, User } = use(AuthContext);
  const [result, setresult] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // fetch data

  useEffect(() => {
    const loadFood = async () => {
      setloading(true);
      const res = await axios.get(
        "https://food-tracker-server-six.vercel.app/foods"
      );
      setresult(res.data);
      setloading(false);
    };

    loadFood();
  }, [setloading]);

  const Today = new Date();

  const handlesearch = async (e) => {
    e.preventDefault();
    setloading(true);
    const form = e.target.searchText.value;
    const res = await axios.get(
      `https://food-tracker-server-six.vercel.app/foods/search?q=${form}`
    );
    setresult(res.data);
    setloading(false);
  };

  if (loading) return <Loading></Loading>;

  // filter category

  const filtercategory = selectedCategory
    ? result.filter((food) => food.category === selectedCategory)
    : result;

  return (
    <div className="w-11/12 md:w-10/12 mx-auto">
      {/* Header */}
      <section className="text-center mt-12 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-3 drop-shadow-lg">
          🥗 All Foods
        </h1>
        <p className="text-gray-500 text-base md:text-lg">
          Discover and manage your delicious food items
        </p>
      </section>

      {/* Filter & Search */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select select-bordered w-full md:w-64 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
        >
          <option value="">All Categories</option>
          <option value="Fruits 🍎🍌">Fruits 🍎🍌</option>
          <option value="Vegetables 🥦🥕">Vegetables 🥦🥕</option>
          <option value="Dairy 🥛🧀">Dairy 🥛🧀</option>
          <option value="Sweets & Snacks 🍩🍫">Sweets & Snacks 🍩🍫</option>
          <option value="Proteins 🍗🥩">Proteins 🍗🥩</option>
          <option value="Fast Food & Junk Food 🍕🍔">Fast Food 🍕🍔</option>
          <option value="Grains 🍚🍞">Grains 🍚🍞</option>
          <option value="Beverages ☕🥤">Beverages ☕🥤</option>
        </select>

        <form onSubmit={handlesearch} className="flex gap-3 w-full md:w-auto">
          <input
            type="text"
            name="searchText"
            placeholder="Search by title or category"
            className="border border-gray-300 p-3 rounded-xl shadow-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-2 rounded-xl shadow-md transition duration-300"
          >
            🔍 Search
          </button>
        </form>
      </section>

      {/* Food Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {filtercategory?.map((food) => {
          const isExpired = isBefore(parseISO(food.ExpiryDate), Today);

          return (
            <div
              key={food._id}
              className="flex flex-col md:flex-row gap-4 items-center bg-[#F9F9F9] rounded-3xl shadow-md p-5 border border-gray-200 hover:shadow-xl transform hover:scale-[1.02] transition duration-300 relative"
            >
              {/* Image */}
              <figure className="w-full md:w-[160px]">
                <img
                  src={food?.FoodImage}
                  alt="food"
                  className="w-full h-[200px] object-cover rounded-xl shadow-md border"
                />
              </figure>

              {/* Info */}
              <div className="flex-1 text-center md:text-left text-gray-800 space-y-2">
                <h2 className="text-xl md:text-2xl font-semibold">
                  {food?.FoodTitle}
                </h2>
                <p className="text-sm">
                  <span className="font-semibold">Category:</span>{" "}
                  {food?.category}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Quantity:</span>{" "}
                  {food?.Quantity}
                </p>
              </div>

              {/* Expired Badge */}
              {isExpired && (
                <div className="absolute top-2 right-3">
                  <span className="bg-red-600 text-white text-xs font-medium flex items-center px-3 py-1 rounded-full shadow">
                    <svg
                      className="w-3 h-3 mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0Zm3.98 13.98a1 1 0 0 1-1.41 0l-3.28-3.27A1 1 0 0 1 9 10V6a1 1 0 0 1 2 0v3.59l2.98 2.98a1 1 0 0 1 0 1.41Z" />
                    </svg>
                    Expired
                  </span>
                </div>
              )}

              {/* Details Button */}
              <div className="mt-4 md:mt-0">
                <Link to={`/fooddetails/${food._id}`}>
                  <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-300">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Fridge;
