import React, { useState } from "react";
import {
  Button,
  DataInput,
  Spinner,
  Select,
  LinkButton,
} from "../../components";
import { useDispatch } from "react-redux";
import { useAddStudentMutation } from "../../store/api/adminApi/adminStudentApi";
import { toggleAlert } from "../../store/slices/alertSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AddNewStudent = () => {
  const dispatch = useDispatch();
  const [addStudent, { isLoading }] = useAddStudentMutation();

  const defaultStudent = {
    rollNo: "",
    firstName: "",
    lastName: "",
    password: "",
    gender: "Male",
    program: "Computer Science",
  };
  const [student, setStudent] = useState(defaultStudent);

  const handleInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const addStudentHandler = async (e) => {
    e.preventDefault();
    // Removing extra spaces from input fields
    const trimmedStudent = {};
    for (let key in student) {
      trimmedStudent[key] = student[key].replace(/\s+/g, " ").trim();
    }
    // If extra spaces were found and removed, show alert to resubmit the form.
    for (let key in student) {
      if (trimmedStudent[key].localeCompare(student[key]) !== 0) {
        dispatch(
          toggleAlert({
            type: "error",
            message: `Extra spaces found and removed from the fields. Please resubmit.`,
          })
        );
        setStudent(trimmedStudent);
        return;
      }
    }
    // If data entered by the user is invalid, show the alert.
    if (
      student.firstName.length < 2 ||
      student.lastName.length < 2 ||
      student.rollNo.length != 10 ||
      student.password.length < 4
    ) {
      dispatch(
        toggleAlert({
          type: "error",
          message: "Please fill the form with valid data.",
        })
      );
    } else {
      const { error, data } = await addStudent(student);
      if (error) {
        dispatch(toggleAlert({ type: "error", message: error.data.message }));
      } else {
        dispatch(toggleAlert({ type: "success", message: data?.message }));
        setStudent(defaultStudent);
      }
    }
  };

  return (
    <>
      <div className="p-2 max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="font-bold my-4 text-pink-700 text-3xl">
            Add New Student
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
        <form className="px-12 pt-8">
          <div className="grid grid-cols-2 gap-x-16 gap-y-4">
            <DataInput
              labelText="First Name"
              nameIdHtmlFor="firstName"
              placeholder="Enter first name"
              value={student.firstName}
              onChange={handleInputChange}
              warning={student.firstName.length < 2}
              warningText={"Length should be 2-50 characters"}
            />
            <DataInput
              labelText="Last Name"
              nameIdHtmlFor="lastName"
              onChange={handleInputChange}
              value={student.lastName}
              placeholder="Enter last name"
              warning={student.lastName.length < 2}
              warningText={"Length should be 2-50 characters"}
            />
            <DataInput
              labelText="Roll No."
              nameIdHtmlFor="rollNo"
              placeholder="Enter roll no."
              onChange={handleInputChange}
              value={student.rollNo}
              warning={student.rollNo.length != 10}
              warningText={"Length should be exactly 10 characters"}
            />
            <DataInput
              labelText="Assign a Password"
              nameIdHtmlFor="password"
              onChange={handleInputChange}
              value={student.password}
              placeholder="Assign a password to the user"
              warning={student.password.length < 4}
              warningText={"Length should be minimum 4 characters"}
            />
            <Select
              nameIdHtmlFor="gender"
              labelText="Gender"
              onChange={handleInputChange}
              options={["Male", "Female"]}
            />
            <Select
              nameIdHtmlFor="program"
              labelText="Program"
              onChange={handleInputChange}
              options={[
                "Computer Science",
                "Information Technology",
                "Software Engineering",
                "Data Science",
              ]}
            />
          </div>
          <div className="flex mt-8 justify-center gap-4">
            <Button
              content={
                <>{isLoading ? <Spinner size="w-6 h-6" /> : "Add Student"}</>
              }
              onClick={addStudentHandler}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewStudent;
