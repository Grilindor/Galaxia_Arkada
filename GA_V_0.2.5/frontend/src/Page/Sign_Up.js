import React, { useEffect, useState } from "react";
import { StyleSheet, css } from "aphrodite";
import logo from "../image/logo_1.png";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [receiveEmail, setReceiveEmail] = useState(false);
  const [isRobot, setIsRobot] = useState(false);
  const [data, setData] = useState(null);

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Sign Up Details:", {
      username,
      password,
      email,
      birthdate,
      receiveEmail,
      isRobot,
    });
  };

  useEffect(() => {
    // Simuler une requête API pour récupérer les données du backend
    fetch("/api/data")
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log("Erreur :", error));
  }, []);

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      borderRadius: "5px",
      backgroundColor: data ? "lightgreen" : "lightgrey",
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
      color: data ? "darkgreen" : "darkgrey",
      fontSize: "20px",
      textAlign: "center",
      marginBottom: "20px",
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
      <form className={css(styles.form)} onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Select a Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={css(styles.input)}
          required
        />
        <input
          type="password"
          placeholder="Create a Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={css(styles.input)}
          required
        />
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={css(styles.input)}
          required
        />
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
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
            checked={receiveEmail}
            onChange={() => setReceiveEmail(!receiveEmail)}
          />
          Receive Newgrounds Email?
        </label>
        <label className={css(styles.checkboxLabel)}>
          <input
            type="checkbox"
            checked={isRobot}
            onChange={() => setIsRobot(!isRobot)}
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
