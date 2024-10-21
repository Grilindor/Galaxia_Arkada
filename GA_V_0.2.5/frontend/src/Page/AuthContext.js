import React, { createContext, useState, useEffect } from "react";
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
        setUser(data.user); // Stocker l'utilisateur côté frontend
        sessionStorage.setItem("token", data.accessToken); // Stocker le token dans sessionStorage
        console.log("Token stocké dans sessionStorage:", data.accessToken);
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

  // Restaurer l'utilisateur à partir de sessionStorage et récupérer les infos utilisateur
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3000/api/user/Profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data;
          setUser(data);
          sessionStorage.setItem("user", JSON.stringify(data));
        })
        .catch((err) => {
          console.error("Erreur lors de la récupération des informations utilisateur", err);
        });
    }
  }, []);

  // Fonction pour gérer le logout
  const logout = () => {
    console.log("Déconnexion de l'utilisateur :", user);
    setUser(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
