import { IoClose } from "react-icons/io5";
import colors from "../styles/colors";

export default function AddFiledComponents({ close, value, onChange, submit }) {
  return (
    <section className="fixed inset-0 bg-slate-900 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded p-4 w-full max-w-md">
        <div className="flex items-center justify-between gap-3">
          <h1>Add Filed</h1>
          <button>
            <IoClose size={25} className="text-red-300 " onClick={close} />
          </button>
        </div>
        <input
          value={value}
          onChange={onChange}
          className="bg-blue-50 my-3 p-2 border outline-none focus-within:bg-pink-200 w-full rounded-md  border-purple-200"
          placeholder="Enter filed name"
        />
        <button
          onClick={submit}
          className={`${colors.button.gradientCyanToIndigo} ${colors.button.medium} block`}
        >
          Add Filed
        </button>
      </div>
    </section>
  );
}
