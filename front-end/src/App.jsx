import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetials";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";
import { setAllCategory, setAllSubCategory } from "./store/productSlice";

export default function App() {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    console.log(userData);
    dispatch(setUserDetails(userData.data.data));
  };
  const fetchCategory = async () => {
    try {
      const response = await Axios({ ...SummaryApi.getCategory });

      if (response.data.success) {
        dispatch(setAllCategory(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      if (response.data.success) {
        dispatch(setAllSubCategory(response.data.data));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
  }, []);
  return (
    <>
      <Header />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster className="flex justify-center" />
    </>
  );
}
