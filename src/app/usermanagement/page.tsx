"use client";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { add, getList } from "../api/services";
import { APIENDPOINT } from "../api/apiEndpoints";

const UserManagementTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Number of users per page

  useEffect(() => {
    // Fetch users data (Simulating an API call with static data)
    fetchUsers();
  }, []);

  // Function to fetch users (mocking API call here with static data)
  const fetchUsers = async () => {
    try {
      const response = await getList(APIENDPOINT.userList);
      if (response) {
        setUsers(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle status toggle (mock API call for status update)
  const handleToggleStatus = async (user) => {
    const updatedStatus = user.active === "true" ? "false" : "true";
    const userId = user._id;
    try {
      // Assume this is the API call to update user status
      await add(`${APIENDPOINT.userActive}/${userId}/status`, {
        userId: user._id,
        active: updatedStatus,
      });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  console.log(users,"users")

  // Handle search filter based on username
  const filteredUsers = users?.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers?.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <Layout>
      <div className="p-5 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>

        <div className="mb-4">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded w-full"
            placeholder="Search by username or mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Action</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Mobile</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">WhatsApp</th>
              <th className="border px-4 py-2">Created On</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">
                  {index + 1 + (currentPage - 1) * usersPerPage}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className={`px-3 text-white rounded ${
                      user.active === true ? "bg-red-500" : "bg-green-600"
                    }`}
                    onClick={() => handleToggleStatus(user)}
                  >
                    {user.active === true?"Inactive":"Active"}
                  </button>
                </td>
                <td className="border px-4 py-2">{user.active === true?"true":"false" || "NA"}</td>
                <td className="border px-4 py-2">{user.username || "NA"}</td>
                <td className="border px-4 py-2">{user.mobileNumber || "NA"}</td>
                <td className="border px-4 py-2">{user.email || "N/A"}</td>
                <td className="border px-4 py-2">{user.mobileNumber || "N/A"}</td>
                <td className="border px-4 py-2">{user?.createdDate ? user.createdDate.slice(0, 10):"NA"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            className="px-3 py-1 bg-gray-300 rounded"
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="px-3 py-1 bg-gray-300 rounded"
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default UserManagementTable;
