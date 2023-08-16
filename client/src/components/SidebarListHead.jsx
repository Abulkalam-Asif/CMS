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
          <button
            name={name}
            className="mr-2 rounded-lg border-2 border-pink-700 bg-pink-700 text-white hocus:bg-white hocus:text-pink-700 transition-colors duration-200"
            onClick={onButtonClick}>
            <FontAwesomeIcon
              icon={faAngleDown}
              border
              className="border-none"
              size="2xl"
            />
          </button>
        )}
        <Link
          to={to}
          onClick={onLinkClick}
          className="font-bold text-lg rounded-lg w-full px-4 py-2 bg-pink-700 text-white border-2 border-pink-700 hocus:bg-white hocus:text-pink-700 transition-colors duration-200">
          {title}
        </Link>
      </div>
    </>
  );
};

export default SidebarListHead;
