import "./css/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Logo</div>
      <ul className="nav-links">
        <li>
          <a href="#about-project">The Project</a>
        </li>
        <li>
          <a href="#about-us-section">About Us</a>
        </li>
        <li>
          <a href="#test-the-model">Test</a>
        </li>
        <li>
          <a href="#about-bees">Bees</a>
        </li>
        <li>
          <a href="#blogs">Blogs</a>
        </li>
        <li>
          <a href="#login">Login</a>
        </li>
      </ul>
    </nav>
  );
}
