import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleAlert } from "../../store/slices/alertSlice";
import { useStudentLoginMutation } from "../../store/api/studentApi";
import { setUserData } from "../../store/slices/userDataSlice";
import { useState } from "react";
import { Spinner } from "../../components";

const Student = () => {
  const [studentData, setStudentData] = useState(null);
  const userData = useSelector((state) => state.userData?.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginStudent, { isLoading }] = useStudentLoginMutation();

  useEffect(() => {
    setStudentData(userData);
    // If user relaods the page, retrieve his data on basis of JWT
    if (!userData) {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        dispatch(toggleAlert({ type: "error", message: "Please login first" }));
        navigate("/login");
      } else {
        const getStudentData = async () => {
          const { error, data } = await loginStudent({
            headers: { Authorization: access_token },
          });
          if (!error) {
            setStudentData(data.student);
            dispatch(toggleAlert({ type: "success", message: data.message }));
          } else {
            dispatch(
              toggleAlert({ type: "error", message: error.data.message })
            );
            navigate("/login");
          }
        };

        getStudentData();
      }
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner
          size="w-24 h-24"
          className="absolute right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2"
        />
      ) : (
        <div className="max-w-screen-xl mx-auto">
          <h1 className="font-bold my-4 text-2xl">
            Welcome&nbsp;
            <span className="text-3xl text-pink-700">
              {studentData &&
                `${studentData?.firstName} ${studentData?.lastName}`}
            </span>
          </h1>
          <hr className="border-2 border-pink-700" />
        </div>
      )}
    </>
  );
};

export default Student;
