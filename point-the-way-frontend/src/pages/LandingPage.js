import React from 'react';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import Footer from '../components/Footer';

const LandingPage = () => {
  const isLoggedIn = false; // Set the login state here
  const username = "Alejandro"; // Example 

  return (
    <>
      <Header isLoggedIn={isLoggedIn} username={username} />
      <main style={{ paddingTop: '60px' }}>
        <HeroBanner />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
