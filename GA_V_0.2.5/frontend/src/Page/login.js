import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios"; // Ajoute l'import pour axios
import logo from "../image/logo_1.png";
import { useNavigate } from "react-router-dom";

// Styles avec styled-components
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  background-color: var(--background-color);
  background-image: url("../image/testdefond.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 650px;
  background-color: rgb(111, 107, 107);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const LoginLogo = styled.img`
  width: 80px;
  cursor: pointer;
`;

const LoginTitle = styled.h2`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background-color: #333;
  }
`;

const FormLinks = styled.div`
  text-align: center;
  font-size: 14px;
`;

const Link = styled.a`
  color: black;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.span`
  margin: 0 10px;
  color: #666;
`;

const ThemeToggle = styled.label`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Pour afficher les erreurs si besoin

  const homenavigate = useNavigate();
  const handleHomeClick = () => {
    homenavigate("/home");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Tentative de connexion avec email:", email, "et mot de passe:", password);

    try {
      // Requête POST vers l'API de login
      const response = await axios.post("/api/users/signin", {
        email,
        password,
      });

      console.log("Réponse du serveur:", response.data); // Affiche la réponse complète du serveur

      // Stocker le token dans sessionStorage
      sessionStorage.setItem("token", response.data.accessToken); // Correction ici
      console.log("Token stocké dans sessionStorage:", response.data.accessToken); // Confirmation du token

      // Stocker les informations de l'utilisateur si nécessaire
      // sessionStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirection après le succès du login
      homenavigate("/home");
    } catch (error) {
      // Gérer les erreurs de login
      if (error.response) {
        console.error("Erreur côté serveur:", error.response.data); // Affiche les détails de l'erreur du serveur
        setErrorMessage(error.response.data.message);
      } else {
        console.error("Erreur inattendue:", error); // Affiche toute autre erreur inattendue
        setErrorMessage("Une erreur est survenue");
      }
    }
  };

  return (
    <LoginContainer>
      <ThemeToggle className="swap swap-rotate">

      </ThemeToggle>

      <Form onSubmit={handleLogin}>
        <LogoContainer>
          <LoginLogo src={logo} alt="Logo Galaxia" onClick={handleHomeClick} />
        </LogoContainer>
        <LoginTitle>Login</LoginTitle>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Affichage des erreurs */}
        <InputContainer>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
              console.log("Changement de l'email:", e.target.value); // Affiche l'email saisi en temps réel
            }}
          />
        </InputContainer>
        <InputContainer>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              console.log("Changement du mot de passe:", e.target.value); // Affiche le mot de passe saisi en temps réel
            }}
          />
        </InputContainer>
        <SubmitButton type="submit">Login</SubmitButton>
        <FormLinks>
          <Link href="/forgot_password">Forgot your password?</Link>
          <Divider>|</Divider>
          <Link href="/api/users/signup">No account? Sign up</Link>
        </FormLinks>
      </Form>
    </LoginContainer>
  );
};

export default Login;
