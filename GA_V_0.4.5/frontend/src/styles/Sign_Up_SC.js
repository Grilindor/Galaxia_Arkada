import { StyleSheet } from "aphrodite";
import imagedefond from "../image/espace.webp";

export const styles = StyleSheet.create({
  body: {
    margin: 0,
    padding: 0,
    height: "100vh",
    backgroundImage: `url(${imagedefond})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed", // L'image reste fixe lors du défilement
  },

  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    borderRadius: "5px",
    backgroundColor: "lightgrey",
    backgroundImage: `url(${imagedefond})`, // ajout de l'image de fond
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "400px",
    margin: "0 auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  logo: {
    marginBottom: "20px",
  },
  logoImage: {
    width: "100px",
    height: "auto",
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
