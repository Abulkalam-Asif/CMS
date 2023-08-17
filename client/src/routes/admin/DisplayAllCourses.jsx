import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, H1, HR, LinkButton, Spinner } from "../../components";
import {
  useDeleteCourseMutation,
  useGetCoursesAllQuery,
} from "../../store/api/adminApi/adminCourseApi";
import { Table } from "../../containers";

const DisplayAllCourses = () => {
  const {
    data: coursesData,
    isLoading: isGettingCourses,
    refetch: refetchCourses,
  } = useGetCoursesAllQuery();
  const [deleteCourseMutation, { isLoading: isDeletingCourse }] =
    useDeleteCourseMutation();

  return (
    <>
      <div className="flex-1 px-6 py-8">
        <div className="flex justify-between items-center">
          <H1 content="Courses List" />
          <LinkButton
            to="/admin/manageCourses"
            content={
              <>
                <FontAwesomeIcon className="mr-2 xs:mx-1" icon={faArrowLeft} />
                <span className="inline xs:hidden">Back to Manage Courses</span>
              </>
            }
          />
        </div>
        <HR />
        <div className="mt-4">
          {isGettingCourses ? (
            <Spinner size="w-24 h-24" type="centralizedSpinner" />
          ) : (
            <Table
              data={coursesData?.coursesList}
              noData={
                <>
                  <span className="text-lg font-semibold sm:text-base">
                    No Courses found! Please{" "}
                  </span>
                  <Button
                    onClick={() => window.location.reload()}
                    content="Refresh the page"
                  />
                  <span className="mx-4 text-2xl font-bold text-pink-700">
                    OR
                  </span>
                  <LinkButton
                    to="/admin/manageCourses/addNewCourse"
                    content="Add New Course"
                  />
                </>
              }
              keysToInclude={[
                ["courseId", "Course ID"],
                ["courseName", "Course Name"],
                ["creditHours", "Credit Hours"],
                ["action", "Action"],
              ]}
              excludeSort={["action"]}
              deleteDataMutation={{
                caller: deleteCourseMutation,
                isLoading: isDeletingCourse,
              }}
              deleteButtonName="courseId"
              refetchData={refetchCourses}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayAllCourses;
