import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h6 className="text-xl font-semibold mb-2">IMDb Clone</h6>
            <p className="text-gray-400">
              Welcome to IMDb Clone, your go-to source for movie information, ratings, and reviews. Discover movies and shows tailored just for you.
            </p>
          </div>
          <div>
            <h6 className="text-xl font-semibold mb-2">Quick Links</h6>
            <ul className="list-none p-0">
              <li>
                <Link to="/about" className="text-yellow-500 hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-yellow-500 hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-yellow-500 hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-yellow-500 hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-yellow-500 hover:underline">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="text-xl font-semibold mb-2">Contact</h6>
            <p className="text-gray-400">Email: support@imdbclone.com</p>
            <p className="text-gray-400">Phone: +1 234 567 8901</p>
            <p className="text-gray-400">Address: 123 Movie Lane, Hollywood, CA, USA</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} IMDb Clone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

