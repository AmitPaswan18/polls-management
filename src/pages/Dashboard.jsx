import { jwtDecode } from "jwt-decode";
import AdminPollList from "../components/admin/AdminPollList";
import UserPoll from "../components/users/UserPoll";

const Dashboard = () => {
  const token = localStorage.getItem("polltoken");
  const decodeToken = jwtDecode(token);
  return (
    <div className="bg-[#F6F6F6] h-fit font-semibold text-lg">
      {" "}
      <div>
        {decodeToken.role === "Admin" ? <AdminPollList /> : <UserPoll />}
      </div>
    </div>
  );
};

export default Dashboard;
