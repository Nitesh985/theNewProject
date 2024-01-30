import React, { useState } from "react";

function ProfilePic({ img, logOutBtnClicked }) {
  return (
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
              img ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="z-[1] shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-24 text-center ml-3"
      >
        <li className="cursor-pointer hover:bg-slate-600 h-7 rounded-md flex-row items-center justify-center">
          Profile
        </li>
        <li
          className="cursor-pointer hover:bg-slate-600 h-7 rounded-md flex-row items-center justify-center"
          onClick={logOutBtnClicked}
        >
          Logout
        </li>
      </ul>
    </div>
  );
}

export default ProfilePic;
