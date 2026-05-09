import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Offers from './components/Offers';
import Products from './components/Products';
import Footer from './components/Footer';

function App() {
  return (
    <main className="min-h-screen bg-pottery-base">
      <Navbar />
      <Hero />
      <About />
      <Offers />
      <Products />
      <Footer />
    </main>
  );
}

export default App;