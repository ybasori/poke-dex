import React from "react";

import "./style.scss";

const Navbar = () => {
  return (
    <div id="component-navbar">
      <div className="main-group-circle">
        <div className="wrap-blue-circle">
          <div className="blue-circle"></div>
        </div>
        <div className="three-group-circle">
          <div className="red-circle"></div>
          <div className="yellow-circle"></div>
          <div className="green-circle"></div>
        </div>
      </div>
      <div className="left-navbar">
        <div className="form-search"></div>
      </div>
    </div>
  );
};

export default Navbar;
