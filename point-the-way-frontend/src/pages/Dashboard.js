import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

const Dashboard = () => {
  const [trips, setTrips] = useState(['Paris', 'New York']); // Example trips
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTrip, setNewTrip] = useState('');
  const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);
  const isLoggedIn = true;
  const username = "Alejandro";

  // Function to handle trip selection
  const handleTripSelect = (trip) => {
    setSelectedTrip(trip);
  };

  // Function to handle the new trip creation
  const handleAddTrip = () => {
    if (newTrip.trim()) {
      setTrips([...trips, newTrip]);
      setNewTrip('');
      setIsModalOpen(false);
    }
  };

  // Function to handle trip deletion
  const handleDeleteTrip = () => {
    setTrips(trips.filter((trip) => trip !== selectedTrip));
    setSelectedTrip(null);
    setIsDeletePromptOpen(false);
  };

  // Toggle the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Toggle delete confirmation
  const toggleDeletePrompt = () => {
    setIsDeletePromptOpen(!isDeletePromptOpen);
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} username={username} />
      <MainContent>
        {/* Destinations Widget */}
        <Widget>
          <h2>Destinations</h2>
          <TripList>
            {trips.map((trip, index) => (
              <TripItem key={index} onClick={() => handleTripSelect(trip)}>
                {trip}
              </TripItem>
            ))}
            <AddTripButton onClick={toggleModal}>+ Add Trip</AddTripButton>
          </TripList>

          {selectedTrip && (
            <TripDetails>
              <h3>{selectedTrip}</h3>
              <p>Here are the details for your trip to {selectedTrip}.</p>
              <DeleteTripButton onClick={toggleDeletePrompt}>X</DeleteTripButton>
            </TripDetails>
          )}
        </Widget>

        {/* Recent Activity Widget */}
        <Widget>
          <h2>Recent Activity</h2>
          <p>Track the latest updates or actions here.</p>
        </Widget>

        {/* To-Do List Widget */}
        <Widget>
          <h2>To-Do List</h2>
          <p>Manage your travel-related tasks.</p>
        </Widget>

        {/* New Trip Modal */}
        {isModalOpen && (
          <ModalOverlay>
            <ModalContent>
              <CloseButton onClick={toggleModal}>X</CloseButton>
              <h3>New Destination</h3>
              <ModalInput
                type="text"
                placeholder="Enter destination"
                value={newTrip}
                onChange={(e) => setNewTrip(e.target.value)}
              />
              <CreateButton onClick={handleAddTrip}>Create</CreateButton>
            </ModalContent>
          </ModalOverlay>
        )}

        {/* Delete Trip Confirmation */}
        {isDeletePromptOpen && (
          <ModalOverlay>
            <ModalContent>
              <h3>Are you sure you want to delete this trip?</h3>
              <button onClick={handleDeleteTrip}>Yes</button>
              <button onClick={toggleDeletePrompt}>No</button>
            </ModalContent>
          </ModalOverlay>
        )}
      </MainContent>
      <Footer />
    </>
  );
};

export default Dashboard;

// Styled Components
const MainContent = styled.main`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Widget = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TripList = styled.div`
  display: flex;
  flex-direction: column;
`;

const TripItem = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  border: 1px solid #ddd;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const AddTripButton = styled.button`
  padding: 10px;
  background-color: #2196F3;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;

  &:hover {
    background-color: #1976d2;
  }
`;

const TripDetails = styled.section`
  padding: 20px;
  border: 1px solid #ddd;
  margin-top: 10px;
`;

const DeleteTripButton = styled.button`
  padding: 8px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: darkred;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const CreateButton = styled.button`
  padding: 10px;
  background-color: #2196F3;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  border-radius: 5px;

  &:hover {
    background-color: #1976d2;
  }
`;

const ModalInput = styled.input`
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  font-size: 16px;
`;
