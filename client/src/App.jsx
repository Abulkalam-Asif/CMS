import "./App.css";
import Navbar from "./containers/Navbar";
import {
  AddNewStudent,
  Admin,
  DisplayAllStudents,
  Home,
  Login,
  Student,
  Teacher,
} from "./routes";
import { Routes, Route } from "react-router-dom";
import { ManageStudents, ManageTeachers, ManageCourses } from "./routes";
import { Alert } from "./components";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-200 relative">
        <Alert />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/manageStudents" element={<ManageStudents />} />
          <Route
            path="/admin/manageStudents/addNewStudent"
            element={<AddNewStudent />}
          />
          <Route
            path="/admin/manageStudents/displayAllStudents"
            element={<DisplayAllStudents />}
          />

          <Route path="/admin/manageTeachers" element={<ManageTeachers />} />
          <Route path="/admin/manageCourses" element={<ManageCourses />} />

          <Route path="/teacher" element={<Teacher />} />
          <Route path="/student" element={<Student />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
