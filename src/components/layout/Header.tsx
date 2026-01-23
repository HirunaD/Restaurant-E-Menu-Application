import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import CartButton from "../menu/CartButton";
import DarkModeToggle from "../menu/DarkModeToggle";

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu handler
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      closeMobileMenu();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [closeMobileMenu]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) =>
    location.pathname === path ? "text-orange-700 font-bold" : "text-gray-700 dark:text-gray-200";

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
    { path: "/custom-cake", label: "Custom Cake" },
    { path: "/orders", label: "Orders" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`p-3 md:p-4 sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-orange-200/95 backdrop-blur-md shadow-lg"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-2 md:py-4">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img src="src/assets/logo.png" alt="logo" className="h-10 md:h-16" />
        </Link>

        {/* Restaurant Name - Hidden on mobile, visible on tablet+ */}
        <div className="hidden md:flex text-2xl lg:text-5xl font-bold text-blue-950 dark:text-orange-400">
          Delicious Bites
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex font-semibold space-x-4 xl:space-x-6 items-center">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`${isActive(link.path)} hover:text-orange-500 transition-colors duration-200 text-sm xl:text-base py-2 px-1`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <DarkModeToggle />
          </li>
          <li>
            <CartButton />
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-orange-300/50 transition-colors duration-200 touch-manipulation"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <svg
            className="w-6 h-6 text-gray-800 dark:text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-15 md:top-20 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden fixed top-15 md:top-20 right-0 w-64 sm:w-72 h-[calc(100vh-60px)] md:h-[calc(100vh-80px)] 
                   bg-white dark:bg-gray-900 shadow-xl z-50 
                   transform transition-transform duration-300 ease-out
                   ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Mobile Restaurant Name */}
        <div className="md:hidden p-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-xl font-bold text-blue-950 dark:text-orange-400">
            Delicious Bites
          </span>
        </div>

        <ul className="flex flex-col py-4">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`block px-6 py-4 text-lg font-medium 
                           ${isActive(link.path)} 
                           hover:bg-orange-100 dark:hover:bg-gray-800 
                           hover:text-orange-500 
                           transition-colors duration-200
                           touch-manipulation
                           active:bg-orange-200 dark:active:bg-gray-700`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Actions */}
        <div className="flex items-center justify-center gap-4 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <DarkModeToggle />
          <CartButton />
        </div>
      </div>
    </nav>
  );
};

export default Header;
