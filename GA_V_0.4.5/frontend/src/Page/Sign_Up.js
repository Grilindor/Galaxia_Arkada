import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { styles } from "../styles/Sign_Up_SC";
import { css } from "aphrodite";
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

    const emailrules = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailrules.test(formData.email)) {
      setError(
        "Veuillez entrer une adresse email valide avec un '@' et un '.'"
      );
      return;
    }
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
        <input
          type="email"
          name="email"
          placeholder="Your email address"
          value={formData.email}
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
