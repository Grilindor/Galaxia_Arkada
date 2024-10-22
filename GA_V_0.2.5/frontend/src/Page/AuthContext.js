import React, { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Fonction pour gérer le login
  const login = async (email, password) => {
    console.log("Tentative de connexion avec", { email, password });
    if (!email || !password) {
      console.error("Email ou mot de passe manquant.");
      setError("Veuillez entrer un email et un mot de passe.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/signin",
        { email, password }
      );
      console.log("Réponse du serveur :", response);
      const data = response.data;

      if (response.status === 200) {
        console.log("Connexion réussie, utilisateur :", data.user);
        sessionStorage.setItem("token", data.accessToken); // Stocker seulement le token dans sessionStorage
        fetchUserData(); // Appeler fetchUserData pour obtenir les infos utilisateur après la connexion
      } else {
        console.warn("Nom d'utilisateur ou mot de passe incorrect.");
        setError("Nom d'utilisateur ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      setError("Une erreur est survenue lors de la connexion.");
      throw error; // Propager l'erreur pour la gérer dans le composant Login
    }
  };

  // Fonction pour récupérer les informations utilisateur après connexion
  const fetchUserData = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.log("Aucun token trouvé, utilisateur non connecté.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:3000/api/user/Profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      console.log("Réponse du serveur pour les infos utilisateur :", data);
      setUser(data); // Définir l'utilisateur ici après avoir récupéré les données
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des informations utilisateur",
        err
      );
    }
  };

  // Fonction pour gérer le logout
  const logout = () => {
    console.log("Déconnexion de l'utilisateur :", user);
    setUser(null); // Réinitialiser l'état de l'utilisateur
    sessionStorage.removeItem("token"); // Supprimer uniquement le token
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
