import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Testimonials from "../components/Testimonials";
import AboutUs from "../components/AboutUs";
import Technologies from "../components/Technologies";
import Footer from "../components/Footer";

const MainPage = () => (
  <div className="min-h-screen bg-gray-100">
    <Header />
    <main>
      <HeroSection />
      <Testimonials />
      <AboutUs />
      <Technologies />
      <Footer />
    </main>
  </div>
);

export default MainPage;