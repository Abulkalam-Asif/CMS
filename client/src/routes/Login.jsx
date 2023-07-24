import React, { useState } from "react";
import { Button, DataInput, Spinner } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { toggleAlert } from "../store/slices/alertSlice";
import { setUserData } from "../store/slices/userDataSlice";
import { useStudentLoginMutation } from "../store/api/studentApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const navigate = useNavigate();
  
  const loginFields = {
    teacher: ["teacherId", "Teacher ID"],
    student: ["rollNo", "Roll No."],
    admin: ["useranme", "Username"],
  };

  let defaultUser = {
    [loginFields[login][0]]: "",
    password: "",
  };

  const [loginUser, { isLoading }] = useStudentLoginMutation();

  const [user, setUser] = useState(defaultUser);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

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
          toggleAlert({
            type: "error",
            message: `Extra spaces found and removed from the fields. Please login again.`,
          })
        );
        setUser(trimmedUser);
        return;
      }
    }
    // If data entered by the user is invalid, show the alert.
    if (user?.rollNo?.length != 10 || user?.password?.length < 4) {
      dispatch(
        toggleAlert({
          type: "error",
          message: "Please fill the form with valid data.",
        })
      );
    } else {
      const { error, data } = await loginUser({ body: user });
      if (error) {
        dispatch(toggleAlert({ type: "error", message: error?.data?.message }));
      } else {
        dispatch(toggleAlert({ type: "success", message: data?.message }));
        dispatch(setUserData(data));
        navigate("/student");
        localStorage.setItem("access_token", data?.access_token);
      }
    }
  };

  return (
    <>
      <div className="p-2 max-w-screen-xl mx-auto">
        <h1 className="font-bold my-4 text-pink-700 text-3xl capitalize">
          Login as {login}
        </h1>
        <hr className="border-2 border-pink-700" />
        <form className="px-12">
          <div className="grid grid-cols-2 gap-x-16 gap-y-4 my-16">
            <DataInput
              labelText={loginFields[login][1]}
              nameIdHtmlFor="rollNo"
              onChange={handleInputChange}
              value={user?.rollNo}
              placeholder={`Enter your ${loginFields[login][1]}`}
              warning={user?.rollNo?.length != 10}
              warningText={"Length should be exactly 10 characters"}
            />
            <DataInput
              labelText="Password"
              nameIdHtmlFor="password"
              onChange={handleInputChange}
              value={user?.password}
              placeholder="Enter your Password"
              warning={user?.password?.length < 4}
              warningText={"Length should be minimum 4 characters"}
            />
          </div>
          <div className="flex justify-center gap-4">
            <Button
              size="medium"
              content={isLoading ? <Spinner size="w-8 h-6" /> : "Login"}
              onClick={loginHandler}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
