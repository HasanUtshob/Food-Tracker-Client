import React, { useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { Link } from "react-router";
import { FaEye, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const MyFood = () => {
  const { User } = React.useContext(AuthContext);
  const token = User?.accessToken;
  // console.log(token);
  const [myFood, setMyFood] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);

  const fetchMyFood = async () => {
    const email = User?.email;
    if (email) {
      const res = await axios.get(
        `https://food-tracker-server-six.vercel.app/myfoods?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMyFood(res.data);
    }
  };

  useEffect(() => {
    fetchMyFood();
  }, [User]);

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedFood = Object.fromEntries(formData.entries());

    try {
      const { data } = await axios.put(
        `https://food-tracker-server-six.vercel.app/myfood/${id}`,
        updatedFood,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Food Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchMyFood(); // Refresh list after update
        document.getElementById(`my_modal_${id}`).close();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete(
          `https://food-tracker-server-six.vercel.app/myfood/${id}`
        );
        if (data.deletedCount) {
          Swal.fire("Deleted!", "Your food has been deleted.", "success");
          setMyFood(myFood.filter((item) => item._id !== id)); // Remove from UI
        }
      }
    });
  };

  return (
    <>
      <section className="w-11/12 md:w-10/12 mx-auto my-10 text-center space-y-3">
        <h1 className="text-4xl font-bold text-gray-800 drop-shadow-lg">
          🍽️ My Food Collection
        </h1>
        <p className="text-lg text-gray-500">
          Keep track of what you love and manage it easily.
        </p>
      </section>

      <section className="w-11/12 md:w-10/12 mx-auto my-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {myFood.map((food) => (
          <div
            key={food._id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition duration-300 flex flex-col md:flex-row items-center gap-6 p-6"
          >
            <figure className="w-full md:w-48 rounded-xl overflow-hidden shadow-md">
              <img
                className="w-full h-44 object-cover"
                src={food?.FoodImage}
                alt={food?.FoodTitle}
              />
            </figure>

            <div className="flex-1 space-y-2 text-center md:text-left">
              <h2 className="text-2xl font-semibold text-gray-800">
                {food?.FoodTitle}
              </h2>
              <p className="text-sm text-gray-600">
                Category: <span className="font-medium">{food?.category}</span>
              </p>
              <p className="text-sm text-gray-600">
                Quantity: <span className="font-medium">{food?.Quantity}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <Link to={`/fooddetails/${food._id}`}>
                <button className="p-2 rounded-lg shadow-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition">
                  <FaEye size={18} />
                </button>
              </Link>

              <button
                onClick={() => {
                  setSelectedFood(food);
                  document.getElementById(`my_modal_${food._id}`).showModal();
                }}
                className="p-2 rounded-lg shadow-md bg-green-100 text-green-600 hover:bg-green-200 transition"
              >
                <FaEdit size={18} />
              </button>

              <button
                onClick={() => handleDelete(food._id)}
                className="p-2 rounded-lg shadow-md bg-red-100 text-red-600 hover:bg-red-200 transition"
              >
                <MdDelete size={18} />
              </button>

              <dialog id={`my_modal_${food._id}`} className="modal">
                <div className="modal-box rounded-2xl p-8">
                  <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">
                    ✏️ Edit My Food
                  </h1>
                  <form onSubmit={(e) => handleUpdate(e, food._id)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <fieldset className="bg-gray-50 border rounded-lg p-4">
                        <label className="label font-semibold">
                          Food Title
                        </label>
                        <input
                          type="text"
                          name="FoodTitle"
                          defaultValue={food?.FoodTitle}
                          className="input input-bordered w-full"
                        />
                      </fieldset>

                      <fieldset className="bg-gray-50 border rounded-lg p-4">
                        <label className="label font-semibold">
                          Food Image
                        </label>
                        <input
                          type="url"
                          name="FoodImage"
                          defaultValue={food?.FoodImage}
                          className="input input-bordered w-full"
                        />
                      </fieldset>

                      <fieldset className="bg-gray-50 border rounded-lg p-4">
                        <label className="label font-semibold">Quantity</label>
                        <input
                          type="text"
                          name="Quantity"
                          defaultValue={food?.Quantity}
                          className="input input-bordered w-full"
                        />
                      </fieldset>

                      <fieldset className="bg-gray-50 border rounded-lg p-4">
                        <label className="label font-semibold">
                          Expiry Date
                        </label>
                        <input
                          type="date"
                          name="ExpiryDate"
                          defaultValue={food?.ExpiryDate}
                          className="input input-bordered w-full"
                        />
                      </fieldset>

                      <fieldset className="bg-gray-50 border rounded-lg p-4">
                        <label className="label font-semibold">
                          User Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={food?.email || ""}
                          readOnly
                          className="input input-bordered w-full"
                        />
                      </fieldset>

                      <fieldset className="bg-gray-50 border rounded-lg p-4">
                        <label className="label font-semibold">Category</label>
                        <select
                          name="category"
                          defaultValue={food?.category}
                          className="select select-bordered w-full"
                        >
                          <option value="Fruits 🍎🍌">Fruits 🍎🍌</option>
                          <option value="Vegetables 🥦🥕">
                            Vegetables 🥦🥕
                          </option>
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
                      </fieldset>

                      <fieldset className="bg-gray-50 border rounded-lg p-4 md:col-span-2">
                        <label className="label font-semibold">
                          Description
                        </label>
                        <textarea
                          name="Description"
                          defaultValue={food?.Description}
                          className="textarea textarea-bordered w-full"
                        ></textarea>
                      </fieldset>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-6"
                    >
                      Save Changes
                    </button>
                  </form>

                  <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                  </form>
                </div>
              </dialog>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default MyFood;
