import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, username }) => {
  return (
    <HeaderWrapper>
      <Logo>Point the Way</Logo>
      <Nav>
        {isLoggedIn ? (
          <User>Welcome, {username}</User>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  width: 100vw; /* Use viewport width to avoid overflow */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: white;
  z-index: 1000;
  box-sizing: border-box; /* Ensure padding is included in width calculation */
  overflow-x: hidden; /* Prevent horizontal scroll */
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  a {
    margin-left: 1rem;
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const User = styled.div`
  font-size: 1.2rem;
`;
