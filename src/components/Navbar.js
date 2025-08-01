import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-800 fixed top-0 left-0 right-0 z-50 p-4 text-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-25">
        <Link to="/" className="font-bold text-lg">
          Healthcare
        </Link>

        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/my-appointments" className="hover:text-gray-200">
            My Appointments
          </Link>
        </div>
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6 text-white" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white" />
          )}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 bg-blue-700 p-4 rounded-lg">
          <Link
            to="/"
            className="hover:text-gray-200"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/my-appointments"
            className="hover:text-gray-200"
            onClick={() => setMenuOpen(false)}
          >
            My Appointments
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
