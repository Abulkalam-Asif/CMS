import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { H1, HR, HSpecial } from "../../components";

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
      <div className="flex-1 px-6 py-8 pt-4">
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
      </div>
    </>
  );
};

export default Student;
