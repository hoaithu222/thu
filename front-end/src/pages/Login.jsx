import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { Link, useNavigate } from "react-router-dom";
import LoadingBtn from "../components/LoadingBtn";
import fetchUserDetails from "../utils/fetchUserDetials";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!data.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!data.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        const userDetails = await fetchUserDetails();
        console.log(userDetails);
        dispatch(setUserDetails(userDetails.data.data));

        navigate("/");
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-600">Login to your account</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
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
                  ${errors.email ? "border-red-500" : ""}
                `}
                value={data.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
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
                    ${errors.password ? "border-red-500" : ""}
                  `}
                  value={data.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-600 transition-colors"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  disabled={isLoading}
                >
                  {isShowPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-pink-600 hover:text-pink-700 text-sm transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-medium
                transform hover:-translate-y-0.5 transition-all duration-200 
                ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:opacity-90 hover:shadow-lg"
                }
              `}
              disabled={isLoading}
            >
              {isLoading ? <LoadingBtn /> : "Login"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green-500 font-semibold hover:text-green-600 transition-colors"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
