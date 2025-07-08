import React from "react";
import Home from "../Page/Home";
import { Outlet } from "react-router";
import Navber from "../Shared/Navber";

const MainLayout = () => {
  return (
    <>
      <Navber></Navber>
      <Outlet></Outlet>
    </>
  );
};

export default MainLayout;
