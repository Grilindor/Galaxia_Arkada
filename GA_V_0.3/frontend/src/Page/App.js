import React from "react";
import UnityGame from "./thebeggarking";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext"; // Assurez-vous que le chemin est correct
import Login from "./login";
import Home from "./Home";
import User from "./User";
import Signup from "./Sign_Up";
import Bibliothèque from "./Bibliothèque";
import Forgotpassword from "./ForgotPassword";
import Game from "./Game";
import GameSubmissionForm from "./GameSubmissionForm";

function AppRoutes() {
  const { user } = useAuth(); // Vérifiez si l'utilisateur est connecté

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} /> met ça dans ton app.js
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
        element={user ? <GameSubmissionForm /> : <Navigate to="/login" />}
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