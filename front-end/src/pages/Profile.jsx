import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import colors from "../styles/colors";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiMail, FiUser, FiPhone } from "react-icons/fi"; // Added icons
import UserProfileEdit from "../components/UserProfileEdit";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import { setUserDetails } from "../store/userSlice";
import fetchUserDetails from "../utils/fetchUserDetials";
import LoadingBtn from "../components/LoadingBtn";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user.name, user.email, user.mobile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: {
          ...userData,
          avatar: user.avatar,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        const userData = await fetchUserDetails();
        dispatch(
          setUserDetails({
            ...userData,
            avatar: user.avatar,
          })
        );
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Upload failed");
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="w-full max-w-2xl px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div
                className={`w-32 h-32 overflow-hidden rounded-full p-1 ${colors.gradients.violetToYellow} shadow-lg mx-auto`}
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <FaRegCircleUser className="w-full h-full p-4 text-white" />
                )}
              </div>
              <button
                className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${colors.button.small} ${colors.button.gradientSunrise} rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}
                onClick={() => setProfileAvatarEdit(!openProfileAvatarEdit)}
              >
                Change
              </button>
            </div>
            {openProfileAvatarEdit && (
              <UserProfileEdit onClose={() => setProfileAvatarEdit(false)} />
            )}
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={userData.name}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={userData.email}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    value={userData.mobile}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition-all duration-300"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${colors.button.large} ${colors.button.gradientFrostToFlame} rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none`}
            >
              {loading ? <LoadingBtn /> : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
