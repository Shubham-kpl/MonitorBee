import "./App.css";
import Nav from "./components/navigation/Nav";
import HomeBanner from "./components/homebanner/HomeBanner";
import Input from "./components/input/Input";
import About from "./components/about/About";
import Footer from "./components/footer/Footer";
import WhyBees from "./components/whybees/WhyBees";

function App() {
  return (
    <>
      <Nav />
      <HomeBanner />
      <Input />
      <WhyBees />
      <About />
      <Footer />
    </>
  );
}

export default App;
