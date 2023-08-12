import { useState } from "react";
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
import { Alert } from "./components";
import { Navbar, PrivateRoutes, Sidebar } from "./containers";
import { Routes, Route } from "react-router-dom";

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
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Private Routes */}
            <Route element={<PrivateRoutes userType="admin" />}>
              <Route path="/admin" element={<Admin />} />

              <Route
                path="/admin/manageStudents"
                element={<ManageStudents />}
              />
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

              <Route
                path="/admin/manageTeachers"
                element={<ManageTeachers />}
              />
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
            </Route>
            <Route element={<PrivateRoutes userType="student" />}>
              <Route path="/student" element={<Student />} />
            </Route>
            <Route element={<PrivateRoutes userType="teacher" />}>
              <Route path="/teacher" element={<Teacher />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
