import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { updatePassword } from '../store/slices/updateProfile';

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit =  (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("New Password and Confirm Password do not match", {
                position: "bottom-right",
                autoClose: 2000,
            });
            return;
        }


        const data = {
            oldPassword,
            newPassword,
            confirmPassword
        };

        try {
            dispatch(updatePassword(data));
            toast.success("Password Updated Successfully", {
                position: "bottom-right",
                autoClose: 2000,
            });
        } catch (error) {
            toast.error("Failed to Update Password", {
                position: "bottom-right",
                autoClose: 2000,
            });
            console.error("Update Password Error:", error);
        }
    };

    return (
        <div className="flex justify-center mt-10">
            <form onSubmit={handleSubmit} className="rounded-lg p-6 w-full max-w-md bg-white shadow-lg">
                <div className="mb-4">
                    <label className="block text-gray-700">Old Password:</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="mt-1 p-2 bg-gray-100 rounded-md w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1 p-2 bg-gray-100 rounded-md w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Confirm New Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 p-2 bg-gray-100 rounded-md w-full"
                        required
                    />
                </div>
                <div className="mt-6">
                    <button type="submit" className="p-2 bg-primary text-white rounded-md hover:bg-black w-full">
                        Update Password
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdatePassword;
