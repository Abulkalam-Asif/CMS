import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, H1, HR, HSpecial } from "../../components";
import List from "../../containers/List";

const Teacher = () => {
  const [teacherData, setTeacherData] = useState(null);
  const userData = useSelector((state) => state.userData?.data?.teacher);

  useEffect(() => {
    setTeacherData(userData);
  }, []);

  const fullTeacherName = `${teacherData?.firstName} ${teacherData?.lastName}`;
  const shortTeacherName =
    fullTeacherName?.length > 18
      ? fullTeacherName.substring(0, 18) + "..."
      : fullTeacherName;

  return (
    <>
      <div className="flex-1 px-6 py-4">
        <HSpecial content="Teacher Panel" />
        <H1
          content={
            <>
              <span className="text-2xl text-gray-700 md:text-xl">Welcome</span>{" "}
              <span className="whitespace-nowrap xs:hidden">
                {fullTeacherName}
              </span>
              <span className="whitespace-nowrap hidden xs:inline">
                {shortTeacherName}
              </span>
            </>
          }
        />
        <HR />
        {userData ? (
          <List
            heading="Your Teacher Details"
            titles={[
              "Teacher ID",
              "First Name",
              "Last Name",
              "Gender",
              "Qualification",
              "Department",
            ]}
            descriptions={Object.values(userData)}
          />
        ) : (
          <div className="my-12 text-center xs:flex xs:flex-col xs:gap-y-2">
            <span className="text-lg font-semibold sm:text-base">
              No Data found! Please{" "}
            </span>
            <Button
              onClick={() => window.location.reload()}
              content="Refresh the page"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Teacher;
