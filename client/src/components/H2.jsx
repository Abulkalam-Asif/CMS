import React from "react";

const H2 = ({ content, className }) => {
  return (
    <>
      <h2
        className={`font-semibold text-pink-700 text-2xl md:text-xl ${className}`}>
        {content}
      </h2>
    </>
  );
};
H2.defaultProps = {
  className: "",
};

export default H2;
