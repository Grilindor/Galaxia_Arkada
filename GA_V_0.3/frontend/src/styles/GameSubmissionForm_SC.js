import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  border-radius: 8px;
  background-color: #f7f9fc;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Title = styled.h1`
  margin-bottom: 24px;
  font-size: 24px;
  color: #333;
  text-align: center;
`;

export const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  height: 40px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Textarea = styled.textarea`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  height: 120px;
  resize: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Select = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  cursor: pointer;
  margin-bottom: 15px;
  position: relative;
`;

export const DropdownContainer = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

export const TagList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #ddd;
  background-color: #f7f9fc;
  z-index: 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

export const TagLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 8px 10px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #eef2f7;
  }
`;

export const TagCheckbox = styled.input`
  margin-right: 8px;
`;

export const Button = styled.button`
  padding: 12px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #004080;
    transform: translateY(1px);
  }
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
  img {
    width: 150px;
    height: auto;
    cursor: pointer;
  }
`;
