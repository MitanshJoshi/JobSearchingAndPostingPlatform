import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearAllApplicationErrors,
  postApplication,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { fetchSingleJob } from "../store/slices/jobSlice";
import { toast } from "react-toastify";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaBuilding,
} from "react-icons/fa";
import Footer from "../components/Footer";

const PostApplicationComp = () => {
  const { singleJob } = useSelector((state) => state.jobs);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector((state) => state.application);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("phone", phone);
    data.append("address", address);
    data.append("coverLetter", coverLetter);
    if (resume) {
      data.append("resume", resume);
    }
    dispatch(postApplication(data, id));
  };

  useEffect(() => {
    if (user) {
      setName(user?.name || "");
      setEmail(user?.email || "");
      setPhone(user?.phone || "");
      setAddress(user?.address || "");
      setCoverLetter(user?.coverLetter || "");
    }
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }

    dispatch(fetchSingleJob(id));
  }, [dispatch, error, message, id, navigate, isAuthenticated, user]);

  let qualifications = [];
  let responsibilities = [];
  let offers = [];

  if (singleJob.qualifications) {
    qualifications = singleJob.qualifications.split(".");
  }
  if (singleJob.responsibilities) {
    responsibilities = singleJob.responsibilities.split(".");
  }
  if (singleJob.offers) {
    offers = singleJob.offers.split(".");
  }

  if (!user) {
    return <div>Loading......</div>;
  }
  

  return (
    <>
      <div className="container mt-16 mx-auto p-4 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <form
            onSubmit={handleSubmit}
            className=" rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Job Title
              </label>
              <input
                id="title"
                type="text"
                value={singleJob.title}
                className="shadow bg-gray-300 text-gray-500 appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                fixed
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your address"
              />
            </div>
            {user.role === "Job Seeker" &&
            <>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="coverLetter"
              >
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your cover letter"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="resume"
              >
                Resume
              </label>
              <input
                id="resume"
                type="file"
                onChange={handleFileChange}
                className="block p-1 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-primary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
            </>
            }
          </form>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-semibold mb-4">{singleJob.title}</h2>
            <hr></hr>
            <h2 className="text-xl font-semibold mb-2">Job Details</h2>
            <div className=" mb-4">
              <div className="flex items-center">
                <FaBuilding className="text-gray-600 mr-2" />
                <span className="text-lg font-semibold">
                  {singleJob.companyName}
                </span>
              </div>
              {/* <div className="flex item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>

              <a
                target="_blank"
                href={singleJob.personalWebsite.url}
                className="text-sm font-semibold underline"
              >
                {singleJob.companyName}
              </a>
              </div> */}
            </div>
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-gray-600 mr-2" />
              <span className="text-lg">{singleJob.location}</span>
            </div>
            <div className="flex items-center mb-4">
              <FaClock className="text-gray-600 mr-2" />
              <span className="text-lg">{singleJob.jobType}</span>
            </div>
            <div className="flex items-center mb-4">
              <FaMoneyBillWave className="text-gray-600 mr-2" />
              <span className="text-lg">{singleJob.salary}</span>
            </div>
            <hr></hr>
            <h3 className="text-xl font-semibold mb-2">Introduction</h3>
            <p className="mb-4">{singleJob.introduction}</p>
            <hr></hr>
            <h3 className="text-xl font-semibold mb-2">Qualifications</h3>
            <ul className="list-disc pl-5 mb-4">
              {qualifications.map((q, index) => (
                <li key={index} className="mb-1">
                  {q}
                </li>
              ))}
            </ul>
            <hr></hr>
            <h3 className="text-xl font-semibold mb-2">Responsibilities</h3>
            <ul className="list-disc pl-5 mb-4">
              {responsibilities.map((r, index) => (
                <li key={index} className="mb-1">
                  {r}
                </li>
              ))}
            </ul>
            <h3 className="text-xl font-semibold mb-2">Offers</h3>
            <hr></hr>
            <ul className="list-disc pl-5 mb-4">
              {offers.map((o, index) => (
                <li key={index} className="mb-1">
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostApplicationComp;
