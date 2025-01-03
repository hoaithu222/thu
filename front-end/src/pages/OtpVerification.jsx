import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import LoadingBtn from "../components/LoadingBtn";
import toast from "react-hot-toast";

const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const location = useLocation();
  const email = location?.state?.email;
  const inputRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = data.join("");
    if (!otp) {
      setError("Please enter OTP");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await Axios({
        ...SummaryApi.verifyPasswordOtp,
        data: { otp, email },
      });

      if (response.data.error) {
        setError(response.data.message);
      }

      if (response.data.success) {
        setSuccess(response.data.message);
        toast.success(response.data.message);
        console.log(response);
        navigate("/reset-password", {
          state: {
            data: response.data,
            email: email,
          },
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Enter OTP
          </h2>
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
                htmlFor="otp"
                className={`block font-medium transition-colors duration-200 ${
                  focusedField === "email" ? "text-pink-600" : "text-gray-700"
                }`}
              >
                OTP :
              </label>
              <div className="flex gap-2 justify-between mt-3">
                {data.map((element, index) => (
                  <input
                    key={element + index}
                    type="text"
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    maxLength={1}
                    id="otp"
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;
                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);
                      if (value && index < 5) {
                        inputRef.current[index + 1].focus();
                      }
                    }}
                    name="otp"
                    className={` px-4 py-2 w-9 md:w-14 rounded-lg outline-none transition-all duration-300
                  ${
                    focusedField === "otp"
                      ? "border-2 border-pink-400 ring-2 ring-pink-200"
                      : "border border-gray-300 hover:border-pink-300"
                  }
                  ${error ? "border-red-300" : ""}
                `}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    disabled={isLoading}
                  />
                ))}
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
              {isLoading ? <LoadingBtn /> : "Verify OTP"}
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

export default OtpVerification;
