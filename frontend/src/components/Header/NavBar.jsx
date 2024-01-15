import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserContext from "../../context/UserContext";
import useDrawerContext from "../../context/DrawerContext";
import Loader from "../../utils/Loader";
import axios from "axios";

function NavBar({ children }) {
  const { user, setUserData } = useUserContext();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  const openDrawer = useDrawerContext();

  const logout = async () => {
    try {
      setLoading(true);
      const userLogOut = await axios.post("/api/v1/users/sign-out");
      if (userLogOut) {
        setLoading(false);
        setUserData(null);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <Loader loading={loading}>
      <div className="navbar bg-base-100">
        <div className="flex-1 justify-between">
          <Link className="btn btn-ghost text-xl font-bold text-gray-400">Amazon</Link>
          {children}
          <div className="flex gap-2">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className={`input input-bordered lg:${
                  user ? "w-[300px]" : "w-[320px]"
                } `}
              />
            </div>
            <div onClick={openDrawer}>
              <div role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Profile Picture"
                  src={
                    user?.avatar?.url ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <button>Profile</button>
              </li>
              <li>
                <button>Settings</button>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </Loader>
  );
}

export default NavBar;
