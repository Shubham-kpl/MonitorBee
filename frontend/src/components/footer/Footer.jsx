import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <p style={{ fontWeight: "250" }}>Created by:</p>
        <div className="first-gen">
          <span style={{ fontWeight: "100" }}>First Generation : </span>
          <span style={{ fontWeight: "400" }}>Anushri Rawat | </span>
          <span style={{ fontWeight: "400" }}>Mohd. Rehan | </span>
          <span style={{ fontWeight: "400" }}>Shushant Kohli | </span>
          <span style={{ fontWeight: "400" }}>Atul Chaudhary</span>
        </div>
        <div className="sec-gen">
          <span style={{ fontWeight: "100" }}>Second Generation : </span>
          <span style={{ fontWeight: "400" }}>Karan Chanyal | </span>
          <span style={{ fontWeight: "400" }}>Priya Verma | </span>
          <span style={{ fontWeight: "400" }}>Shubham Kandpal | </span>
          <span style={{ fontWeight: "400" }}>Utkarsh Martolia</span>
        </div>
      </div>

      <span className="copyright">&copy;</span>
    </footer>
  );
};

export default Footer;
