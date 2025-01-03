import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import logo from "../assets/img/logo.png";
import colors from "../styles/colors";
import Search from "./Search";
import useMobile from "../hooks/useMobile";
import UserMenu from "./UserMenu";

export default function Header() {
  const isMobile = useMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const isSearchPage = location.pathname === "/search";
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const user = useSelector((state) => state.user);

  const handleUserClick = () => {
    if (!user._id) {
      // Nếu chưa đăng nhập, luôn chuyển đến trang login
      navigate("/login");
      return;
    }

    if (isMobile) {
      // Trên mobile và đã đăng nhập, chuyển đến trang user menu
      navigate("/user-menu");
    } else {
      // Trên desktop và đã đăng nhập, toggle dropdown menu
      setOpenUserMenu(!openUserMenu);
    }
  };

  return (
    <header className="h-25 shadow-md sticky top-0 p-3 z-50 bg-white">
      {!(isMobile && isSearchPage) && (
        <div className="container mx-auto flex items-center justify-between h-full">
          <Link to="/" className="h-full">
            <img
              src={logo}
              alt="logo"
              className="object-cover"
              width={50}
              height={50}
            />
          </Link>

          <div className="hidden md:block">
            <Search />
          </div>

          <div className="flex items-center justify-between gap-4">
            {isMobile ? (
              <div className="text-3xl text-gray-500">
                <FaRegCircleUser onClick={handleUserClick} />
              </div>
            ) : (
              <div className="items-center gap-3 flex">
                <Link className="relative" to="/cart">
                  <FaCartPlus className="text-3xl" />
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-400 rounded-full flex items-center justify-center">
                    <span className="text-sm text-white">0</span>
                  </div>
                </Link>

                {user?._id ? (
                  <div className="relative">
                    <div
                      className="flex items-center gap-1 hover:text-gray-700 transition-colors cursor-pointer"
                      onClick={handleUserClick}
                    >
                      <FaRegCircleUser className="text-4xl text-pink-300" />
                    </div>
                    {openUserMenu && (
                      <div className="absolute right-0 top-12 z-50">
                        <UserMenu onClose={() => setOpenUserMenu(false)} />
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className={`${colors.button.gradientFrostToFlame} ${colors.button.medium}`}
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="container mx-auto flex justify-center md:hidden mt-4">
        <Search />
      </div>
    </header>
  );
}
