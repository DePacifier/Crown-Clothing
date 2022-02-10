import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { connect } from "react-redux";

import "./header.styles.scss";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";

const Header = ({ currentUser }) => {
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
          {currentUser ? (
            <div className="option" onClick={() => auth.signOut()}>
              SIGN OUT
            </div>
          ) : (
            <NavLink
              className={`option ${(isActive) =>
                isActive ? "active" : "inactive"}`}
              to="/signin"
            >
              SIGN IN
            </NavLink>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
