import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) =>
    location.pathname === path ? "text-orange-700 font-bold" : "text-black";

  return (
    <nav
      className={`p-4 sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-orange-200/95 backdrop-blur-md shadow-lg"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link to="/">
          <img src="src/assets/logo.png" alt="logo" className="h-16" />
        </Link>
        <div className="text-5xl font-bold text-blue-950 flex justify-end">
          SoftLien Restaurant
        </div>
        <ul className="flex font-semibold space-x-6">
          <li>
            <Link to="/" className={`${isActive("/")} hover:text-orange-500`}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/menu"
              className={`${isActive("/menu")} hover:text-orange-500`}
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              to="/custom-cake"
              className={`${isActive("/custom-cake")} hover:text-orange-500`}
            >
              Custom Cake
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className={`${isActive("/orders")} hover:text-orange-500`}
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`${isActive("/contact")} hover:text-orange-500`}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
