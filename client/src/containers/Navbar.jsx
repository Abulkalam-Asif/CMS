import React from "react";
import Logo from "../assets/logo.png";
import { LinkButton } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faBarsStaggered,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { sidebar, setSidebar } = props.sidebarHandler;

  return (
    <>
      <div className="bg-gray-300 flex flex-row justify-between items-center px-10 py-3">
        <Link
          to="/"
          className="flex flex-row items-center gap-2 hover:bg-gray-400 p-2 rounded-lg">
          <img src={Logo} alt="Logo" width="28px" className="w-7 md:w-8" />
          <h1 className="text-xl font-bold text-pink-700 border-l-2 border-l-pink-700 pl-2">
            CMS
          </h1>
        </Link>
        <div className="flex gap-4 mr-5 md:hidden">
          <LinkButton to="/" content="Home" />
          <LinkButton to="/admin" content="Admin Panel" />
          <LinkButton to="/student" content="Student Panel" />
          <LinkButton to="/teacher" content="Teacher Panel" />
        </div>
        <button
          onClick={() => {
            sidebar === "in" ? setSidebar("out") : setSidebar("in");
          }}
          className="fa-layers text-pink-700 hover:text-pink-900 transition-colors duration-300 mr-5">
          <FontAwesomeIcon
            icon={faSquare}
            transform={"grow-3 left-7"}
            size="3x"
          />
          <FontAwesomeIcon
            className="text-white"
            icon={faAngleLeft}
            transform={"left-10"}
            size="2x"
          />
          <FontAwesomeIcon
            className="text-white"
            icon={faBarsStaggered}
            size="lg"
          />
        </button>
      </div>
    </>
  );
};

export default Navbar;
