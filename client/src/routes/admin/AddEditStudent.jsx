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
  useAddStudentMutation,
  useUpdateStudentMutation,
} from "../../store/api/adminApi/adminStudentApi";
import { showAlert } from "../../store/slices/alertSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  STUDENT_FIRSTNAME_MAX_LENGTH,
  STUDENT_FIRSTNAME_MIN_LENGTH,
  STUDENT_LASTNAME_MAX_LENGTH,
  STUDENT_LASTNAME_MIN_LENGTH,
  STUDENT_PASSWORD_MIN_LENGTH,
  STUDENT_ROLL_NO_LENGTH,
} from "../../constants";

const AddEditStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addStudent, { isLoading: isAddingStudent }] = useAddStudentMutation();
  const [updateStudent, { isLoading: isUpdatingStudent }] =
    useUpdateStudentMutation();
  const studentData = useSelector((state) => state.userData?.data?.student);
  const addOrEditStudent = useSelector((state) => state.addOrEditStudent);
  const [showPassword, setShowPassword] = useState(false);

  const defaultStudent = {
    rollNo: "",
    firstName: "",
    lastName: "",
    password: "",
    gender: "Male",
    program: "Computer Science",
  };
  const [student, setStudent] = useState(null);
  const [updateButtonName, setUpdateButtonName] = useState(null);

  useEffect(() => {
    if (addOrEditStudent === "edit") {
      setStudent(studentData);
      setUpdateButtonName(studentData?.rollNo);
    } else {
      setStudent(defaultStudent);
    }
  }, []);

  const handleInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const addEditChecking = () => {
    // Removing extra spaces from input fields
    const trimmedStudent = {};
    for (let key in student) {
      if (typeof student[key] === "string")
        trimmedStudent[key] = student[key].replace(/\s+/g, " ").trim();
    }
    // If extra spaces were found and removed, show alert to resubmit the form.
    for (let key in student) {
      if (
        typeof trimmedStudent[key] === "string" &&
        trimmedStudent[key].localeCompare(student[key]) !== 0
      ) {
        dispatch(
          showAlert({
            type: "error",
            message: `Extra spaces found and removed from the fields. Please resubmit.`,
          })
        );
        setStudent(trimmedStudent);
        return false;
      }
    }
    // If data entered by the user is invalid, show the alert.
    if (
      !student?.firstName ||
      !student?.lastName ||
      !student?.rollNo ||
      !student?.password ||
      student?.firstName?.length < STUDENT_FIRSTNAME_MIN_LENGTH ||
      student?.firstName?.length > STUDENT_FIRSTNAME_MAX_LENGTH ||
      student?.lastName?.length < STUDENT_LASTNAME_MIN_LENGTH ||
      student?.lastName?.length > STUDENT_LASTNAME_MAX_LENGTH ||
      student?.rollNo?.length != STUDENT_ROLL_NO_LENGTH ||
      student?.password?.length < STUDENT_PASSWORD_MIN_LENGTH
    ) {
      dispatch(
        showAlert({
          type: "error",
          message: "Please fill the form with valid data.",
        })
      );
      return false;
    }
    return true;
  };

  const addStudentHandler = async (e) => {
    e.preventDefault();
    if (addEditChecking()) {
      const { error, data } = await addStudent(student);
      if (error) {
        const errorMessage =
          error.data?.message || "An error occurred! Please retry.";
        dispatch(showAlert({ type: "error", message: errorMessage }));
      } else {
        dispatch(showAlert({ type: "success", message: data.message }));
        setStudent(defaultStudent);
      }
    }
  };
  const updateStudentHandler = async (e) => {
    e.preventDefault();
    if (addEditChecking()) {
      const { error, data } = await updateStudent({
        rollNo: e.target.name,
        body: student,
      });
      if (error) {
        const errorMessage =
          error.data?.message || "An error occurred! Please retry.";
        dispatch(showAlert({ type: "error", message: errorMessage }));
      } else {
        dispatch(showAlert({ type: "success", message: data.message }));
        setStudent(defaultStudent);
        navigate("/admin/manageStudents");
      }
    }
  };

  return (
    <>
      <div className="flex-1 px-6 py-8">
        <div className="flex justify-between items-center">
          <H1
            content={`${
              addOrEditStudent === "edit" ? "Edit Student" : "Add New Student"
            }`}
          />
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
        {isAddingStudent || isUpdatingStudent ? (
          <Spinner type="centralizedSpinner" />
        ) : (
          <form className="px-8 lg:px-2">
            <div className="grid grid-cols-2 gap-x-16 gap-y-4 my-6 md:grid-cols-1">
              <DataInput
                labelText="First Name"
                nameIdHtmlFor="firstName"
                placeholder="Enter first name"
                value={student?.firstName}
                onChange={handleInputChange}
                warning={
                  !student?.firstName ||
                  student?.firstName?.length < STUDENT_FIRSTNAME_MIN_LENGTH ||
                  student?.firstName?.length > STUDENT_FIRSTNAME_MAX_LENGTH
                }
                warningText={`Length should be ${STUDENT_FIRSTNAME_MIN_LENGTH}-${STUDENT_FIRSTNAME_MAX_LENGTH} characters`}
              />
              <DataInput
                labelText="Last Name"
                nameIdHtmlFor="lastName"
                onChange={handleInputChange}
                value={student?.lastName}
                placeholder="Enter last name"
                warning={
                  !student?.lastName ||
                  student?.lastName?.length < STUDENT_LASTNAME_MIN_LENGTH ||
                  student?.lastName?.length > STUDENT_LASTNAME_MAX_LENGTH
                }
                warningText={`Length should be ${STUDENT_FIRSTNAME_MIN_LENGTH}-${STUDENT_FIRSTNAME_MAX_LENGTH} characters`}
              />
              <DataInput
                labelText="Roll No."
                nameIdHtmlFor="rollNo"
                placeholder="Sample [BITF21M001]"
                onChange={handleInputChange}
                value={student?.rollNo}
                warning={
                  !student?.rollNo ||
                  student?.rollNo?.length != STUDENT_ROLL_NO_LENGTH
                }
                warningText={`Length should be exactly ${STUDENT_ROLL_NO_LENGTH} characters`}
              />
              <DataInput
                labelText="Set a Password"
                nameIdHtmlFor="password"
                type="password"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                onChange={handleInputChange}
                value={student?.password}
                placeholder="Set a password to the student"
                warning={
                  !student?.password ||
                  student?.password?.length < STUDENT_PASSWORD_MIN_LENGTH
                }
                warningText={`Length should be minimum ${STUDENT_PASSWORD_MIN_LENGTH} characters`}
              />
              <Select
                nameIdHtmlFor="gender"
                labelText="Gender"
                onChange={handleInputChange}
                initialValue={student?.gender}
                options={["Male", "Female"]}
              />
              <Select
                nameIdHtmlFor="program"
                labelText="Program"
                onChange={handleInputChange}
                initialValue={student?.program}
                options={[
                  "Computer Science",
                  "Information Technology",
                  "Software Engineering",
                  "Data Science",
                ]}
              />
            </div>
            {addOrEditStudent === "edit" ? (
              <Button
                className="block mx-auto"
                content="Update Student"
                onClick={updateStudentHandler}
                customAttributes={{
                  name: updateButtonName,
                }}
              />
            ) : (
              <Button
                className="block mx-auto"
                content="Add Student"
                onClick={addStudentHandler}
              />
            )}
          </form>
        )}
      </div>
    </>
  );
};

export default AddEditStudent;
