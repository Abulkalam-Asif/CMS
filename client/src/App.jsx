import "./App.css";
import {
  AddEditCourse,
  AddEditStudent,
  AddEditTeacher,
  Admin,
  DisplayAllCourses,
  DisplayAllStudents,
  DisplayAllTeachers,
  Home,
  Login,
  ManageCourses,
  ManageStudents,
  ManageTeachers,
  Student,
  Teacher,
} from "./routes";
import { Routes, Route } from "react-router-dom";
import { Alert } from "./components";
import { Navbar, Sidebar } from "./containers";
import { useState } from "react";

function App() {
  const [sidebar, setSidebar] = useState("in");
  return (
    <>
      <div className="min-h-screen bg-gray-200 relative">
        <Alert />
        <Navbar sidebarHandler={{ sidebar, setSidebar }} />
        <Sidebar sidebarHandler={{ sidebar, setSidebar }} />
        <div className="max-w-screen-xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            {/* Manage Students Routes */}
            <Route path="/admin/manageStudents" element={<ManageStudents />} />
            <Route
              path="/admin/manageStudents/addNewStudent"
              element={<AddEditStudent />}
            />
            <Route
              path="/admin/manageStudents/editStudent"
              element={<AddEditStudent />}
            />
            <Route
              path="/admin/manageStudents/displayAllStudents"
              element={<DisplayAllStudents />}
            />
            {/* Manage Teachers Routes */}
            <Route path="/admin/manageTeachers" element={<ManageTeachers />} />
            <Route
              path="/admin/manageTeachers/addNewTeacher"
              element={<AddEditTeacher />}
            />
            <Route
              path="/admin/manageTeachers/editTeacher"
              element={<AddEditTeacher />}
            />
            <Route
              path="/admin/manageTeachers/displayAllTeachers"
              element={<DisplayAllTeachers />}
            />
            {/* Manage Courses Routes */}
            <Route path="/admin/manageCourses" element={<ManageCourses />} />
            <Route
              path="/admin/manageCourses/addNewCourse"
              element={<AddEditCourse />}
            />
            <Route
              path="/admin/manageCourses/editCourse"
              element={<AddEditCourse />}
            />
            <Route
              path="/admin/manageCourses/displayAllCourses"
              element={<DisplayAllCourses />}
            />

            <Route path="/admin/manageCourses" element={<ManageCourses />} />
            <Route path="/teacher" element={<Teacher />} />
            <Route path="/student" element={<Student />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
