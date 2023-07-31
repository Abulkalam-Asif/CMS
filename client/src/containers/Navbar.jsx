import React from "react";
import { LinkButton } from "../components";
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
      <div className="bg-gray-300 flex flex-row justify-between items-center px-10 py-3">
        <h1>CMS FCIT | University of the Punjab</h1>
        <div className="flex gap-4">
          <LinkButton to="/" content="Home" />
          <LinkButton to="/admin" content="Admin" />
          <LinkButton to="/teacher" content="Teacher" />
          <LinkButton to="/student" content="Student" />
        </div>
        <button
          onClick={() => {
            sidebar === "in" ? setSidebar("out") : setSidebar("in");
          }}
          className="fa-layers text-pink-700 hover:text-pink-900 transition-colors duration-300">
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
