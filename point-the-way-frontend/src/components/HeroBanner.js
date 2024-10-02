import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // To handle routing
import mountainImage from './images/mountain.jpg';

const HeroBanner = () => {
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Handle button click
  const handleStartPlanning = () => {
    setTimeout(() => {
      navigate('/signup'); // Redirect to signup after animation
    }, 500); // 500ms delay to allow animation
  };

  return (
    <HeroWrapper>
      <TextContainer>
        <h1>Your Dream Trip Starts Here!</h1>
        <p>Plan, schedule, and organize your travels with ease.</p>
        <ActionButton onClick={handleStartPlanning}>Start Planning</ActionButton>
      </TextContainer>
      <ImageContainer>
        <img src={mountainImage} alt="Travel" />
      </ImageContainer>
    </HeroWrapper>
  );
};

export default HeroBanner;

const HeroWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 2rem;
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
  background-color: #0056b3; /* Darker shade of blue */
  border: none;
  border-radius: 30px; /* Rounded edges */
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s; /* Add smooth transitions */
  
  &:hover {
    background-color: #004494; /* Even darker on hover */
  }

  &:active {
    transform: scale(0.95); /* Slight shrink on click */
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  max-width: 500px;
  overflow: hidden;
  margin-left: 1rem;

  img {
    max-width: 100%;
    max-height: 60vh;
    object-fit: cover;

    @media (max-width: 768px) {
      max-width: 100%;
      margin-left: 0;
    }
  }
`;
