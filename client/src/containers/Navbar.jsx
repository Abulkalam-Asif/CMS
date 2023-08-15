import React from "react";
import { Button, LinkButton, LogoItem } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faBarsStaggered,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../store/slices/alertSlice";
import { hideLogoutButton } from "../store/slices/logoutButtonSlice";
import { clearUserData } from "../store/slices/userDataSlice";

const Navbar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sidebar, setSidebar } = props.sidebarHandler;
  const isUserLoggedIn = useSelector((state) => state.logoutButton);
  const loginUserType = useSelector((state) => state.loginUserType);

  const logoutHandler = () => {
    navigate("/");
    dispatch(
      showAlert({
        type: "success",
        message: `Logged out as ${loginUserType.toUpperCase()} Successfully.`,
      })
    );
    dispatch(hideLogoutButton());
    dispatch(clearUserData());
    localStorage.removeItem("access_token");
  };

  return (
    <>
      <header className="bg-gray-300 flex flex-row justify-between items-center px-10 py-3 lg:px-2 md:px-10 xs:px-3">
        <LogoItem />
        <nav className="flex gap-4 mr-5 md:hidden">
          <LinkButton to="/" content="Home" />
          <LinkButton to="/admin" content="Admin Panel" />
          <LinkButton to="/student" content="Student Panel" />
          <LinkButton to="/teacher" content="Teacher Panel" />
        </nav>
        {/* UNDO */}
        {isUserLoggedIn && (
          <Button
            className="mr-5"
            size="small"
            type="filled"
            content="Log out"
            onClick={logoutHandler}
          />
        )}
        <button
          onClick={() => {
            sidebar === "in" ? setSidebar("out") : setSidebar("in");
          }}
          className="fa-layers text-pink-700 hover:text-pink-900 transition-colors duration-200 mr-5">
          <FontAwesomeIcon
            icon={faSquare}
            transform={"grow-3 left-7"}
            size="3x"
          />
          <FontAwesomeIcon
            className="text-white"
            icon={faAngleLeft}
            transform={"left-10"}
            size="2x"
          />
          <FontAwesomeIcon
            className="text-white"
            icon={faBarsStaggered}
            size="lg"
          />
        </button>
      </header>
    </>
  );
};

export default Navbar;
