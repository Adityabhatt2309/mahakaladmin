import React, { useEffect, useState } from "react";
import { getList } from "../api/services";
import { APIENDPOINT } from "../api/apiEndpoints";

const TableGameList = ({ gameListUpdated, onEdit }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch game list
  const fetchGames = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getList(APIENDPOINT.gameList);
      setGames(response?.data || []); // Ensuring it's an array even if response is null
    } catch (error) {
      setError(error.message || "Error fetching game list");
    } finally {
      setLoading(false);
    }
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
        <div className="flex items-center justify-center h-20">
          <p className="text-center font-semibold text-gray-500">
            No games found.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto sm:overflow-x-scroll my-5">
          <table className="table-auto w-full bg-white border border-gray-200">
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
                  <td className="py-2 px-4 text-left whitespace-nowrap">
                    {game?.name}
                  </td>
                  <td className="py-2 px-4 text-left whitespace-nowrap">
                    {game?.openTime}
                  </td>
                  <td className="py-2 px-4 text-left whitespace-nowrap">
                    {game?.closeTime}
                  </td>
                  <td className="py-2 px-4 text-left whitespace-nowrap">
                    {game?.openDigitResult || "***"} -{" "}
                    {game?.singleOpenResult || "*"}
                  </td>
                  <td className="py-2 px-4 text-left whitespace-nowrap">
                    {game?.closeDigitResult || "***"} -{" "}
                    {game?.singleCloseResult || "*"}
                  </td>
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
