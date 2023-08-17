import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoginUserType } from "../store/slices/loginUserTypeSlice";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../store/slices/alertSlice";
import { clearUserData, setUserData } from "../store/slices/userDataSlice";
import { useAdminLoginMutation } from "../store/api/authApi/authAdminApi";
import { useStudentLoginMutation } from "../store/api/authApi/authStudentApi";
import { useTeacherLoginMutation } from "../store/api/authApi/authTeacherApi";
import { showLogoutButton } from "../store/slices/logoutButtonSlice";
import { setLoggedInUserType } from "../store/slices/loggedInUserTypeSlice"

export const useAuthenticate = (userType) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let loginUser, data, error, isLoading;
  if (userType === "admin") {
    [loginUser, { data, error, isLoading }] = useAdminLoginMutation();
  } else if (userType === "student") {
    [loginUser, { data, error, isLoading }] = useStudentLoginMutation();
  } else if (userType === "teacher") {
    [loginUser, { data, error, isLoading }] = useTeacherLoginMutation();
  }

  const access_token = localStorage.getItem("access_token");
  useEffect(() => {
    if (!access_token) {
      dispatch(showAlert({ type: "error", message: `Please login.` }));
      dispatch(setLoginUserType(userType));
      setIsAuthenticated(false);
      navigate("/login");
    } else {
      data = null;
      loginUser({
        headers: { Authorization: access_token },
      });
    }
  }, [userType]);

  useEffect(() => {
    if (data) {
      setIsAuthenticated(true);
      dispatch(setUserData({ userType, data }));
      dispatch(setLoggedInUserType(userType));
      dispatch(showLogoutButton());
    }
    if (error) {
      dispatch(clearUserData());
      const errorMessage =
        error.data?.message || "An error occurred! Please retry.";
      dispatch(showAlert({ type: "error", message: errorMessage }));
      dispatch(setLoginUserType(userType));
      setIsAuthenticated(false);
      navigate("/login");
    }
  }, [data, error, userType]);

  return { isAuthenticated, isLoading };
}