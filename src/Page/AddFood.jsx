import React, { use, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { format } from "date-fns";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router";
import { 
  FaUtensils, 
  FaImage, 
  FaWeight, 
  FaCalendarAlt, 
  FaTag, 
  FaUser, 
  FaFileAlt,
  FaPlus,
  FaArrowLeft,
  FaCheckCircle,
  FaClock,
  FaCamera,
  FaSave
} from "react-icons/fa";

const AddFood = () => {
  const { User } = use(AuthContext);
  const [today] = useState(format(new Date(), "yyyy-MM-dd"));
  const [formData, setFormData] = useState({
    FoodTitle: "",
    FoodImage: "",
    Quantity: "",
    ExpiryDate: "",
    category: "Fruits 🍎🍌",
    Description: ""
  });
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Handle image preview
    if (name === "FoodImage" && value) {
      setImagePreview(value);
    }
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const foodData = {
      ...formData,
      AddedDate: today,
      email: User?.email
    };

    try {
      const response = await axios.post("https://food-tracker-server-six.vercel.app/foods", foodData, {
        headers: {
          Authorization: `Bearer ${User?.accessToken}`,
        },
      });

      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "🎉 Food Added Successfully!",
          text: "Your food item has been added to your inventory.",
          showConfirmButton: false,
          timer: 2000,
          background: '#f0f9ff',
          color: '#1e40af'
        });
        navigate("/dashboard/myfood");
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops! Something went wrong",
        text: "Please try again later.",
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { value: "Fruits 🍎🍌", icon: "🍎", color: "from-red-400 to-pink-400" },
    { value: "Vegetables 🥦🥕", icon: "🥦", color: "from-green-400 to-emerald-400" },
    { value: "Dairy 🥛🧀", icon: "🥛", color: "from-blue-400 to-cyan-400" },
    { value: "Sweets & Snacks 🍩🍫", icon: "🍩", color: "from-purple-400 to-pink-400" },
    { value: "Proteins 🍗🥩", icon: "🍗", color: "from-orange-400 to-red-400" },
    { value: "Fast Food & Junk Food 🍕🍔", icon: "🍕", color: "from-yellow-400 to-orange-400" },
    { value: "Grains 🍚🍞", icon: "🍚", color: "from-amber-400 to-yellow-400" },
    { value: "Beverages ☕🥤", icon: "☕", color: "from-brown-400 to-orange-400" }
  ];

  const FormField = ({ icon: Icon, label, children, required = false }) => ( // eslint-disable-line react/prop-types
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md">
          <Icon className="text-white text-xs" />
        </div>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
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
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4"
              >
                <FaPlus className="text-2xl" />
              </motion.div>
              <h1 className="text-4xl font-black mb-2">Add New Food Item</h1>
              <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed">
                Keep track of your food inventory by adding new items with expiration dates, 
                categories, and detailed information to prevent waste and stay organized.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleAddFood} className="space-y-8">
              {/* Image Preview Section */}
              {imagePreview && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="inline-block relative">
                    <img
                      src={imagePreview}
                      alt="Food preview"
                      className="w-32 h-32 object-cover rounded-2xl shadow-lg border-4 border-white"
                      onError={() => setImagePreview("")}
                    />
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                      <FaCheckCircle className="text-sm" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Image Preview</p>
                </motion.div>
              )}

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Food Title */}
                <FormField icon={FaUtensils} label="Food Title" required>
                  <input
                    type="text"
                    name="FoodTitle"
                    value={formData.FoodTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter the name of your food item"
                    required
                  />
                </FormField>

                {/* Food Image */}
                <FormField icon={FaImage} label="Food Image URL" required>
                  <div className="relative">
                    <input
                      type="url"
                      name="FoodImage"
                      value={formData.FoodImage}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                    <FaCamera className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </FormField>

                {/* Quantity */}
                <FormField icon={FaWeight} label="Quantity" required>
                  <input
                    type="text"
                    name="Quantity"
                    value={formData.Quantity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="e.g., 2 pieces, 500g, 1 bottle"
                    required
                  />
                </FormField>

                {/* Expiry Date */}
                <FormField icon={FaClock} label="Expiry Date" required>
                  <input
                    type="date"
                    name="ExpiryDate"
                    value={formData.ExpiryDate}
                    onChange={handleInputChange}
                    min={today}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </FormField>

                {/* Added Date */}
                <FormField icon={FaCalendarAlt} label="Added Date">
                  <input
                    type="date"
                    value={today}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                </FormField>

                {/* User Email */}
                <FormField icon={FaUser} label="Added By">
                  <input
                    type="email"
                    value={User?.email || ""}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                </FormField>
              </div>

              {/* Category Selection */}
              <FormField icon={FaTag} label="Category" required>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {categories.map((cat) => (
                    <motion.label
                      key={cat.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 ${
                        formData.category === cat.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={cat.value}
                        checked={formData.category === cat.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="text-2xl mb-2">{cat.icon}</div>
                        <div className="text-xs font-medium text-gray-700">
                          {cat.value.split(' ')[0]}
                        </div>
                      </div>
                      {formData.category === cat.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1"
                        >
                          <FaCheckCircle className="text-sm" />
                        </motion.div>
                      )}
                    </motion.label>
                  ))}
                </div>
              </FormField>

              {/* Description */}
              <FormField icon={FaFileAlt} label="Description">
                <textarea
                  name="Description"
                  value={formData.Description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Add any additional details about this food item..."
                />
              </FormField>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                } text-white`}
              >
                <div className="flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Adding Food...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      Add Food to Inventory
                    </>
                  )}
                </div>
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white"
        >
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <FaCheckCircle />
            💡 Pro Tips for Food Management
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>📅 Check Dates:</strong> Always verify expiry dates before adding items
            </div>
            <div>
              <strong>📸 Good Photos:</strong> Use clear, well-lit images for easy identification
            </div>
            <div>
              <strong>📝 Be Specific:</strong> Include detailed descriptions and exact quantities
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddFood;
