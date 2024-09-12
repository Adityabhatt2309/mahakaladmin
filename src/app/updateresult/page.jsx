"use client";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getList, update } from "../api/services"; // Assuming these are your API functions
import { APIENDPOINT } from "../api/apiEndpoints";

const UpdateResult = () => {
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [openResult, setOpenResult] = useState("");
  const [closeResult, setCloseResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showResultFields, setShowResultFields] = useState(false);

  // Fetch game list when the component mounts
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await getList(APIENDPOINT.gameList);
        setGames(response.data.games);
      } catch (error) {
        setError("Failed to fetch games");
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  // Handle game selection change
  const handleGameChange = async (event) => {
    const gameId = event.target.value;
    setSelectedGameId(gameId);
    setShowResultFields(false);
  };

  // Fetch game results when "Show" is clicked
  const handleShowResults = async () => {
    if (!selectedGameId || !selectedDate) {
      setError("Please select a game and date");
      return;
    }
    setShowResultFields(true);
    // try {
    //   const response = await getGameById(APIENDPOINT.gameDetails(selectedGameId), { date: selectedDate });
    //   const { openResult, closeResult } = response.data;
    //   setOpenResult(openResult || '');
    //   setCloseResult(closeResult || '');
    //   setShowResultFields(true);
    // } catch (error) {
    //   setError('Failed to fetch game results');
    // } finally {
    //   setLoading(false);
    // }
  };

  // Calculate the sum of digits (for open and close results)
  const calculateTotalDigits = (result) => {
    if (!result) return 0;
    return result.split("").reduce((sum, digit) => sum + parseInt(digit), 0);
  };

  // Handle save open result
const handleSaveOpenResult = async () => {
  if (!openResult) {
    setError("Please enter the open result");
    return;
  }
  setLoading(true);
  try {
    const response = await update(`${selectedGameId}/updateOpenDigitResult`, {
      openDigitResult: openResult,
    });
    // If the response is successful, reset the open result field
    if (response.data.game) { // Adjust based on actual response structure
      setOpenResult("");  // Reset open result
      alert("Open result updated successfully!");
    } else {
      setError("Failed to update open result");
    }
  } catch (error) {
    setError("Failed to update open result");
  } finally {
    setLoading(false);
  }
};

  // Handle save close result
 // Handle save close result
const handleSaveCloseResult = async () => {
  if (!closeResult) {
    setError("Please enter the close result");
    return;
  }
  setLoading(true);
  try {
    const response = await update(`${selectedGameId}/updateCloseDigitResult`, {
      closeDigitResult: closeResult,
    });
    // If the response is successful, reset the close result field
    if (response?.data?.game) { // Adjust based on actual response structure
      setCloseResult("");  // Reset close result
      alert("Close result updated successfully!");
    } else {
      setError("Failed to update close result");
    }
  } catch (error) {
    setError("Failed to update close result");
  } finally {
    setLoading(false);
  }
};


  const getRelevantCloseDigit = (totalDigits) => {
    const totalStr = totalDigits.toString();
    if (totalDigits > 10) {
      return totalStr[1] === "0" ? "1" : totalStr[1]; // Show '1' if second digit is 0, otherwise show second digit
    }
    return totalStr; // Return the total as a string for totals less than or equal to 10
  };

  return (
    <Layout>
      <div className="bg-white rounded p-5 mx-auto">
        <h1 className="text-xl font-bold mb-4">Declare Result</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Select Game</label>
          {
            games &&<select
            className="p-2 border border-gray-300 rounded w-full"
            value={selectedGameId}
            onChange={handleGameChange}
          >
            <option value="">-- Select a Game --</option>
            {games.map((game) => (
              <option key={game._id} value={game._id}>
                {game.name}
              </option>
            ))}
          </select>
          }
          
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Select Date</label>
          <input
            type="date"
            className="p-2 border border-gray-300 rounded w-full"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <button
          className="bg-[#2c907f] rounded px-3 py-2 text-white font-bold"
          onClick={handleShowResults}
          disabled={loading || !selectedGameId || !selectedDate}
        >
          Show Results
        </button>

        {showResultFields && (
          <div className="mt-4">
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Open Result</label>
              <input
                type="number"
                className="p-2 border border-gray-300 rounded w-full"
                value={openResult}
                onChange={(e) => setOpenResult(e.target.value)}
                placeholder="Enter Open Result"
              />
              <p>
                Open Result Number:{" "}
                {`${openResult}-${
                  calculateTotalDigits(openResult).toString()[0]
                }`}
              </p>
            </div>

            <button
              className="bg-[#2c907f] rounded px-3 py-2 text-white font-bold mb-4"
              onClick={handleSaveOpenResult}
              disabled={loading || !openResult}
            >
              Save Open Result
            </button>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Close Result</label>
              <input
                type="number"
                className="p-2 border border-gray-300 rounded w-full"
                value={closeResult}
                onChange={(e) => setCloseResult(e.target.value)}
                placeholder="Enter Close Result"
              />
              <p>
                Close Result Number:{" "}
                {`${closeResult}-${getRelevantCloseDigit(
                  calculateTotalDigits(closeResult)
                )}`}
              </p>{" "}
            </div>

            <button
              className="bg-[#2c907f] rounded px-3 py-2 text-white font-bold"
              onClick={handleSaveCloseResult}
              disabled={loading || !closeResult}
            >
              Save Close Result
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UpdateResult;
