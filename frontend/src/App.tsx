import { motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";
import Home from "./pages/Home";
import Works from "./pages/Works";
import About from "./pages/About";

export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <Background />
      <Navbar />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </motion.main>
      <Contact />
      <Footer />
    </>
  );
}