import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    return (
      <FooterWrapper>
        <p>© 2024 Point-the-way. All rights reserved.</p>
        <p>Made by Alejandro Contreras</p>
      </FooterWrapper>
    );
  };

export default Footer;

const FooterWrapper = styled.footer`
  padding: 1rem;
  background-color: #333;
  color: white;
  text-align: center;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
`;
