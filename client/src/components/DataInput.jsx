import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const DataInput = (props) => {
  const {
    onChange,
    showPassword,
    setShowPassword,
    nameIdHtmlFor,
    labelText,
    value,
    className,
    placeholder,
    warning,
    warningText,
    type,
  } = props;

  const showPasswordHandler = (e) => {
    e.preventDefault();
    setShowPassword((prevState) => !prevState);
  };
  const [inputType, setInputType] = useState("password");

  useEffect(() => {
    if (showPassword !== undefined) {
      setInputType(showPassword ? "text" : "password");
    } else {
      setInputType(type);
    }
  }, [showPassword]);

  return (
    <>
      <div className={`${className}`}>
        <div className="flex items-center justify-between mb-2 lg:flex-col lg:items-start">
          <label
            className="block mb-2 font-medium text-gray-900"
            htmlFor={nameIdHtmlFor}>
            {labelText}
          </label>
          {warning && (
            <p className="bg-pink-700 text-white italic font-semibold text-sm px-2 py-1 rounded-full lg:p-1 md:text-xs">
              <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
              {warningText}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            className="border-2 w-full border-gray-300 rounded-lg p-2 placeholder:text-gray-400 focus:border-black"
            type={inputType}
            name={nameIdHtmlFor}
            id={nameIdHtmlFor}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
          />
          {showPassword !== undefined && (
            <button
              type="button"
              onClick={showPasswordHandler}
              className="absolute top-0 right-3 translate-y-1/2 px-1 rounded transition-colors duration-100 hocus:text-pink-700">
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

DataInput.defaultProps = {
  type: "text",
  showPassword: undefined,
};

export default DataInput;
