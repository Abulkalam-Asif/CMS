import React, { useState } from "react";
import { Button, DataInput, H1, HR, LinkButton } from "../../components";
import { useDispatch } from "react-redux";
import { setAddOrEditTeacher } from "../../store/slices/addOrEditTeacherSlice";
import {
  useDeleteTeacherMutation,
  useLazyGetTeacherSingleQuery,
} from "../../store/api/adminApi/adminTeacherApi";
import { TEACHER_ID_LENGTH } from "../../constants";

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
    if (rollNo.length != STUDENT_ROLL_NO_LENGTH) {
      dispatch(
        toggleAlert({
          type: "error",
          message: "Please enter valid roll no.",
        })
      );
    } else {
      const { error } = await getTeacherData(rollNo);
      if (error) {
        setShowTeacherData(false);
        dispatch(
          toggleAlert({
            type: "error",
            message: error?.data?.message,
          })
        );
      } else {
        setShowTeacherData(true);
      }
    }
  };

  return (
    <>
      <div>
        <H1 content="Manage Teachers" />
        <HR />
        <div className="flex gap-x-8 py-4 px-4">
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
        <form className="grid grid-cols-2 items-end gap-x-16 gap-y-4 mt-8">
          <DataInput
            labelText={
              <>
                Search a Teacher to <span className="text-pink-700">Edit</span>{" "}
                or <span className="text-pink-700">Delete</span>
              </>
            }
            nameIdHtmlFor="searchTeacher"
            placeholder="Enter teacher ID"
            onChange={handleInputChange}
            value={teacherId}
            warning={teacherId.length != TEACHER_ID_LENGTH}
            warningText={`Length should be exactly ${TEACHER_ID_LENGTH} characters`}
          />
          <Button content="Search" onClick={searchHandler} />
        </form>
        {/* <div className="relative mt-8">
          {isFetchingTeacherData || isDeletingTeacher ? (
            <>
              <Spinner
                size="w-24 h-24"
                className="absolute right-1/2 translate-x-1/2 top-1/2 translate-y-1/2"
              />
            </>
          ) : (
            showTeacherData && (
              <>
                <HR className="mb-4" />
                <Table
                  data={[teacherData?.teacher]}
                  keysToInclude={[
                    ["teacherId", "Roll No."],
                    ["firstName", "First Name"],
                    ["lastName", "Last Name"],
                    ["gender", "Gender"],
                    ["program", "Program"],
                  ]}
                  excludeSort={[
                    "teacherId",
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
                      name: teacherId,
                    }}
                  />
                  <LinkButton
                    className="px-8"
                    size="medium"
                    content="Edit"
                    onClick={editHandler}
                    to="/admin/manageTeachers/addNewTeacher"
                  />
                </div>
              </>
            )
          )}
        </div> */}
      </div>
    </>
  );
};

export default ManageTeachers;
