import React from "react";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";

function Header() {
    const navItems = [
        {
            path:"/",
            element:"Home"
        },
        {
            path:"/product",
            element:"Product"
        },
        {
            path:"/services",
            element:"Services"
        },
        {
            path:"/contact",
            element:"Contact"
        }
    ]



  return (
  <div>
      <NavBar>
        <ul className="flex space-x-5 lg:space-x-20">
          {navItems.map((navItem, index)=>(
              <li className="flex items-center" key={index}>
            <NavLink
              to={navItem.path}
              className={({isActive})=>(
                  `text-gray-600 hover:text-orange-400 transition-all duration-200 ease-linear ${isActive?"text-orange-500":""} `
                  )}
                  >
              {navItem.element}
            </NavLink>
          </li>
          ))
          }
      </ul>
      </NavBar>
  </div>
  );
}

export default Header;
