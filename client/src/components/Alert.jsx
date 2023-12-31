import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "../store/slices/alertSlice";

const Alert = () => {
  const { show, type, message, seconds } = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        dispatch(hideAlert());
      }, seconds);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [dispatch, show]);

  return (
    <>
      {show && (
        <div
          className={`rounded-md p-3 border-y-6 fixed z-50 translate-x-1/2 right-1/2 top-2 shadow-[0_10px_30px_0px] ${
            type === "success"
              ? "text-green-800 border-green-600  bg-green-50"
              : "text-pink-800 border-pink-600 bg-red-50"
          }`}
          role="alert">
          <div className="ml-3 font-medium text-center">{message}</div>{" "}
        </div>
      )}
    </>
  );
};

Alert.defaultProps = {
  type: "success",
  message: "",
};

export default Alert;
