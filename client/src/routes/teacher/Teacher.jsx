import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleAlert } from "../../store/slices/alertSlice";
import { useTeacherLoginMutation } from "../../store/api/authApi/authTeacherApi";
import { useState } from "react";
import { H1, HR, Spinner } from "../../components";
import { setLoginUserType } from "../../store/slices/loginUserTypeSlice";

const Teacher = () => {
  const [teacherData, setTeacherData] = useState(null);
  const userData = useSelector((state) => state.userData?.data?.teacher);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginTeacher, { isLoading }] = useTeacherLoginMutation();

  useEffect(() => {
    setTeacherData(userData);
    // If Teacher reloads the page, userData state would be empty. So he is logged in with JWT
    if (!userData) {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        dispatch(toggleAlert({ type: "error", message: "Please login first" }));
        // To let user login as teacher
        dispatch(setLoginUserType("teacher"));
        navigate("/login");
      } else {
        const getTeacherData = async () => {
          const { error, data } = await loginTeacher({
            headers: { Authorization: access_token },
          });
          if (!error) {
            setTeacherData(data.teacher);
            dispatch(toggleAlert({ type: "success", message: data.message }));
          } else {
            dispatch(
              toggleAlert({ type: "error", message: error.data.message })
            );
            // To let user login as teacher
            dispatch(setLoginUserType("teacher"));
            navigate("/login");
          }
        };

        getTeacherData();
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
                {teacherData &&
                  `${teacherData?.firstName} ${teacherData?.lastName}`}{" "}
                - Teacher Panel
              </>
            }
          />
          <HR />
        </div>
      )}
    </>
  );
};

export default Teacher;
