import { useSelector } from "react-redux";
import SendInput from "./SendInput";
import Messages from "./Messages";

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector((state) => state.user);

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  const formatLastSeen = (user) => {
    const dateStr = user?.lastSeen || user?.updatedAt;
    if (!dateStr) return "Offline";
    
    const date = new Date(dateStr);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMins < 1) return "Last seen just now";
    if (diffInMins < 60) return `Last seen ${diffInMins} min ago`;
    if (diffInHours < 24) return `Last seen ${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays === 1) return `Last seen yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    return `Last seen on ${date.toLocaleDateString()}`;
  };

  return (
    <>
      {selectedUser ? (
        <div className="flex-1 flex flex-col bg-[#140a25]/50">
          {/* Header */}
          <div className="flex items-center gap-4 px-5 py-4 border-b border-pink-500/10 bg-[#1b0b2e]/80 backdrop-blur-xl">
            <div className="avatar relative">
              <div className="w-12 rounded-full overflow-hidden border border-pink-500/20">
                <img
                  src={selectedUser?.profilePhoto}
                  alt="user-profile"
                />
              </div>
              <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#1b0b2e] ${isOnline ? 'bg-green-500 shadow-[0_0_5px_#22c55e]' : 'bg-gray-500'}`}></span>
            </div>

            <div className="flex flex-col">
              <p className="text-white font-semibold text-lg">
                {selectedUser?.fullName}
              </p>
              <span className="text-sm text-pink-200/50">
                {isOnline ? "Online" : formatLastSeen(selectedUser)}
              </span>
            </div>
          </div>

          {/* Messages */}
          <Messages />

          {/* Input */}
          <SendInput />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-[#140a25]/40 text-center px-4">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-white mb-3">
              Hi, {authUser?.fullName}
            </h1>

            <p className="text-xl text-pink-200/70">
              Select a chat from the sidebar and start your conversation.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MessageContainer;