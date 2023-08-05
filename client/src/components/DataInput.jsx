import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

const DataInput = (props) => {
  const {
    onChange,
    type,
    nameIdHtmlFor,
    labelText,
    value,
    className,
    placeholder,
    warning,
    warningText,
  } = props;
  return (
    <>
      <div className={`${className}`}>
        <div className="flex items-center justify-between">
          <label
            className="block mb-2 font-medium text-gray-900"
            htmlFor={nameIdHtmlFor}>
            {labelText}
          </label>
          {warning && (
            <p className="bg-pink-700 text-white italic font-semibold text-sm px-2 py-1 rounded-full">
              <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
              {warningText}
            </p>
          )}
        </div>
        <input
          className="border-2 w-full border-gray-300 rounded-lg p-2 placeholder:text-gray-400 focus:border-black"
          type={type}
          name={nameIdHtmlFor}
          id={nameIdHtmlFor}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

DataInput.defaultProps = {
  type: "text",
};

export default DataInput;
