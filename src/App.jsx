import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Quiz from "./pages/Quizpage"; // (your quiz page)
import ResultPage from "./pages/Resultpage";
import Other from "./pages/Other";
import Subjects from "./pages/Subjects";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quiz/:subject" element={<Other />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/" element={<Subjects />} />
      </Routes>
    </Router>
  );
}

export default App;
