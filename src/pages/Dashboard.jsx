import AdminPollList from "../components/admin/AdminPollList";
import UserPoll from "../components/users/UserPoll";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const showUser = localStorage.getItem("polltoken");
  const decoded = jwtDecode(showUser);
  const navigate = useNavigate();
  if (!showUser) {
    navigate("/");
  }
  return (
    <div className="bg-[#F6F6F6] h-fit font-semibold text-lg ">
      <div>{decoded.role === "Admin" ? <AdminPollList /> : <UserPoll />}</div>
    </div>
  );
};

export default Dashboard;
