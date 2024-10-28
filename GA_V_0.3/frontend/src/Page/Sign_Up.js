import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import logo from "../image/logo_1.png";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    userpseudo: "",
    password: "",
    email: "",
    birthdate: false,
    receiveEmail: false,
    isRobot: false,
  });

  const [error, setError] = useState(null); // Gestion des erreurs
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/signup",
        formData
      );
      console.log("Inscription réussie :", response.data);
      navigate("/login"); // Redirection après une inscription réussie
    } catch (error) {
      setError("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      borderRadius: "5px",
      backgroundColor: "lightgrey",
      width: "400px",
      margin: "0 auto",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      position: "absolute", // Pour centrer verticalement
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    logo: {
      marginBottom: "20px",
    },
    logoImage: {
      width: "100px", // Taille réduite de l'image
      height: "auto", // Maintient le ratio de l'image
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    input: {
      marginBottom: "15px",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "16px",
    },
    button: {
      padding: "10px",
      fontSize: "16px",
      backgroundColor: "black",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      marginBottom: "20px",
    },
    buttonHover: {
      ":hover": {
        backgroundColor: "#333",
      },
    },
    checkboxLabel: {
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
    },
    text: {
      fontSize: "20px",
      textAlign: "center",
      marginBottom: "20px",
    },
    errorText: {
      color: "red",
      marginBottom: "15px",
    },
    link: {
      color: "blue",
      textDecoration: "none",
      ":hover": {
        textDecoration: "underline",
      },
    },
  });
  return (
    <div className={css(styles.container)}>
      <div className={css(styles.logo)}>
        <img src={logo} alt="Galaxia Logo" className={css(styles.logoImage)} />
      </div>
      <h2 className={css(styles.text)}>Create an Account</h2>
      {error && <p className={css(styles.errorText)}>{error}</p>}
      <form className={css(styles.form)} onSubmit={handleSignUp}>
        {/* Champ pour le prénom */}
        <input
          type="text"
          name="firstname"
          placeholder="Your First Name"
          value={formData.firstname}
          onChange={handleChange}
          className={css(styles.input)}
          required
        />
        {/* Champ pour le nom de famille */}
        <input
          type="text"
          name="lastname"
          placeholder="Your Last Name"
          value={formData.lastname}
          onChange={handleChange}
          className={css(styles.input)}
          required
        />
        {/* Champ pour le pseudo */}
        <input
          type="text"
          name="userpseudo"
          placeholder="Select a Username"
          value={formData.userpseudo}
          onChange={handleChange}
          className={css(styles.input)}
          required
        />
        {/* Champ pour le mot de passe */}
        <input
          type="password"
          name="password"
          placeholder="Create a Password"
          value={formData.password}
          onChange={handleChange}
          className={css(styles.input)}
          required
        />
        {/* Champ pour l'email */}
        <input
          type="email"
          name="email"
          placeholder="Your email address"
          value={formData.email}
          onChange={handleChange}
          className={css(styles.input)}
          required
        />
        <p>
          You must be 13+ to create an account. Under 18? Get parent/guardian
          permission.
        </p>
        <label className={css(styles.checkboxLabel)}>
          <input
            type="checkbox"
            name="receiveEmail"
            checked={formData.receiveEmail}
            onChange={handleChange}
          />
          Receive Newgrounds Email?
        </label>
        <label className={css(styles.checkboxLabel)}>
          <input
            type="checkbox"
            name="isRobot"
            checked={formData.isRobot}
            onChange={handleChange}
            required
          />
          I am not a robot
        </label>
        <label className={css(styles.checkboxLabel)}>
          <input type="checkbox" required />
          Do you agree to our Terms of Use?
        </label>
        <button
          type="submit"
          className={css(styles.button, styles.buttonHover)}
        >
          Sign Up
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <a href="/home" className={css(styles.link)}>
          Home
        </a>
      </p>
    </div>
  );
};
export default SignUp;
