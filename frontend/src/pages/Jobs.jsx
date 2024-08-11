import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearAllJobErrors, fetchJobs } from '../store/slices/jobSlice';
import Spinner from '../components/Spinner'; 
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

  const cityOptions = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Pune', 'Jaipur', 'Surat',
    'Kanpur', 'Nagpur', 'Indore', 'Bhopal', 'Vadodara', 'Coimbatore', 'Patna', 'Agra', 'Meerut', 'Varanasi', 'Nashik'
  ];

  const nicheOptions = [
    'Software Engineering', 'Data Science', 'Web Development', 'Cybersecurity', 'Machine Learning', 'AI', 'DevOps', 'Cloud Computing', 'Blockchain', 'Mobile Development'
  ];

const Jobs = () => {
  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [niche, setNiche] = useState('');
  const [selectedniche, setSelectedNiche] = useState('');
  const [searchedKeyword, setSearchedKeyword] = useState('');
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }

    dispatch(fetchJobs(city, niche, searchedKeyword));
  }, [city, niche, searchedKeyword, error, dispatch]);

  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, searchedKeyword));
  };

  return (
    <>
    <div className="container mx-auto p-4 mt-16">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/4 bg-primary3 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-4">Filter by City</h2>
          {cityOptions.map((city, index) => (
            <div key={index} className="mb-2">
              <input
                type="radio"
                id={city}
                name="city"
                value={city}
                checked={selectedCity === city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setSelectedCity(e.target.value);
                }}
                className="mr-2"
              />
              <label htmlFor={city}>{city}</label>
            </div>
          ))}
          
          <h2 className="text-lg font-semibold mt-6 mb-4">Filter by Niche</h2>
          {nicheOptions.map((niche, index) => (
            <div key={index} className="mb-2">
              <input
                type="radio"
                id={niche}
                name="niche"
                value={niche}
                checked={selectedniche === niche}
                onChange={
                  (e) => {
                  setNiche(e.target.value);
                  setSelectedNiche(niche)}
                }
                className="mr-2"
              />
               <label htmlFor={niche}>{niche}</label>
            </div>
          ))}
        </div>

        <div className="w-full sm:w-3/4">
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <input
                type="text"
                placeholder="Search by keyword"
                value={searchedKeyword}
                onChange={(e) => setSearchedKeyword(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 flex-grow"
              />
              <button
                onClick={handleSearch}
                className="bg-primary text-white rounded p-2"
              >
                Search
              </button>
            </div>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <div>
              {jobs.length > 0 ? (
                <ul className='grid lg:grid-cols-3 grid-cols-1 gap-2 '>
                  {jobs.map((job) => (
                     <li key={job._id} className="border border-gray-300 rounded-xl p-4 shadow-md bg-white">
                      <p className={` w-fit rounded-lg text-sm mb-2  px-2 py-1 ${job.hiringMultipleCandidates=="Yes"? "bg-green-300 text-green-600" : "bg-blue-300 text-blue-600"}`}>{job.hiringMultipleCandidates=="Yes"?"Hiring Multiple Candidates":"Hiring"}</p>
                     <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                     <p className="text-gray-700 mb-2">Company: <span className="font-medium">{job.companyName}</span></p>
                     <p className="text-gray-700 mb-2">Job Type: <span className="font-medium">{job.jobType}</span></p>
                     <p className="text-gray-700 mb-2">Location: <span className="font-medium">{job.location}</span></p>
                     <p className="text-gray-700 mb-2">Niche: <span className="font-medium">{job.jobNiche}</span></p>
                     <p className="text-gray-700 mb-2">Salary: <span className="font-medium">₹{job.salary}</span></p>
                     <div className="text-gray-500 text-sm flex justify-between items-center">Posted on: {new Date(job.jobPostedOn).toLocaleDateString()}
                      <Link to={`/post/application/${job._id}`} className='text-black bg-primary p-2 rounded-lg hover:text-white hover:bg-black'>
                        Apply Now
                      </Link>
                     </div>
                   </li>
                  ))}
                </ul>
              ) : (
                <p>No jobs found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
      <Footer/>
    </>
  );
};

export default Jobs;
