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
  console.log(token);
  const [myFood, setMyFood] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);

  const fetchMyFood = async () => {
    const email = User?.email;
    if (email) {
      const res = await axios.get(
        `http://localhost:3000/myfoods?email=${email}`,
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
        `http://localhost:3000/myfood/${id}`,
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
          `http://localhost:3000/myfood/${id}`
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
      <section className="w-11/12 md:w-10/12 mx-auto my-10 text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold">My Food</h1>
      </section>

      <section className="w-11/12 md:w-10/12 mx-auto my-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {myFood.map((food) => (
          <div
            key={food._id}
            className="w-full flex flex-col md:flex-row gap-5 items-center shadow-lg p-5 bg-[#F4F3F0] rounded-2xl"
          >
            <figure className="w-full md:w-[150px] p-3 md:p-5 shadow-2xl rounded-2xl">
              <img
                className="w-full h-40 md:h-auto object-cover rounded-xl"
                src={food?.FoodImage}
                alt="food"
              />
            </figure>

            <div className="flex-1 space-y-1 text-center md:text-left text-black">
              <h2 className="text-xl font-semibold">{food?.FoodTitle}</h2>
              <p className="text-sm font-medium">Category: {food?.category}</p>
              <p className="text-sm font-medium">Quantity: {food?.Quantity}</p>
            </div>

            <div className="flex gap-2 mt-3 md:mt-0">
              <Link to={`/fooddetails/${food._id}`}>
                <button className="btn btn-sm md:btn-md">
                  <FaEye size={18} />
                </button>
              </Link>

              <button
                onClick={() => {
                  setSelectedFood(food);
                  document.getElementById(`my_modal_${food._id}`).showModal();
                }}
                className="btn btn-sm md:btn-md"
              >
                <FaEdit size={18} />
              </button>

              <dialog id={`my_modal_${food._id}`} className="modal">
                <div className="modal-box">
                  <h1 className="text-3xl font-bold text-center mb-5">
                    Edit My Food
                  </h1>
                  <form onSubmit={(e) => handleUpdate(e, food._id)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <fieldset className="bg-base-200 border rounded-lg p-4">
                        <label className="label font-bold">Food Title</label>
                        <input
                          type="text"
                          className="input input-bordered w-full"
                          name="FoodTitle"
                          defaultValue={food?.FoodTitle}
                        />
                      </fieldset>

                      <fieldset className="bg-base-200 border rounded-lg p-4">
                        <label className="label font-bold">Food Image</label>
                        <input
                          type="url"
                          name="FoodImage"
                          defaultValue={food?.FoodImage}
                          className="input input-bordered w-full"
                        />
                      </fieldset>

                      <fieldset className="bg-base-200 border rounded-lg p-4">
                        <label className="label font-bold">Quantity</label>
                        <input
                          type="text"
                          name="Quantity"
                          defaultValue={food?.Quantity}
                          className="input input-bordered w-full"
                        />
                      </fieldset>

                      <fieldset className="bg-base-200 border rounded-lg p-4">
                        <label className="label font-bold">Expiry Date</label>
                        <input
                          type="date"
                          name="ExpiryDate"
                          defaultValue={food?.ExpiryDate}
                          className="input input-bordered w-full"
                        />
                      </fieldset>

                      <fieldset className="bg-base-200 border border-base-300 rounded-lg p-4">
                        <label className="label font-bold">User Email</label>
                        <input
                          type="email"
                          className="input input-bordered w-full"
                          name="email"
                          value={food?.email || ""}
                          readOnly
                          placeholder="User Email"
                        />
                      </fieldset>

                      <fieldset className="bg-base-200 border rounded-lg p-4">
                        <label className="label font-bold">Category</label>
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

                      <fieldset className="bg-base-200 border rounded-lg p-4 md:col-span-2">
                        <label className="label font-bold">Description</label>
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
                      Submit
                    </button>
                  </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>Close</button>
                </form>
              </dialog>

              <button
                onClick={() => handleDelete(food._id)}
                className="btn btn-sm md:btn-md"
              >
                <MdDelete size={18} />
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default MyFood;
