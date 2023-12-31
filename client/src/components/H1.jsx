import React from "react";

const H1 = ({ content, size, className }) => {
  return (
    <>
      <h1 className={`font-bold text-pink-700 ${size} ${className}`}>
        {content}
      </h1>
    </>
  );
};

H1.defaultProps = {
  size: "text-3xl md:text-2xl",
  className: "",
};

export default H1;
