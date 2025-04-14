import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700 py-12 mt-20">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-10 text-sm">

        {/* Column 1: Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-green-600 mb-3">YourShop</h2>
          <p className="text-gray-600">
            Premium quality products at unbeatable prices. Shop now and experience the best!
          </p>
          <div className="flex gap-4 mt-4 text-xl text-gray-500">
            <a href="#"><i className="fab fa-facebook hover:text-blue-600 transition"></i></a>
            <a href="#"><i className="fab fa-twitter hover:text-sky-400 transition"></i></a>
            <a href="#"><i className="fab fa-instagram hover:text-pink-500 transition"></i></a>
            <a href="#"><i className="fab fa-linkedin hover:text-blue-700 transition"></i></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-green-600 transition">Home</a></li>
            <li><a href="#" className="hover:text-green-600 transition">Shop</a></li>
            <li><a href="#" className="hover:text-green-600 transition">About</a></li>
            <li><a href="#" className="hover:text-green-600 transition">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Stay Connected */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Stay Connected</h3>
          <form className="space-y-3">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded border border-gray-300 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      <div className="border-t border-gray-300 mt-10 pt-4 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} YourShop. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
