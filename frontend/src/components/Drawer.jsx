import React, { useRef } from "react";
import { DrawerContext } from "../context/DrawerContext";
import Cart from "./Cart";


function Drawer({ children }) {
  const openRef = useRef(false);


  const openDrawer = () => {
    if (openRef.current) {
      openRef.current.checked = true;
    }
  };

  return (
    <DrawerContext.Provider value={openDrawer}>
      <div className="drawer drawer-end" >
        <input
          id="my-drawer-4"
          className="drawer-toggle"
          type="checkbox"
          ref={openRef}
        />
        <div className="drawer-content">{children}</div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content gap-4">
            <Cart />
          </ul>
        </div>
      </div>
    </DrawerContext.Provider>
  );
}

export default Drawer;
