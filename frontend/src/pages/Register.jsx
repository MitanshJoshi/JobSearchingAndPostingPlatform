import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllUserErrors, register } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Register = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstNiche, setFirstNiche] = useState("");
  const [secondNiche, setSecondNiche] = useState("");
  const [thirdNiche, setThirdNiche] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");
  const [eye, seteye] = useState(true)

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

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);
    if (role === "Job Seeker") {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
      formData.append("resume", resume);
    }
    dispatch(register(formData));
  };

  useEffect(() => {
    if (error) {
        // console.log(error);
        
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [error, isAuthenticated, loading, dispatch, message]);

  return (
    <div className=" flex items-center justify-center mt-10">
        
      <div className=" p-4 rounded-lg  w-full max-w-5xl">
        <h2 className="text-3xl mb-6 text-center">Create a new account</h2>
        <form onSubmit={handleRegister} encType="multipart/form-data">
          <div className="mb-4 flex gap-2">
            <div className="w-1/2">
            <label htmlFor="role" className="block text-gray-700">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full p-2 border bg-gray-300 border-gray-300 rounded-md"
            >
              <option value="">Select Role</option>
              <option value="Employer">Employer</option>
              <option value="Job Seeker">Job Seeker</option>
            </select>
            </div>
            <div className="w-1/2">
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full p-2 border bg-gray-300 border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="flex space-x-4 mb-4">
            
            <div className="w-1/2">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-2 border bg-gray-300 border-gray-300 rounded-md"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="phone" className="block text-gray-700">Phone</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full p-2 border bg-gray-300 border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label htmlFor="address" className="block text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full p-2 border bg-gray-300 border-gray-300 rounded-md"
              />
            </div>
          <div className="mb-4 w-1/2 relative">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type={`${eye?"password":"text"}`}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border bg-gray-300 border-gray-300 rounded-md"
              />
              {eye?<FaEyeSlash onClick={()=>seteye(!eye)} className="absolute right-2 cursor-pointer top-[57%]"/>:<FaEye onClick={()=>seteye(!eye)} className="absolute right-2 cursor-pointer top-[57%]"/>}
          </div>
          </div>
          {role === "Job Seeker" && (
            <>
              <div className="flex space-x-4 mb-4">
                <div className="w-1/3">
                  <label htmlFor="firstNiche" className="block text-gray-700">First Niche</label>
                  <select
                    id="firstNiche"
                    value={firstNiche}
                    onChange={(e) => setFirstNiche(e.target.value)}
                    className="mt-1 block w-full p-2 border bg-gray-300 border-gray-300 rounded-md"
                  >
                    <option value="">Select</option>
                    {nicheOptions.map((niche) => (
                      <option key={niche} value={niche}>{niche}</option>
                    ))}
                  </select>
                </div>
                <div className="w-1/3">
                  <label htmlFor="secondNiche" className="block text-gray-700">Second Niche</label>
                  <select
                    id="secondNiche"
                    value={secondNiche}
                    onChange={(e) => setSecondNiche(e.target.value)}
                    className="mt-1 block w-full p-2 border bg-gray-300 border-gray-300 rounded-md"
                  >
                    <option value="">Select</option>
                    {nicheOptions.map((niche) => (
                      <option key={niche} value={niche}>{niche}</option>
                    ))}
                  </select>
                </div>
                <div className="w-1/3">
                  <label htmlFor="thirdNiche" className="block text-gray-700">Third Niche</label>
                  <select
                    id="thirdNiche"
                    value={thirdNiche}
                    onChange={(e) => setThirdNiche(e.target.value)}
                    className="mt-1 block w-full p-2 border bg-gray-300 border-gray-300 rounded-md"
                  >
                    <option value="">Select</option>
                    {nicheOptions.map((niche) => (
                      <option key={niche} value={niche}>{niche}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="coverLetter" className="block text-gray-700">Cover Letter</label>
                <textarea
                  id="coverLetter"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="mt-1 block w-full p-2 border bg-gray-300 border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="resume" className="block text-gray-700">Resume</label>
                <input
                  type="file"
                  id="resume"
                  onChange={resumeHandler}
                  className="mt-1 block w-full p-2 border bg-gray-300 border-gray-300 rounded-md"
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full mb-4 py-2 px-4 bg-primary text-white rounded-md hover:bg-black hover:text-white"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <button
            type="submit"
            className="w-full py-2 px-4  text-primary border-primary border-[2px] rounded-md hover:bg-black hover:text-white"
            onClick={()=>navigate("/login")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
