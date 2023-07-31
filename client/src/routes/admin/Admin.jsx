import React from "react";
import { H1, HR, LinkButton } from "../../components";

const Admin = () => {
  return (
    <>
      <div>
        <H1 content="Admin Panel" />
        <HR />
        <div className="flex gap-x-8 py-4 px-4">
          <LinkButton
            to="/admin/manageStudents"
            size="medium"
            content="Manage Students"
          />
          <LinkButton
            to="/admin/manageTeachers"
            size="medium"
            content="Manage Teachers"
          />
          <LinkButton
            to="/admin/manageCourses"
            size="medium"
            content="Manage Courses"
          />
        </div>
      </div>
    </>
  );
};

export default Admin;
