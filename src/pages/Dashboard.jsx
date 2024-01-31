import { jwtDecode } from "jwt-decode";
import AdminPollList from "../components/admin/AdminPollList";
import UserPoll from "../components/users/UserPoll";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const token = localStorage.getItem("polltoken");
  const decodeToken = jwtDecode(token);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

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
