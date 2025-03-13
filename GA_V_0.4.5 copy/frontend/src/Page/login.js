import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext"; // Importer useAuth pour accéder à la fonction login
import logo from "../image/logo_1.png";
import { useNavigate } from "react-router-dom";
import { LoginContainer, Form, LogoContainer, LoginLogo, LoginTitle, InputContainer, Input, SubmitButton, FormLinks, Link, Divider, ThemeToggle } from "../styles/login_SC";
import ReCAPTCHA from "react-google-recaptcha"; // Importer reCAPTCHA

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null); // Stocke le token CAPTCHA
  const [errorMessage, setErrorMessage] = useState("");
  const { login, error } = useAuth();
  const homenavigate = useNavigate();

  const handleHomeClick = () => {
    homenavigate("/home");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Tentative de connexion avec email:", email, "et mot de passe:", password);

    if (!captchaToken) {
      setErrorMessage("Veuillez compléter le CAPTCHA avant de continuer.");
      return;
    }

    try {
      await login(email, password, captchaToken); // Transmet le token CAPTCHA au backend
      homenavigate("/home");
    } catch (err) {
      setErrorMessage(err.message || "Une erreur est survenue");
    }
  };

  const handleCaptchaChange = (token) => {
    console.log("CAPTCHA validé avec le token :", token);
    setCaptchaToken(token); // Met à jour le token CAPTCHA
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

        {/* CAPTCHA */}
        <ReCAPTCHA
          sitekey="6LcTtrsqAAAAANMbwMpLlxqxQKck1-GlRDIlEylX" // clé publique
          onChange={handleCaptchaChange}
        />

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
