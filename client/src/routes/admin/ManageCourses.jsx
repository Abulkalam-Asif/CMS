import React, { useState } from "react";
import {
  Button,
  DataInput,
  H1,
  H2,
  HR,
  LinkButton,
  Spinner,
} from "../../components";
import { useDispatch } from "react-redux";
import { setAddOrEditCourse } from "../../store/slices/addOrEditCourseSlice.js";
import {
  useDeleteCourseMutation,
  useLazyGetCourseSingleQuery,
} from "../../store/api/adminApi/adminCourseApi";
import { COURSE_ID_MIN_LENGTH, COURSE_ID_MAX_LENGTH } from "../../constants";
import { Table } from "../../containers";
import { showAlert } from "../../store/slices/alertSlice";
import { setUserData } from "../../store/slices/userDataSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ManageCourses = () => {
  const dispatch = useDispatch();
  const [courseId, setCourseId] = useState("");
  const [showCourseData, setShowCourseData] = useState(false);
  const [
    getCourseData,
    { data: courseData, isFetching: isFetchingCourseData },
  ] = useLazyGetCourseSingleQuery();
  const [deleteCourseMutation, { isLoading: isDeletingCourse }] =
    useDeleteCourseMutation();

  const handleInputChange = (e) => {
    setCourseId(e.target.value);
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    // Removing extra spaces from course ID
    const trimmedCourseId = courseId.replace(/\s+/g, " ").trim();
    // If extra spaces were found and removed, show alert to resubmit the form.
    if (trimmedCourseId.localeCompare(courseId) !== 0) {
      dispatch(
        showAlert({
          type: "error",
          message: `Extra spaces found and removed from the field. Please press the search button again.`,
          seconds: 4000,
        })
      );
      setCourseId(trimmedCourseId);
      return;
    }
    // If data entered by the user is invalid, show the alert.
    if (
      courseId.length < COURSE_ID_MIN_LENGTH ||
      courseId.length > COURSE_ID_MAX_LENGTH
    ) {
      dispatch(
        showAlert({
          type: "error",
          message: "Please enter valid course ID.",
        })
      );
    } else {
      const { error } = await getCourseData(courseId);
      if (error) {
        setShowCourseData(false);
        const errorMessage =
          error.data?.message || "An error occurred! Please retry.";
        dispatch(showAlert({ type: "error", message: errorMessage }));
      } else {
        setShowCourseData(true);
      }
    }
  };

  const deleteHandler = async (e) => {
    const courseId = e?.target?.name;
    const { data: mutationData, error: mutationError } =
      await deleteCourseMutation(courseId);
    if (mutationError) {
      dispatch(showAlert({ type: "error", message: error?.data?.message }));
    } else {
      dispatch(showAlert({ type: "success", message: mutationData?.message }));
      setShowCourseData(false);
    }
  };

  const editHandler = () => {
    dispatch(setUserData({ userType: "course", data: courseData }));
    dispatch(setAddOrEditCourse("edit"));
  };

  return (
    <>
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <H1 content="Manage Courses" />
          <LinkButton
            to="/admin"
            content={
              <>
                <FontAwesomeIcon className="mr-2 xs:mx-1" icon={faArrowLeft} />
                <span className="inline xs:hidden">Back to Admin Panel</span>
              </>
            }
          />
        </div>
        <HR />
        <div className="flex gap-x-8 gap-y-4 p-4 md:justify-center sm:flex-col">
          <LinkButton
            size="medium"
            to="/admin/manageCourses/addNewCourse"
            content="Add New Course"
            onClick={() => dispatch(setAddOrEditCourse("add"))}
          />
          <LinkButton
            size="medium"
            to="/admin/manageCourses/displayAllCourses"
            content="Display All Courses"
          />
        </div>
        <HR thickness="thin" className="my-2" />
        <H2 content="Edit or Delete a Course" />
        <form className="grid grid-cols-2 items-end gap-x-16 gap-y-4 mt-4 md:grid-cols-1">
          <DataInput
            labelText="Search"
            nameIdHtmlFor="searchCourse"
            placeholder="Enter course ID"
            onChange={handleInputChange}
            value={courseId}
            warning={
              courseId.length < COURSE_ID_MIN_LENGTH ||
              courseId.length > COURSE_ID_MAX_LENGTH
            }
            warningText={`Length should be ${COURSE_ID_MIN_LENGTH}-${COURSE_ID_MAX_LENGTH} characters`}
          />
          <Button content="Search" onClick={searchHandler} />
        </form>
        {isFetchingCourseData || isDeletingCourse ? (
          <>
            <Spinner size="w-24 h-24" type="centralizedSpinner" />
          </>
        ) : (
          showCourseData && (
            <>
              <div className="mt-8">
                <HR className="mb-4" />
                <Table
                  data={[courseData?.course]}
                  keysToInclude={[
                    ["courseId", "Course ID"],
                    ["courseName", "Course Name"],
                    ["creditHours", "Credit Hours"],
                  ]}
                  excludeSort={["courseId", "courseName", "creditHours"]}
                />
                <div className="mt-4 flex justify-end gap-x-4">
                  <Button
                    className="px-8"
                    size="medium"
                    content="Delete"
                    onClick={deleteHandler}
                    customAttributes={{
                      name: courseId,
                    }}
                  />
                  <LinkButton
                    className="px-8"
                    size="medium"
                    type="filled"
                    content="Edit"
                    onClick={editHandler}
                    to="/admin/manageCourses/editCourse"
                  />
                </div>
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default ManageCourses;
