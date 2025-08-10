import React, { useEffect, useState, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { Link } from "react-router";
import { 
  FaEye, 
  FaEdit, 
  FaPlus, 
  FaArrowLeft, 
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaClock,
  FaTag,
  FaWeight,
  FaImage,
  FaUser,
  FaFileAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUtensils
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";
import Loading from "../component/Loading";

const MyFood = () => {
  const { User } = React.useContext(AuthContext);
  const token = User?.accessToken;
  const [loading, setLoading] = useState(false);
  const [myFood, setMyFood] = useState([]);
  const [filteredFood, setFilteredFood] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or table

  const backdropRef = useRef(null);

  const fetchMyFood = async () => {
    const email = User?.email;
    if (!email) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/myfoods?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMyFood(res.data);
      setFilteredFood(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyFood();
  }, [User]);

  // Filter and search functionality
  useEffect(() => {
    let filtered = myFood;

    // Filter by category
    if (filterCategory !== "all") {
      filtered = filtered.filter(food => 
        food.category.toLowerCase().includes(filterCategory.toLowerCase())
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(food =>
        food.FoodTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFood(filtered);
  }, [myFood, searchTerm, filterCategory]);

  const getExpiryStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) {
      return { status: 'expired', color: 'text-red-600', bgColor: 'bg-red-100', icon: FaExclamationTriangle };
    } else if (daysUntilExpiry <= 3) {
      return { status: 'expiring', color: 'text-yellow-600', bgColor: 'bg-yellow-100', icon: FaClock };
    } else {
      return { status: 'fresh', color: 'text-green-600', bgColor: 'bg-green-100', icon: FaCheckCircle };
    }
  };

  const openModal = (food) => {
    setSelectedFood(food);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedFood(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedFood = Object.fromEntries(formData.entries());

    try {
      const { data } = await axios.put(
        `http://localhost:3000/myfood/${selectedFood._id}`,
        updatedFood,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "🎉 Food Updated Successfully!",
          text: "Your food item has been updated.",
          showConfirmButton: false,
          timer: 2000,
          background: '#f0f9ff',
          color: '#1e40af'
        });
        fetchMyFood();
        closeModal();
      }
        } catch {
          Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: "Something went wrong. Please try again.",
            confirmButtonColor: '#ef4444'
          });
        }
  };

  const handleDelete = (id, title) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You're about to delete "${title}". This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axios.delete(`http://localhost:3000/myfood/${id}`);
          if (data.deletedCount) {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Your food has been deleted successfully.",
              showConfirmButton: false,
              timer: 2000
            });
            setMyFood(myFood.filter((item) => item._id !== id));
          }
        } catch {
          Swal.fire({
            icon: "error",
            title: "Delete Failed",
            text: "Something went wrong. Please try again."
          });
        }
      }
    });
  };

  const onBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      closeModal();
    }
  };

  const categories = [
    "all", "fruits", "vegetables", "dairy", "sweets", "proteins", "fast food", "grains", "beverages"
  ];

  if (loading) return <Loading />;

  const FoodCard = ({ food, index }) => {
    const expiryInfo = getExpiryStatus(food.ExpiryDate);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
      >
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={food.FoodImage}
            alt={food.FoodTitle}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          
          {/* Status Badge */}
          <div className={`absolute top-3 left-3 flex items-center gap-1 px-2 py-1 ${expiryInfo.bgColor} ${expiryInfo.color} rounded-full text-xs font-semibold`}>
            <expiryInfo.icon className="text-xs" />
            <span className="capitalize">{expiryInfo.status}</span>
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link to={`/fooddetails/${food._id}`}>
              <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200">
                <FaEye className="text-blue-600 text-sm" />
              </button>
            </Link>
            <button 
              onClick={() => openModal(food)}
              className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200"
            >
              <FaEdit className="text-green-600 text-sm" />
            </button>
            <button 
              onClick={() => handleDelete(food._id, food.FoodTitle)}
              className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200"
            >
              <MdDelete className="text-red-600 text-sm" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">
            {food.FoodTitle}
          </h3>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FaTag className="text-blue-500" />
              <span>{food.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaWeight className="text-green-500" />
              <span>{food.Quantity}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-purple-500" />
              <span>Expires: {new Date(food.ExpiryDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Link 
            to="/dashboard"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            <FaArrowLeft />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
          
          <Link 
            to="/dashboard/addfood"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl transition-all duration-300"
          >
            <FaPlus />
            <span>Add New Food</span>
          </Link>
        </motion.div>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
            <FaUtensils className="animate-pulse" />
            <span>MY FOOD COLLECTION</span>
            <FaUtensils className="animate-pulse" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 mb-4">
            My Food Inventory
          </h1>
          
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Manage your personal food collection, track expiration dates, and keep your kitchen organized
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search your foods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FaFilter className="text-gray-500" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                    viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                    viewMode === "table" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                  }`}
                >
                  Table
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            <span>Total: <strong>{myFood.length}</strong> items</span>
            <span>Showing: <strong>{filteredFood.length}</strong> items</span>
            <span>Fresh: <strong>{myFood.filter(f => getExpiryStatus(f.ExpiryDate).status === 'fresh').length}</strong></span>
            <span>Expiring Soon: <strong>{myFood.filter(f => getExpiryStatus(f.ExpiryDate).status === 'expiring').length}</strong></span>
            <span>Expired: <strong>{myFood.filter(f => getExpiryStatus(f.ExpiryDate).status === 'expired').length}</strong></span>
          </div>
        </motion.div>

        {/* Food Grid/List */}
        {filteredFood.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg"
          >
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              {myFood.length === 0 ? "No foods added yet!" : "No foods match your search"}
            </h3>
            <p className="text-gray-500 mb-6">
              {myFood.length === 0 
                ? "Start building your food inventory by adding your first item."
                : "Try adjusting your search terms or filters."
              }
            </p>
            {myFood.length === 0 && (
              <Link 
                to="/dashboard/addfood"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl transition-all duration-300"
              >
                <FaPlus />
                Add Your First Food
              </Link>
            )}
          </motion.div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFood.map((food, index) => (
              <FoodCard key={food._id} food={food} index={index} />
            ))}
          </div>
        ) : (
          /* Responsive Table View */
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden lg:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <tr>
                      <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold">Image</th>
                      <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold">Food Title</th>
                      <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold">Category</th>
                      <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold">Quantity</th>
                      <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold">Expiry Date</th>
                      <th className="px-4 xl:px-6 py-4 text-left text-sm font-semibold">Status</th>
                      <th className="px-4 xl:px-6 py-4 text-center text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredFood.map((food, index) => {
                      const expiryInfo = getExpiryStatus(food.ExpiryDate);
                      return (
                        <motion.tr
                          key={food._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-4 xl:px-6 py-4">
                            <img
                              src={food.FoodImage}
                              alt={food.FoodTitle}
                              className="w-12 h-12 rounded-lg object-cover shadow-sm"
                            />
                          </td>
                          <td className="px-4 xl:px-6 py-4">
                            <div className="font-semibold text-gray-900 truncate max-w-32 xl:max-w-none">{food.FoodTitle}</div>
                          </td>
                          <td className="px-4 xl:px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              <FaTag className="text-xs" />
                              <span className="truncate max-w-16 xl:max-w-none">{food.category.split(' ')[0]}</span>
                            </span>
                          </td>
                          <td className="px-4 xl:px-6 py-4">
                            <span className="text-gray-700 text-sm">{food.Quantity}</span>
                          </td>
                          <td className="px-4 xl:px-6 py-4">
                            <span className="text-gray-700 text-sm">
                              {new Date(food.ExpiryDate).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="px-4 xl:px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 ${expiryInfo.bgColor} ${expiryInfo.color} rounded-full text-xs font-semibold`}>
                              <expiryInfo.icon className="text-xs" />
                              <span className="capitalize hidden xl:inline">{expiryInfo.status}</span>
                            </span>
                          </td>
                          <td className="px-4 xl:px-6 py-4">
                            <div className="flex items-center justify-center gap-1 xl:gap-2">
                              <Link to={`/fooddetails/${food._id}`}>
                                <button className="p-1.5 xl:p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors duration-200">
                                  <FaEye className="text-xs xl:text-sm" />
                                </button>
                              </Link>
                              <button 
                                onClick={() => openModal(food)}
                                className="p-1.5 xl:p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors duration-200"
                              >
                                <FaEdit className="text-xs xl:text-sm" />
                              </button>
                              <button 
                                onClick={() => handleDelete(food._id, food.FoodTitle)}
                                className="p-1.5 xl:p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors duration-200"
                              >
                                <MdDelete className="text-xs xl:text-sm" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden space-y-4 p-4">
              {filteredFood.map((food, index) => {
                const expiryInfo = getExpiryStatus(food.ExpiryDate);
                return (
                  <motion.div
                    key={food._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200"
                  >
                    {/* Header Row */}
                    <div className="flex items-start gap-4 mb-3">
                      <img
                        src={food.FoodImage}
                        alt={food.FoodTitle}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shadow-sm flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-gray-900 mb-1 truncate">
                          {food.FoodTitle}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            <FaTag className="text-xs" />
                            <span className="truncate max-w-20 sm:max-w-none">{food.category.split(' ')[0]}</span>
                          </span>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 ${expiryInfo.bgColor} ${expiryInfo.color} rounded-full text-xs font-semibold`}>
                            <expiryInfo.icon className="text-xs" />
                            <span className="capitalize">{expiryInfo.status}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <FaWeight className="text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">Quantity:</span>
                        <span className="font-medium text-gray-900 truncate">{food.Quantity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-purple-500 flex-shrink-0" />
                        <span className="text-gray-600">Expires:</span>
                        <span className="font-medium text-gray-900 text-xs sm:text-sm">
                          {new Date(food.ExpiryDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200">
                      <Link to={`/fooddetails/${food._id}`}>
                        <button className="flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors duration-200 text-sm font-medium">
                          <FaEye className="text-xs" />
                          <span className="hidden sm:inline">View</span>
                        </button>
                      </Link>
                      <button 
                        onClick={() => openModal(food)}
                        className="flex items-center gap-2 px-3 py-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors duration-200 text-sm font-medium"
                      >
                        <FaEdit className="text-xs" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(food._id, food.FoodTitle)}
                        className="flex items-center gap-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors duration-200 text-sm font-medium"
                      >
                        <MdDelete className="text-xs" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Edit Modal */}
        <AnimatePresence>
          {modalOpen && selectedFood && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              ref={backdropRef}
              onClick={onBackdropClick}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaEdit className="text-xl" />
                      <h2 className="text-2xl font-bold">Edit Food Item</h2>
                    </div>
                    <button
                      onClick={closeModal}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Food Title */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <FaUtensils className="text-blue-500" />
                          Food Title
                        </label>
                        <input
                          type="text"
                          name="FoodTitle"
                          defaultValue={selectedFood.FoodTitle}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* Food Image */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <FaImage className="text-green-500" />
                          Food Image URL
                        </label>
                        <input
                          type="url"
                          name="FoodImage"
                          defaultValue={selectedFood.FoodImage}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* Quantity */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <FaWeight className="text-purple-500" />
                          Quantity
                        </label>
                        <input
                          type="text"
                          name="Quantity"
                          defaultValue={selectedFood.Quantity}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* Expiry Date */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <FaClock className="text-red-500" />
                          Expiry Date
                        </label>
                        <input
                          type="date"
                          name="ExpiryDate"
                          defaultValue={selectedFood.ExpiryDate?.slice(0, 10)}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* User Email */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <FaUser className="text-indigo-500" />
                          User Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={selectedFood.email}
                          readOnly
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                        />
                      </div>

                      {/* Category */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <FaTag className="text-orange-500" />
                          Category
                        </label>
                        <select
                          name="category"
                          defaultValue={selectedFood.category}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Fruits 🍎🍌">Fruits 🍎🍌</option>
                          <option value="Vegetables 🥦🥕">Vegetables 🥦🥕</option>
                          <option value="Dairy 🥛🧀">Dairy 🥛🧀</option>
                          <option value="Sweets & Snacks 🍩🍫">Sweets & Snacks 🍩🍫</option>
                          <option value="Proteins 🍗🥩">Proteins 🍗🥩</option>
                          <option value="Fast Food & Junk Food 🍕🍔">Fast Food & Junk Food 🍕🍔</option>
                          <option value="Grains 🍚🍞">Grains 🍚🍞</option>
                          <option value="Beverages ☕🥤">Beverages ☕🥤</option>
                        </select>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                        <FaFileAlt className="text-gray-500" />
                        Description
                      </label>
                      <textarea
                        name="Description"
                        defaultValue={selectedFood.Description}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Add any additional details..."
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors duration-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all duration-300"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyFood;
