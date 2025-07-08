import React, { use, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { format } from "date-fns";
import axios from "axios";
import Swal from "sweetalert2";

const AddFood = () => {
  const { userData, User } = use(AuthContext);
  const [today, settoday] = useState(format(new Date(), "yyyy-MM-dd"));
  // console.log(settoday);
  const handleAddFood = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const AddFood = Object.fromEntries(formData.entries());
    // console.log(AddFood);

    // send info database
    axios
      .post("http://localhost:3000/foods", AddFood, {
        headers: {
          Authorization: `Bearer ${User?.accessToken}`,
        },
      })
      .then((data) => {
        // console.log(data.data);
        if (data.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Food Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <section className="w-11/12 max-w-6xl mx-auto my-24 p-6 md:p-24 bg-[#F4F3F0] rounded-xl">
      <div className="text-center space-y-4 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">Add My Food</h1>
        <p className="text-sm md:text-base text-gray-700">
          Food is essential for life, providing energy, nutrients, and
          satisfaction. It includes fruits, vegetables, grains, proteins, and
          fats. A balanced diet supports growth, health, and overall well-being.
          🍎🥦🍗🍚
        </p>
      </div>

      <form onSubmit={handleAddFood}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1 */}
          <fieldset className="bg-base-200 border border-base-300 rounded-lg p-4">
            <label className="label font-bold">Food Title</label>
            <input
              type="text"
              className="input input-bordered w-full"
              name="FoodTitle"
              placeholder="Name of Food"
            />
          </fieldset>

          {/* 2 */}
          <fieldset className="bg-base-200 border border-base-300 rounded-lg p-4">
            <label className="label font-bold">Food Image</label>
            <input
              type="url"
              required
              placeholder="https://"
              name="FoodImage"
              className="input input-bordered w-full"
              pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
              title="Must be valid URL"
            />
          </fieldset>

          {/* 3 */}
          <fieldset className="bg-base-200 border border-base-300 rounded-lg p-4">
            <label className="label font-bold">Quantity</label>
            <input
              type="text"
              className="input input-bordered w-full"
              name="Quantity"
              placeholder="Quantity"
            />
          </fieldset>

          {/* 4 */}

          <fieldset className="bg-base-200 border border-base-300 rounded-lg p-4">
            <label className="label font-bold">Expiry Date</label>
            <input
              type="date"
              name="ExpiryDate"
              className="input input-bordered w-full"
            />
          </fieldset>
          {/* 5 */}
          <fieldset className="bg-base-200 border border-base-300 rounded-lg p-4">
            <label className="label font-bold">Added Date</label>
            <input
              type="date"
              name="AddedDate"
              value={today}
              readOnly
              className="input input-bordered w-full"
            />
          </fieldset>
          {/* 6 */}
          <fieldset className="bg-base-200 border border-base-300 rounded-lg p-4">
            <label className="label font-bold">Category</label>
            <select name="category" className="select select-bordered w-full">
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
          </fieldset>
          {/* 7 */}
          <fieldset className="bg-base-200 border border-base-300 rounded-lg p-4">
            <label className="label font-bold">User Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              name="Username"
              value={userData?.name || ""}
              readOnly
              placeholder="Name of User"
            />
          </fieldset>

          {/* 8 */}
          <fieldset className="bg-base-200 border border-base-300 rounded-lg p-4">
            <label className="label font-bold">User Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              name="email"
              value={userData?.email || ""}
              readOnly
              placeholder="User Email"
            />
          </fieldset>

          {/* 9 */}
          <fieldset className="bg-base-200 border border-base-300 rounded-lg p-4 md:col-span-2">
            <label className="label font-bold">Description</label>
            <textarea
              name="Description"
              className="textarea textarea-bordered w-full"
              placeholder="Enter plant details"
            ></textarea>
          </fieldset>
        </div>

        <button className="btn btn-primary btn-block mt-8" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddFood;
