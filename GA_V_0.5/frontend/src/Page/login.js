import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../image/logo_1.png";
import { useNavigate } from "react-router-dom";
import {
  LoginContainer,
  Form,
  LogoContainer,
  LoginLogo,
  LoginTitle,
  InputContainer,
  Input,
  SubmitButton,
  FormLinks,
  Link,
  Divider,
  ThemeToggle
} from "../styles/login_SC";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login, error } = useAuth(); // Utilisation du AuthContext pour gérer la connexion
  const homenavigate = useNavigate();

  const handleHomeClick = () => {
    homenavigate("/home");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(
      "Tentative de connexion avec email:",
      email,
      "et mot de passe:",
      password
    );

    try {
      await login(email, password); // Appel de la fonction login du AuthContext
      homenavigate("/home");
    } catch (err) {
      setErrorMessage(err.message || "Une erreur est survenue");
    }
  };

  return (
    <LoginContainer>
      <ThemeToggle className="swap swap-rotate"></ThemeToggle>
      <Form onSubmit={handleLogin}>
        <LogoContainer>
          <LoginLogo src={logo} alt="Logo Galaxia" onClick={handleHomeClick} />
        </LogoContainer>
        <LoginTitle>Login</LoginTitle>
        {/* Affichage des erreurs */}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Champs du formulaire */}
        <InputContainer>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
