import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  const isMyMessage = message?.senderId === authUser?._id;

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={scroll}
      className={`chat ${isMyMessage ? "chat-end" : "chat-start"} mb-4`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full border border-pink-500/20 overflow-hidden">
          <img
            alt="user-profile"
            src={
              isMyMessage
                ? authUser?.profilePhoto
                : selectedUser?.profilePhoto
            }
          />
        </div>
      </div>

      <div className="chat-header mb-1">
        <time className="text-xs text-pink-200/50">
          {new Date(message?.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
      </div>

      <div
        className={`chat-bubble max-w-xs md:max-w-md text-sm border ${isMyMessage
          ? "bg-linear-to-r from-pink-600 via-fuchsia-600 to-purple-700 text-white border-pink-500/20"
          : "bg-[#24123d]/80 text-pink-100 border-pink-500/10"
          }`}
      >
        {message?.message}
      </div>
    </div>
  );
};

export default Message;