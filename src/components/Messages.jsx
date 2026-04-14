import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';
import useGetMessages from '../hooks/useGetMessages';
import Message from './Message'
import { useSelector } from "react-redux";

const Messages = () => {
    useGetMessages();
    useGetRealTimeMessage();
    const { messages } = useSelector(store => store.message);
    return (
        <div className='px-4 flex-1 overflow-auto'>
            {
               messages && messages?.map((message) => {
                    return (
                        <Message key={message._id} message={message} />
                    )
                })
            }

        </div>


    )
}

export default Messages