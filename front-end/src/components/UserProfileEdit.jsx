import { FaRegCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import colors from "../styles/colors";
import { useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { updateAvatar } from "../store/userSlice";
import { MdOutlineClose } from "react-icons/md";

export default function UserProfileEdit({ onClose }) {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData,
      });
      const { data: responseData } = response;
      console.log(responseData);

      if (responseData.success) {
        setLoading(false);
        dispatch(updateAvatar({ avatar: responseData.data.avatar }));
        onClose();
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
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 z-50  bg-opacity-60 p-4 flex items-center justify-center">
      <div className="bg-white max-w-sm w-full rounded-md p-4 flex items-center justify-center flex-col">
        <MdOutlineClose
          className="ml-auto text-3xl text-pink-400 hover:text-red-500 cursor-pointer font-semibold "
          onClick={() => {
            onClose();
          }}
        />
        <div
          className={`w-24 h-24  overflow-hidden rounded-full p-1 ${colors.gradients.violetToYellow}`}
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className={`w-full h-full object-cover rounded-full `}
            />
          ) : (
            <FaRegCircleUser size={60} />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="avatarUpload" className="cursor-pointer">
            <div
              className={`${colors.button.medium} ${colors.button.gradientSunrise} w-20 mt-2`}
            >
              {loading ? "Loading..." : "Upload"}
            </div>
          </label>
          <input
            type="file"
            name="avatar"
            id="avatarUpload"
            className="hidden"
            onChange={handleChange}
          />
        </form>
      </div>
    </div>
  );
}
