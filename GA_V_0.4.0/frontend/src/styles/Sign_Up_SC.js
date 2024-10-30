import { StyleSheet } from "aphrodite";

export const styles = StyleSheet.create({
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