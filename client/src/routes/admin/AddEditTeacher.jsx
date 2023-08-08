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
  useAddTeacherMutation,
  useUpdateTeacherMutation,
} from "../../store/api/adminApi/adminTeacherApi";
import { toggleAlert } from "../../store/slices/alertSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  TEACHER_FIRSTNAME_MAX_LENGTH,
  TEACHER_FIRSTNAME_MIN_LENGTH,
  TEACHER_ID_LENGTH,
  TEACHER_LASTNAME_MAX_LENGTH,
  TEACHER_LASTNAME_MIN_LENGTH,
  TEACHER_PASSWORD_MIN_LENGTH,
  TEACHER_QUALIFICATION_MIN_LENGTH,
} from "../../constants";

const AddEditTeacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addTeacher, { isLoading: isAddingTeacher }] = useAddTeacherMutation();
  const [updateTeacher, { isLoading: isUpdatingTeacher }] =
    useUpdateTeacherMutation();
  const teacherData = useSelector((state) => state.userData?.data?.teacher);
  const addOrEditTeacher = useSelector((state) => state.addOrEditTeacher);

  const defaultTeacher = {
    teacherId: "",
    firstName: "",
    lastName: "",
    password: "",
    gender: "Male",
    qualification: "",
    department: "Information Technology",
  };
  const [teacher, setTeacher] = useState(null);
  const [updateButtonName, setUpdateButtonName] = useState(null);

  useEffect(() => {
    if (addOrEditTeacher === "edit") {
      setTeacher(teacherData);
      setUpdateButtonName(teacherData?.teacherId);
    } else {
      setTeacher(defaultTeacher);
    }
  }, []);

  const handleInputChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const addEditChecking = () => {
    // Removing extra spaces from input fields
    const trimmedTeacher = {};
    for (let key in teacher) {
      if (typeof teacher[key] === "string")
        trimmedTeacher[key] = teacher[key].replace(/\s+/g, " ").trim();
    }
    // If extra spaces were found and removed, show alert to resubmit the form.
    for (let key in teacher) {
      if (
        typeof trimmedTeacher[key] === "string" &&
        trimmedTeacher[key].localeCompare(teacher[key]) !== 0
      ) {
        dispatch(
          toggleAlert({
            type: "error",
            message: `Extra spaces found and removed from the fields. Please resubmit.`,
          })
        );
        setTeacher(trimmedTeacher);
        return false;
      }
    }
    // If data entered by the user is invalid, show the alert.
    if (
      !teacher?.firstName ||
      !teacher?.lastName ||
      !teacher?.teacherId ||
      !teacher?.password ||
      !teacher?.qualification ||
      teacher?.firstName?.length < TEACHER_FIRSTNAME_MIN_LENGTH ||
      teacher?.firstName?.length > TEACHER_FIRSTNAME_MAX_LENGTH ||
      teacher?.lastName?.length < TEACHER_LASTNAME_MIN_LENGTH ||
      teacher?.lastName?.length > TEACHER_LASTNAME_MAX_LENGTH ||
      teacher?.teacherId?.length != TEACHER_ID_LENGTH ||
      teacher?.password?.length < TEACHER_PASSWORD_MIN_LENGTH ||
      teacher?.qualification?.length < TEACHER_QUALIFICATION_MIN_LENGTH
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

  const addTeacherHandler = async (e) => {
    e.preventDefault();
    if (addEditChecking()) {
      const { error, data } = await addTeacher(teacher);
      if (error) {
        dispatch(toggleAlert({ type: "error", message: error.data.message }));
      } else {
        dispatch(toggleAlert({ type: "success", message: data?.message }));
        setTeacher(defaultTeacher);
      }
    }
  };

  const updateTeacherHandler = async (e) => {
    e.preventDefault();
    if (addEditChecking()) {
      const { error, data } = await updateTeacher({
        teacherId: e.target.name,
        body: teacher,
      });
      if (error) {
        dispatch(toggleAlert({ type: "error", message: error.data.message }));
      } else {
        dispatch(toggleAlert({ type: "success", message: data?.message }));
        setTeacher(defaultTeacher);
        navigate("/admin/manageTeachers");
      }
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <H1
            content={`${
              addOrEditTeacher === "edit" ? "Edit Teacher" : "Add New Teacher"
            }`}
          />
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
        {isAddingTeacher || isUpdatingTeacher ? (
          <Spinner size="w-24 h-24" type="centralizedSpinner" />
        ) : (
          <form className="px-12 pt-8">
            <div className="grid grid-cols-2 gap-x-16 gap-y-4">
              <DataInput
                labelText="First Name"
                nameIdHtmlFor="firstName"
                placeholder="Enter first name"
                value={teacher?.firstName}
                onChange={handleInputChange}
                warning={
                  !teacher?.firstName ||
                  teacher?.firstName?.length < TEACHER_FIRSTNAME_MIN_LENGTH ||
                  teacher?.firstName?.length > TEACHER_FIRSTNAME_MAX_LENGTH
                }
                warningText={`Length should be ${TEACHER_FIRSTNAME_MIN_LENGTH}-${TEACHER_FIRSTNAME_MAX_LENGTH} characters`}
              />
              <DataInput
                labelText="Last Name"
                nameIdHtmlFor="lastName"
                onChange={handleInputChange}
                value={teacher?.lastName}
                placeholder="Enter last name"
                warning={
                  !teacher?.lastName ||
                  teacher?.lastName?.length < TEACHER_LASTNAME_MIN_LENGTH ||
                  teacher?.lastName?.length > TEACHER_LASTNAME_MAX_LENGTH
                }
                warningText={`Length should be ${TEACHER_LASTNAME_MIN_LENGTH}-${TEACHER_LASTNAME_MAX_LENGTH} characters`}
              />
              <DataInput
                labelText="Teacher ID"
                nameIdHtmlFor="teacherId"
                placeholder="Sample [ITF21001]"
                onChange={handleInputChange}
                value={teacher?.teacherId}
                warning={
                  !teacher?.teacherId ||
                  teacher?.teacherId?.length != TEACHER_ID_LENGTH
                }
                warningText={`Length should be exactly ${TEACHER_ID_LENGTH} characters`}
              />
              <DataInput
                labelText="Assign a Password"
                nameIdHtmlFor="password"
                onChange={handleInputChange}
                value={teacher?.password}
                placeholder="Assign a password to the teacher"
                warning={
                  !teacher?.password ||
                  teacher?.password?.length < TEACHER_PASSWORD_MIN_LENGTH
                }
                warningText={`Length should be minimum ${TEACHER_PASSWORD_MIN_LENGTH} characters`}
              />
              <DataInput
                labelText="Qualification"
                nameIdHtmlFor="qualification"
                onChange={handleInputChange}
                value={teacher?.qualification}
                placeholder="Sample [MS Information Technology]"
                warning={
                  !teacher?.qualification ||
                  teacher?.qualification?.length <
                    TEACHER_QUALIFICATION_MIN_LENGTH
                }
                warningText={`Length should be minimum ${TEACHER_QUALIFICATION_MIN_LENGTH} characters`}
              />
              <Select
                nameIdHtmlFor="gender"
                labelText="Gender"
                onChange={handleInputChange}
                initialValue={teacher?.gender}
                options={["Male", "Female"]}
              />
              <Select
                nameIdHtmlFor="department"
                labelText="Department"
                onChange={handleInputChange}
                initialValue={teacher?.department}
                options={[
                  "Computer Science",
                  "Information Technology",
                  "Software Engineering",
                  "Data Science",
                ]}
              />
            </div>
            <div className="flex mt-8 justify-center gap-4">
              {addOrEditTeacher === "edit" ? (
                <Button
                  content="Update Teacher"
                  onClick={updateTeacherHandler}
                  customAttributes={{
                    name: updateButtonName,
                  }}
                />
              ) : (
                <Button content="Add Teacher" onClick={addTeacherHandler} />
              )}
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default AddEditTeacher;
