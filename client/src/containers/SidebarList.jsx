import React from "react";
import { Link } from "react-router-dom";

const SidebarList = (props) => {
  const { onLinkClick, listItems, listRef } = props;
  return (
    <>
      <div
        className="grid transition-grid-template-rows duration-200"
        ref={listRef}
        style={{ gridTemplateRows: "0fr" }}>
        <ul className="pl-12 flex flex-col gap-y-2 list-square overflow-hidden">
          {listItems.map((item, index) => (
            <li key={index}>
              <Link
                className="hover:text-pink-700 font-semibold"
                to={item.to}
                onClick={onLinkClick}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SidebarList;