import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcAddImage } from "react-icons/fc";
import colors from "../styles/colors";
import LoadingBtn from "./LoadingBtn";
import uploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addCategory } from "../store/productSlice";

export default function UploadCategoryModel({ onClose }) {
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  const [errors, setErrors] = useState({
    name: "",
  });
  const [loadingImage, setLoadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const validateName = () => {
    if (!data.name.trim()) {
      setErrors((prev) => ({ ...prev, name: "Vui lòng nhập tên danh mục" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, name: "" }));
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "name") {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!validateName()) {
      toast.error("Vui lòng nhập tên danh mục trước khi tải ảnh lên");
      return;
    }

    setLoadingImage(true);
    try {
      const uploadImageEl = await uploadImage(file);
      const urlImage = uploadImageEl.data.data.url;
      setData((prev) => ({
        ...prev,
        image: urlImage,
      }));
    } catch (error) {
      toast.error("Lỗi khi tải ảnh lên");
    } finally {
      setLoadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateName()) return;

    try {
      setLoading(true);
      const response = await Axios({ ...SummaryApi.addCategory, data: data });
      if (response.data.success) {
        toast.success("Thêm danh mục thành công");
        dispatch(addCategory(response.data.data));
        setData({
          name: "",
          image: "",
        });

        onClose();
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Thêm danh mục thất bại");
      } else if (error.request) {
        toast.error("Lỗi kết nối. Vui lòng kiểm tra lại.");
      } else {
        toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center px-4 md:px-52 lg:px-72">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-2xl text-gray-800">
            Thêm Danh Mục
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoClose size={24} className="text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="categoryName"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Tên danh mục
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FcLikePlaceholder className="h-5 w-5" />
              </div>
              <input
                type="text"
                name="name"
                id="categoryName"
                placeholder="Nhập tên danh mục"
                value={data.name}
                onChange={handleChange}
                className={`pl-10 w-full px-4 py-3 bg-gray-50 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all duration-300`}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="categoryImage"
              className="text-lg font-medium text-gray-700 mb-2  flex items-center gap-2 cursor-pointer hover:text-gray-900 transition-colors"
            >
              <FcAddImage size={32} className="animate-bounce" />
              <span>Tải ảnh lên</span>
            </label>
            <div className="mt-2">
              <div className="w-36 h-36 bg-gray-50 border border-gray-300 rounded-xl overflow-hidden flex items-center justify-center">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="Category preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-gray-500 text-center text-sm">
                    {loadingImage ? "Đang tải ảnh..." : "Chưa có ảnh"}
                  </p>
                )}
              </div>
              <input
                type="file"
                name="image"
                id="categoryImage"
                accept="image/*"
                className="hidden"
                onChange={handleUploadImage}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || loadingImage}
            className={`w-full py-3 px-4 font-medium text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none ${
              loading || loadingImage
                ? "bg-gray-400"
                : colors.button.gradientFrostToFlame
            }`}
          >
            {loading ? <LoadingBtn /> : "Thêm danh mục"}
          </button>
        </form>
      </div>
    </div>
  );
}
