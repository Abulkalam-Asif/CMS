import React from "react";
import { LinkButton } from "../components";

const Navbar = () => {
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
      </div>
    </>
  );
};

export default Navbar;
