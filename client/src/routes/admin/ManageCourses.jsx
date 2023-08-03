import React, { useState } from "react";
import {
  Button,
  DataInput,
  H1,
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
import Table from "../../containers/Table";
import { toggleAlert } from "../../store/slices/alertSlice";
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
        toggleAlert({
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
        toggleAlert({
          type: "error",
          message: "Please enter valid course ID.",
        })
      );
    } else {
      const { error } = await getCourseData(courseId);
      if (error) {
        setShowCourseData(false);
        dispatch(
          toggleAlert({
            type: "error",
            message: error?.data?.message,
          })
        );
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
      dispatch(toggleAlert({ type: "error", message: error?.data?.message }));
    } else {
      dispatch(
        toggleAlert({ type: "success", message: mutationData?.message })
      );
      setShowCourseData(false);
    }
  };

  const editHandler = () => {
    dispatch(setUserData({ userType: "course", data: courseData }));
    dispatch(setAddOrEditCourse("edit"));
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <H1 content="Manage Courses" />
          <LinkButton
            to="/admin"
            content={
              <>
                <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
                Back to Admin Panel
              </>
            }
          />
        </div>
        <HR />
        <div className="flex gap-x-8 py-4 px-4">
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
        <form className="grid grid-cols-2 items-end gap-x-16 gap-y-4 mt-8">
          <DataInput
            labelText={
              <>
                Search a Course to <span className="text-pink-700">Edit</span>{" "}
                or <span className="text-pink-700">Delete</span>
              </>
            }
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
        <div className="relative mt-8">
          {isFetchingCourseData || isDeletingCourse ? (
            <>
              <Spinner
                size="w-24 h-24"
                className="absolute right-1/2 translate-x-1/2 top-1/2 translate-y-1/2"
              />
            </>
          ) : (
            showCourseData && (
              <>
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
                    content="Edit"
                    onClick={editHandler}
                    to="/admin/manageCourses/editCourse"
                  />
                </div>
              </>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default ManageCourses;
