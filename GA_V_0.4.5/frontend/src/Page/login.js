import React, { useEffect, useState } from "react";
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
  ThemeToggle,
} from "../styles/login_SC";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { login, error } = useAuth();
  const homenavigate = useNavigate();

  const handleHomeClick = () => {
    homenavigate("/home");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      setErrorMessage("Veuillez compléter le CAPTCHA avant de continuer.");
      return;
    }

    try {
      await login(email, password, captchaToken);
      homenavigate("/home");
    } catch (err) {
      console.error("Erreur de connexion :", err.response?.data || err.message);
      setErrorMessage(err.message || "Une erreur est survenue");
      handleResetCaptcha(); // Réinitialise le CAPTCHA en cas d'erreur
    }
  };

  const handleCaptchaChange = (token) => {
    console.log("CAPTCHA validé avec le token :", token);
    setCaptchaToken(token);
    setErrorMessage("");
  };

  const handleResetCaptcha = () => {
    setCaptchaToken(null);
    if (window.grecaptcha) {
      window.grecaptcha.reset(); // Réinitialise le widget CAPTCHA
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
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
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
        <ReCAPTCHA
          sitekey="6Le6o74qAAAAAOsugL7ZgFMAgHmS9bFGxSZsXA_1"
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
