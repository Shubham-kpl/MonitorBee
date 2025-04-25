import React from "react";
import "./nav.scss";

const Nav = () => {
  return (
    <nav className="d-flex justify-content-between ">
      <a href="/" className="logo-div">
        <img
          src="/images/logo.png"
          alt="beecognition-logo"
          width="35px"
          height="35px"
        />
        BeeCognition
      </a>
      <ul className="nav">
        <li className="nav-items">
          <a href="#why-bees">Why Bees</a>
        </li>
        <li className="nav-items">
          <a href="#about">About us</a>
        </li>
        <li className="nav-items">
          <a href="#features">Features</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
