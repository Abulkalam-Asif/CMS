import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const SidebarListHead = (props) => {
  const { onLinkClick, onButtonClick, isExpandable, to, title, name } = props;
  return (
    <>
      <div className="flex items-center my-2">
        {isExpandable && (
          <button name={name} className="mr-2" onClick={onButtonClick}>
            <FontAwesomeIcon
              icon={faAngleDown}
              border
              size="xl"
              className="rounded-lg border-pink-700 bg-pink-700 text-white hover:bg-white hover:text-pink-700 transition-colors duration-200"
            />
          </button>
        )}
        <Link
          to={to}
          onClick={onLinkClick}
          className="font-bold text-lg rounded-lg w-full px-4 py-1 bg-pink-700 text-white border-2 border-pink-700 hover:bg-white hover:text-pink-700 transition-colors duration-200">
          {title}
        </Link>
      </div>
    </>
  );
};

export default SidebarListHead;
