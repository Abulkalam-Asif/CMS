import React, { useEffect, useState } from "react";
import { Button, DataInput, LinkButton, Spinner } from "../../components";
import { toggleAlert } from "../../store/slices/alertSlice";
import { useDispatch } from "react-redux";
import {
  useDeleteStudentMutation,
  useLazyGetStudentSingleQuery,
} from "../../store/api/adminApi/adminStudentApi";
import Table from "../../containers/Table";

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
        toggleAlert({
          type: "error",
          message: `Extra spaces found and removed from the field. Please press the search button again.`,
          seconds: 4000,
        })
      );
      setRollNo(trimmedRollNo);
      return;
    }
    // If data entered by the user is invalid, show the alert.
    if (rollNo.length != 10) {
      dispatch(
        toggleAlert({
          type: "error",
          message: "Please enter valid roll no.",
        })
      );
    } else {
      const { error } = await getStudentData(rollNo);
      if (error) {
        setShowStudentData(false);
        dispatch(
          toggleAlert({
            type: "error",
            message: error?.data?.message,
          })
        );
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
      dispatch(toggleAlert({ type: "error", message: error?.data?.message }));
    } else {
      dispatch(
        toggleAlert({ type: "success", message: mutationData?.message })
      );
      setShowStudentData(false);
    }
  };

  return (
    <>
      <div className="p-2 max-w-screen-xl mx-auto">
        <h1 className="font-bold my-4 text-pink-700 text-3xl">
          Manage Students
        </h1>
        <hr className="border-2 border-pink-700" />
        <div className="flex gap-x-8 py-4 px-4">
          <LinkButton
            size="medium"
            to="/admin/manageStudents/addNewStudent"
            content="Add New Student"
          />
          <LinkButton
            size="medium"
            to="/admin/manageStudents/displayAllStudents"
            content="Display All Students"
          />
        </div>
        <form className="grid grid-cols-2 items-end gap-x-16 gap-y-4 mt-8">
          <DataInput
            labelText="Search a Student to Edit or Delete"
            nameIdHtmlFor="searchStudent"
            placeholder="Enter roll no."
            onChange={handleInputChange}
            value={rollNo}
            warning={rollNo.length != 10}
            warningText={"Length should be exactly 10 characters"}
          />
          <Button content="Search" onClick={searchHandler} />
        </form>
        <div className="relative mt-8">
          {isFetchingStudentData || isDeletingStudent ? (
            <>
              <Spinner
                size="w-24 h-24"
                className="absolute right-1/2 translate-x-1/2 top-1/2 translate-y-1/2"
              />
            </>
          ) : (
            showStudentData && (
              <>
                <hr className="border-2 border-pink-700 mb-8" />
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
                    content="Delete"
                    onClick={deleteHandler}
                    customAttributes={{
                      name: rollNo,
                    }}
                  />
                  <LinkButton
                    content="Edit"
                    to="/admin/manageStudents/addNewStudent"
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

export default ManageStudents;
