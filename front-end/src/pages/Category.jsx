import React, { useEffect, useState } from "react";
import colors from "../styles/colors";
import UploadCategoryModel from "../components/UploadCategoryModel";
import { IoAddCircle } from "react-icons/io5";

import SummaryApi from "../common/SummaryApi.js";
import Axios from "../utils/Axios.js";
import toast from "react-hot-toast";

import NoData from "../components/NoData.jsx";
import EditCategory from "../components/EditCategory.jsx";
import ConfirmBox from "../components/ConfirmBox.jsx";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoryId } from "../store/productSlice.js";

export default function Category() {
  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [deleteCategory, setDeleteCategory] = useState({
    _id: "",
  });
  const [categoryEdit, setCategoryEdit] = useState({
    _id: "",
    name: "",
    image: "",
  });
  const dispatch = useDispatch();
  const allCategory = useSelector((state) => state.product.allCategory);
  console.log("allCategory", allCategory);
  useEffect(() => {
    setCategory(allCategory);
  }, [allCategory]);

  // const fetchCategory = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await Axios({ ...SummaryApi.getCategory });
  //     if (response.data.success) {
  //       setLoading(false);
  //       setCategory(response.data.data);

  //       toast.success("Lấy danh sách sản phẩm thành công");
  //     }
  //     console.log(response);
  //   } catch (error) {
  //     if (error.response) {
  //       toast.error(error.response.data.message || "Thêm danh mục thất bại");
  //     } else if (error.request) {
  //       toast.error("Lỗi kết nối. Vui lòng kiểm tra lại.");
  //     } else {
  //       toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
  //     }
  //     console.error("Error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleEditCategory = (item) => {
    setCategoryEdit({
      _id: item._id,
      name: item.name,
      image: item.image,
    });
    setOpenEdit(true);
  };
  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory,
      });
      console.log(response);
      setLoading(true);
      if (response.data.success) {
        toast.success(response.data.message);

        dispatch(deleteCategoryId(deleteCategory));
        setOpenConfirm(false);
        setLoading(false); //  Đóng ConfirmBox
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed");
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
      console.error("Login error:", error);
    }
  };
  // useEffect(() => {
  //   fetchCategory();
  // }, []);

  return (
    <section>
      <div className="p-4 bg-white   flex relative">
        <h2 className="text-3xl font-semibold">Category</h2>
        <button
          className={`ml-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300 flex items-center `}
          onClick={() => setOpenCategory(true)}
        >
          <IoAddCircle className="text-2xl animate-bounce" /> Add Category
        </button>
      </div>
      <div className="">
        {!category[0] && !loading && (
          <NoData
            message="Hiện tại không có danh mục nào"
            subMessage="Vui lòng thêm danh mục"
          />
        )}

        <main className="max-w-7xl mx-auto px-4 py-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : !category[0] ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Hiện tại không có danh mục nào
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Vui lòng thêm danh mục
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {category.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-t-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-medium text-gray-900 truncate mb-4">
                      {item.name}
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCategory(item)}
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-md shadow-md hover:shadow-lg hover:from-cyan-600 hover:to-blue-600 transition duration-300"
                      >
                        Edit
                      </button>
                      <button
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-medium rounded-md shadow-md hover:shadow-lg hover:from-red-600 hover:to-orange-600 transition duration-300"
                        onClick={() => {
                          setOpenConfirm(true);
                          setDeleteCategory(item);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        {openCategory && (
          <UploadCategoryModel onClose={() => setOpenCategory(false)} />
        )}
        {openEdit && (
          <EditCategory
            dataCategoryId={categoryEdit}
            onClose={() => setOpenEdit(false)}
            // fetchData={fetchCategory}
          />
        )}
        {openConfirm && (
          <ConfirmBox
            cancel={() => setOpenConfirm(false)}
            confirm={handleDeleteCategory}
            close={() => setOpenConfirm(false)}
          />
        )}
      </div>
    </section>
  );
}
