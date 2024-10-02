import React from 'react';
import styled from 'styled-components';

const HeroBanner = () => {
  return (
    <HeroWrapper>
      <TextContainer>
        <h1>Your Dream Trip Starts Here!</h1>
        <p>Plan, schedule, and organize your travels with ease.</p>
        <ActionButton>Start Planning</ActionButton>
      </TextContainer>
      <ImageContainer>
        <img src="/path/to/travel-image.jpg" alt="Travel" />
      </ImageContainer>
    </HeroWrapper>
  );
};

export default HeroBanner;

const HeroWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 2rem;
  background-color: #f4f4f4;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  h1 {
    font-size: 2.5rem;
  }
  p {
    font-size: 1.2rem;
  }
`;

const ActionButton = styled.button`
  margin-top: 1.5rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  flex: 1;
  img {
    max-width: 100%;
    height: auto;
  }
`;
