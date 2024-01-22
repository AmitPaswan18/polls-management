import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Registrationform from "./components/auth/Registrationform.jsx";
import LoginForm from "./components/auth/LoginForm.jsx";
import DashBoard from "./pages/Dashboard.jsx";
import AdminPollList from "./components/admin/AdminPollList.jsx";

import "./index.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route exact path="/signup" element={<Registrationform />} />
          <Route exact path="/dashboard" element={<DashBoard />} />
          <Route exact path="/addpoll" element={<AdminPollList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
