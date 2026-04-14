import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
    const {socket} = useSelector(store=>store.socket);
    const {messages} = useSelector(store=>store.message);
    const {selectedUser} = useSelector(store=>store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            if (selectedUser?._id === newMessage?.senderId) {
                dispatch(setMessages([...messages, newMessage]));
            }
        };

        if (socket) {
            socket.on("newMessage", handleNewMessage);
        }

        return () => {
            if (socket) {
                socket.off("newMessage", handleNewMessage);
            }
        };
    }, [socket, messages, selectedUser, dispatch]);
};
export default useGetRealTimeMessage;