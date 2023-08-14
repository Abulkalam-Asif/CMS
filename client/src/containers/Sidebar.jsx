import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import { SidebarListHead } from "../components";
import { SidebarList } from "./";

const Sidebar = (props) => {
  const { sidebar, setSidebar } = props.sidebarHandler;
  const bgRef = useRef(null);
  const sidebarRef = useRef(null);

  const adminListRef = useRef(null);
  const studentListRef = useRef(null);

  const clickHandler = () => {
    setSidebar("in");
  };
  const expandHandler = (e) => {
    const triggerer = e.currentTarget.name;
    let target;
    if (triggerer === "adminListHead") {
      target = adminListRef.current;
    } else if (triggerer === "studentListHead") {
      target = studentListRef.current;
    }
    if (target.style.gridTemplateRows === "0fr") {
      target.style.gridTemplateRows = "1fr";
    } else {
      target.style.gridTemplateRows = "0fr";
    }
  };

  useEffect(() => {
    if (sidebar === "in") {
      bgRef.current.style.display = "none";
      sidebarRef.current.style.right = "-100%";
    } else if (sidebar === "out") {
      bgRef.current.style.display = "block";
      sidebarRef.current.style.right = "0";
    }
  }, [sidebar]);

  return (
    <>
      <div
        ref={bgRef}
        className="w-screen h-screen bg-black opacity-75 fixed z-10 top-0 right-0 hidden"
        onClick={clickHandler}></div>
      <div
        ref={sidebarRef}
        className="bg-gray-100 h-screen fixed top-0 -right-full pt-12 pb-4 pl-16 pr-12 overflow-y-auto z-20 transition-right duration-300 md:w-full">
        <button className="absolute top-2 left-2" onClick={clickHandler}>
          <FontAwesomeIcon
            icon={faXmark}
            border
            className="rounded-lg border-pink-700 bg-pink-700 text-white hover:bg-white hover:text-pink-700 transition-colors duration-200"
            size="2xl"
          />
        </button>
        <SidebarListHead
          title="Home"
          to="/"
          isExpandable={false}
          onLinkClick={clickHandler}
        />
        <div></div>
        <SidebarListHead
          title="Admin Panel"
          name="adminListHead"
          to="/admin"
          isExpandable={true}
          onButtonClick={expandHandler}
          onLinkClick={clickHandler}
        />
        <SidebarList
          listRef={adminListRef}
          onLinkClick={clickHandler}
          listItems={[
            {
              title: "Manage Students",
              to: "/admin/manageStudents",
            },
            {
              title: "Manage Teachers",
              to: "/admin/manageTeachers",
            },
            {
              title: "Manage Courses",
              to: "/admin/manageCourses",
            },
          ]}
        />
        <SidebarListHead
          title="Student Panel"
          to="/student"
          isExpandable={false}
          onLinkClick={clickHandler}
          // name="studentListHead"
          // onButtonClick={expandHandler}
        />
        <SidebarListHead
          title="Teacher Panel"
          to="/teacher"
          isExpandable={false}
          onLinkClick={clickHandler}
          // name="teacherListHead"
          // onButtonClick={expandHandler}
        />
      </div>
    </>
  );
};

export default Sidebar;
