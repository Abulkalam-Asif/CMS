import React from "react";
import { LinkButton, LogoItem } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faBarsStaggered,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = (props) => {
  const { sidebar, setSidebar } = props.sidebarHandler;

  return (
    <>
      <header className="bg-gray-300 flex flex-row justify-between items-center px-10 py-3">
        <LogoItem />
        <nav className="flex gap-4 mr-5 md:hidden">
          <LinkButton to="/" content="Home" />
          <LinkButton to="/admin" content="Admin Panel" />
          <LinkButton to="/student" content="Student Panel" />
          <LinkButton to="/teacher" content="Teacher Panel" />
        </nav>
        <button
          onClick={() => {
            sidebar === "in" ? setSidebar("out") : setSidebar("in");
          }}
          className="fa-layers text-pink-700 hover:text-pink-900 transition-colors duration-200 mr-5">
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
      </header>
    </>
  );
};

export default Navbar;
