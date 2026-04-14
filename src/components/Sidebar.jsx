import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setAuthUser, setOtherUsers } from "../redux/userSlice";
import EditProfile from "./EditProfile";


const Sidebar = () => {
    const [search, setSearch] = useState("");
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const { otherUsers } = useSelector(store => store.user)
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
        } catch (error) {
            console.log(error);
            toast.error("Logout failed. Please try again.");
        }
    }

    const searchSubmitHandler = (e) => {
        e.preventDefault();

        if (!search.trim()) return;

        const conversationUser = otherUsers?.find((user) =>
            user.fullName.toLowerCase().includes(search.toLowerCase())
        );

        if (conversationUser) {
            dispatch(setOtherUsers([conversationUser]));
            setSearch("");
        } else {
            toast.error("User not found. Please try again.");
        }
    };

    return (
        <div className="w-[320px] h-full border-r border-pink-500/20 bg-[#140a25]/80 backdrop-blur-xl p-5 flex flex-col">
            {/* Search */}
            <form onSubmit={searchSubmitHandler} className="flex items-center gap-3 mb-5">
                <div className="flex items-center w-full rounded-xl bg-[#2b1646]/80 border border-pink-400/20 px-3">
                    <BiSearchAlt2 className="text-pink-300 w-5 h-5" />

                    <input
                        type="text"
                        placeholder="Search user..."
                        className="w-full bg-transparent px-3 py-3 text-white placeholder:text-gray-400 outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="p-3 rounded-xl bg-linear-to-r from-pink-600 via-fuchsia-600 to-purple-700 text-white hover:scale-105 transition"
                >
                    <BiSearchAlt2 className="w-5 h-5" />
                </button>
            </form>

            {/* Users */}
            <div className="divider px-3"></div>
            <OtherUsers />
            {/* Actions */}
            <div className="pt-5 border-t border-pink-500/10 mt-auto flex flex-col gap-2">
                <button onClick={() => setIsEditProfileOpen(true)} className="w-full py-3 rounded-xl bg-[#2b1646]/60 border border-pink-400/20 text-blue-200 hover:bg-[#3a1f5c] transition">
                    Edit Profile
                </button>
                <button onClick={logoutHandler} className="w-full py-3 rounded-xl bg-[#2b1646]/80 border border-red-500/20 text-red-300 hover:bg-[#4a1f2c] transition">
                    Logout
                </button>
                <EditProfile isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} />
            </div>
        </div>
    );
};

export default Sidebar;