import React, { useEffect, useState } from "react";
import {
  Button,
  DataInput,
  Spinner,
  Select,
  LinkButton,
  H1,
  HR,
} from "../../components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddCourseMutation,
  useUpdateCourseMutation,
} from "../../store/api/adminApi/adminCourseApi";
import { toggleAlert } from "../../store/slices/alertSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  COURSE_CREDIT_HOURS_MAX_VAL,
  COURSE_CREDIT_HOURS_MIN_VAL,
  COURSE_ID_MAX_LENGTH,
  COURSE_ID_MIN_LENGTH,
  COURSE_NAME_MAX_LENGTH,
  COURSE_NAME_MIN_LENGTH,
} from "../../constants";

const AddEditCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addCourse, { isLoading: isAddingCourse }] = useAddCourseMutation();
  const [updateCourse, { isLoading: isUpdatingCourse }] =
    useUpdateCourseMutation();
  const courseData = useSelector((state) => state.userData?.data?.course);
  const addOrEditCourse = useSelector((state) => state.addOrEditCourse);

  const defaultCourse = {
    courseId: "",
    courseName: "",
    creditHours: "",
  };
  const [course, setCourse] = useState(null);
  const [updateButtonName, setUpdateButtonName] = useState(null);

  useEffect(() => {
    if (addOrEditCourse === "edit") {
      setCourse(courseData);
      setUpdateButtonName(courseData?.courseId);
    } else {
      setCourse(defaultCourse);
    }
  }, []);

  const handleInputChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const addEditChecking = () => {
    // Removing extra spaces from input fields
    const trimmedCourse = {};
    for (let key in course) {
      if (typeof course[key] === "string")
        trimmedCourse[key] = course[key].replace(/\s+/g, " ").trim();
    }
    // If extra spaces were found and removed, show alert to resubmit the form.
    for (let key in course) {
      if (
        typeof trimmedCourse[key] === "string" &&
        trimmedCourse[key].localeCompare(course[key]) !== 0
      ) {
        dispatch(
          toggleAlert({
            type: "error",
            message: `Extra spaces found and removed from the fields. Please resubmit.`,
          })
        );
        setCourse(trimmedCourse);
        return false;
      }
    }
    // If data entered by the user is invalid, show the alert.
    if (
      !course?.courseId ||
      !course?.courseName ||
      !course?.creditHours ||
      course?.courseId?.length < COURSE_ID_MIN_LENGTH ||
      course?.courseId?.length > COURSE_ID_MAX_LENGTH ||
      course?.courseName?.length < COURSE_NAME_MIN_LENGTH ||
      course?.courseName?.length > COURSE_NAME_MAX_LENGTH ||
      course?.creditHours < COURSE_CREDIT_HOURS_MIN_VAL ||
      course?.creditHours > COURSE_CREDIT_HOURS_MAX_VAL
    ) {
      dispatch(
        toggleAlert({
          type: "error",
          message: "Please fill the form with valid data.",
        })
      );
      return false;
    }
    return true;
  };

  const addCourseHandler = async (e) => {
    e.preventDefault();
    if (addEditChecking()) {
      const { error, data } = await addCourse(course);
      if (error) {
        dispatch(toggleAlert({ type: "error", message: error.data.message }));
      } else {
        dispatch(toggleAlert({ type: "success", message: data?.message }));
        setCourse(defaultCourse);
      }
    }
  };

  const updateCourseHandler = async (e) => {
    e.preventDefault();
    if (addEditChecking()) {
      const { error, data } = await updateCourse({
        courseId: e.target.name,
        body: course,
      });
      if (error) {
        dispatch(toggleAlert({ type: "error", message: error.data.message }));
      } else {
        dispatch(toggleAlert({ type: "success", message: data?.message }));
        setCourse(defaultCourse);
        navigate("/admin/manageCourses");
      }
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <H1
            content={`${
              addOrEditCourse === "edit" ? "Edit Course" : "Add New Course"
            }`}
          />
          <LinkButton
            to="/admin/manageCourses"
            content={
              <>
                <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
                Back to Manage Courses
              </>
            }
          />
        </div>
        <HR />
        {isAddingCourse || isUpdatingCourse ? (
          <Spinner size="w-24 h-24" type="centralizedSpinner" />
        ) : (
          <form className="px-12 pt-8">
            <div className="grid grid-cols-2 gap-x-16 gap-y-4">
              <DataInput
                labelText="Course ID"
                nameIdHtmlFor="courseId"
                placeholder="Sample [CC-111]"
                onChange={handleInputChange}
                value={course?.courseId}
                warning={
                  !course?.courseId ||
                  course?.courseId?.length < COURSE_ID_MIN_LENGTH ||
                  course?.courseId?.length > COURSE_ID_MAX_LENGTH
                }
                warningText={`Length should be ${COURSE_ID_MIN_LENGTH}-${COURSE_ID_MAX_LENGTH} characters`}
              />
              <DataInput
                labelText="Course Name"
                nameIdHtmlFor="courseName"
                placeholder="Enter course name"
                value={course?.courseName}
                onChange={handleInputChange}
                warning={
                  !course?.courseName ||
                  course?.courseName?.length < COURSE_NAME_MIN_LENGTH ||
                  course?.courseName?.length > COURSE_NAME_MAX_LENGTH
                }
                warningText={`Length should be ${COURSE_NAME_MIN_LENGTH}-${COURSE_NAME_MAX_LENGTH} characters`}
              />
              <DataInput
                labelText="Credit Hours"
                type="number"
                nameIdHtmlFor="creditHours"
                onChange={handleInputChange}
                value={course?.creditHours}
                placeholder="Sample [MS Information Technology]"
                warning={
                  !course?.creditHours ||
                  course?.creditHours < COURSE_CREDIT_HOURS_MIN_VAL ||
                  course?.creditHours > COURSE_CREDIT_HOURS_MAX_VAL
                }
                warningText={`Value should be ${COURSE_CREDIT_HOURS_MIN_VAL} to ${COURSE_CREDIT_HOURS_MAX_VAL} (inclusive)`}
              />
            </div>
            <div className="flex mt-8 justify-center gap-4">
              {addOrEditCourse === "edit" ? (
                <Button
                  content="Update Course"
                  onClick={updateCourseHandler}
                  customAttributes={{
                    name: updateButtonName,
                  }}
                />
              ) : (
                <Button content="Add Course" onClick={addCourseHandler} />
              )}
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default AddEditCourse;
