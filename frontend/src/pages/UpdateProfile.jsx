import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile } from '../store/slices/updateProfile';
import { toast } from 'react-toastify';

const nicheOptions = [
    'Software Engineering', 'Data Science', 'Web Development', 'Cybersecurity', 
    'Machine Learning', 'AI', 'DevOps', 'Cloud Computing', 'Blockchain', 
    'Mobile Development'
];

const UpdateProfile = () => {
    const { isAuthenticated, user } = useSelector(state => state.user);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [resume, setresume] = useState("")
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [firstNiche, setFirstNiche] = useState("");
    const [secondNiche, setSecondNiche] = useState("");
    const [thirdNiche, setThirdNiche] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        setName(user.name);
        setEmail(user.email)
        setPhone(user.phone)
        setAddress(user.address)
        if(user.role === "Job Seeker")
        {
            setFirstNiche(user.niches.firstNiche)
            setSecondNiche(user.niches.secondNiche)
            setThirdNiche(user.niches.thirdNiche)
            setCoverLetter(user.coverLetter)
            setresume(user.resume.url)
        }
    }, [])
    

    if (!isAuthenticated || !user) {
        return <div className="text-center mt-10">You are not logged in</div>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name",name);
        data.append("email",email);
        data.append("phone",phone);
        data.append("address",address);
        if(user.role==="Job Seeker")
        {
            data.append("firstNiche",firstNiche);
            data.append("secondNiche",secondNiche);
            data.append("thirdNiche",thirdNiche);
            data.append("coverLetter",coverLetter);
        }
        if(resume)
        {
            data.append("resume",resume);
        }
        dispatch(updateProfile(data))
        toast.success("Profile Updated",{
            position:"bottom-right",
            autoClose:1000
        })
      
      };

    return (
        <div className="flex justify-center mt-10">
            <form onSubmit={handleSubmit} className="rounded-lg p-6 w-full max-w-2xl">
                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 p-2 bg-gray-100 rounded-md w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 p-2 bg-gray-100 rounded-md w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone:</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 p-2 bg-gray-100 rounded-md w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="mt-1 p-2 bg-gray-100 rounded-md w-full"
                    />
                </div>
                {user.role === "Job Seeker" && (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700">First Niche:</label>
                            <select
                                value={firstNiche}
                                onChange={(e) => setFirstNiche(e.target.value)}
                                className="mt-1 p-2 bg-gray-100 rounded-md w-full"
                            >
                                {nicheOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Second Niche:</label>
                            <select
                                value={secondNiche}
                                onChange={(e) => setSecondNiche(e.target.value)}
                                className="mt-1 p-2 bg-gray-100 rounded-md w-full"
                            >
                                {nicheOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Third Niche:</label>
                            <select
                                value={thirdNiche}
                                onChange={(e) => setThirdNiche(e.target.value)}
                                className="mt-1 p-2 bg-gray-100 rounded-md w-full"
                            >
                                {nicheOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Cover Letter:</label>
                            <textarea
                                value={coverLetter}
                                onChange={(e) => setCoverLetter(e.target.value)}
                                className="mt-1 p-2 bg-gray-100 rounded-md w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <a
                                href={user.resume.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 p-2 bg-primary text-white rounded-md hover:bg-black"
                            >
                                View Resume
                            </a>
                        </div>
                    </>
                )}
                <div className="mt-6">
                    <button type="submit" className="p-2 bg-primary text-white rounded-md hover:bg-black">
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateProfile;
