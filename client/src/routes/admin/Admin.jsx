import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { H1, HR, HSpecial, LinkButton } from "../../components";

const Admin = () => {
  const [adminData, setAdminData] = useState(null);
  const userData = useSelector((state) => state.userData?.data?.admin);

  useEffect(() => {
    setAdminData(userData);
  }, []);

  const fullAdminName = adminData?.name;
  const shortAdminName =
    fullAdminName?.length > 18
      ? fullAdminName.substring(0, 18) + "..."
      : fullAdminName;

  return (
    <>
      <div className="flex-1 px-6 py-8 pt-4">
        <HSpecial content="Admin Panel" />
        <H1
          content={
            <>
              <span className="text-2xl text-gray-700 md:text-xl">Welcome</span>{" "}
              <span className="whitespace-nowrap xs:hidden">
                {fullAdminName}
              </span>
              <span className="whitespace-nowrap hidden xs:inline">
                {shortAdminName}
              </span>
            </>
          }
        />
        <HR />
        <div className="flex gap-x-8 pt-4 px-4 md:flex-col md:gap-y-4 md:items-center">
          <LinkButton
            className="md:w-1/2 sm:w-full"
            to="/admin/manageStudents"
            size="medium"
            content="Manage Students"
          />
          <LinkButton
            className="md:w-1/2 sm:w-full"
            to="/admin/manageTeachers"
            size="medium"
            content="Manage Teachers"
          />
          <LinkButton
            className="md:w-1/2 sm:w-full"
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
