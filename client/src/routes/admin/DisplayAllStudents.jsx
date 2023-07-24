import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { LinkButton, Spinner } from "../../components";
import {
  useGetStudentsAllQuery,
  useDeleteStudentMutation,
} from "../../store/api/adminApi/adminStudentApi";
import Table from "../../containers/Table";

const DisplayAllStudents = () => {
  const {
    data: studentsData,
    isLoading: isGettingStudents,
    refetch: refetchStudents,
  } = useGetStudentsAllQuery();
  const [deleteStudentMutation, { isLoading: isDeletingStudent }] =
    useDeleteStudentMutation();

  return (
    <>
      <div className="p-2 max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="font-bold my-4 text-pink-700 text-3xl">
            Students List
          </h1>
          <LinkButton
            to="/admin/manageStudents"
            content={
              <>
                <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
                Back to Manage Students
              </>
            }
          />
        </div>
        <hr className="border-2 border-pink-700" />
        <div className="mt-4">
          {isGettingStudents ? (
            <Spinner
              size="w-24 h-24"
              className="absolute right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2"
            />
          ) : (
            <Table
              data={studentsData?.studentsList}
              noData={
                <>
                  <span className="mr-4 text-lg font-semibold">
                    No Students found!
                  </span>
                  <LinkButton
                    to="/admin/manageStudents/addNewStudent"
                    content="Add New Student"
                  />
                </>
              }
              keysToInclude={[
                ["rollNo", "Roll No."],
                ["firstName", "First Name"],
                ["lastName", "Last Name"],
                ["gender", "Gender"],
                ["program", "Program"],
                ["action", "Action"],
              ]}
              excludeSort={["action"]}
              deleteDataMutation={{
                caller: deleteStudentMutation,
                isLoading: isDeletingStudent,
              }}
              deleteButtonName="rollNo"
              refetchData={refetchStudents}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayAllStudents;
