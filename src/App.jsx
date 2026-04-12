import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Partners from "./components/Partners";
import Services from "./components/Services";
import CaseStudies from "./components/CaseStudies";
import Products from "./components/Products";
import Careers from "./components/Careers";
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";
import "./styles/global.css";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const openContact = () => setModalOpen(true);

  return (
    <div className="app">
      <Nav onContact={openContact} />
      <Hero onContact={openContact} />
      <Stats />
      <Partners />
      <Services />
      <CaseStudies onContact={openContact} />
      <Products onContact={openContact} />
      <Careers />
      <Footer onContact={openContact} />
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
