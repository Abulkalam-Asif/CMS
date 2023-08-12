import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { H1, HR } from "../../components";

const Teacher = () => {
  const [teacherData, setTeacherData] = useState(null);
  const userData = useSelector((state) => state.userData?.data?.teacher);

  useEffect(() => {
    setTeacherData(userData);
  }, []);

  return (
    <>
      <div>
        <H1
          content={
            <>
              <span className="text-2xl text-gray-700">Welcome</span>{" "}
              {teacherData &&
                `${teacherData?.firstName} ${teacherData?.lastName}`}{" "}
              - Teacher Panel
            </>
          }
        />
        <HR />
      </div>
    </>
  );
};

export default Teacher;
