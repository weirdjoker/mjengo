import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      className="bg-cover bg-center h-96 flex items-center justify-center relative animate-fade-in"
      style={{ backgroundImage: "url(/assets/construction.jpg)" }}
    >
      <div className="text-center text-white bg-black bg-opacity-60 p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-4">Streamline your construction projects with Mjengo</h2>
        <p className="text-lg mb-6">Connect Owners, Builders, and Suppliers for efficient project management.</p>
        <Link
          to="/login"
          className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;