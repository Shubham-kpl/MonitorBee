import "./App.css";
import Navbar from "./components/navbar";
import AboutTeam from "./components/about_team";
import Upload from "./components/upload";
import BeeImportance from "./components/about_bees";
import AboutProject from "./components/about_project";
import Footer from "./components/footer";

export default function App() {
  return (
    <>
      <Navbar />
      <AboutProject />
      <Upload />
      <BeeImportance />
      <AboutTeam />
      <Footer />
    </>
  );
}
