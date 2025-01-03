import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import { LogIn } from "lucide-react";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuPage from "../pages/UserMenuPage";
import Dashboard from "../Layout/Dashboard";
import Profile from "../pages/Profile";
import Address from "../pages/Address";
import MyOrder from "../pages/MyOrder";
import Category from "../pages/Category";
import SubCategory from "../pages/SubCategory";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import AdminPermissions from "../Layout/AdminPermissions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "verification-otp",
        element: <OtpVerification />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "user-menu",
        element: <UserMenuPage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "myOrder",
            element: <MyOrder />,
          },
          {
            path: "category",
            element: (
              <AdminPermissions>
                <Category />
              </AdminPermissions>
            ),
          },
          {
            path: "subcategory",
            element: (
              <AdminPermissions>
                <SubCategory />
              </AdminPermissions>
            ),
          },
          {
            path: "upload-product",
            element: (
              <AdminPermissions>
                <UploadProduct />
              </AdminPermissions>
            ),
          },
          {
            path: "product",
            element: (
              <AdminPermissions>
                <ProductAdmin />
              </AdminPermissions>
            ),
          },
        ],
      },
    ],
  },
]);
export default router;
