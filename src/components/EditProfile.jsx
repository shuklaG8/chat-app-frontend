import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

const EditProfile = ({ isOpen, onClose }) => {
    const { authUser } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    const [fullName, setFullName] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (authUser) {
            setFullName(authUser.fullName || "");
            setProfilePhoto(authUser.profilePhoto || "");
        }
    }, [authUser, isOpen]);

    if (!isOpen) return null;

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 300;
                    const MAX_HEIGHT = 300;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
                    setProfilePhoto(compressedBase64);
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/user/profile`, {
                fullName,
                profilePhoto
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data) {
                toast.success(res.data.message);
                dispatch(setAuthUser(res.data));
                onClose();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-[#140a25] border border-pink-500/20 p-6 rounded-2xl w-96 relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    ✕
                </button>
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Edit Profile</h2>
                
                <form onSubmit={submitHandler} className="flex flex-col gap-4">
                    <div className="flex flex-col items-center gap-3">
                        <input 
                            type="file" 
                            accept="image/*" 
                            hidden 
                            ref={fileInputRef} 
                            onChange={handlePhotoChange} 
                        />
                        <div 
                            className="relative cursor-pointer group"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <img 
                                src={profilePhoto || "https://avatar.iran.liara.run/public"} 
                                alt="Preview" 
                                className="w-24 h-24 rounded-full border-2 border-pink-500 object-cover transition duration-300 group-hover:brightness-75 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black/40">
                                <span className="text-white text-xs font-semibold drop-shadow-md">Change</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-pink-200 text-sm font-medium mb-1 block">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full bg-[#2b1646]/80 border border-pink-400/20 text-white rounded-xl px-4 py-3 outline-none focus:border-pink-500"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-linear-to-r from-pink-600 via-fuchsia-600 to-purple-700 text-white font-bold hover:scale-[1.02] transition disabled:opacity-50 mt-2"
                    >
                        {loading ? "Updating..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
