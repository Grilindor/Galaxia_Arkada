import styled from "styled-components";

// Styles avec styled-components
export const LoginContainer = styled.div`
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 650px;
  background-color: rgb(111, 107, 107);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const LoginLogo = styled.img`
  width: 80px;
  cursor: pointer;
`;

export const LoginTitle = styled.h2`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
`;

export const InputContainer = styled.div`
  margin-bottom: 15px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
`;

export const SubmitButton = styled.button`
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

export const FormLinks = styled.div`
  text-align: center;
  font-size: 14px;
`;

export const Link = styled.a`
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const Divider = styled.span`
  margin: 0 10px;
  color: #666;
`;

export const ThemeToggle = styled.label`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;
