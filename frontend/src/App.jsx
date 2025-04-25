import "./App.css";
import About from "./components/about/About";
import Features from "./components/features/Features";
import Footer from "./components/footer/Footer";
import HomeBanner from "./components/homebanner/HomeBanner";
import WhyBees from "./components/whybees/WhyBees";
import Nav from "./components/navigation/Nav";

function App() {
  return (
    <>
      <Nav />
      <HomeBanner />
      <Features />
      <WhyBees />
      <About />
      <Footer />
    </>
  );
}

export default App;
