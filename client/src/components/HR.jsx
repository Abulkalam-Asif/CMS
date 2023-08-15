import React from "react";

const HR = ({ className, borderThickness }) => {
  return (
    <>
      <hr className={`${borderThickness} border-pink-700 ${className}`} />
    </>
  );
};

HR.defaultProps = {
  borderThickness: "border-2",
};

export default HR;
