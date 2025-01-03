import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import { Eye, EyeOff } from "lucide-react";
import LoadingBtn from "../components/LoadingBtn";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    configPassword: "", // Update this key
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.newPassword || !data.configPassword) {
      setError("Please enter your new password");
      return;
    }
    if (data.newPassword !== data.configPassword) {
      setError("Please check new password and confirm password");
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await Axios({
        ...SummaryApi.resetPassword,
        data: data,
      });

      if (response.data.error) {
        setError(response.data.message);
      }

      if (response.data.success) {
        setSuccess(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Request failed");
      } else if (error.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }
    if (location?.state?.email) {
      setData({
        ...data,
        email: location?.state?.email,
      });
    }
  }, []);
  console.log("data reset password", data);
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Reset Password
          </h2>
          <p className="mt-2 text-gray-600">Enter your new password</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
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
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter your new password..."
                  className={`w-full px-4 py-2 rounded-lg outline-none transition-all duration-300 pr-10
                    ${
                      focusedField === "newPassword"
                        ? "border-2 border-pink-400 ring-2 ring-pink-200"
                        : "border border-gray-300 hover:border-pink-300"
                    }
                  `}
                  value={data.newPassword}
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
                  id="configPassword" // Update this key
                  name="configPassword" // Update this key
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
              {isLoading ? <LoadingBtn /> : "Send email"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-green-500 font-semibold hover:text-green-600 transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
