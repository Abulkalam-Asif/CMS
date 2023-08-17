import React from "react";

const ListItem = ({ title, description }) => {
  return (
    <>
      <div className="flex items-center text-lg gap-x-4 px-2 xs:text-base">
        <dt className="w-1/3 text-gray-600">{title}</dt>
        <dd className="w-2/3 font-semibold text-gray-900">{description}</dd>
      </div>
    </>
  );
};

export default ListItem;
