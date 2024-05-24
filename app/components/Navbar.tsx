'use client'
import { useAuth } from "../contexts/AuthContext"; 
import React, { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // Utilisation des icônes de Heroicons v2

const Navbar: React.FC = () => {
  const { isLogged, logout } = useAuth(); // Utilisation du contexte d'authentification et ajout de la fonction logout
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md py-4 px-4 md:px-8 flex justify-between items-center">
      {/* Logo */}
      <Link href="/">
        <div className="text-3xl font-bold text-indigo-500 cursor-pointer">
          VideoVibe
        </div>
      </Link>

      {/* Hamburger Menu (Mobile) */}
      <div className="md:hidden">
        <button
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Navigation Links (Desktop) */}
      <ul className="hidden md:flex items-center space-x-4">
        <li>
          <Link
            href="/about"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/services"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Contact
          </Link>
        </li>
        {isLogged ? (
          <li>
            <button
              onClick={logout}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              Login
            </Link>
          </li>
        )}
      </ul>

      {/* Navigation Links (Mobile) */}
      {menuOpen && (
        <ul className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4">
          <li>
            <Link
              href="/about"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
          {isLogged ? (
            <li>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-800 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
