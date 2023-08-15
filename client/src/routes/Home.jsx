import React from "react";
import { H1, LinkButton } from "../components";
import { useDispatch } from "react-redux";
import { setLoginUserType } from "../store/slices/loginUserTypeSlice";

const Home = () => {
  const dispatch = useDispatch();
  const clickHandler = (e) => {
    dispatch(setLoginUserType(e.target.innerText.toLowerCase()));
  };

  return (
    <>
      <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2 w-full py-8">
        <H1 className="mb-8" content="Login As" size="text-6xl md:text-5xl mt-0" />
        <div className="flex gap-8 items-center md:flex-col md:gap-4 md:w-full">
          <LinkButton
            className="md:w-1/4 sm:w-1/2"
            to="/login"
            content="Admin"
            size="large"
            onClick={clickHandler}
          />
          <LinkButton
            className="md:w-1/4 sm:w-1/2"
            to="/login"
            content="Student"
            size="large"
            onClick={clickHandler}
          />
          <LinkButton
            className="md:w-1/4 sm:w-1/2"
            to="/login"
            content="Teacher"
            size="large"
            onClick={clickHandler}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
