import React from "react";
import { Link } from "react-router-dom";

const LinkButton = (props) => {
  const { to, content, size, onClick, className } = props;
  let sizeStyles;
  if (size === "small") {
    sizeStyles = "p-2 font-semibold border-2";
  } else if (size === "medium") {
    sizeStyles = "py-2 px-4 text-xl font-semibold border-2";
  } else if (size === "large") {
    sizeStyles = "py-3 px-6 text-3xl font-bold border-4";
  }
  return (
    <>
      <Link
        to={to}
        className={`${className} border-pink-700 text-pink-700 rounded-lg hover:bg-pink-700 hover:text-white transition-colors duration-200 ${sizeStyles}`}
        onClick={onClick}>
        {content}
      </Link>
    </>
  );
};

LinkButton.defaultProps = {
  size: "small",
};

export default LinkButton;