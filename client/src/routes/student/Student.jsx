import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, H1, H2, HR, HSpecial } from "../../components";
import List from "../../containers/List";

const Student = () => {
  const [studentData, setStudentData] = useState(null);
  const userData = useSelector((state) => state.userData?.data?.student);

  useEffect(() => {
    setStudentData(userData);
  }, []);
  const fullStudentName = `${studentData?.firstName} ${studentData?.lastName}`;
  const shortStudentName =
    fullStudentName?.length > 18
      ? fullStudentName.substring(0, 18) + "..."
      : fullStudentName;

  return (
    <>
      <div className="flex-1 px-6 py-4">
        <HSpecial content="Student Panel" />
        <H1
          content={
            <>
              <span className="text-2xl text-gray-700 md:text-xl">Welcome</span>{" "}
              <span className="whitespace-nowrap xs:hidden">
                {fullStudentName}
              </span>
              <span className="whitespace-nowrap hidden xs:inline">
                {shortStudentName}
              </span>
            </>
          }
        />
        <HR />
        {userData ? (
          <List
            heading="Your Student Details"
            titles={[
              "Roll No.",
              "First Name",
              "Last Name",
              "Gender",
              "Program",
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

export default Student;
