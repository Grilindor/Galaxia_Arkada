import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Restaurer l'utilisateur à partir de sessionStorage au chargement de l'application
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      // Récupérer toutes les informations utilisateur depuis l'API du backend avec Axios
      axios
        .get("http://localhost:3000/api/user/Profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Ajouter le token JWT dans les headers
          },
        })
        .then((response) => {
          const data = response.data;
          if (data) {
            setUser(data); // Stocker toutes les informations utilisateur dans l'état
            sessionStorage.setItem("user", JSON.stringify(data)); // Stocker éventuellement l'utilisateur (pas recommandé, selon tes besoins)
          } else {
            console.error("Erreur lors de la récupération des informations utilisateur");
          }
        })
        .catch((err) => {
          console.error("Erreur lors de la récupération des informations utilisateur", err);
        });
    }
  }, []);

  const login = async (Email, password) => {
    console.log("Tentative de connexion avec", { Email, password }); // Débogage

    // Vérification si l'Email ou le mot de passe est manquant
    if (!Email || !password) {
      console.error("Email ou mot de passe manquant.");
      setError("Veuillez entrer un email et un mot de passe.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/users/signin", {
        email: Email,
        password: password,
      });

      console.log("Réponse du serveur :", response);

      const data = response.data;
      console.log("Données reçues du serveur :", data);

      if (response.status === 200) {
        console.log("Connexion réussie, utilisateur :", data.user);
        setUser(data.user); // Stocker l'utilisateur côté frontend
        sessionStorage.setItem("token", data.accessToken); // Stocker le token dans sessionStorage
      } else {
        console.warn("Nom d'utilisateur ou mot de passe incorrect.");
        setError("Nom d'utilisateur ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      setError(error.message);
    }
  };

  const logout = () => {
    console.log("Déconnexion de l'utilisateur :", user);
    setUser(null);
    sessionStorage.removeItem("token"); // Supprimer le token de sessionStorage
    sessionStorage.removeItem("user"); // Supprimer les informations utilisateur
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
