import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

import "./header.styles.scss";

import { ReactComponent as Logo } from "../../assets/crown.svg";

const Header = () => {
  return (
    <>
      <div className="header">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>
        <div className="options">
          <NavLink
            className={`option ${(isActive) =>
              isActive ? "active" : "inactive"}`}
            to="/shop"
          >
            SHOP
          </NavLink>
          <NavLink
            className={`option ${(isActive) =>
              isActive ? "active" : "inactive"}`}
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
