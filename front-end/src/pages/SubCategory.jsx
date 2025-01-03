import React, { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import DisplayTable from "../components/DisplayTable";
import { createColumnHelper } from "@tanstack/react-table";
import { MdDelete } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import ViewImage from "../components/ViewImage";
import EditSubcategory from "../components/EditSubcategory";
import ConfirmBox from "../components/ConfirmBox";
import { deleteSubCategoryID, setAllSubCategory } from "../store/productSlice";

export default function SubCategory() {
  const [openAddSubCategory, setOpenAddCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const columnHelper = createColumnHelper();
  const [ImageURL, setImageURL] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
  });
  const [deleteSubCategory, setDeleteSubCategory] = useState({
    _id: "",
  });
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false);
  const allSubCategory = useSelector((state) => state.product.subCategory);

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCategory,
      });
      if (response.data.success) {
        setOpenDeleteConfirmBox(false);
        dispatch(deleteSubCategoryID(deleteSubCategory));
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
    }
  };

  const column = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        console.log("row");
        return (
          <div className="flex justify-center items-center">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="w-8 h-8 cursor-pointer"
              onClick={() => {
                setImageURL(row.original.image);
              }}
            />
          </div>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return (
          <>
            {row.original.category.map((c) => {
              return (
                <p
                  key={c._id + "table"}
                  className="shadow-md px-1 inline-block"
                >
                  {c.name}
                </p>
              );
            })}
          </>
        );
      },
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setOpenEdit(true);
                setEditData(row.original);
              }}
              className="p-2 bg-green-100 rounded-full hover:text-green-600"
            >
              <HiPencil size={20} />
            </button>
            <button
              onClick={() => {
                setOpenDeleteConfirmBox(true);
                setDeleteSubCategory(row.original);
              }}
              className="p-2 bg-red-100 rounded-full text-red-500 hover:text-red-600"
            >
              <MdDelete size={20} />
            </button>
          </div>
        );
      },
    }),
  ];

  useEffect(() => {
    setData(allSubCategory);
  }, [allSubCategory]);

  return (
    <section>
      <div className="p-4 bg-white flex relative">
        <h2 className="text-3xl font-semibold">Sub Category</h2>
        <button
          className={`ml-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300 flex items-center`}
          onClick={() => setOpenAddCategory(true)}
        >
          <IoAddCircle className="text-2xl animate-bounce" /> Add Sub Category
        </button>
      </div>
      <div>
        <DisplayTable data={data} column={column} />
      </div>
      {openAddSubCategory && (
        <UploadSubCategoryModel onClose={() => setOpenAddCategory(false)} />
      )}
      {ImageURL && <ViewImage url={ImageURL} close={() => setImageURL("")} />}
      {openEdit && (
        <EditSubcategory data={editData} close={() => setOpenEdit(false)} />
      )}
      {openDeleteConfirmBox && (
        <ConfirmBox
          cancel={() => setOpenDeleteConfirmBox(false)}
          confirm={handleDeleteSubCategory}
          close={() => setOpenDeleteConfirmBox(false)}
        />
      )}
    </section>
  );
}
