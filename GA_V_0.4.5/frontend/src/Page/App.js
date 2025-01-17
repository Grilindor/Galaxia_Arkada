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
import UnityGame from "./thebeggarking";
import ProtectedRoute from "./ProtectedRoute";
import AdminPage from "./Admin";
import AdminPagestats from "./Admin_stats";
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
        path="/game"
        element={user ? <Game /> : <Navigate to="/login" />}
      />
      <Route
        path="/GameSubmissionForm"
        element={
          <ProtectedRoute allowedRoles={["admin", "devo"]}>
            <GameSubmissionForm />
          </ProtectedRoute>
        }
      />
      <Route path="/adminPage" element={<AdminPage />} />
      <Route path="/adminPage/stats" element={<AdminPagestats />} />
      <Route path="/adminPage/users" element={<AdminPagestats />} />
      <Route path="/adminPage/game_submissions" element={<AdminPagestats />} />
      <Route path="/adminPage/produit" element={<AdminPagestats />} />
      <Route path="/adminPage/logs" element={<AdminPagestats />} />
      <Route path="/adminPage/setting" element={<AdminPagestats />} />
      <Route path="/adminPage/profile" element={<AdminPagestats />} />
      <Route path="/adminPage/notifications" element={<AdminPagestats />} />
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
