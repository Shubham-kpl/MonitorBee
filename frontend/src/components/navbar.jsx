import "./css/navbar.css";
import { useState, useEffect } from "react";

const navigationLinks = {
  main: [
    { href: "#about-project", text: "The Project" },
    { href: "#test-the-model", text: "Test" },
    { href: "#about-bees", text: "Bees" },
    { href: "#about-us-section", text: "About Us" },
    { href: "#blogs", text: "Blogs" },
    { href: "#login", text: "Login" },
  ],
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e, href) => {
    const element = document.querySelector(href);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="logo">
          <img
            src="../../images/bee.png"
            alt="MonitorBee Logo"
            className="logo-image"
          />
          <span className="logo-text">Monitor<span style={{ color: "#f0a500" }}>Bee</span></span>
        </div>

        <div
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
          {navigationLinks.main.map(({ href, text }) => (
            <li key={href}>
              <a href={href} onClick={(e) => handleSmoothScroll(e, href)}>
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
