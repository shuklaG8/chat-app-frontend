import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((state) => state.user);

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };

  const isOnline = onlineUsers?.includes(user._id);

  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)}
        className={`flex items-center gap-4 p-2 rounded-2xl cursor-pointer border transition-all duration-200 ${
          selectedUser?._id === user?._id
            ? "bg-[#2f184d] border-pink-500/30"
            : "bg-[#24123d]/70 border-pink-500/10 hover:bg-[#2f184d]"
        }`}
      >
        <div className="avatar relative">
          <div className="w-12 rounded-full overflow-hidden border border-pink-400/30">
            <img src={user?.profilePhoto} alt="user-profile" />
          </div>
          <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#140a25] ${isOnline ? 'bg-green-500 shadow-[0_0_5px_#22c55e]' : 'bg-gray-500'}`}></span>
        </div>

        <div className="flex flex-col flex-1">
          <p className="font-semibold text-white">{user?.fullName}</p>
        </div>
      </div>

      <div className="my-2 border-b border-pink-500/10"></div>
    </>
  );
};

export default OtherUser;