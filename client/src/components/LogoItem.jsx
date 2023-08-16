import React from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const LogoItem = () => {
  return (
    <>
      <Link
        to="/"
        className="flex items-center gap-2 border-2 border-transparent hocus:border-pink-700 p-1 rounded-lg transition-all duration-200">
        <img src={Logo} alt="Logo" width="28px" className="w-7 md:w-10" />
        <h1 className="text-xl font-bold text-pink-700 border-l-2 border-l-pink-700 pl-2 md:text-3xl">
          CMS
        </h1>
      </Link>
    </>
  );
};

export default LogoItem;
