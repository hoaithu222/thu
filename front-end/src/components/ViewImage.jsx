import { IoClose } from "react-icons/io5";

export default function ViewImage({ url, close }) {
  return (
    <div className="fixed inset-0 bg-neutral-950 bg-opacity-65 flex items-center justify-center">
      <div className="w-full max-w-md p-4 relative">
        <IoClose
          className="bg-white text-3xl text-red-500 absolute top-0 right-0 rounded-full cursor-pointer"
          onClick={close}
        />
        <img
          src={url}
          alt="full Screen"
          className="w-full h-full object-scale-down"
        />
      </div>
    </div>
  );
}
