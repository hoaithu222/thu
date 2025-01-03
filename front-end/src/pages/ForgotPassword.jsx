import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import LoadingBtn from "../components/LoadingBtn";

const ForgotPassword = () => {
  const [data, setData] = useState({ email: "" });
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email) {
      setError("Please enter your email");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await Axios({
        ...SummaryApi.forgotPassword,
        data: data,
      });

      if (response.data.error) {
        setError(response.data.message);
      }

      if (response.data.success) {
        setSuccess(response.data.message);
        navigate("/verification-otp", {
          state: {
            email: data.email,
          },
        });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Forgot Password
          </h2>
          <p className="mt-2 text-gray-600">
            Enter your email to receive password reset instructions
          </p>
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
                  ${error ? "border-red-300" : ""}
                `}
                value={data.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                disabled={isLoading}
              />
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
};

export default ForgotPassword;
