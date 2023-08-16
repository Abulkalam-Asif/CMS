import React from "react";

const HR = ({ className, thickness }) => {
  let borderThickness;
  if (thickness === "thick") {
    borderThickness = "border-2";
  } else if (thickness === "thin") {
    borderThickness = "border-1";
  }
  return (
    <>
      <hr className={`${borderThickness} border-pink-700 my-3 ${className}`} />
    </>
  );
};

HR.defaultProps = {
  thickness: "thick",
};

export default HR;
