import React, { useEffect, useState, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { Link } from "react-router";
import { FaEye, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../component/Loading";

const MyFood = () => {
  const { User } = React.useContext(AuthContext);
  const token = User?.accessToken;
  const [loading, setLoading] = useState(false);
  const [myFood, setMyFood] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const backdropRef = useRef(null);
  const fetchMyFood = async () => {
    const email = User?.email;
    if (!email) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `https://food-tracker-server-six.vercel.app/myfoods?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMyFood(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyFood();
  }, [User]);

  // মডাল ওপেন করা
  const openModal = (food) => {
    setSelectedFood(food);
    setModalOpen(true);
  };

  // মডাল বন্ধ করা
  const closeModal = () => {
    setModalOpen(false);
    setSelectedFood(null);
  };

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedFood = Object.fromEntries(formData.entries());

    try {
      const { data } = await axios.put(
        `https://food-tracker-server-six.vercel.app/myfood/${selectedFood._id}`,
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
        closeModal();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong. Please try again.",
      });
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
          setMyFood(myFood.filter((item) => item._id !== id));
        }
      }
    });
  };

  // মডালের বাইরে ক্লিক করলে বন্ধ হবে
  const onBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      closeModal();
    }
  };

  if (loading) return <Loading></Loading>;
  return (
    <>
      <section className="w-11/12 md:w-10/12 mx-auto my-10 text-center space-y-3">
        <motion.h1
          className="text-4xl font-bold text-gray-800 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🍽️ My Food Collection
        </motion.h1>
        <motion.p
          className="text-lg text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Keep track of what you love and manage it easily.
        </motion.p>
      </section>

      {myFood.length === 0 ? (
        <motion.div
          className="text-center text-gray-600 text-xl font-semibold mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          🥺 You have no food added yet. Please add some delicious items!
        </motion.div>
      ) : (
        <section className="w-11/12 md:w-10/12 mx-auto my-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {myFood.map((food) => (
              <motion.div
                key={food._id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center gap-6 p-6 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
                }}
              >
                <figure className="w-full md:w-48 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                  <img
                    className="w-full h-44 object-cover"
                    src={food?.FoodImage}
                    alt={food?.FoodTitle}
                    loading="lazy"
                  />
                </figure>

                <div className="flex-1 space-y-2 text-center md:text-left">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {food?.FoodTitle}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Category:{" "}
                    <span className="font-medium">{food?.category}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity:{" "}
                    <span className="font-medium">{food?.Quantity}</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
                  <Link to={`/fooddetails/${food._id}`}>
                    <button className="p-2 rounded-lg shadow-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition">
                      <FaEye size={18} />
                    </button>
                  </Link>

                  <button
                    onClick={() => openModal(food)}
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
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && selectedFood && (
          <motion.div
            className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50"
            ref={backdropRef}
            onClick={onBackdropClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">
                ✏️ Edit My Food
              </h1>
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-1 font-semibold">
                      Food Title
                    </label>
                    <input
                      type="text"
                      name="FoodTitle"
                      defaultValue={selectedFood.FoodTitle}
                      required
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold">
                      Food Image URL
                    </label>
                    <input
                      type="url"
                      name="FoodImage"
                      defaultValue={selectedFood.FoodImage}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold">Quantity</label>
                    <input
                      type="text"
                      name="Quantity"
                      defaultValue={selectedFood.Quantity}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      name="ExpiryDate"
                      defaultValue={selectedFood.ExpiryDate?.slice(0, 10)}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold">
                      User Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={selectedFood.email || ""}
                      readOnly
                      className="input input-bordered w-full bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold">Category</label>
                    <select
                      name="category"
                      defaultValue={selectedFood.category}
                      className="select select-bordered w-full"
                      required
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
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-1 font-semibold">
                      Description
                    </label>
                    <textarea
                      name="Description"
                      defaultValue={selectedFood.Description}
                      className="textarea textarea-bordered w-full"
                      rows={4}
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-4 transition-transform hover:scale-105"
                >
                  Save Changes
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MyFood;
