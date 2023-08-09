import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleAlert } from "../../store/slices/alertSlice";
import { useStudentLoginMutation } from "../../store/api/authApi/authStudentApi";
import { setUserData } from "../../store/slices/userDataSlice";
import { useState } from "react";
import { H1, HR, Spinner } from "../../components";
import { setLoginUserType } from "../../store/slices/loginUserTypeSlice";

const Student = () => {
  const [studentData, setStudentData] = useState(null);
  const userData = useSelector((state) => state.userData?.data?.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginStudent, { isLoading }] = useStudentLoginMutation();

  useEffect(() => {
    setStudentData(userData);
    // If Student reloads the page, userData state would be empty. So he is logged in with JWT
    if (!userData) {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        dispatch(toggleAlert({ type: "error", message: "Please login first" }));
        // To let user login as student
        dispatch(setLoginUserType("student"));
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
            // To let user login as student
            dispatch(setLoginUserType("student"));
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
        <Spinner size="w-24 h-24" type="centralizedSpinner" />
      ) : (
        <div>
          <H1
            content={
              <>
                <span className="text-2xl text-gray-700">Welcome</span>{" "}
                {studentData &&
                  `${studentData?.firstName} ${studentData?.lastName}`}{" "}
                - Student Panel
              </>
            }
          />
          <HR />
        </div>
      )}
    </>
  );
};

export default Student;
