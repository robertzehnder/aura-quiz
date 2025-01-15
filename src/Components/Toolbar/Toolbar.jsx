import React from "react";
import { Link } from "react-router-dom";
import "./Toolbar.css";

const Toolbar = () => {
  return (
    <div className="toolbar">
      <Link to="/" className="toolbar-link">
        Find Yourself
      </Link>
      <div className="toolbar-right">
        <Link to="/signin" className="toolbar-link">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Toolbar;
