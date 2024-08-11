import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  fetchEmployerApplication,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import Spinner from "../components/Spinner";

const JobSeekerApplications = () => {
  const { loading, error, message, applications } = useSelector(
    (state) => state.application
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }

    dispatch(fetchEmployerApplication());
  }, [dispatch, error, message]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : applications && applications.length <= 0 ? (
        <div>No applications</div>
      ) : (
        <>
          <ul className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          {applications.map((app) => (
            <li 
              key={app._id} 
              className="border border-gray-300 rounded-xl p-6 shadow-md bg-white"
            >
             
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {app.jobInfo.jobTitle}
              </h3>
              <p className="text-gray-700 mb-2">
                Applied by: <span className="font-medium">{app.jobSeekerInfo.name}</span>
              </p>
              <p className="text-gray-700 mb-2">
                Email: <span className="font-medium">{app.jobSeekerInfo.email}</span>
              </p>
              <p className="text-gray-700 mb-2">
                Phone: <span className="font-medium">{app.jobSeekerInfo.phone}</span>
              </p>
              <p className="text-gray-700 mb-2">
                Address: <span className="font-medium">{app.jobSeekerInfo.address}</span>
              </p>
              <p className="text-gray-700 mb-2">
                Cover Letter: <span className="font-medium">{app.jobSeekerInfo.coverLetter}</span>
              </p>
              <div className="text-gray-500 text-sm flex justify-between items-center mt-5">
              <a
                href={app.jobSeekerInfo.resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className=" border-primary px-4 py-2 rounded-lg text-primary border-[2px]"
              >
                View Resume
              </a>
                
                <button
                  onClick={() => handleDeleteApplication(app._id)}
                  className="text-white bg-primary  px-4 py-2 rounded-lg "
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
        </>
      )}
    </div>
  );
};

export default JobSeekerApplications;
