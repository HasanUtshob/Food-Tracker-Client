import React from "react";
import { Outlet } from "react-router";
import Navber from "../Shared/Navber";
import Footer from "../Shared/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <Navber />
      
      {/* Main Content */}
      <main className="min-h-screen">
        <Outlet />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default MainLayout;
