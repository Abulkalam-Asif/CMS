import React from "react";

const Button = (props) => {
  const { content, onClick, className, size, customAttributes } = props;
  let sizeStyles;
  if (size === "small") {
    sizeStyles = "p-2 font-semibold border-2";
  } else if (size === "medium") {
    sizeStyles = "py-2 px-4 font-semibold border-2 text-xl";
  } else if (size === "large") {
    sizeStyles =
    "py-3 px-6 font-bold border-4 text-3xl lg:text-2xl md:text-xl md:py-2";
  }
  return (
    <>
      <button
        className={`${className} text-center border-2 border-pink-700 text-pink-700 rounded-lg hover:bg-pink-700 hover:text-white transition-colors duration-200 ${sizeStyles}`}
        onClick={onClick}
        {...customAttributes}>
        {content}
      </button>
    </>
  );
};

Button.defaultProps = {
  size: "small",
};

export default Button;
