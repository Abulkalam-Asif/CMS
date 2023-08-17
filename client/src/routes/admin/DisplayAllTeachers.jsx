import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, H1, HR, LinkButton, Spinner } from "../../components";
import {
  useDeleteTeacherMutation,
  useGetTeachersAllQuery,
} from "../../store/api/adminApi/adminTeacherApi";
import { Table } from "../../containers";

const DisplayAllTeachers = () => {
  const {
    data: teachersData,
    isLoading: isGettingTeachers,
    refetch: refetchTeachers,
  } = useGetTeachersAllQuery();
  const [deleteTeacherMutation, { isLoading: isDeletingTeacher }] =
    useDeleteTeacherMutation();

  return (
    <>
      <div className="flex-1 px-6 py-8">
        <div className="flex justify-between items-center">
          <H1 content="Teachers List" />
          <LinkButton
            to="/admin/manageTeachers"
            content={
              <>
                <FontAwesomeIcon className="mr-2 xs:mx-1" icon={faArrowLeft} />
                <span className="inline xs:hidden">
                  Back to Manage Teachers
                </span>
              </>
            }
          />
        </div>
        <HR />
        <div className="mt-4">
          {isGettingTeachers ? (
            <Spinner size="w-24 h-24" type="centralizedSpinner" />
          ) : (
            <Table
              data={teachersData?.teachersList}
              noData={
                <>
                  <span className="text-lg font-semibold sm:text-base">
                    No Teachers found! Please{" "}
                  </span>
                  <Button
                    onClick={() => window.location.reload()}
                    content="Refresh the page"
                  />
                  <span className="mx-4 text-2xl font-bold text-pink-700">
                    OR
                  </span>
                  <LinkButton
                    to="/admin/manageTeachers/addNewTeacher"
                    content="Add New Teacher"
                  />
                </>
              }
              keysToInclude={[
                ["teacherId", "Teacher ID"],
                ["firstName", "First Name"],
                ["lastName", "Last Name"],
                ["gender", "Gender"],
                ["qualification", "Qualification"],
                ["department", "Department"],
                ["action", "Action"],
              ]}
              excludeSort={["action"]}
              deleteDataMutation={{
                caller: deleteTeacherMutation,
                isLoading: isDeletingTeacher,
              }}
              deleteButtonName="teacherId"
              refetchData={refetchTeachers}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayAllTeachers;
