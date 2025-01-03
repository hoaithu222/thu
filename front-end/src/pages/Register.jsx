import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoadingBtn from "../components/LoadingBtn";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error("Vui lòng kiểm tra lại mật khẩu");
      return;
    }
    setIsLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }
      console.log(response);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed");
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
      console.error("Login error:", error);
      AxiosError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Welcome to my shop
          </h2>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="name"
                className={`block font-medium transition-colors duration-200 ${
                  focusedField === "name" ? "text-pink-600" : "text-gray-700"
                }`}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name..."
                className={`w-full px-4 py-2 rounded-lg outline-none transition-all duration-300
                  ${
                    focusedField === "name"
                      ? "border-2 border-pink-400 ring-2 ring-pink-200"
                      : "border border-gray-300 hover:border-pink-300"
                  }
                `}
                value={data.name}
                onChange={handleChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className={`block font-medium transition-colors duration-200 ${
                  focusedField === "email" ? "text-pink-600" : "text-gray-700"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email..."
                className={`w-full px-4 py-2 rounded-lg outline-none transition-all duration-300
                  ${
                    focusedField === "email"
                      ? "border-2 border-pink-400 ring-2 ring-pink-200"
                      : "border border-gray-300 hover:border-pink-300"
                  }
                `}
                value={data.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className={`block font-medium transition-colors duration-200 ${
                  focusedField === "password"
                    ? "text-pink-600"
                    : "text-gray-700"
                }`}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={isShowPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password..."
                  className={`w-full px-4 py-2 rounded-lg outline-none transition-all duration-300 pr-10
                    ${
                      focusedField === "password"
                        ? "border-2 border-pink-400 ring-2 ring-pink-200"
                        : "border border-gray-300 hover:border-pink-300"
                    }
                  `}
                  value={data.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-600 transition-colors"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className={`block font-medium transition-colors duration-200 ${
                  focusedField === "confirmPassword"
                    ? "text-pink-600"
                    : "text-gray-700"
                }`}
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={isShowConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password..."
                  className={`w-full px-4 py-2 rounded-lg outline-none transition-all duration-300 pr-10
                    ${
                      focusedField === "confirmPassword"
                        ? "border-2 border-pink-400 ring-2 ring-pink-200"
                        : "border border-gray-300 hover:border-pink-300"
                    }
                  `}
                  value={data.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("confirmPassword")}
                  onBlur={() => setFocusedField(null)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-600 transition-colors"
                  onClick={() =>
                    setIsShowConfirmPassword(!isShowConfirmPassword)
                  }
                >
                  {isShowConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-medium
                transform hover:-translate-y-0.5 transition-all duration-200 hover:opacity-90 hover:shadow-lg"
            >
              {isLoading ? <LoadingBtn /> : "Register"}
            </button>
          </form>
          <p className="text-center mt-2 text-gray-500">
            Already have account ?{" "}
            <Link to="/login" className="text-green-500 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
