import React, { useEffect, useState } from "react";
import { FcAddImage, FcLikePlaceholder } from "react-icons/fc";
import { IoAddCircle } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import toast from "react-hot-toast";
import { MdDescription } from "react-icons/md";
import ViewImage from "../components/ViewImage";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdPriceChange } from "react-icons/md";
import { BiSolidDiscount } from "react-icons/bi";
import { HiOutlineNumberedList } from "react-icons/hi2";
import colors from "../styles/colors";
import LoadingBtn from "../components/LoadingBtn";
import AddFiledComponents from "../components/AddFiledComponents";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

export default function UploadProduct() {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });
  const [loadingImage, setLoadingImage] = useState(false);
  const [ViewImageURL, setViewImageURL] = useState("");
  const [OpenViewImage, setOpenViewImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const allCategory = useSelector((state) => state.product.allCategory);
  const subCategory = useSelector((state) => state.product.subCategory);

  const [openAddFiled, setOpenAddFiled] = useState(false);
  const [fieldName, setFieldName] = useState("");
  console.log("Category", allCategory);
  console.log("SubCategory", subCategory);
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoadingImage(true);
    try {
      const uploadImageEl = await uploadImage(file);
      const urlImage = uploadImageEl.data.data.url;
      setData((prev) => ({
        ...prev,
        image: [...prev.image, urlImage],
      }));
    } catch (error) {
      toast.error("Lỗi khi tải ảnh lên", error);
    } finally {
      setLoadingImage(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleDeleteImage = (_index) => {
    const newImage = data.image.filter((_, index) => index !== _index);
    setData((preve) => {
      return {
        ...preve,
        image: newImage,
      };
    });
  };
  // useEffect(() => {
  //   setData((preve) => {
  //     return {
  //       ...preve,
  //       category: allCategory,
  //     };
  //   });
  //   setData((preve) => {
  //     return {
  //       ...preve,
  //       subCategory: subCategory,
  //     };
  //   });
  // }, [allCategory, subCategory]);
  const handleDeleteCategorySelected = (id) => {
    const newCategory = data.category.filter((category) => category._id !== id);
    setData((preve) => {
      return {
        ...preve,
        category: newCategory,
      };
    });
  };
  const handleDeleteSubCategorySelected = (id) => {
    const newSubCategory = data.subCategory.filter(
      (subCategory) => subCategory._id !== id
    );
    setData((preve) => {
      return {
        ...preve,
        subCategory: newSubCategory,
      };
    });
  };
  const handleAddField = () => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOpenAddFiled(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({ ...SummaryApi.createProduct, data: data });
      if (response.data.success) {
        toast.success("Thêm sản phảm thành công");
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
      }
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Thêm danh mục sthất bại");
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
    <section>
      <div className="p-4 bg-white   flex relative">
        <h2 className="text-3xl font-semibold">Upload Product</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="productName"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Tên sản phẩm
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FcLikePlaceholder className="h-5 w-5" />
              </div>
              <input
                type="text"
                name="name"
                id="productName"
                placeholder="Nhập tên sản phẩm"
                value={data.name}
                onChange={handleChange}
                required
                className={`pl-10 w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all duration-300`}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700 mb-3"
            >
              Mô tả sản phẩm
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-start pt-3 pointer-events-none">
                <MdDescription className="h-6 w-6 text-pink-400 group-focus-within:text-pink-500 transition-colors duration-200" />
              </div>
              <textarea
                id="description"
                name="description"
                placeholder="Nhập mô tả sản phẩm"
                value={data.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
       focus:ring-2 focus:ring-pink-100 focus:border-pink-400
       hover:border-pink-300
       outline-none transition-all duration-200
       placeholder:text-gray-400 text-gray-700
       resize-y min-h-[120px]"
              />
            </div>
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
              <div className="w-full h-36  bg-gray-50 border border-gray-300 rounded-xl overflow-hidden flex items-center  gap-3">
                {data.image[0] ? (
                  data.image.map((img, index) => (
                    <div key={img + index} className="w-36 relative">
                      <img
                        src={img}
                        alt="Category preview"
                        className="w-full h-full object-cover"
                        onClick={() => {
                          setViewImageURL(img);
                          setOpenViewImage(true);
                        }}
                      />
                      <IoClose
                        className="text-red-500  text-3xl absolute top-0 right-0 z-50 cursor-pointer"
                        onClick={() => handleDeleteImage(index)}
                      />
                    </div>
                  ))
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

          <div>
            <label
              htmlFor="categoryName"
              className="text-lg font-medium text-gray-700 mb-2  flex items-center gap-2 cursor-pointer hover:text-gray-900 transition-colors"
            >
              Select Category
            </label>
            <div className="border focus-within:border-pink-400 rounded-md">
              {/* display value */}
              <div className="flex items-center flex-wrap gap-3">
                {data?.category?.map((cat, index) => {
                  return (
                    <p
                      key={"cat" + index}
                      className="bg-pink-100 shadow-md flex items-center"
                    >
                      {cat.name}{" "}
                      <span
                        className="text-xl cursor-pointer hover:text-red-400"
                        onClick={() => handleDeleteCategorySelected(cat._id)}
                      >
                        <IoClose size={24} className="text-red-400" />
                      </span>
                    </p>
                  );
                })}
              </div>

              {/* select category */}
              <select
                className="bg-blue-50 border p-3 w-full rounded-lg outline-none"
                onChange={(e) => {
                  const value = e.target.value;
                  console.log("e", e.target.value);
                  const categoryDetails = allCategory.find(
                    (el) => el._id === value
                  );
                  setData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, categoryDetails],
                    };
                  });
                }}
              >
                <option value={""}>Select Category</option>
                {allCategory.map((category, index) => {
                  return (
                    <option key={index + category} value={category?._id}>
                      {category?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="categoryName"
              className="text-lg font-medium text-gray-700 mb-2  flex items-center gap-2 cursor-pointer hover:text-gray-900 transition-colors"
            >
              Select Sub Category
            </label>
            <div className="border focus-within:border-pink-400 rounded-md">
              {/* display value */}
              <div className="flex items-center flex-wrap gap-3  ">
                {data?.subCategory?.map((cat, index) => {
                  return (
                    <p
                      key={"cat" + index}
                      className="bg-pink-100 shadow-md flex items-center "
                    >
                      {cat.name}{" "}
                      <span
                        className="text-xl cursor-pointer hover:text-red-400"
                        onClick={() => handleDeleteSubCategorySelected(cat._id)}
                      >
                        <IoClose size={24} className="text-red-400" />
                      </span>
                    </p>
                  );
                })}
              </div>

              {/* select category */}
              <select
                className="bg-blue-50  p-3 w-full rounded-lg outline-none   "
                onChange={(e) => {
                  const value = e.target.value;
                  console.log("e", e.target.value);
                  const subCategoryDetails = subCategory.find(
                    (el) => el._id === value
                  );
                  setData((preve) => {
                    return {
                      ...preve,
                      subCategory: [...preve.subCategory, subCategoryDetails],
                    };
                  });
                }}
              >
                <option value={""}>Select Sub Category</option>
                {subCategory.map((sub, index) => {
                  return (
                    <option key={index + sub} value={sub?._id}>
                      {sub?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="productStock"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Nhập số lượng sản phẩm
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineNumberedList className="h-5 w-5 text-green-400 cursor-pointer" />
              </div>
              <input
                type="number"
                name="stock"
                id="productStock"
                placeholder="Nhập số lượng sản phẩm"
                value={data.stock}
                onChange={handleChange}
                required
                className={`pl-10 w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 outline-none transition-all duration-300`}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="productUnit"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Nhập đơn vị
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineNumberedList className="h-5 w-5 text-green-400 cursor-pointer" />
              </div>
              <input
                type="text"
                name="unit"
                id="productUnit"
                placeholder="Nhập đơn vị"
                value={data.unit}
                onChange={handleChange}
                required
                className={`pl-10 w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 outline-none transition-all duration-300`}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="productPrice"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Nhập giá sản phẩm
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdPriceChange className="h-5 w-5 text-red-400 cursor-pointer" />
              </div>
              <input
                type="number"
                name="price"
                id="productPrice"
                placeholder="Nhập giá sản phẩm"
                value={data.price}
                onChange={handleChange}
                required
                className={`pl-10 w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 outline-none transition-all duration-300`}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="productDiscount"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Nhập discount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BiSolidDiscount className="h-5 w-5 text-pink-400 cursor-pointer" />
              </div>
              <input
                type="number"
                name="discount"
                id="productDiscount"
                placeholder="Nhập discount"
                value={data.discount}
                onChange={handleChange}
                className={`pl-10 w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 outline-none transition-all duration-300`}
              />
            </div>
          </div>
          {/* and more file */}
          <div>
            {Object?.keys(data?.more_details)?.map((k, index) => {
              return (
                <div key={index + "da"}>
                  <label
                    htmlFor={k}
                    className="block text-lg font-medium text-gray-700 mb-2"
                  >
                    {k}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FcLikePlaceholder className="h-5 w-5 text-pink-400 cursor-pointer" />
                    </div>
                    <input
                      type="text"
                      name="discount"
                      id="k"
                      value={data?.more_details[k]}
                      onChange={(e) => {
                        const value = e.target.value;
                        setData((preve) => {
                          return {
                            ...preve,
                            more_details: {
                              ...preve.more_details,
                              [k]: value,
                            },
                          };
                        });
                      }}
                      className={`pl-10 w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-400 outline-none transition-all duration-300`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className={`bg-gray-300 hover:bg-white px-3 py-1 w-32 mt-3 border ${colors.button.gradientCyanToIndigo} rounded-lg cursor-pointer`}
            onClick={() => setOpenAddFiled(true)}
          >
            Add Fields
          </div>
          <div className="mt-3">
            <button
              type="submit"
              disabled={loading || loadingImage}
              className={`w-full py-3 px-4 font-medium text-white rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none ${
                loading || loadingImage
                  ? "bg-gray-400"
                  : colors.button.gradientFrostToFlame
              }`}
            >
              {loading ? <LoadingBtn /> : "Thêm sản phẩm"}
            </button>
          </div>
        </form>
      </div>
      {ViewImageURL && OpenViewImage && (
        <ViewImage close={() => setOpenViewImage(false)} url={ViewImageURL} />
      )}
      {openAddFiled && (
        <AddFiledComponents
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          submit={handleAddField}
          close={() => setOpenAddFiled(false)}
        />
      )}
    </section>
  );
}
