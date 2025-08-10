import React from "react";
import Banner from "../component/Banner";
import FeaturedFoods from "../component/FeaturedFoods";
import RecentFoods from "../component/RecentFoods";
import NearlyExpire from "../component/NearlyExpire";
import ExpiredFoods from "../component/ExpiredFoods";
import ExtraSection from "../component/ExtraSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Banner></Banner>
      </section>

      {/* Featured Foods Section */}
      <section className="bg-white dark:bg-gray-900 transition-colors duration-300">
        <FeaturedFoods></FeaturedFoods>
      </section>

      {/* Recent Foods Section */}
      <section className="bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <RecentFoods></RecentFoods>
      </section>

      {/* Nearly Expire Section */}
      <section className="bg-white dark:bg-gray-900 transition-colors duration-300">
        <NearlyExpire></NearlyExpire>
      </section>

      {/* Expired Foods Section */}
      <section className="bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <ExpiredFoods></ExpiredFoods>
      </section>

      {/* Extra Section (Statistics) */}
      <section className="bg-white dark:bg-gray-900 transition-colors duration-300">
        <ExtraSection></ExtraSection>
      </section>
    </div>
  );
};

export default Home;
