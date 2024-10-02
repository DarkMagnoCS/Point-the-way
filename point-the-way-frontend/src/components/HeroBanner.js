import React from 'react';
import styled from 'styled-components';
import mountainImage from './images/mountain.jpg';

const HeroBanner = () => {
  return (
    <HeroWrapper>
      <TextContainer>
        <h1>Your Dream Trip Starts Here!</h1>
        <p>Plan, schedule, and organize your travels with ease.</p>
        <ActionButton>Start Planning</ActionButton>
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
  border: rounded;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  flex: 1;
  max-width: 500px; /* Set a max width for the image container */
  overflow: hidden; /* Prevent any overflow */
  margin-left: 2rem; /* Add some margin for spacing */

  img {
    width: 100%; /* Make sure the image takes up the full width of its container */
    height: auto; /* Adjust height automatically to maintain aspect ratio */
    object-fit: cover; /* Ensure the image covers the container without stretching */
  }

  @media (max-width: 768px) {
    max-width: 100%; /* On smaller screens, the image takes up the full width */
    margin-left: 0; /* Remove left margin on smaller screens */
  }
`;
