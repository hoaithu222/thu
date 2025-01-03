import React from "react";
import { useSelector } from "react-redux";
import isAdmin from "../utils/isAdmin";

export default function AdminPermissions({ children }) {
  const user = useSelector((state) => state.user);

  return (
    <div>
      {isAdmin(user.role) ? (
        children
      ) : (
        <p className="text-red-600 bg-red-300 p-2 ">You are not permission</p>
      )}
    </div>
  );
}
