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
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardHome from "../Page/DashboardHome";
import ContactUs from "../Page/ContactUs";
import PrivacyInfo from "../Page/PrivacyInfo";
import ServiceTerms from "../Page/ServiceTerms";
import DataInfo from "../Page/DataInfo";

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
        path: "/ContactUs",
        Component: ContactUs,
      },
      {
        path: "/privacy-policy",
        Component: PrivacyInfo,
      },
      {
        path: "/terms-of-service",
        Component: ServiceTerms,
      },
      {
        path: "/cookie-policy",
        Component: DataInfo,
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
  {
        path: "/dashboard",
        element: <PrivateRoutes>
          <DashboardLayout></DashboardLayout>
        </PrivateRoutes>,
        children: [

          {
            index:true,
            element: <DashboardHome />
          },
          {
            path: "/dashboard/home",
            element: <DashboardHome />
          },
                {
        path: "/dashboard/addfood",
        element: (
          <PrivateRoutes>
            <AddFood></AddFood>
          </PrivateRoutes>
        ),
      },      {
        path: "/dashboard/myfood",
        element: (
          <PrivateRoutes>
            <MyFood></MyFood>
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/myprofile",
        element: (
          <PrivateRoutes>
            <MyProfile></MyProfile>
          </PrivateRoutes>
        ),
      },


        ]
      },


]);
