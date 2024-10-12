import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <div>&copy; 2024 All Rights Reserved</div>
      <FooterLink href="https://www.linkedin.com/in/alejandro-contreras-sanguino" target="_blank" rel="noopener noreferrer">
        Made by Alejandro Contreras
      </FooterLink>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column; /* Stack the elements vertically */
  justify-content: center; /* Center them vertically */
  align-items: center; /* Center them horizontally */
  padding: 10px 20px;
  background-color: #333;
  color: white;
  font-size: 14px;
  text-align: center;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 50px;
  
  @media (max-width: 768px) {
    padding: 15px 20px;
    height: auto;
  }
`;

const FooterLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: bold;
  margin-top: 5px; /* Add some space between the two lines */
  
  &:hover {
    text-decoration: underline;
  }
`;
