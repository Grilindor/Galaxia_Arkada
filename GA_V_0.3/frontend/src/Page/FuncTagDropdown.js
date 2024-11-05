import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

// Styles du bouton et du menu
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 200px;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 10px;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const DropdownItem = styled.label`
  display: flex;
  align-items: center;
  padding: 8px 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

// Composant principal
const TagDropdown = ({ options, selectedTags, setSelectedTags }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fonction pour ouvrir/fermer le menu
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Fonction pour fermer le menu en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fonction pour sélectionner ou désélectionner un tag
  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown}>
        Sélectionnez des tags
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          {options.map((tag) => (
            <DropdownItem key={tag}>
              <Checkbox
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagToggle(tag)}
              />
              {tag}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default TagDropdown;
