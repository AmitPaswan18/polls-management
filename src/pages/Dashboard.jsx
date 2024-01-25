import AdminPollList from "../components/admin/AdminPollList";
import UserPoll from "../components/users/UserPoll";
import { useSelector } from "react-redux";
const Dashboard = () => {
  let userRole = useSelector((state) => state.auth.role);
  return (
    <div className="bg-[#F6F6F6] h-fit font-semibold text-lg ">
      <div>{userRole === "Admin" ? <AdminPollList /> : <UserPoll />}</div>
    </div>
  );
};

export default Dashboard;
