import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { format, parseISO } from "date-fns";
import { FaClock, FaEye, FaPlus, FaUtensils, FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const RecentFoods = () => {
  const { User } = useContext(AuthContext);
  const [recentFoods, setRecentFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentFoods = async () => {
      if (!User?.email) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/myfoods?email=${User.email}`,
          {
            headers: {
              Authorization: `Bearer ${User.accessToken}`,
            },
          }
        );

        // Sort by creation date (assuming _id contains timestamp) and take first 5
        const sortedFoods = response.data
          .sort((a, b) => new Date(b._id) - new Date(a._id))
          .slice(0, 5);

        setRecentFoods(sortedFoods);
      } catch (error) {
        console.error("Error fetching recent foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentFoods();
  }, [User]);

  if (loading) {
    return (
      <div className="w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 text-6xl">⏰</div>
          <div className="absolute top-20 right-20 text-4xl">🍽️</div>
          <div className="absolute bottom-20 left-20 text-5xl">📋</div>
          <div className="absolute bottom-10 right-10 text-3xl">✨</div>
        </div>

        <div className="w-11/12 md:w-10/12 mx-auto relative z-10 px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-block animate-pulse bg-gradient-to-r from-blue-300 to-purple-300 h-8 sm:h-10 md:h-12 w-48 sm:w-64 md:w-80 rounded-2xl mb-4"></div>
            <div className="animate-pulse bg-gradient-to-r from-indigo-200 to-blue-200 h-4 sm:h-5 md:h-6 w-64 sm:w-80 md:w-96 mx-auto rounded-xl"></div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-blue-100">
            <div className="space-y-4 md:space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 animate-pulse bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl md:rounded-2xl">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-200 to-purple-200 rounded-xl md:rounded-2xl flex-shrink-0"></div>
                  <div className="flex-1 w-full">
                    <div className="h-4 sm:h-5 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-xl mb-2 sm:mb-3 w-3/4"></div>
                    <div className="h-3 sm:h-4 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-lg mb-2 w-1/2"></div>
                    <div className="h-3 bg-gradient-to-r from-purple-200 to-blue-200 rounded-lg w-2/3"></div>
                  </div>
                  <div className="w-20 sm:w-24 h-8 sm:h-10 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-lg md:rounded-xl flex-shrink-0"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 text-6xl">⏰</div>
        <div className="absolute top-20 right-20 text-4xl">🍽️</div>
        <div className="absolute bottom-20 left-20 text-5xl">📋</div>
        <div className="absolute bottom-10 right-10 text-3xl">✨</div>
      </div>

      <div className="w-11/12 md:w-10/12 mx-auto relative z-10 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 shadow-lg">
            <FaClock className="animate-pulse" />
            <span className="hidden sm:inline">RECENTLY ADDED</span>
            <span className="sm:hidden">RECENT</span>
            <FaClock className="animate-pulse" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 mb-4 md:mb-6 drop-shadow-sm">
            Recent Foods
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium px-4">
            Keep track of your latest food additions and manage your inventory with ease. 
            Stay organized and never miss an expiration date!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-blue-100 relative overflow-hidden"
        >
          {/* Card Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 right-4 text-2xl sm:text-3xl md:text-4xl">🍎</div>
            <div className="absolute bottom-4 left-4 text-xl sm:text-2xl md:text-3xl">🥗</div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8 relative z-10 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl md:rounded-2xl text-white shadow-lg">
                <FaUtensils size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Your Recent Foods</h3>
                <p className="text-sm sm:text-base text-gray-600">Latest additions to your inventory</p>
              </div>
            </div>
            
            <Link
              to="/Fridge"
              className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl md:rounded-2xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
            >
              <span className="hidden sm:inline">View All</span>
              <span className="sm:hidden">All</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={12} />
            </Link>
          </div>

          {recentFoods.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12 md:py-16 relative z-10"
            >
              <div className="text-6xl sm:text-7xl md:text-8xl mb-4 md:mb-6">🍽️</div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">No Foods Added Yet</h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-6 md:mb-8">Start building your food inventory today!</p>
            </motion.div>
          ) : (
            <div className="space-y-4 md:space-y-6 relative z-10">
              {recentFoods.map((food, index) => (
                <motion.div
                  key={food._id}
                  initial={{ opacity: 0, x: -50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-xl md:rounded-2xl bg-gradient-to-r from-white to-blue-50 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 shadow-lg hover:shadow-2xl border border-blue-100 hover:border-blue-200 cursor-pointer relative overflow-hidden"
                >
                  {/* Hover Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Food Image */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="relative">
                      <img
                        src={food.FoodImage}
                        alt={food.FoodTitle}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl md:rounded-2xl object-cover border-2 border-white shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                      />
                      <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Food Details */}
                  <div className="flex-1 min-w-0 relative z-10 w-full sm:w-auto">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors duration-300 mb-2">
                      {food.FoodTitle}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1">
                        <FaUtensils size={10} className="sm:w-3 sm:h-3" />
                        <span className="truncate max-w-20 sm:max-w-none">{food.category}</span>
                      </span>
                      <span className="text-gray-600 font-medium text-xs sm:text-sm">Qty: {food.Quantity}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                      <FaCalendarAlt size={10} className="sm:w-3 sm:h-3" />
                      <span>Expires: {format(parseISO(food.ExpiryDate), "MMM dd, yyyy")}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="relative z-10 w-full sm:w-auto flex-shrink-0">
                    <Link
                      to={`/fooddetails/${food._id}`}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl md:rounded-2xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform group-hover:scale-105 opacity-80 group-hover:opacity-100 text-sm sm:text-base w-full sm:w-auto"
                    >
                      <FaEye size={12} className="sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">View Details</span>
                      <span className="sm:hidden">View</span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RecentFoods;
