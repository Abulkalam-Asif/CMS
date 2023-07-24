import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAlert } from "../store/slices/alertSlice";

const Alert = () => {
  const { show, type, message, seconds } = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        dispatch(toggleAlert());
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
          className={`
            p-3 border-t-4 border-b-4 absolute translate-x-1/2 right-1/2 top-4 ${
              type === "success"
                ? "text-green-800 border-green-600  bg-green-50"
                : "text-pink-800 border-pink-600 bg-red-50"
            }`}
          role="alert">
          <div className="ml-3 font-medium text-center">{message}</div>
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
