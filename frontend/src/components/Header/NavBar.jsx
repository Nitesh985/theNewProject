import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserContext from "../../context/UserContext";
import useDrawerContext from "../../context/DrawerContext";
import Loader from "../../utils/Loader";
import axios from "axios";
import useCart from "../../context/CartContext";
import { CgProfile } from "react-icons/cg";
import ProfilePic from "./ProfilePic";



function NavBar({ children }) {
  const { user, setUserData } = useUserContext();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { deleteAllFromCart, cart } = useCart();
  const openDrawer = useDrawerContext();

  const logout = async () => {
    try {
      setLoading(true);
      await axios.post("/api/v1/users/sign-out");
      setUserData(null);
      deleteAllFromCart();
      navigate("/");
    } catch (error) {
      if (error?.response && error?.response?.status === 401) {
        axios
          .post("/api/v1/users/refresh-token")
          .then(async () => {
            await axios.post("/api/v1/users/sign-out");
            setUserData(null);
            deleteAllFromCart();
            navigate("/");
          })
          .catch((error) => {
            console.log(error?.response?.message);
            if (error?.response && error?.response?.status === 403) {
              setUserData(null);
              alert("Your session has expired");
            }
          });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Loader loading={loading}>
      <div className="navbar bg-base-100">
        <div className="flex-1 justify-between">
          <Link className="btn btn-ghost text-xl font-bold text-gray-400 flex gap-0 ">
            Dokan
          </Link>
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
            <div className="relative group" onClick={openDrawer}>
              <div
                role="relative group button"
                className="btn bg-transparent hover:bg-transparent border-none w-12 h-12 hover:text-slate-200"
              >
                <div className="indicator group transition-all duration-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[23px] w-[23px]"
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
                {cart?.length > 0 && (
                  <p className="absolute right-1 top-1 text-[12px] mr-1 mt-1 bg-green-400 text-red-950 w-[14px] h-[14px] flex justify-center items-center rounded-full font-semibold">
                    {cart?.length}
                  </p>
                )}
                <div className="absolute text-[12px] scale-0 group-hover:scale-100 mt-[49px] transition-all duration-100 font-normal opacity-80">
                  Cart
                </div>
              </div>
            </div>
          </div>
        </div>
        {user ? (
          <ProfilePic img={user?.avatar?.url} logOutBtnClicked={logout} />
        ) : (
          <div className="mr-3">
            <Link
              className="relative w-10 h-10 flex justify-center items-center group"
              to="/sign-in"
            >
              <CgProfile
                size={26}
                className="text-blue-500 hover:text-slate-300 transition-colors duration-300"
              />
              <div className="absolute text-xs mt-12 scale-0 group-hover:scale-100 flex transition-all duration-100">
                Sign In
              </div>
            </Link>
          </div>
        )}
      </div>
    </Loader>
  );
}

export default NavBar;
