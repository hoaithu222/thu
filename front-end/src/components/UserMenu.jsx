import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBox,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaCloudUploadAlt,
  FaProductHunt,
} from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import { logout } from "../store/userSlice";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";

const MenuLink = ({ to, icon: Icon, label, onClick, className = "" }) => (
  <Link
    to={to}
    className={`flex items-center gap-4 p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all shadow-sm ${className}`}
    onClick={onClick}
  >
    <Icon className="text-pink-400 text-xl" />
    <span className="text-gray-700 font-medium">{label}</span>
  </Link>
);

const UserMenu = ({ onClose, isFullPage = false }) => {
  const menuRef = useRef(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isFullPage) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, isFullPage]);

  const handleLogout = async () => {
    try {
      const response = await Axios({ ...SummaryApi.logout });
      if (response.data.success) {
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      console.error("Logout error:", error);
    }
  };

  const handleLinkClick = () => !isFullPage && onClose();
  const handleClose = () => onClose?.();
  const isAdmin = user.role === "ADMIN";

  const menuContent = (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-300 pb-4">
        <div className="flex items-center gap-4">
          <Link
            onClick={handleClose}
            className="w-12 h-12 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
            to="/dashboard/profile"
          >
            <FaUser className="text-white text-xl" />
          </Link>
          <div className="flex-grow">
            <div className="text-lg font-bold text-gray-800">My Account</div>
            <div className="text-sm text-gray-600">
              {user.name || user.mobile || "Guest User"}
              <p className="text-red-400">
                {user.role === "ADMIN" ? "Admin" : ""}
              </p>
            </div>
          </div>
          {!isFullPage && (
            <button
              className="p-2 text-gray-500 hover:text-red-400 transition-colors"
              onClick={onClose}
              aria-label="Close menu"
            >
              <RiCloseLine className="text-2xl" />
            </button>
          )}
        </div>
      </div>

      <div className="py-4 space-y-3 flex-grow">
        {isAdmin && (
          <>
            <MenuLink
              to="/dashboard/category"
              icon={BiSolidCategoryAlt}
              label="Category"
              onClick={handleLinkClick}
            />
            <MenuLink
              to="/dashboard/subcategory"
              icon={MdCategory}
              label="Sub Category"
              onClick={handleLinkClick}
            />
            <MenuLink
              to="/dashboard/upload-product"
              icon={FaCloudUploadAlt}
              label="Upload Products"
              onClick={handleLinkClick}
            />
            <MenuLink
              to="/dashboard/product"
              icon={FaProductHunt}
              label="All Products"
              onClick={handleLinkClick}
            />
          </>
        )}
        <MenuLink
          to="/dashboard/myOrder"
          icon={FaBox}
          label="My Orders"
          onClick={handleLinkClick}
        />
        <MenuLink
          to="/dashboard/address"
          icon={FaMapMarkerAlt}
          label="Saved Addresses"
          onClick={handleLinkClick}
        />
      </div>

      <button
        onClick={async () => {
          handleLinkClick();
          handleClose();
          await handleLogout();
        }}
        className="flex items-center gap-4 p-4 bg-red-100 hover:bg-red-200 rounded-lg transition-all shadow-sm text-red-600 w-full mt-auto"
      >
        <FaSignOutAlt className="text-xl" />
        <span>Logout</span>
      </button>
    </div>
  );

  const containerClass = isFullPage
    ? "bg-pink-50 p-6 min-h-screen"
    : "bg-white rounded-lg shadow-lg p-4 w-80 border border-gray-200";

  return (
    <div ref={menuRef} className={containerClass}>
      {menuContent}
    </div>
  );
};

export default UserMenu;
