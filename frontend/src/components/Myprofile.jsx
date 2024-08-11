import React from 'react'
import { useSelector } from 'react-redux'

const MyProfile = () => {
    const { isAuthenticated, user } = useSelector(state => state.user);

    if (!isAuthenticated || !user) {
        return <div className="text-center mt-10">You are not logged in</div>;
    }

    return (
        <div className="flex justify-center mt-10">
            <div className="rounded-lg p-6 w-full max-w-2xl">
            
                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <div className="mt-1 p-2 bg-gray-100 rounded-md">{user.name}</div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <div className="mt-1 p-2 bg-gray-100 rounded-md">{user.email}</div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone:</label>
                    <div className="mt-1 p-2 bg-gray-100 rounded-md">{user.phone}</div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Address:</label>
                    <div className="mt-1 p-2 bg-gray-100 rounded-md">{user.address}</div>
                </div>
                {user.role==="Job Seeker"?(
                    <>
                <div className="mb-4">
                    <label className="block text-gray-700">First Niche:</label>
                    <div className="mt-1 p-2 bg-gray-100 rounded-md">{user.niches.firstNiche}</div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Second Niche:</label>
                    <div className="mt-1 p-2 bg-gray-100 rounded-md">{user.niches.secondNiche}</div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Third Niche:</label>
                    <div className="mt-1 p-2 bg-gray-100 rounded-md">{user.niches.thirdNiche}</div>
                </div>
                

                <div className="mb-4">
                    <label className="block text-gray-700">Cover Letter:</label>
                    <div className="mt-1 p-2 bg-gray-100 rounded-md">{user.coverLetter}</div>
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
                </div></>):""}
            </div>
        </div>
    )
}

export default MyProfile
