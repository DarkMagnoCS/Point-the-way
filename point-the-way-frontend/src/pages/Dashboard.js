import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { FaTimes, FaTrashAlt } from 'react-icons/fa'; // Import icons

const Dashboard = () => {
  const [trips, setTrips] = useState(['Paris', 'New York']);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);
  const [newTrip, setNewTrip] = useState('');
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

  // Toggle delete confirmation modal
  const toggleDeletePrompt = () => {
    setIsDeletePromptOpen(!isDeletePromptOpen);
  };

  // Toggle new destination modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} username={username} />
      <MainContent>
        <WidgetsRow>
          <Widget>
            <h2>Destinations</h2>
            <TripList>
              {trips.map((trip, index) => (
                <TripItem key={index} onClick={() => handleTripSelect(trip)}>
                  {trip}
                </TripItem>
              ))}
              <AddTripButton onClick={toggleModal}>+ Add Destination</AddTripButton>
            </TripList>
          </Widget>

          <Widget>
            <h2>Recent Activity</h2>
            <p>Track the latest updates or actions here.</p>
          </Widget>

          <Widget>
            <h2>To-Do List</h2>
            <p>Your tasks will appear here.</p>
          </Widget>
        </WidgetsRow>

        {selectedTrip && (
          <TripDetails>
            <h3>{selectedTrip}</h3>
            <p>Here are the details for your trip to {selectedTrip}.</p>
            <DeleteTripButton onClick={toggleDeletePrompt}>
              <FaTrashAlt /> {/* Trash icon for delete */}
            </DeleteTripButton>
          </TripDetails>
        )}

        {isModalOpen && (
          <ModalOverlay>
            <ModalContent>
              <CloseButton onClick={toggleModal}>
                <FaTimes /> {/* Close icon */}
              </CloseButton>
              <h3>New Destination</h3>
              <Input
                type="text"
                placeholder="Enter destination"
                value={newTrip}
                onChange={(e) => setNewTrip(e.target.value)}
              />
              <CreateButton onClick={handleAddTrip}>Create</CreateButton>
            </ModalContent>
          </ModalOverlay>
        )}

        {isDeletePromptOpen && (
          <ModalOverlay>
            <ModalContent>
              <h3>Are you sure you want to delete this trip?</h3>
              <ConfirmDeleteButton onClick={handleDeleteTrip}>Yes, Delete</ConfirmDeleteButton>
              <CancelDeleteButton onClick={toggleDeletePrompt}>Cancel</CancelDeleteButton>
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
  margin-top: 60px; /* To prevent content from hiding under the header */
  min-height: calc(100vh - 120px); /* Prevents content from hiding under the footer */
`;

const WidgetsRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Widget = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border: 1px solid #ddd;
  flex: 1;
  min-width: 250px;
`;

const TripList = styled.div`
  display: flex;
  flex-direction: column;
`;

const TripItem = styled.div`
  background-color: #e7e7e7;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  border: 1px solid #ddd;
  
  &:hover {
    background-color: #d0d0d0;
  }
`;

const AddTripButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const TripDetails = styled.section`
  padding: 20px;
  border: 1px solid #ddd;
  margin-top: 20px;
  position: relative;
`;

const DeleteTripButton = styled.button`
  background-color: transparent;
  border: none;
  color: red;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    color: darkred;
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
  position: relative;
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

const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const CreateButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }
`;

const ConfirmDeleteButton = styled.button`
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: darkred;
  }
`;

const CancelDeleteButton = styled.button`
  padding: 10px;
  background-color: #6c757d;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #5a6268;
  }
`;
