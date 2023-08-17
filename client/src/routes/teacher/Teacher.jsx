import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { H1, HR, HSpecial } from "../../components";

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
      <div className="flex-1 px-6 py-8 pt-4">
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
      </div>
    </>
  );
};

export default Teacher;
