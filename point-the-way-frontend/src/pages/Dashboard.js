import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

const Dashboard = () => {
  const isLoggedIn = true; // Set the login state here for the dashboard
  const username = "Alejandro"; // Example username

  return (
    <>
      <Header isLoggedIn={isLoggedIn} username={username} />
      <MainContainer>
        <h1>Welcome to Your Dashboard, {username}!</h1>
        <DashboardContent>
          {/* Add your dashboard widgets or content here */}
          <Widget>
            <h2>Overview</h2>
            <p>This is where your main stats or summaries go.</p>
          </Widget>
          <Widget>
            <h2>Recent Activity</h2>
            <p>Track the latest updates or actions here.</p>
          </Widget>
          <Widget>
            <h2>Settings</h2>
            <p>Manage your preferences or account settings.</p>
          </Widget>
        </DashboardContent>
      </MainContainer>
      <Footer />
    </>
  );
};

export default Dashboard;

// Styled components for layout and design
const MainContainer = styled.main`
  padding-top: 60px;
  padding-left: 20px;
  padding-right: 20px;
  min-height: 80vh;
  background-color: #f8f9fa;
`;

const DashboardContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
`;

const Widget = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 300px;
  flex-grow: 1;

  h2 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    color: #555;
  }
`;
