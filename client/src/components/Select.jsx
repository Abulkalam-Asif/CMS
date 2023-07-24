import React from "react";

const Select = (props) => {
  const { nameIdHtmlFor, labelText, options, onChange } = props;
  return (
    <>
      <div>
        <label
          htmlFor={nameIdHtmlFor}
          className="block mb-2 font-medium text-gray-900">
          {labelText}
        </label>
        <select
          id={nameIdHtmlFor}
          name={nameIdHtmlFor}
          onChange={onChange}
          className="border-2 w-full border-gray-300 rounded-lg px-4 py-2 focus:border-black">
          {options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Select;
