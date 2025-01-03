import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import colors from "../styles/colors";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${colors.gradients.indigoToPink} text-gray-100 `}>
      <div className="mx-auto py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden container ">
        {/* Decorative circles */}
        <div
          className={`absolute top-0 left-0 w-32 h-32 ${colors.gradients.purpleToPinkBlur} rounded-full opacity-10 blur-xl transform -translate-x-1/2 -translate-y-1/2`}
        ></div>
        <div
          className={`absolute bottom-0 right-0 w-40 h-40 ${colors.gradients.pinkToOrange} rounded-full opacity-10 blur-xl transform translate-x-1/2 translate-y-1/2`}
        ></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          {/* Company Info */}
          <div className="space-y-6 transform transition duration-500 ">
            <h2
              className={`text-3xl font-bold ${colors.gradients.violetToBlue} bg-clip-text text-transparent `}
            >
              My Shop
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Chúng tôi mang đến cho bạn những mẫu quần áo thời trang, chất
              lượng, và giá cả hợp lý.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group hover:bg-white/10 p-2 rounded-lg transition-all duration-300">
                <MapPin className="h-5 w-5 text-violet-400 group-hover:text-violet-300" />
                <span className="group-hover:text-white">
                  123 Đường ABC, Phường XYZ, TP Hồ Chí Minh
                </span>
              </div>
              <div className="flex items-center space-x-3 group hover:bg-white/10 p-2 rounded-lg transition-all duration-300">
                <Phone className="h-5 w-5 text-teal-400 group-hover:text-teal-300" />
                <span className="group-hover:text-white">0123 456 789</span>
              </div>
              <div className="flex items-center space-x-3 group hover:bg-white/10 p-2 rounded-lg transition-all duration-300">
                <Mail className="h-5 w-5 text-rose-400 group-hover:text-rose-300" />
                <span className="group-hover:text-white">
                  shopquanao@example.com
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="transform transition duration-500 ">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-6">
              Liên Kết Nhanh
            </h2>
            <nav className="space-y-4">
              {[
                { to: "/about", text: "Về Chúng Tôi" },
                { to: "/policy", text: "Chính Sách Đổi Trả" },
                { to: "/contact", text: "Liên Hệ" },
                { to: "/faq", text: "Câu Hỏi Thường Gặp" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-gray-300 hover:text-white p-2 rounded-lg transition-all duration-300
                    hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20
                    hover:translate-x-2 transform"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Media */}
          <div className="transform transition duration-500 ">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent mb-6">
              Theo Dõi Chúng Tôi
            </h2>
            <div className="space-y-6">
              <p className="text-gray-300 leading-relaxed">
                Kết nối với chúng tôi trên các mạng xã hội để nhận được những
                thông tin mới nhất về sản phẩm và khuyến mãi.
              </p>
              <div className="flex space-x-6">
                <Link
                  to="https://facebook.com"
                  className="text-gray-300 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:rotate-6"
                >
                  <Facebook className="h-8 w-8" />
                </Link>
                <Link
                  to="https://instagram.com"
                  className="text-gray-300 hover:text-pink-400 transition-all duration-300 transform hover:scale-125 hover:-rotate-6"
                >
                  <Instagram className="h-8 w-8" />
                </Link>
                <Link
                  to="https://twitter.com"
                  className="text-gray-300 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:rotate-6"
                >
                  <Twitter className="h-8 w-8" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-300">
            &copy; {currentYear} - Copyright by{" "}
            <span
              className={`${colors.textColors.frostToFlameText} font-bold hover:${colors.textColors.gradientPrimary} transition-all duration-300`}
            >
              @Thu
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
