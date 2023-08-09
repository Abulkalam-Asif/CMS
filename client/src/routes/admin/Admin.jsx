import React, { useEffect, useState } from "react";
import { H1, HR, LinkButton, Spinner } from "../../components";
import { useAdminLoginMutation } from "../../store/api/authApi/authAdminApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleAlert } from "../../store/slices/alertSlice";
import { setLoginUserType } from "../../store/slices/loginUserTypeSlice";

const Admin = () => {
  const [adminData, setAdminData] = useState(null);
  const userData = useSelector((state) => state.userData?.data?.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginAdmin, { isLoading }] = useAdminLoginMutation();

  useEffect(() => {
    setAdminData(userData);
    // If Admin realoads the page, userData state would be empty. So he is logged in with JWT
    if (!userData) {
      const access_token = sessionStorage.getItem("access_token");
      if (!access_token) {
        dispatch(toggleAlert({ type: "error", message: "Please login first" }));
        // To let user login as admin
        dispatch(setLoginUserType("admin"));
        navigate("/login");
      } else {
        const getAdminData = async () => {
          const { error, data } = await loginAdmin({
            headers: { Authorization: access_token },
          });
          if (!error) {
            setAdminData(data?.admin);
            dispatch(toggleAlert({ type: "success", message: data.message }));
          } else {
            dispatch(
              toggleAlert({ type: "error", message: error.data.message })
            );
            // To let user login as admin
            dispatch(setLoginUserType("admin"));
            navigate("/login");
          }
        };

        getAdminData();
      }
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner size="w-24 h-24" type="centralizedSpinner" />
      ) : (
        <div>
          <H1
            content={
              <>
                <span className="text-2xl text-gray-700">Welcome</span>{" "}
                {adminData && `${adminData?.name}`} - Admin Panel
              </>
            }
          />
          <HR />
          <div className="flex gap-x-8 py-4 px-4">
            <LinkButton
              to="/admin/manageStudents"
              size="medium"
              content="Manage Students"
            />
            <LinkButton
              to="/admin/manageTeachers"
              size="medium"
              content="Manage Teachers"
            />
            <LinkButton
              to="/admin/manageCourses"
              size="medium"
              content="Manage Courses"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
