import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from "./components/navigation/Nav";
import HomeBanner from "./components/banner/HomeBanner";
import Input from "./components/input-image-video/Input";
import LiveStream from "./components/LiveStream";
import AboutUs from "./components/about-us/About";
import Footer from "./components/footer/Footer";
import BeeImportance from "./components/bee-importance/WhyBees";

function App() {
  return (
    <>
      {/* <Nav /> */}
      <Input />
      <Router>
        <Routes>
          {" "}
          <Route path="/" element={<HomeBanner />} />
          {/* Add a home page route */}
          <Route path="/upload-vid" element={<LiveStream />} />
        </Routes>
      </Router>
      <HomeBanner />
      <BeeImportance />
      <AboutUs />
      <Footer />
    </>
  );
}

export default App;
