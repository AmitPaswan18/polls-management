import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import Dashboard from "./pages/Dashboard";
import Registrationform from "./components/auth/Registrationform";
import AddNewPoll from "./components/admin/AddNewPoll";
import EditPollTitle from "./components/admin/EditPollTitle";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route exact path="/signup" element={<Registrationform />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/edittitle/:id" element={<EditPollTitle />} />
        <Route exact path="/addNewPoll" element={<AddNewPoll />} />
      </Routes>
    </Router>
  );
};

export default App;
