import React from "react";

const Button = (props) => {
  const { content, onClick, className, size, customAttributes, type } = props;
  let sizeStyles;
  if (size === "small") {
    sizeStyles = "p-2 font-medium border-2";
  } else if (size === "medium") {
    sizeStyles = "py-2 px-4 font-medium border-2 text-xl";
  } else if (size === "large") {
    sizeStyles =
      "py-3 px-6 font-bold border-4 text-3xl lg:text-2xl md:text-xl md:py-2";
  } else {
    sizeStyles = "";
  }

  let typeStyles;
  if (type === "outlined") {
    typeStyles = "text-pink-700 hocus:bg-pink-700 hocus:text-white";
  } else if (type === "filled") {
    typeStyles =
      "text-white bg-pink-700 hocus:bg-pink-900 hocus:border-pink-900";
  } else {
    typeStyles = "";
  }
  return (
    <>
      <button
        className={`text-center border-2 border-pink-700 rounded-lg transition-colors duration-200 ${typeStyles} ${sizeStyles} ${className}`}
        onClick={onClick}
        {...customAttributes}>
        {content}
      </button>
    </>
  );
};

Button.defaultProps = {
  type: "outlined",
  size: "small",
  className: "",
};

export default Button;
