import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearAllUserErrors, logout } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCog,
  FaBell,
  FaEnvelope,
  FaSignOutAlt,
  FaPassport,
  FaKey,
  FaNodeJs,
  FaPooStorm,
  FaApper,
  FaJoint,
  FaRProject,
  FaLinkedin,
} from "react-icons/fa";
import MyProfile from "../components/Myprofile";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";
import MyApplications from "./MyApplications";
import PostJob from "./PostJob";
import MyPage from "./MyPage";
import JobSeekerApplications from "./JobSeekerApplications";

const Dashboard = () => {
  const [component, setComponent] = useState("Myprofile");
  const [show, setShow] = useState("");
  const { isAuthenticated, error, loading, user } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successful", {
      position: "bottom-right",
      autoClose: 1000,
    });
  };

  const buttonStyle = (myComponent) => {
    return myComponent === component ? " bg-primary " : " ";
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-right",
        autoClose: 1000,
      });
      dispatch(clearAllUserErrors());
    }
  }, [error, dispatch, loading, isAuthenticated, navigate]);

  return (
    <div className="flex h-[92.3vh] mt-14">
      <div className="w-64 bg-gray-800 text-white flex flex-col p-4 fixed bottom-0 left-0 top-14">
        <div className=" items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <h2 className="text-gray-500">Welcome! {user.name}</h2>
        </div>
        <div className="flex-1">
          <button
            onClick={() => setComponent("Myprofile")}
            className={`${buttonStyle(
              "Myprofile"
            )} flex items-center mb-4 w-full text-left p-2 rounded-xl`}
          >
            <FaUser className="mr-2" />
            My Profile
          </button>
          <button
            onClick={() => setComponent("Profile")}
            className={`${buttonStyle(
              "Profile"
            )} flex items-center mb-4 w-full text-left p-2 rounded-xl`}
          >
            <FaUser className="mr-2" />
            Update Profile
          </button>
          <button
            onClick={() => setComponent("Settings")}
            className={`${buttonStyle(
              "Settings"
            )} flex items-center mb-4 w-full text-left p-2 rounded-xl`}
          >
            <FaKey className="mr-2" />
            Change Password
          </button>
          {user.role ===
            "Job Seeker"?(
              <button
                onClick={() => setComponent("My Applications")}
                className={`${buttonStyle(
                  "My Applications"
                )} flex items-center mb-4 w-full text-left p-2 rounded-xl`}
              >
                <FaEnvelope className="mr-2" />
                My Applications
              </button>
            )
          :<button
          onClick={() => setComponent("PostJob")}
          className={`${buttonStyle(
            "PostJob"
          )} flex items-center mb-4 w-full text-left p-2 rounded-xl`}
        >
          <FaLinkedin className="mr-2" />
          Post Job
        </button>}
        {user.role === "Employer" && 
        <>
          <button
            onClick={() => setComponent("MyJobs")}
            className={`${buttonStyle(
              "MyJobs"
            )} flex items-center mb-4 w-full text-left p-2 rounded-xl`}
          >
            <FaEnvelope className="mr-2" />
            My Jobs
          </button>
          <button
            onClick={() => setComponent("Applications")}
            className={`${buttonStyle(
              "Applications"
            )} flex items-center mb-4 w-full text-left p-2 rounded-xl`}
          >
            <FaEnvelope className="mr-2" />
            Applications
          </button>
          </>}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center w-full text-left"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
      <div className="flex-1 p-4 ml-[280px]">
        {component === "Myprofile" && <MyProfile />}
        {component === "Profile" && <UpdateProfile />}
        {component === "Settings" && <UpdatePassword />}
        {component === "My Applications" && <MyApplications />}
        {component === "PostJob" && <PostJob/>}
        {component === "Applications" && <JobSeekerApplications/>}
        {component === "MyJobs" && <MyPage/>}
      </div>
    </div>
  );
};

export default Dashboard;
