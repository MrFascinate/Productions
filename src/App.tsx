import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductionGrid from './components/ProductionGrid';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-primary-950">
      <Navbar />
      <Hero />
      <ProductionGrid />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
