import React from "react";
import { LinkButton } from "../../components";

const Admin = () => {
  return (
    <>
      <div className="p-2">
        <h1 className="font-bold">Admin Panel</h1>
        <div className="flex gap-2 py-4 px-4">
          <LinkButton to="/admin/manageStudents" content="Manage Students" />
          <LinkButton to="/admin/manageTeachers" content="Manage Teachers" />
          <LinkButton to="/admin/manageCourses" content="Manage Courses" />
        </div>
      </div>
    </>
  );
};

export default Admin;
