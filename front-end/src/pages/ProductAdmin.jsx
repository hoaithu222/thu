import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import Loading from "./Loading";
import ProductCardAdmin from "../components/ProductCardAdmin";
import { Search } from "lucide-react";

export default function ProductAdmin() {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  // Debounce search to prevent too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page,
          limit: 12,
          search: debouncedSearch, // Use debounced search value
        },
      });

      if (response.data.success) {
        setProductData(response.data.data);
        setTotalPageCount(response.data.totalNoPage);
        toast.success("Lấy danh sách sản phẩm thành công");
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.message || "Lấy danh sách sản phẩm thất bại"
        );
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

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handleNext = () => {
    if (page < totalPageCount) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page, debouncedSearch]); // Fetch when page or search changes

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="p-6 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold text-gray-800">
              Upload Product
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>
        </div>
      </div>

      {loading && <Loading />}

      <div className="max-w-7xl mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productData?.map((p, index) => (
            <ProductCardAdmin data={p} key={index + "product"} />
          ))}
        </div>

        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg ${
              page === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            } transition-colors duration-200`}
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {page} of {totalPageCount}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPageCount}
            className={`px-4 py-2 rounded-lg ${
              page === totalPageCount
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            } transition-colors duration-200`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
