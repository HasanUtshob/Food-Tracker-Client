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
      <section className="text-center mt-10 mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">All Foods 🥗</h1>
      </section>
      <section className="flex justify-between">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          className="select select-bordered w-full md:w-60"
        >
          <option value="">All Categories</option>
          <option value="Fruits 🍎🍌">Fruits 🍎🍌</option>
          <option value="Vegetables 🥦🥕">Vegetables 🥦🥕</option>
          <option value="Dairy 🥛🧀">Dairy 🥛🧀</option>
          <option value="Sweets & Snacks 🍩🍫">Sweets & Snacks 🍩🍫</option>
          <option value="Proteins 🍗🥩">Proteins 🍗🥩</option>
          <option value="Fast Food & Junk Food 🍕🍔">
            Fast Food & Junk Food 🍕🍔
          </option>
          <option value="Grains 🍚🍞">Grains 🍚🍞</option>
          <option value="Beverages ☕🥤">Beverages ☕🥤</option>
        </select>
        <form onSubmit={handlesearch} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Search by title or category"
            name="searchText"
            // value={searchText}
            // onChange={(e) => setSearchText(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            // onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </form>
      </section>
      {/* Food Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {filtercategory?.map((food) => {
          const isExpired = isBefore(parseISO(food.ExpiryDate), Today);

          return (
            <div
              key={food._id}
              className="w-full mx-auto flex flex-col md:flex-row gap-4 items-center shadow-lg p-5 bg-[#F4F3F0] rounded-2xl relative"
            >
              {/* Image */}
              <figure className="w-full md:w-[150px]">
                <img
                  className="w-full h-[200px] object-cover rounded-xl"
                  src={food?.FoodImage}
                  alt="foods"
                />
              </figure>

              {/* Info */}
              <div className="flex-1 space-y-1 text-center md:text-left text-black">
                <h2 className="text-xl font-semibold">{food?.FoodTitle}</h2>
                <p className="text-sm font-medium">
                  Category: {food?.category}
                </p>
                <p className="text-sm font-medium">
                  Quantity: {food?.Quantity}
                </p>
              </div>

              {/* Expired Badge */}
              <div className="absolute top-2 right-3">
                {isExpired && (
                  <span className="bg-red-600 text-white text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-sm me-2">
                    <svg
                      className="w-2.5 h-2.5 me-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                    </svg>
                    Expired
                  </span>
                )}
              </div>

              {/* Button */}
              <div className="mt-3 md:mt-0">
                <Link to={`/fooddetails/${food._id}`}>
                  <button className="btn btn-info">Details</button>
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
