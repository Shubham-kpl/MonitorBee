import "./App.css";
import Nav from "./components/navigation/Nav";
import HomeBanner from "./components/banner/HomeBanner";
import Input from "./components/input-image-video/Input";
import AboutUs from "./components/about-us/About";
import Footer from "./components/footer/Footer";
import BeeImportance from "./components/bee-importance/WhyBees";

function App() {
  return (
    <>
      {/* <Nav /> */}
      <Input />
      <HomeBanner />
      <BeeImportance />
      <AboutUs />
      <Footer />
    </>
  );
}

export default App;
