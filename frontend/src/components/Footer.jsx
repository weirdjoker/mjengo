import { Link } from "react-router-dom";
const Footer = () => {
    return(
        <div>
            <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2025 Mjengo App. All rights reserved.</p>
        <div className="mt-2">
          <Link to="/contact" className="mx-2 hover:underline">Contact</Link>
          
        </div>
      </footer>
        </div>
    )
}
export default Footer;

                
                
