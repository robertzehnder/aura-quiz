import React from "react";
import { Link } from "react-router-dom";
import "./Toolbar.css";

const Toolbar = ({ user, openLoginModal }) => {
  return (
    <div className="toolbar">
      <Link to="/" className="toolbar-link">
        Find Yourself
      </Link>
      <div className="toolbar-right">
        {user ? (
          <Link to="/profile" className="toolbar-link">
            Profile
          </Link>
        ) : (
          <Link to="#" onClick={openLoginModal} className="toolbar-link">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
