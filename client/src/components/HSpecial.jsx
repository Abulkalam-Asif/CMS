import React from "react";

const HSpecial = ({ content, className }) => {
  return (
    <>
      <h1
        className={`text-4xl font-bold mb-4 text-white bg-pink-700 text-center py-2 rounded-lg md:text-3xl xs:text-2xl ${className}`}>
        {content}
      </h1>
    </>
  );
};

export default HSpecial;
