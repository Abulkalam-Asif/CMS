import React, { useEffect, useState } from "react";
import { Button, DataInput, H1, HR, Spinner } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../store/slices/alertSlice";
import { setUserData } from "../store/slices/userDataSlice";
import { useStudentLoginMutation } from "../store/api/authApi/authStudentApi";
import { useNavigate } from "react-router-dom";
import { useAdminLoginMutation } from "../store/api/authApi/authAdminApi";
import {
  ADMIN_PASSWORD_MIN_LENGTH,
  ADMIN_USERNAME_MIN_LENGTH,
  STUDENT_PASSWORD_MIN_LENGTH,
  STUDENT_ROLL_NO_LENGTH,
  TEACHER_ID_LENGTH,
  TEACHER_PASSWORD_MIN_LENGTH,
} from "../constants";
import { useTeacherLoginMutation } from "../store/api/authApi/authTeacherApi";
import { setLoggedInUserType } from "../store/slices/loggedInUserTypeSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUserType = useSelector((state) => state.loginUserType);
  const [showPassword, setShowPassword] = useState(false);

  // The keys of this object will be connected to loginUserType
  const usernameType = {
    admin: ["username", "Username"],
    student: ["rollNo", "Roll No."],
    teacher: ["teacherId", "Teacher ID"],
  };

  const [user, setUser] = useState({
    [usernameType[loginUserType][0]]: "",
    password: "",
  });

  // Warning map to set the warning in the useEffect() while updating dataInputProps
  const warningStatesMap = {
    admin: {
      usernameWarningMap: user?.username?.length < ADMIN_USERNAME_MIN_LENGTH,
      usernameWarningTextMap: `Length should be minimum ${ADMIN_USERNAME_MIN_LENGTH} characters`,
      passwordWarningMap: user?.password?.length < ADMIN_PASSWORD_MIN_LENGTH,
      passwordWarningTextMap: `Length should be minimum ${ADMIN_PASSWORD_MIN_LENGTH} characters`,
    },
    student: {
      usernameWarningMap: user?.rollNo?.length != STUDENT_ROLL_NO_LENGTH,
      usernameWarningTextMap: `Length should be exactly ${STUDENT_ROLL_NO_LENGTH} characters`,
      passwordWarningMap: user?.password?.length < STUDENT_PASSWORD_MIN_LENGTH,
      passwordWarningTextMap: `Length should be minimum ${STUDENT_PASSWORD_MIN_LENGTH} characters`,
    },
    teacher: {
      usernameWarningMap: user?.teacherId?.length != TEACHER_ID_LENGTH,
      usernameWarningTextMap: `Length should be exactly ${TEACHER_ID_LENGTH} characters`,
      passwordWarningMap: user?.password?.length < TEACHER_PASSWORD_MIN_LENGTH,
      passwordWarningTextMap: `Length should be minimum ${TEACHER_PASSWORD_MIN_LENGTH} characters`,
    },
  };

  // Dynamically defining props for <DataInput />'s based on the type of user
  const [dataInputProps, setDataInputProps] = useState({
    usernameValue: user?.username,
    usernamePlaceholder: `Enter your ${usernameType[loginUserType][1]}`,
    usernameWarning: warningStatesMap[loginUserType].usernameWarningMap,
    usernameWarningText: warningStatesMap[loginUserType].usernameWarningTextMap,
    passwordValue: user?.password,
    passwordPlaceholder: `Enter your password`,
    passwordWarning: warningStatesMap[loginUserType].passwordWarningMap,
    passwordWarningText: warningStatesMap[loginUserType].passwordWarningTextMap,
  });

  // Updating the user state on user input
  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Updating the dataInputProps when the user state changes
  useEffect(() => {
    setDataInputProps((prevDataInputProps) => ({
      ...prevDataInputProps,
      usernameValue: user?.[usernameType[loginUserType][0]],
      passwordValue: user?.password,
      usernameWarning: warningStatesMap[loginUserType].usernameWarningMap,
      passwordWarning: warningStatesMap[loginUserType].passwordWarningMap,
    }));
  }, [user, loginUserType]);

  // Setting the login mutation based on the type of user
  let loginUser, isLoggingUserIn;
  if (loginUserType === "admin") {
    [loginUser, { isLoading: isLoggingUserIn }] = useAdminLoginMutation();
  } else if (loginUserType === "student") {
    [loginUser, { isLoading: isLoggingUserIn }] = useStudentLoginMutation();
  } else if (loginUserType === "teacher") {
    [loginUser, { isLoading: isLoggingUserIn }] = useTeacherLoginMutation();
  }

  // If the access_token is found, the user will not have to provide the username and the password and he will be authhenticated automatically
  const access_token = localStorage.getItem("access_token");
  useEffect(() => {
    const asyncLoginUser = async () => {
      if (access_token) {
        const { data } = await loginUser({
          headers: { Authorization: access_token },
        });
        if (data) {
          // Setting user data to be displayed on the next page
          dispatch(setUserData({ userType: loginUserType, data }));
          dispatch(setLoggedInUserType(loginUserType));
          navigate(`/${loginUserType}`);
        }
      }
    };
    asyncLoginUser();
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    // Removing extra spaces from input fields
    const trimmedUser = {};
    for (let key in user) {
      trimmedUser[key] = user[key].replace(/\s+/g, " ").trim();
    }
    // If extra spaces were found and removed, show alert to resubmit the form.
    for (let key in user) {
      if (trimmedUser[key].localeCompare(user[key]) !== 0) {
        dispatch(
          showAlert({
            type: "error",
            message: `Extra spaces found and removed from the fields. Please login again.`,
          })
        );
        setUser(trimmedUser);
        return;
      }
    }
    // If data entered by the user is invalid, show the alert.
    if (
      warningStatesMap[loginUserType].usernameWarningMap ||
      warningStatesMap[loginUserType].passwordWarningMap
    ) {
      dispatch(
        showAlert({
          type: "error",
          message: "Please fill the form with valid data.",
        })
      );
    } else {
      // Sending POST request to server with user data
      const { error, data } = await loginUser({ body: user });
      if (error) {
        const errorMessage =
          error.data?.message || "An error occurred! Please retry.";
        dispatch(showAlert({ type: "error", message: errorMessage }));
      } else {
        dispatch(showAlert({ type: "success", message: data.message }));
        // Setting user data to be displayed on the next page
        dispatch(setUserData({ userType: loginUserType, data }));
        dispatch(setLoggedInUserType(loginUserType));
        navigate(`/${loginUserType}`);
        localStorage.setItem("access_token", data.access_token);
      }
    }
  };
  return (
    <>
      {isLoggingUserIn ? (
        <Spinner type="centralizedSpinner" />
      ) : (
        <div className="flex-1 px-6 py-8">
          <H1 className="capitalize" content={`Login as ${loginUserType}`} />
          <HR />
          <form className="px-12 lg:px-2">
            <div className="grid grid-cols-2 gap-x-16 gap-y-4 my-12 lg:my-6 md:grid-cols-1">
              <DataInput
                labelText={usernameType[loginUserType][1]}
                nameIdHtmlFor={usernameType[loginUserType][0]}
                onChange={handleInputChange}
                value={dataInputProps?.usernameValue}
                placeholder={dataInputProps?.usernamePlaceholder}
                warning={dataInputProps?.usernameWarning}
                warningText={dataInputProps?.usernameWarningText}
              />
              <DataInput
                labelText="Password"
                nameIdHtmlFor="password"
                type="password"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                onChange={handleInputChange}
                value={dataInputProps?.passwordValue}
                placeholder={dataInputProps?.passwordPlaceholder}
                warning={dataInputProps?.passwordWarning}
                warningText={dataInputProps?.passwordWarningText}
              />
            </div>
            <Button
              className="block mx-auto"
              size="medium"
              content="Login"
              onClick={loginHandler}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
