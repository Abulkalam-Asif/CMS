import React from "react";
import { LinkButton } from "../components";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/slices/loginSlice";

const Home = () => {
  const dispatch = useDispatch();
  const clickHandler = (e) => {
    dispatch(setLogin(e.target.innerText.toLowerCase()));
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 mt-40">
        <h1 className="font-bold my-8 text-pink-700 text-6xl">Login As</h1>
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
