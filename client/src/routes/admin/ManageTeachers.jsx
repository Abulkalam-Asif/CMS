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
import { setAddOrEditTeacher } from "../../store/slices/addOrEditTeacherSlice";
import {
  useDeleteTeacherMutation,
  useLazyGetTeacherSingleQuery,
} from "../../store/api/adminApi/adminTeacherApi";
import { TEACHER_ID_LENGTH } from "../../constants";
import { Table } from "../../containers";
import { showAlert } from "../../store/slices/alertSlice";
import { setUserData } from "../../store/slices/userDataSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ManageTeachers = () => {
  const dispatch = useDispatch();
  const [teacherId, setTeacherId] = useState("");
  const [showTeacherData, setShowTeacherData] = useState(false);
  const [
    getTeacherData,
    { data: teacherData, isFetching: isFetchingTeacherData },
  ] = useLazyGetTeacherSingleQuery();
  const [deleteTeacherMutation, { isLoading: isDeletingTeacher }] =
    useDeleteTeacherMutation();

  const handleInputChange = (e) => {
    setTeacherId(e.target.value);
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    // Removing extra spaces from teacher ID
    const trimmedTeacherId = teacherId.replace(/\s+/g, " ").trim();
    // If extra spaces were found and removed, show alert to resubmit the form.
    if (trimmedTeacherId.localeCompare(teacherId) !== 0) {
      dispatch(
        showAlert({
          type: "error",
          message: `Extra spaces found and removed from the field. Please press the search button again.`,
          seconds: 4000,
        })
      );
      setTeacherId(trimmedTeacherId);
      return;
    }
    // If data entered by the user is invalid, show the alert.
    if (teacherId.length != TEACHER_ID_LENGTH) {
      dispatch(
        showAlert({
          type: "error",
          message: "Please enter valid teacher ID.",
        })
      );
    } else {
      const { error } = await getTeacherData(teacherId);
      if (error) {
        setShowTeacherData(false);
        const errorMessage =
          error.data?.message || "An error occurred! Please retry.";
        dispatch(showAlert({ type: "error", message: errorMessage }));
      } else {
        setShowTeacherData(true);
      }
    }
  };

  const deleteHandler = async (e) => {
    const teacherId = e?.target?.name;
    const { data: mutationData, error: mutationError } =
      await deleteTeacherMutation(teacherId);
    if (mutationError) {
      dispatch(showAlert({ type: "error", message: error?.data?.message }));
    } else {
      dispatch(showAlert({ type: "success", message: mutationData?.message }));
      setShowTeacherData(false);
    }
  };

  const editHandler = () => {
    dispatch(setUserData({ userType: "teacher", data: teacherData }));
    dispatch(setAddOrEditTeacher("edit"));
  };

  return (
    <>
      <div className="flex-1 px-6 py-8">
        <div className="flex justify-between items-center">
          <H1 content="Manage Teachers" />
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
            to="/admin/manageTeachers/addNewTeacher"
            content="Add New Teacher"
            onClick={() => dispatch(setAddOrEditTeacher("add"))}
          />
          <LinkButton
            size="medium"
            to="/admin/manageTeachers/displayAllTeachers"
            content="Display All Teachers"
          />
        </div>
        <HR thickness="thin" className="my-2" />
        <H2 type="filled" content="Edit or Delete a Teacher" />
        <form className="grid grid-cols-2 items-end gap-x-16 gap-y-4 mt-4 md:grid-cols-1">
          <DataInput
            type="search"
            labelText="Search"
            nameIdHtmlFor="searchTeacher"
            placeholder="Enter Teacher ID"
            onChange={handleInputChange}
            value={teacherId}
            warning={teacherId.length != TEACHER_ID_LENGTH}
            warningText={`Length should be exactly ${TEACHER_ID_LENGTH} characters`}
          />
          <Button content="Search" onClick={searchHandler} />
        </form>
        {isFetchingTeacherData || isDeletingTeacher ? (
          <>
            <Spinner type="centralizedSpinner" />
          </>
        ) : (
          showTeacherData && (
            <>
              <div className="mt-8">
                <HR className="mb-4" />
                <Table
                  data={[teacherData?.teacher]}
                  keysToInclude={[
                    ["teacherId", "Teacher ID"],
                    ["firstName", "First Name"],
                    ["lastName", "Last Name"],
                    ["gender", "Gender"],
                    ["qualification", "Qualification"],
                    ["department", "Department"],
                  ]}
                  excludeSort={[
                    "teacherId",
                    "firstName",
                    "lastName",
                    "gender",
                    "qualification",
                    "department",
                  ]}
                />
                <div className="mt-4 flex justify-end gap-x-4">
                  <Button
                    className="px-8"
                    size="medium"
                    content="Delete"
                    onClick={deleteHandler}
                    customAttributes={{
                      name: teacherId,
                    }}
                  />
                  <LinkButton
                    className="px-8"
                    size="medium"
                    type="filled"
                    content="Edit"
                    onClick={editHandler}
                    to="/admin/manageTeachers/editTeacher"
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

export default ManageTeachers;
