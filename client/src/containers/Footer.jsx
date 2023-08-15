import React from "react";
import { Link } from "react-router-dom";
import { HR, LogoItem } from "../components";

const Footer = () => {
  return (
    <>
      <footer className="bg-white px-10 pt-3 pb-5">
        <div className="flex justify-between items-center sm:flex-col sm:items-start sm:gap-y-2">
          <LogoItem />
          <ul className="flex flex-wrap gap-x-6 items-stretch text-base font-medium text-gray-500 md:gap-x-4 xs:gap-x-0 xs:gap-y-1 xs:w-full">
            <li className="xs:w-1/2">
              <Link to="/" className="hover:underline hover:text-pink-700">
                Home
              </Link>
            </li>
            <li className="xs:w-1/2">
              <Link to="/admin" className="hover:underline hover:text-pink-700">
                Admin Panel
              </Link>
            </li>
            <li className="xs:w-1/2">
              <Link
                to="/student"
                className="hover:underline hover:text-pink-700">
                Student Panel
              </Link>
            </li>
            <li className="xs:w-1/2">
              <Link
                to="/teacher"
                className="hover:underline hover:text-pink-700">
                Teacher Panel
              </Link>
            </li>
          </ul>
        </div>
        <HR className="my-3" borderThickness="border-1" />
        <p className="text-sm text-gray-500 sm:text-center">
          © 2023 CMS™. All Rights Reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
