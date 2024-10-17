import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const login = async (Email, password) => {
    console.log("Tentative de connexion avec", { Email, password }); // Débogage 1

    // Vérification si l'Email ou le mot de passe est manquant
    if (!Email || !password) {
      console.error("Email ou mot de passe manquant."); // Débogage supplémentaire
      setError("Veuillez entrer un email et un mot de passe.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: Email, password: password }),
      });

      console.log("Réponse du serveur :", response); // Débogage 2

      const data = await response.json();
      console.log("Données reçues du serveur :", data); // Débogage 3

      if (!response.ok) {
        console.error("Erreur de réponse du serveur :", data.message); // Débogage 4
        setError(data.message || "Erreur de connexion");
        return;
      }

      if (data.success) {
        console.log("Connexion réussie, utilisateur :", data.user); // Débogage 5
        setUser(data.user); // Assurez-vous que l'API renvoie l'utilisateur
      } else {
        console.warn("Nom d'utilisateur ou mot de passe incorrect."); // Débogage 6
        setError("Nom d'utilisateur ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error); // Débogage 7
      setError(error.message);
    }
  };

  const logout = () => {
    console.log("Déconnexion de l'utilisateur :", user); // Débogage 8
    setUser(null); // Déconnexion
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  console.log("Utilisation de useAuth"); // Débogage 9
  return React.useContext(AuthContext);
};
