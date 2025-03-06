import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Login from "../pages/Login";

// Mock de la fonction de login
const mockLogin = jest.fn();

jest.mock("react-google-recaptcha", () => ({
  __esModule: true,
  default: ({ onChange }) => (
    <button
      data-testid="captcha-mock"
      onClick={() => onChange("fake-captcha-token")}
    >
      Simuler CAPTCHA
    </button>
  ),
}));

describe("Login Page", () => {
  const renderLogin = () =>
    render(
      <AuthContext.Provider value={{ login: mockLogin, error: "" }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );

  test("affiche le formulaire de connexion", () => {
    renderLogin();

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Simuler CAPTCHA")).toBeInTheDocument();
  });

  test("affiche un message d'erreur si CAPTCHA non validé", () => {
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Login"));

    expect(
      screen.getByText("Veuillez compléter le CAPTCHA avant de continuer.")
    ).toBeInTheDocument();
  });

  test("appelle la fonction de login avec les bonnes valeurs", async () => {
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByTestId("captcha-mock")); // Simule la validation du CAPTCHA
    fireEvent.click(screen.getByText("Login"));

    expect(mockLogin).toHaveBeenCalledWith(
      "test@example.com",
      "password123",
      "fake-captcha-token"
    );
  });
});
