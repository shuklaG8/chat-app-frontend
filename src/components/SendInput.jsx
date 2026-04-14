import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMessages } from "../redux/messageSlice";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);
  const {messages} = useSelector((store) => store.message);

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    // Handle message submission logic here
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/message/send/${selectedUser?._id}`,{message}, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(setMessages([...messages, res?.data?.newMessage]));
    } catch (error) {
      console.log(error);
    }
    setMessage("");
  }

  return (
    <form onSubmit={onSubmitHandler} className="px-5 py-4 border-t border-pink-500/10 bg-[#140a25]/70 backdrop-blur-xl">
      <div className="relative w-full">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Send a message..."
          className="w-full rounded-2xl border border-pink-500/20 bg-[#24123d]/80 py-3 pl-4 pr-14 text-white placeholder:text-pink-200/40 outline-none focus:border-pink-500/40 focus:ring-2 focus:ring-pink-500/20 transition"
        />

        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-r from-pink-600 via-fuchsia-600 to-purple-700 text-white shadow-lg shadow-pink-500/20 hover:scale-105 transition"
        >
          <IoSend className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default SendInput;