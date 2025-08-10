import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Link } from "react-router";
import { FaHourglassHalf, FaEye, FaBolt, FaUtensils, FaCalendarAlt, FaChartBar, FaTrophy, FaShieldAlt, FaExclamationTriangle } from "react-icons/fa";

const ExtraSection = () => {
  const [expiringFoods, setExpiringFoods] = useState([]);
  const [stats, setStats] = useState({ total: 0, expired: 0, safe: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load Expiring Soon Foods (3 days)
        const expiringRes = await axios.get("https://food-tracker-server-six.vercel.app/expiring-soon");
        setExpiringFoods(expiringRes.data);

        // Load Statistics
        const statsRes = await axios.get("https://food-tracker-server-six.vercel.app/food-stats");
        setStats(statsRes.data);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Calculate days until expiration
  const getDaysUntilExpiry = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get urgency level based on days remaining
  const getUrgencyLevel = (days) => {
    if (days <= 1) return 'critical';
    if (days <= 2) return 'urgent';
    return 'warning';
  };

  if (loading) {
    return (
      <div className="w-full bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 relative overflow-hidden transition-colors duration-300">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 text-6xl">⏳</div>
          <div className="absolute top-20 right-20 text-4xl">⚡</div>
          <div className="absolute bottom-20 left-20 text-5xl">📊</div>
          <div className="absolute bottom-10 right-10 text-3xl">🏆</div>
        </div>

        <div className="w-11/12 md:w-10/12 mx-auto relative z-10">
          {/* Expiring Soon Loading */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-block animate-pulse bg-gradient-to-r from-amber-300 to-orange-300 h-12 w-80 rounded-2xl mb-4"></div>
              <div className="animate-pulse bg-gradient-to-r from-yellow-200 to-amber-200 h-6 w-96 mx-auto rounded-xl"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse rounded-3xl shadow-2xl bg-white dark:bg-gray-800 p-6 transition-colors duration-300">
                  <div className="bg-gradient-to-br from-amber-200 to-orange-200 dark:from-gray-600 dark:to-gray-700 h-48 rounded-2xl mb-4"></div>
                  <div className="bg-gradient-to-r from-yellow-200 to-amber-200 dark:from-gray-700 dark:to-gray-600 h-6 rounded-xl mb-3"></div>
                  <div className="bg-gradient-to-r from-amber-200 to-yellow-200 dark:from-gray-700 dark:to-gray-600 h-4 rounded-lg mb-2 w-3/4"></div>
                  <div className="bg-gradient-to-r from-orange-200 to-amber-200 dark:from-gray-700 dark:to-gray-600 h-8 rounded-xl w-1/2"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Loading */}
          <div className="animate-pulse bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl transition-colors duration-300">
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-r from-blue-300 to-purple-300 dark:from-gray-600 dark:to-gray-700 h-12 w-80 rounded-2xl mb-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div className="bg-gradient-to-r from-blue-200 to-purple-200 dark:from-gray-600 dark:to-gray-700 h-16 w-16 rounded-full mx-auto mb-4"></div>
                  <div className="bg-gradient-to-r from-purple-200 to-blue-200 dark:from-gray-700 dark:to-gray-600 h-8 w-20 rounded-xl mx-auto mb-2"></div>
                  <div className="bg-gradient-to-r from-blue-200 to-purple-200 dark:from-gray-700 dark:to-gray-600 h-4 w-24 rounded-lg mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 relative overflow-hidden transition-colors duration-300">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 text-6xl">⏳</div>
        <div className="absolute top-20 right-20 text-4xl">⚡</div>
        <div className="absolute bottom-20 left-20 text-5xl">📊</div>
        <div className="absolute bottom-10 right-10 text-3xl">🏆</div>
      </div>

      <div className="w-11/12 md:w-10/12 mx-auto relative z-10">
        {/* Section 1: Expiring Soon (Next 3 Days) */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
            <FaBolt className="animate-pulse" />
            <span>URGENT - 3 DAYS LEFT</span>
            <FaBolt className="animate-pulse" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-500 mb-6 drop-shadow-sm">
            Expiring Soon
          </h2>
          
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium transition-colors duration-300">
            These foods will expire within the next 3 days! Prioritize consuming them 
            to prevent waste and maintain freshness.
          </p>
        </motion.div>

        {expiringFoods.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-100 dark:border-gray-700 mb-16 transition-colors duration-300"
          >
            <div className="text-8xl mb-6">🎯</div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4 transition-colors duration-300">Perfect Timing!</h3>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-6 transition-colors duration-300">No foods are expiring in the next 3 days.</p>
            <p className="text-gray-400 dark:text-gray-500 transition-colors duration-300">Your food management is on point!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {expiringFoods.map((food, index) => {
              const daysLeft = getDaysUntilExpiry(food.ExpiryDate);
              const urgencyLevel = getUrgencyLevel(daysLeft);
              
              return (
                <motion.article
                  key={food._id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.15, duration: 0.7, type: "spring" }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-amber-100 dark:border-gray-700 p-6 flex flex-col cursor-pointer hover:shadow-3xl transition-all duration-500 overflow-hidden"
                >
                  {/* Urgency Border Effect */}
                  <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm ${
                    urgencyLevel === 'critical' ? 'bg-gradient-to-r from-red-400 to-orange-400' :
                    urgencyLevel === 'urgent' ? 'bg-gradient-to-r from-orange-400 to-yellow-400' :
                    'bg-gradient-to-r from-yellow-400 to-amber-400'
                  }`}></div>
                  
                  {/* Urgency Badge */}
                  <div className={`absolute top-4 right-4 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg z-20 transform group-hover:scale-110 transition-transform duration-300 ${
                    urgencyLevel === 'critical' ? 'bg-gradient-to-r from-red-600 to-orange-600' :
                    urgencyLevel === 'urgent' ? 'bg-gradient-to-r from-orange-600 to-yellow-600' :
                    'bg-gradient-to-r from-yellow-600 to-amber-600'
                  }`}>
                    <FaHourglassHalf size={12} className={urgencyLevel === 'critical' ? 'animate-spin' : 'animate-pulse'} />
                    {daysLeft === 1 ? '1 Day Left' : `${daysLeft} Days Left`}
                  </div>

                  {/* Food Image */}
                  <div className="relative rounded-2xl overflow-hidden h-48 mb-6 group-hover:shadow-lg transition-shadow duration-300">
                    <img
                      src={food.FoodImage}
                      alt={food.FoodTitle}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 transition-opacity duration-300 ${
                      urgencyLevel === 'critical' ? 'bg-red-500/20 group-hover:bg-red-500/10' :
                      urgencyLevel === 'urgent' ? 'bg-orange-500/20 group-hover:bg-orange-500/10' :
                      'bg-yellow-500/20 group-hover:bg-yellow-500/10'
                    }`}></div>
                    
                    {/* Floating Action Button */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <Link
                        to={`/fooddetails/${food._id}`}
                        className="bg-white text-amber-600 p-3 rounded-full shadow-lg hover:bg-amber-50 transition-colors duration-200"
                        aria-label={`View details of ${food.FoodTitle}`}
                      >
                        <FaEye size={16} />
                      </Link>
                    </div>
                  </div>

                  {/* Food Title */}
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                    {food.FoodTitle}
                  </h3>

                  {/* Category and Quantity */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 transition-colors duration-300 ${
                      urgencyLevel === 'critical' ? 'bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 text-red-800 dark:text-red-400' :
                      urgencyLevel === 'urgent' ? 'bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 text-orange-800 dark:text-orange-400' :
                      'bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 text-yellow-800 dark:text-yellow-400'
                    }`}>
                      <FaUtensils size={12} />
                      {food.category}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 font-medium text-sm transition-colors duration-300">Qty: {food.Quantity}</span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed flex-grow transition-colors duration-300">
                    {food.Description || "This food item is expiring soon! Make sure to consume it within the next few days to avoid waste."}
                  </p>

                  {/* Footer */}
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 transition-colors duration-300">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                      <FaCalendarAlt size={12} />
                      <span>Expires: {new Date(food.ExpiryDate).toLocaleDateString()}</span>
                    </div>
                    
                    <Link
                      to={`/fooddetails/${food._id}`}
                      className={`inline-flex items-center gap-2 text-white rounded-xl px-4 py-2 shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold text-sm ${
                        urgencyLevel === 'critical' ? 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600' :
                        urgencyLevel === 'urgent' ? 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600' :
                        'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600'
                      }`}
                      aria-label={`See details of ${food.FoodTitle}`}
                    >
                      <FaEye size={14} />
                      View Details
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Section 2: Enhanced Food Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-blue-100 dark:border-gray-700 relative overflow-hidden transition-colors duration-300"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 right-4 text-4xl">📊</div>
            <div className="absolute bottom-4 left-4 text-3xl">📈</div>
          </div>

          <div className="text-center mb-8 relative z-10">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
              <FaChartBar className="animate-pulse" />
              <span>FOOD ANALYTICS</span>
              <FaChartBar className="animate-pulse" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-500 mb-4 drop-shadow-sm">
              Food Statistics
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">Track your food management performance and waste reduction progress</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full text-white mb-4 shadow-lg">
                <FaUtensils size={24} />
              </div>
              <div className="text-4xl font-black text-blue-600 mb-2">
                <CountUp end={stats.total || 0} duration={2} />
              </div>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">Total Foods</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-300">Items in inventory</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-white mb-4 shadow-lg">
                <FaExclamationTriangle size={24} />
              </div>
              <div className="text-4xl font-black text-red-600 mb-2">
                <CountUp end={stats.expired || stats.expire || 0} duration={2} />
              </div>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">Expired Foods</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-300">Items past expiry</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-white mb-4 shadow-lg">
                <FaShieldAlt size={24} />
              </div>
              <div className="text-4xl font-black text-green-600 mb-2">
                <CountUp end={stats.safe || 0} duration={2} />
              </div>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">Safe Foods</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-300">Fresh & healthy</p>
            </motion.div>
          </div>

          {/* Achievement Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-8 text-center relative z-10"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-2xl shadow-lg">
              <FaTrophy size={20} />
              <span className="font-bold">
                {stats.safe > stats.expired ? 'Great Job! More Safe Foods!' : 'Keep Improving Food Management!'}
              </span>
              <FaTrophy size={20} />
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            to="/fridge"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white px-10 py-4 rounded-2xl hover:from-amber-600 hover:via-orange-600 hover:to-red-600 transition-all duration-300 text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1"
          >
            <span className="text-2xl">⚡</span>
            Manage Your Inventory
            <span className="text-2xl">🎯</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ExtraSection;
