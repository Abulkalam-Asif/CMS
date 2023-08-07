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
      <div className="flex flex-col items-center justify-center gap-2 mt-40">
        <H1 className="my-8" content="Login As" size="text-6xl" />
        <div className="flex gap-8 items-center">
          <LinkButton
            to="/login"
            content="Admin"
            size="large"
            onClick={clickHandler}
          />
          <LinkButton
            to="/login"
            content="Student"
            size="large"
            onClick={clickHandler}
          />
          <LinkButton
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
