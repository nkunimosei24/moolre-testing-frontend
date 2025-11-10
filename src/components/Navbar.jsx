import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold tracking-wide">Moolre</h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          <a href="/" className="hover:text-gray-200 transition">
            Transfer Money
          </a>
          <a href="/singleSMS" className="hover:text-gray-200 transition">
            Send Single SMS
          </a>
          <a href="/bulkSms" className="hover:text-gray-200 transition">
            Send Bulk SMS
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-600 px-6 py-4 space-y-3">
          <a
            href="/"
            className="block hover:text-gray-200 transition"
            onClick={() => setIsOpen(false)}
          >
            Transfer Money
          </a>
          <a
            href="/singleSMS"
            className="block hover:text-gray-200 transition"
            onClick={() => setIsOpen(false)}
          >
            Send Single SMS
          </a>
          <a
            href="/bulkSms"
            className="block hover:text-gray-200 transition"
            onClick={() => setIsOpen(false)}
          >
            Send Bulk SMS
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
