import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { H1, HR } from "../../components";

const Student = () => {
  const [studentData, setStudentData] = useState(null);
  const userData = useSelector((state) => state.userData?.data?.student);

  useEffect(() => {
    setStudentData(userData);
  }, []);

  return (
    <>
      <div>
        <H1
          content={
            <>
              <span className="text-2xl text-gray-700">Welcome</span>{" "}
              {studentData &&
                `${studentData?.firstName} ${studentData?.lastName}`}{" "}
              - Student Panel
            </>
          }
        />
        <HR />
      </div>
    </>
  );
};

export default Student;
