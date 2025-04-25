import "./App.css";
import Nav from "./components/navigation/Nav";
import HomeBanner from "./components/homebanner/HomeBanner";
import Features from "./components/features/Features";
import Input from "./components/input/Input";
import About from "./components/about/About";
import Footer from "./components/footer/Footer";
import WhyBees from "./components/whybees/WhyBees";

function App() {
  return (
    <>
      <Nav />
      <HomeBanner />
      <Features />
      <Input />
      <WhyBees />
      <About />
      <Footer />
    </>
  );
}

export default App;
