import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <div className="bg-light-subtle" style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
