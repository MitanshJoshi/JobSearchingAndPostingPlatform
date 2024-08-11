import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, postJob, resetJobSlice } from "../store/slices/jobSlice";

const PostJob = () => {
  const cityOptions = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Jaipur",
    "Surat",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Bhopal",
    "Vadodara",
    "Coimbatore",
    "Patna",
    "Agra",
    "Meerut",
    "Varanasi",
    "Nashik",
  ];

  const nicheOptions = [
    "Software Engineering",
    "Data Science",
    "Web Development",
    "Cybersecurity",
    "Machine Learning",
    "AI",
    "DevOps",
    "Cloud Computing",
    "Blockchain",
    "Mobile Development",
  ];

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { error, message, loading } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    jobType: "Full-time",
    location: "",
    companyName: "",
    introduction: "",
    responsibilities: "",
    qualifications: "",
    offers: "",
    jobNiche: "",
    salary: "",
    hiringMultipleCandidates: "No",
    personalWebsiteTitle: "",
    personalWebsiteUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if(error)
    {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if(message)
    {
      toast.success(message);
      dispatch(resetJobSlice());
    }
  
  }, [dispatch,error,message])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postJob(formData));
  };

  if (!isAuthenticated || !user) {
    return <div className="text-center mt-10">You are not logged in</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Post a New Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Job Type</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            list="city-options"
          />
          <datalist id="city-options">
            {cityOptions.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Introduction</label>
          <textarea
            name="introduction"
            value={formData.introduction}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Responsibilities</label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Qualifications</label>
          <textarea
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Offers</label>
          <textarea
            name="offers"
            value={formData.offers}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Job Niche</label>
          <select
            name="jobNiche"
            value={formData.jobNiche}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="" disabled>
              Select a niche
            </option>
            {nicheOptions.map((niche) => (
              <option key={niche} value={niche}>
                {niche}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Salary (₹)</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Hiring Multiple Candidates?
          </label>
          <select
            name="hiringMultipleCandidates"
            value={formData.hiringMultipleCandidates}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Personal Website Title</label>
          <input
            type="text"
            name="personalWebsiteTitle"
            value={formData.personalWebsiteTitle}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Personal Website URL</label>
          <input
            type="url"
            name="personalWebsiteUrl"
            value={formData.personalWebsiteUrl}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-black"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default PostJob;
