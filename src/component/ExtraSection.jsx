import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { AuthContext } from "../Context/AuthContext";
import Loading from "./Loading";

const ExtraSection = () => {
  const [expiringFoods, setExpiringFoods] = useState([]);
  const [stats, setStats] = useState({ total: 0, expired: 0, safe: 0 });
  const { loading, setloading } = use(AuthContext);

  useEffect(() => {
    // Load Expiring Soon Foods (3 days)
    const loadExpiringFoods = async () => {
      const res = await axios.get("http://localhost:3000/expiring-soon");
      setExpiringFoods(res.data);
      setloading(false);
    };

    // Load Statistics
    const loadStats = async () => {
      const res = await axios.get("http://localhost:3000/food-stats");
      setStats(res.data);
      setloading(false);
    };

    loadExpiringFoods();
    loadStats();
  }, [setloading]);

  if (loading) return <Loading></Loading>;

  return (
    <div className="w-11/12 md:w-10/12 mx-auto my-10">
      {/* Section 1: Expiring Soon */}
      <h2 className="text-3xl font-bold mb-6 text-center">
        ⏳ Expiring Soon (Next 3 Days)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {expiringFoods.map((food, index) => (
          <motion.div
            key={food._id}
            className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <img
              src={food.FoodImage}
              alt={food.FoodTitle}
              className="h-32 w-full object-cover rounded mb-2"
            />
            <h3 className="font-semibold text-lg">{food.FoodTitle}</h3>
            <p className="text-sm text-gray-600">
              Expires: {new Date(food.ExpiryDate).toLocaleDateString()}
            </p>
            <span className="inline-block mt-2 text-xs bg-yellow-500 text-white px-2 py-1 rounded">
              Expiring Soon
            </span>
          </motion.div>
        ))}
      </div>

      {/* Section 2: Food Waste Statistics */}
      <motion.div
        className="bg-blue-50 p-6 rounded-xl shadow-lg text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-6">📊 Food Waste Statistics</h2>
        <div className="flex justify-center gap-10 text-lg font-semibold">
          <motion.div whileHover={{ scale: 1.1 }} className="text-blue-600">
            <CountUp end={stats.total} duration={2} />
            <p>Total Foods</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} className="text-red-600">
            <CountUp end={stats.expire} duration={2} />
            <p>Expired Foods</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} className="text-green-600">
            <CountUp end={stats.safe} duration={2} />
            <p>Safe Foods</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExtraSection;
