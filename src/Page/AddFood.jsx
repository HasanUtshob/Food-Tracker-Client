import React, { use, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { format } from "date-fns";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddFood = () => {
  const { User } = use(AuthContext);
  const [today, settoday] = useState(format(new Date(), "yyyy-MM-dd"));
  const navigate = useNavigate();
  // console.log(settoday);
  const handleAddFood = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const AddFood = Object.fromEntries(formData.entries());
    // console.log(AddFood);

    // send info database
    axios
      .post("https://food-tracker-server-six.vercel.app/foods", AddFood, {
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
          navigate("/myfood");
        }
      });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-11/12 max-w-6xl mx-auto my-24 p-6 md:p-24 bg-[#F4F3F0] rounded-2xl shadow-lg"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-center space-y-4 mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Add My Food
        </h1>
        <p className="text-sm md:text-base text-gray-700">
          Food is essential for life, providing energy, nutrients, and
          satisfaction. It includes fruits, vegetables, grains, proteins, and
          fats. A balanced diet supports growth, health, and overall well-being.
          🍎🥦🍗🍚
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleAddFood}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {[...Array(8)].map((_, index) => (
          <motion.fieldset
            key={index}
            whileHover={{ scale: 1.03 }}
            className="bg-base-200 border border-base-300 rounded-xl p-4 shadow-md"
          >
            {index === 0 && (
              <>
                <label className="label font-bold">Food Title</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  name="FoodTitle"
                  placeholder="Name of Food"
                />
              </>
            )}
            {index === 1 && (
              <>
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
              </>
            )}
            {index === 2 && (
              <>
                <label className="label font-bold">Quantity</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  name="Quantity"
                  placeholder="Quantity"
                />
              </>
            )}
            {index === 3 && (
              <>
                <label className="label font-bold">Expiry Date</label>
                <input
                  type="date"
                  name="ExpiryDate"
                  className="input input-bordered w-full"
                />
              </>
            )}
            {index === 4 && (
              <>
                <label className="label font-bold">Added Date</label>
                <input
                  type="date"
                  name="AddedDate"
                  value={today}
                  readOnly
                  className="input input-bordered w-full"
                />
              </>
            )}
            {index === 5 && (
              <>
                <label className="label font-bold">Category</label>
                <select
                  name="category"
                  className="select select-bordered w-full"
                >
                  <option value="Fruits 🍎🍌">Fruits 🍎🍌</option>
                  <option value="Vegetables 🥦🥕">Vegetables 🥦🥕</option>
                  <option value="Dairy 🥛🧀">Dairy 🥛🧀</option>
                  <option value="Sweets & Snacks 🍩🍫">
                    Sweets & Snacks 🍩🍫
                  </option>
                  <option value="Proteins 🍗🥩">Proteins 🍗🥩</option>
                  <option value="Fast Food & Junk Food 🍕🍔">
                    Fast Food & Junk Food 🍕🍔
                  </option>
                  <option value="Grains 🍚🍞">Grains 🍚🍞</option>
                  <option value="Beverages ☕🥤">Beverages ☕🥤</option>
                </select>
              </>
            )}
            {index === 6 && (
              <>
                <label className="label font-bold">User Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  name="email"
                  value={User?.email || ""}
                  readOnly
                  placeholder="User Email"
                />
              </>
            )}
            {index === 7 && (
              <>
                <label className="label font-bold">Description</label>
                <textarea
                  name="Description"
                  className="textarea textarea-bordered w-full"
                  placeholder="Enter plant details"
                ></textarea>
              </>
            )}
          </motion.fieldset>
        ))}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary w-full mt-8 text-lg tracking-wide"
          type="submit"
        >
          Submit
        </motion.button>
      </motion.form>
    </motion.section>
  );
};

export default AddFood;
