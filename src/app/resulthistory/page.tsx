'use client'
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getList } from "../api/services"; // Assuming this is your API function
import { APIENDPOINT } from "../api/apiEndpoints";

const ResultHistory = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(10); // Set the number of entries per page
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await getList(APIENDPOINT.gameList); // Fetching results from the API
        setResults(response.data);
      } catch (error) {
        setError("Failed to fetch result history");
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  // Filter the results based on the search term
  const filteredResults = results?.filter((result) =>
    result?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the current results based on pagination
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredResults?.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log(currentResults, "currentResults");

  return (
    <Layout>
      <div className="bg-white rounded p-5 mx-auto max-w-full">
        <h1 className="text-xl font-bold mb-4">Result History</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Search Input */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Search:</label>
          <input
            type="text"
            placeholder="Search by Game Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>

        {/* Table Container for responsiveness */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border px-2 py-2 text-xs md:text-sm">#</th>
                <th className="border px-2 py-2 text-xs md:text-sm">Game Name</th>
                <th className="border px-2 py-2 text-xs md:text-sm">Result Date</th>
                <th className="border px-2 py-2 text-xs md:text-sm">Open Declare Date</th>
                <th className="border px-2 py-2 text-xs md:text-sm">Close Declare Date</th>
                <th className="border px-2 py-2 text-xs md:text-sm">Open Number</th>
                <th className="border px-2 py-2 text-xs md:text-sm">Close Number</th>
              </tr>
            </thead>
            <tbody>
              {currentResults.length > 0 ? (
                currentResults.map((result, index) => (
                  <tr key={result.id}>
                    <td className="border px-2 py-2 text-xs md:text-sm">
                      {indexOfFirstResult + index + 1}
                    </td>
                    <td className="border px-2 py-2 text-xs md:text-sm">
                      {result.name || "NA"}
                    </td>
                    <td className="border px-2 py-2 text-xs md:text-sm">
                      {new Date(result.createdAt).toLocaleString() || "NA"}
                    </td>
                    <td className="border px-2 py-2 text-xs md:text-sm">
                      {new Date(result.createdAt).toLocaleString() || "NA"}
                    </td>
                    <td className="border px-2 py-2 text-xs md:text-sm">
                      {new Date(result.createdAt).toLocaleString() || "NA"}
                    </td>
                    <td className="border px-2 py-2 text-xs md:text-sm">
                      {result?.openDigitResult || "NA"}-{result?.singleOpenResult || "NA"}
                    </td>
                    <td className="border px-2 py-2 text-xs md:text-sm">
                      {result.closeDigitResult || "NA"}-{result?.singleCloseResult || "NA"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center p-4 text-sm">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            className={`px-4 py-2 mr-2 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-[#2c907f] text-white"
              }`}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className={`px-4 py-2 ml-2 rounded ${currentResults.length < resultsPerPage
              ? "bg-gray-300"
              : "bg-[#2c907f] text-white"
              }`}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentResults.length < resultsPerPage}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ResultHistory;
