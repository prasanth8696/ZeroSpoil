import React from "react";

const Footer = ({ darkMode  }) => {
  return (
    <footer
      className={`${
        darkMode  ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-800"
      } transition-all duration-300`}
    >
      {/* Top Section */}
      <div className="container mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo & App Links */}
        <div>
          <h2 className="text-2xl font-bold text-green-500">ZeroSpoil</h2>
          <div className="mt-3">
            <img
              src="/images/appstore.png"
              alt="App Store"
              className="w-32 mb-2"
            />
            <img
              src="/images/googleplay.png"
              alt="Google Play"
              className="w-32"
            />
          </div>
          <p className="mt-3 text-sm">
            Company # 493003-445, Registered with House of Companies.
          </p>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="font-semibold">Get Exclusive Deals in Your Inbox</h3>
          <div className="mt-3 flex">
            <input
              type="email"
              placeholder="youremail@gmail.com"
              className="w-full px-3 py-2 border rounded-l-md focus:outline-none"
            />
            <button className="bg-orange-500 text-white px-4 rounded-r-md">
              Subscribe
            </button>
          </div>
          <p className="text-xs mt-2">
            We won’t spam, read our{" "}
            <a href="#" className="text-blue-500">
              email policy
            </a>
          </p>
          <div className="flex gap-3 mt-4 text-xl">
            <a href="#" className="hover:text-blue-400">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-pink-400">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-black">
              <i className="fab fa-tiktok"></i>
            </a>
            <a href="#" className="hover:text-yellow-400">
              <i className="fab fa-snapchat"></i>
            </a>
          </div>
        </div>

        {/* Legal Pages */}
        <div>
          <h3 className="font-semibold">Legal Pages</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Terms and Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Cookies
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Modern Slavery Statement
              </a>
            </li>
          </ul>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="font-semibold">Important Links</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Get help
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Add your restaurant
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Sign up to deliver
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Create a business account
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        className={`${
            darkMode  ? "bg-gray-800 text-gray-400" : "bg-gray-900 text-gray-400"
        } text-sm py-3 text-center flex flex-wrap justify-center gap-4`}
      >
        <p>© 2024 ZeroSpoil. All Rights Reserved.</p>
        <a href="#" className="hover:text-white">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-white">
          Terms
        </a>
        <a href="#" className="hover:text-white">
          Pricing
        </a>
        <a href="#" className="hover:text-white">
          Do not sell or share my personal information
        </a>
      </div>
    </footer>
  );
};

export default Footer;
