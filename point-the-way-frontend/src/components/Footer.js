import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterWrapper>
      <p>© 2024 Point-the-way. All rights reserved.</p>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  padding: 1rem;
  background-color: #333;
  color: white;
  text-align: center;
  position: absolute;
  width: 100%;
  bottom: 0;
`;
