import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { H1, HR, LinkButton, Spinner } from "../../components";
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
      <div>
        <div className="flex justify-between items-center">
          <H1 content="Teachers List" />
          <LinkButton
            to="/admin/manageTeachers"
            content={
              <>
                <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
                Back to Manage Teachers
              </>
            }
          />
        </div>
        <HR />
        <div className="mt-4">
          {isGettingTeachers ? (
            <Spinner
              size="w-24 h-24"
              className="absolute right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2"
            />
          ) : (
            <Table
              data={teachersData?.teachersList}
              noData={
                <>
                  <span className="mr-4 text-lg font-semibold">
                    No Teachers found!
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
