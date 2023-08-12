import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { H1, HR, LinkButton } from "../../components";

const Admin = () => {
  const [adminData, setAdminData] = useState(null);
  const userData = useSelector((state) => state.userData?.data?.admin);

  useEffect(() => {
    setAdminData(userData);
  }, []);

  return (
    <>
      <div>
        <H1
          content={
            <>
              <span className="text-2xl text-gray-700">Welcome</span>{" "}
              {adminData && `${adminData?.name}`} - Admin Panel
            </>
          }
        />
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
