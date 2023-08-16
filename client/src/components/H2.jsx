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

export default H2;
