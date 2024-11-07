import styled from "styled-components";
export const MainContainer = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  margin: auto;
`;
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background-color: #F4F4F4;
  border-bottom: 2px solid #ddd;
  width: 100%;
`;
export const LogoImage = styled.img`
  width: 80px;
  margin-right: 20px;
`;
export const Button = styled.button`
  background-color: #3498DB;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2980B9;
  }
`;
export const ProfileActionButton = styled(Button)`
  margin: 10px 0;
  width: 100%;
`;
export const ProfileSectionContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin: 20px;
  background-color: #F8F8F8;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;
export const ProfileDetailsContainer = styled.div`
  display: flex;
  flex-direction: column; /* Organise les éléments verticalement */
  align-items: flex-start; /* Aligne les éléments à gauche */
  background-color: #F0F0F0;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: left; /* Assure que le texte est à gauche */
`;
export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 15px auto;
  display: block;
`;
export const InputField = styled.input`
  margin: 8px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 90%;
  max-width: 300px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;
export const OnlineFriendsContainer = styled.div`
  padding: 15px;
  background-color: #E9ECEF;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: left;
  h2 {
    margin-bottom: 10px;
  }
  img {
    margin: 5px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #3498DB;
  }
`;
export const FooterContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  padding: 15px;
  background-color: #F4F4F4;
  border-top: 1px solid #ddd;
`;
