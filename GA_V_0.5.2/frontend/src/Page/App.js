import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";
import Login from "./login";
import Home from "./Home";
import User from "./User";
import Signup from "./Sign_Up";
import Bibliothèque from "./Bibliothèque";
import Forgotpassword from "./ForgotPassword";
import Game from "./Game";
import GameSubmissionForm from "./GameSubmissionForm";
import UnityGame from "./thebeggarking.js (enpause)";
import ProtectedRoute from "./ProtectedRoute";
import AdminPage from "../Admin_page/Admin";
import AdminPagestats from "../Admin_page/Admin_stats";
import AdminPageuser from "../Admin_page/Admin_users";
import AdminPagegamesubmissions from "../Admin_page/Admin_game_submissions";
import AdminPageproduits from "../Admin_page/Admin_products";
import AdminPagelogs from "../Admin_page/Admin_logs";
import AdminPagesettings from "../Admin_page/Admin_settings";
import AdminPageprofile from "../Admin_page/Admin_profile";
import AdminPagenotifications from "../Admin_page/Admin_notifications";
function AppRoutes() {
  const { user } = useAuth(); // Vérifiez si l'utilisateur est connecté

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      {/* Rendre la page d'accueil accessible à tous */}
      <Route path="/home" element={<Home />} />
      <Route path="/thebeggarking" element={<UnityGame />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/user"
        element={user ? <User /> : <Navigate to="/login" />}
      />
      <Route path="/api/users/signup" element={<Signup />} />
      <Route
        path="/Bibliothèque"
        element={user ? <Bibliothèque /> : <Navigate to="/login" />}
      />
      <Route path="/forgot_password" element={<Forgotpassword />} />
      <Route
        path="/game/:id"
        element={user ? <Game /> : <Navigate to="/login" />}
      />
      <Route
        path="/play/:id"
        element={user ? <UnityGame /> : <Navigate to="/login" />}
      />
      <Route
        path="/GameSubmissionForm"
        element={
          <ProtectedRoute allowedRoles={["admin", "devo", "user"]}>
            {" "}
            {/* enlever user*/}
            <GameSubmissionForm />
          </ProtectedRoute>
        }
      />
      <Route path="/adminPage" element={<AdminPage />} />
      <Route path="/adminPage/stats" element={<AdminPagestats />} />
      <Route path="/adminPage/user" element={<AdminPageuser />} />
      <Route
        path="/adminPage/Game_submissions"
        element={<AdminPagegamesubmissions />}
      />
      <Route path="/adminPage/produits" element={<AdminPageproduits />} />
      <Route path="/adminPage/logs" element={<AdminPagelogs />} />
      <Route path="/adminPage/Settings" element={<AdminPagesettings />} />
      <Route path="/adminPage/Profile" element={<AdminPageprofile />} />
      <Route
        path="/adminPage/notifications"
        element={<AdminPagenotifications />}
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
