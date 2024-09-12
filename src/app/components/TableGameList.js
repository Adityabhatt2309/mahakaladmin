import React, { useEffect, useState } from 'react';
import { getList } from '../api/services';
import { APIENDPOINT } from '../api/apiEndpoints';

const TableGameList = ({ gameListUpdated, onEdit }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch game list
  const fetchGames = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getList(APIENDPOINT.gameList);
      setGames(response.data.games);
    } catch (error) {
      setError(error.message || 'Error fetching game list');
    } finally {
      setLoading(false);
    }
  };

  // Convert time to 12-hour format with AM/PM
  const formatTime = (time) => {
    // Assuming the time is in "HH:mm" format (e.g., "13:45")
    const [hours, minutes] = time.split(':');
  
    // Create a new Date object for today, but with the given time
    const date = new Date();
    date.setHours(hours, minutes);
  
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };
  

  // Fetch games when component mounts or when `gameListUpdated` changes
  useEffect(() => {
    fetchGames();
  }, [gameListUpdated]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Game List</h2>
      {games.length === 0 ? (
        <p className="text-center font-semibold border-b">No games found.</p>
      ) : (
        <div className="overflow-x-auto sm:overflow-x-scroll my-5">
          <table className="table-auto w-full overflow-scroll bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-xs leading-normal">
                <th className="py-2 px-4 text-left">Game Name</th>
                <th className="py-2 px-4 text-left">Open Time</th>
                <th className="py-2 px-4 text-left">Close Time</th>
                <th className="py-2 px-4 text-left">Open Result</th>
                <th className="py-2 px-4 text-left">Close Result</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-xs">
              {games.map((game) => (
                <tr
                  key={game._id}
                  className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                  onClick={() => onEdit(game)}
                >
                  <td className="py-2 px-4 text-left whitespace-nowrap">{game.name}</td>
                  <td className="py-2 px-4 text-left whitespace-nowrap">{formatTime(game.openTime)}</td>
                  <td className="py-2 px-4 text-left whitespace-nowrap">{formatTime(game.closeTime)}</td>
                  <td className="py-2 px-4 text-left whitespace-nowrap">{game.openDigitResult || "***"}-{game.singleOpenResult || "*"}</td>
                  <td className="py-2 px-4 text-left whitespace-nowrap">{game.closeDigitResult || "***"}-{game.singleCloseResult || "*"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TableGameList;
