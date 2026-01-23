import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import CartButton from "../menu/CartButton";
import DarkModeToggle from "../menu/DarkModeToggle";

const Header = () => {
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

  return (
    <nav
      className={`p-3 md:p-4 sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-orange-200/95 backdrop-blur-md shadow-lg"
          : "bg-orange-300 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-2 md:py-4">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img src="src/assets/logo.png" alt="logo" className="h-10 md:h-16" />
        </Link>

        {/* Restaurant Name - Hidden on mobile, visible on tablet+ */}
        <div className="hidden md:flex text-2xl lg:text-5xl font-bold text-blue-950">
          Delicious Bites
        </div>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-4 mx-4">
          <DarkModeToggle />
          <CartButton />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-orange-300/50 transition-colors duration-200 touch-manipulation"
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
        className={`md:hidden fixed inset-0 top-15 md:top-20 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden fixed top-15 md:top-20 right-0 w-64 sm:w-72 h-[calc(100vh-60px)] md:h-[calc(100vh-80px)] 
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
