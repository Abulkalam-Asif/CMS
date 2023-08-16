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
import { showAlert } from "../../store/slices/alertSlice";
import { useDispatch } from "react-redux";
import {
  useDeleteStudentMutation,
  useLazyGetStudentSingleQuery,
} from "../../store/api/adminApi/adminStudentApi";
import { Table } from "../../containers";
import { setUserData } from "../../store/slices/userDataSlice";
import { setAddOrEditStudent } from "../../store/slices/addOrEditStudentSlice";
import { STUDENT_ROLL_NO_LENGTH } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ManageStudents = () => {
  const dispatch = useDispatch();
  const [rollNo, setRollNo] = useState("");
  const [showStudentData, setShowStudentData] = useState(false);
  const [
    getStudentData,
    { data: studentData, isFetching: isFetchingStudentData },
  ] = useLazyGetStudentSingleQuery();
  const [deleteStudentMutation, { isLoading: isDeletingStudent }] =
    useDeleteStudentMutation();

  const handleInputChange = (e) => {
    setRollNo(e.target.value);
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    // Removing extra spaces from roll no
    const trimmedRollNo = rollNo.replace(/\s+/g, " ").trim();
    // If extra spaces were found and removed, show alert to resubmit the form.
    if (trimmedRollNo.localeCompare(rollNo) !== 0) {
      dispatch(
        showAlert({
          type: "error",
          message: `Extra spaces found and removed from the field. Please press the search button again.`,
          seconds: 4000,
        })
      );
      setRollNo(trimmedRollNo);
      return;
    }
    // If data entered by the user is invalid, show the alert.
    if (rollNo.length != STUDENT_ROLL_NO_LENGTH) {
      dispatch(
        showAlert({
          type: "error",
          message: "Please enter valid roll no.",
        })
      );
    } else {
      const { error } = await getStudentData(rollNo);
      if (error) {
        setShowStudentData(false);
        const errorMessage =
          error.data?.message || "An error occurred! Please retry.";
        dispatch(showAlert({ type: "error", message: errorMessage }));
      } else {
        setShowStudentData(true);
      }
    }
  };

  const deleteHandler = async (e) => {
    const rollNo = e?.target?.name;
    const { data: mutationData, error: mutationError } =
      await deleteStudentMutation(rollNo);
    if (mutationError) {
      dispatch(showAlert({ type: "error", message: error?.data?.message }));
    } else {
      dispatch(showAlert({ type: "success", message: mutationData?.message }));
      setShowStudentData(false);
    }
  };

  const editHandler = () => {
    dispatch(setUserData({ userType: "student", data: studentData }));
    dispatch(setAddOrEditStudent("edit"));
  };

  return (
    <>
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <H1 content="Manage Students" />
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
            to="/admin/manageStudents/addNewStudent"
            content="Add New Student"
            onClick={() => dispatch(setAddOrEditStudent("add"))}
          />
          <LinkButton
            size="medium"
            to="/admin/manageStudents/displayAllStudents"
            content="Display All Students"
          />
        </div>
        <HR thickness="thin" className="my-2" />
        <H2 content="Edit or Delete a Student" />
        <form className="grid grid-cols-2 items-end gap-x-16 gap-y-4 mt-4 md:grid-cols-1">
          <DataInput
            labelText="Search"
            nameIdHtmlFor="searchStudent"
            placeholder="Enter roll no."
            onChange={handleInputChange}
            value={rollNo}
            warning={rollNo.length != STUDENT_ROLL_NO_LENGTH}
            warningText={`Length should be exactly ${STUDENT_ROLL_NO_LENGTH} characters`}
          />
          <Button content="Search" onClick={searchHandler} />
        </form>
        {isFetchingStudentData || isDeletingStudent ? (
          <>
            <Spinner size="w-24 h-24" type="centralizedSpinner" />
          </>
        ) : (
          showStudentData && (
            <>
              <div className="mt-8">
                <HR className="mb-4" />
                <Table
                  data={[studentData?.student]}
                  keysToInclude={[
                    ["rollNo", "Roll No."],
                    ["firstName", "First Name"],
                    ["lastName", "Last Name"],
                    ["gender", "Gender"],
                    ["program", "Program"],
                  ]}
                  excludeSort={[
                    "rollNo",
                    "firstName",
                    "lastName",
                    "gender",
                    "program",
                  ]}
                />
                <div className="mt-4 flex justify-end gap-x-4">
                  <Button
                    className="px-8"
                    size="medium"
                    content="Delete"
                    onClick={deleteHandler}
                    customAttributes={{
                      name: rollNo,
                    }}
                  />
                  <LinkButton
                    className="px-8"
                    size="medium"
                    content="Edit"
                    onClick={editHandler}
                    to="/admin/manageStudents/editStudent"
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

export default ManageStudents;
