'use client';
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import { add, update } from '../api/services'; // Update function
import { APIENDPOINT } from '../api/apiEndpoints';
import TableGameList from '../components/TableGameList';
import Loader from '../components/LoadingModal';

const CreateGame = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [name, setName] = useState('');          // Game Name input state
  const [openTime, setOpenTime] = useState('');  // Open Time input state
  const [closeTime, setCloseTime] = useState(''); // Close Time input state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState('');        // Error state
  const [gameListUpdated, setGameListUpdated] = useState(false); // State to trigger re-fetch of game list
  const [isEditMode, setIsEditMode] = useState(false);  // State to toggle edit mode
  const [editingGameId, setEditingGameId] = useState(null); // Store game ID when editing

  // Function to handle adding a game
  const handleAddGame = async () => {
    setLoading(true);  // Start loading
    setError('');      // Clear previous errors
    try {
      const response = isEditMode
        ? await update(`${APIENDPOINT.gameUpdate}/${editingGameId}`, { name, openTime, closeTime })
        : await add(APIENDPOINT.gameAdd, { name, openTime, closeTime });

      if (response) {
        console.log({ response });
        setIsModalOpen(false); // Close the modal after adding/editing the game
        setName('');        // Reset input fields
        setOpenTime('');
        setCloseTime('');
        setEditingGameId(null); // Reset editing ID
        setIsEditMode(false);   // Exit edit mode
        setGameListUpdated(prev => !prev);  // Trigger re-fetch of game list
      }
    } catch (error) {
      setError(error.message || 'Error saving game'); // Set error message
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  // Function to handle when a row is clicked to edit
  const handleEditGame = (game) => {
    setIsEditMode(true); // Set the modal to edit mode
    setEditingGameId(game._id); // Set the editing game ID
    setName(game.name); // Pre-fill the game name
    setOpenTime(game.openTime); // Pre-fill the open time
    setCloseTime(game.closeTime); // Pre-fill the close time
    setIsModalOpen(true); // Open the modal
  };

  return (
    <Layout>
      <div className="bg-white rounded p-5 mx-auto">
        <div className="flex justify-between border-b-2 pb-4">
          <h1 className="font-bold">{isEditMode ? 'Edit Game' : 'Game Add'}</h1>
          <button
            className="bg-[#2c907f] rounded px-3 py-2 text-white font-bold"
            onClick={() => {
              setIsEditMode(false); // Make sure it's in add mode
              setIsModalOpen(true);
            }}
          >
            Add Game
          </button>
        </div>

        {/* Pass the `gameListUpdated` state to `TableGameList`, and handle edit click */}
        <TableGameList gameListUpdated={gameListUpdated} onEdit={handleEditGame} />

        {/* Modal for Adding/Edit Game */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-lg font-bold mb-4">{isEditMode ? 'Edit Game' : 'Create New Game'}</h2>

          {/* Show Loader when loading */}
          {loading && <Loader visible={loading} />}

          {/* Show error message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {!loading && (
            <>
              {/* Game Name Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Game Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded p-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter game name"
                />
              </div>

              {/* Open Time Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Open Time</label>
                <input
                  type="time"
                  className="w-full border border-gray-300 rounded p-2"
                  value={openTime}
                  onChange={(e) => setOpenTime(e.target.value)}
                />
              </div>

              {/* Close Time Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Close Time</label>
                <input
                  type="time"
                  className="w-full border border-gray-300 rounded p-2"
                  value={closeTime}
                  onChange={(e) => setCloseTime(e.target.value)}
                />
              </div>

              {/* Save Button */}
              <button
                className="bg-[#2c907f] text-white font-bold py-2 px-4 rounded w-full"
                onClick={handleAddGame}
                disabled={loading} // Disable button while loading
              >
                {loading ? 'Saving...' : isEditMode ? 'Update Game' : 'Add Game'}
              </button>
            </>
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default CreateGame;
