import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Page/Home";
import Registration from "../Page/Registration";
import Login from "../Page/Login";
import Fridge from "../Page/Fridge";
import MyProfile from "../Page/MyProfile";
import AddFood from "../Page/AddFood";
import MyFood from "../Page/MyFood";
import FoodDetails from "../Page/FoodDetails";
import NotFound from "../Page/NotFound";
import PrivateRoutes from "./PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "*",
        Component: NotFound,
      },
      {
        path: "/registration",
        Component: Registration,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/Fridge",
        Component: Fridge,
      },
      {
        path: "/myprofile",
        element: (
          <PrivateRoutes>
            <MyProfile></MyProfile>
          </PrivateRoutes>
        ),
      },
      {
        path: "/addfood",
        element: (
          <PrivateRoutes>
            <AddFood></AddFood>
          </PrivateRoutes>
        ),
      },
      {
        path: "/myfood",
        element: (
          <PrivateRoutes>
            <MyFood></MyFood>
          </PrivateRoutes>
        ),
      },
      {
        path: "/fooddetails/:id",
        loader: ({ params }) =>
          fetch(
            `https://food-tracker-server-six.vercel.app/fooddetails/${params.id}`
          ),
        element: (
          <PrivateRoutes>
            <FoodDetails></FoodDetails>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
