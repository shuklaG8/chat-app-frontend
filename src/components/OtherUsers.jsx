import { useSelector } from "react-redux";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import OtherUser from "./OtherUser";

const OtherUsers = () => {
  useGetOtherUsers();

  const { otherUsers } = useSelector((state) => state.user);

  return (
    <div className="overflow-auto flex-1">
      {Array.isArray(otherUsers) &&
        otherUsers.map((user) => (
          <OtherUser key={user._id} user={user} />
        ))}
    </div>
  );
};

export default OtherUsers;