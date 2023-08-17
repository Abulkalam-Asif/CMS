import React from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, H1, HR, LinkButton, Spinner } from "../../components";
import {
  useGetStudentsAllQuery,
  useDeleteStudentMutation,
} from "../../store/api/adminApi/adminStudentApi";
import { Table } from "../../containers";

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
      <div className="flex-1 px-6 py-8">
        <div className="flex justify-between items-center">
          <H1 content="Students List" />
          <LinkButton
            to="/admin/manageStudents"
            content={
              <>
                <FontAwesomeIcon className="mr-2 xs:mx-1" icon={faArrowLeft} />
                <span className="inline xs:hidden">
                  Back to Manage Students
                </span>
              </>
            }
          />
        </div>
        <HR />
        <div className="mt-4">
          {isGettingStudents ? (
            <Spinner size="w-24 h-24" type="centralizedSpinner" />
          ) : (
            <Table
              data={studentsData?.studentsList}
              noData={
                <>
                  <span className="text-lg font-semibold sm:text-base">
                    No Students found! Please{" "}
                  </span>
                  <Button
                    onClick={() => window.location.reload()}
                    content="Refresh the page"
                  />
                  <span className="mx-4 text-2xl font-bold text-pink-700">
                    OR
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
