import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import appStore from "./images/Appstore.png";
import playStore from "./images/Playstore.png";
import Logo from "./images/QuickBites_Logo_Transparent1.png";

const Footer = () => {
  const navigate = useNavigate();

  const handleStoreClick = () => {
    navigate("/hudaixa");
  };

  return (
    <footer className="bg-gray-900 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Branding */}
        <div>
          <div className="mb-2">
            <img src={Logo} alt="QuickBites Logo" className="h-20 w-auto" />
          </div>
          <p className="text-md italic">
            Quick Cravings?
            <br /> QuickBites Delivers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-orange-400 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-4 text-sm">
            <li>
              <Link to="/" className="hover:text-orange-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-orange-400">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-400">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-orange-400">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="hover:text-orange-400">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Help & Support */}
        <div>
          <h3 className="text-lg font-semibold text-orange-400 mb-3">
            Help & Support
          </h3>
          <ul className="space-y-4 text-sm">
            <li>
              <Link to="/support" className="hover:text-orange-400">
                Customer Support
              </Link>
            </li>
            <li>
              <Link to="/refund-policy" className="hover:text-orange-400">
                Return & Refund Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-orange-400">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-orange-400">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Download App */}
        <div>
          <h3 className="text-lg font-semibold text-orange-400 mb-4">
            Download Our App
          </h3>
          <div className="flex flex-col bg-gray-900 sm:flex-column gap-6">
            <button onClick={handleStoreClick} className="text-left">
              <img
                src={playStore}
                alt="Get it on Google Play"
                className="h-12 hover:opacity-80 transition rounded-md"
              />
            </button>
            <button onClick={handleStoreClick} className="text-left">
              <img
                src={appStore}
                alt="Download on the App Store"
                className="h-12 hover:opacity-80 transition rounded-md shadow-md"
              />
            </button>
          </div>
        </div>

        {/* Contact Info & Socials */}
        <div className="md:ml-8">
          <h3 className="text-lg font-semibold text-orange-400 mb-3">
            Contact Info
          </h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-orange-400" /> +977-9845207641
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-orange-400" />
              madhyaraat@quickbites.com
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-orange-400" /> Butwal, Nepal
            </li>
          </ul>

          <div className="mt-4 flex gap-4 text-xl">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-orange-400 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-orange-400 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-orange-400 transition"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
        © 2025 <span className="text-orange-500 font-semibold">QuickBites</span>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
