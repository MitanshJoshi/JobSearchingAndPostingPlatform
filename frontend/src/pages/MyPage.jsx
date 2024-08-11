import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, deleteJob, getMyJobs, resetJobSlice } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const MyPage = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, message, myJobs } = useSelector(
    (state) => state.jobs
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
    dispatch(getMyJobs());
  }, [dispatch,error,message]);

  const handleDelete =(id)=>{
        dispatch(deleteJob(id));
        dispatch(getMyJobs());
  } 

  console.log(myJobs);
  

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : myJobs && myJobs.length <= 0 ? (
        <div>No job posted</div>
      ) : (
        <>
         <ul className='grid lg:grid-cols-3 grid-cols-1 gap-2 '>
                  {myJobs.map((job) => (
                     <li key={job._id} className="border border-gray-300 rounded-xl p-4 shadow-md bg-white">
                      <p className={` w-fit rounded-lg text-sm mb-2  px-2 py-1 ${job.hiringMultipleCandidates=="Yes"? "bg-green-300 text-green-600" : "bg-blue-300 text-blue-600"}`}>{job.hiringMultipleCandidates=="Yes"?"Hiring Multiple Candidates":"Hiring"}</p>
                     <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                     <p className="text-gray-700 mb-2">Company: <span className="font-medium">{job.companyName}</span></p>
                     <p className="text-gray-700 mb-2">Job Type: <span className="font-medium">{job.jobType}</span></p>
                     <p className="text-gray-700 mb-2">Location: <span className="font-medium">{job.location}</span></p>
                     <p className="text-gray-700 mb-2">Niche: <span className="font-medium">{job.jobNiche}</span></p>
                     <p className="text-gray-700 mb-2">Salary: <span className="font-medium">₹{job.salary}</span></p>
                     <div className="text-gray-500 text-sm flex justify-between items-center">Posted on: {new Date(job.jobPostedOn).toLocaleDateString()}
                      <button onClick={()=>handleDelete(job._id)}  className='text-white font-[500] bg-primary p-2 rounded-lg hover:text-white hover:bg-black'>
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

export default MyPage;
