import React, { useState, useEffect } from "react";
import { APIENDPOINT } from "../api/apiEndpoints";
import Layout from "./Layout";
import LoadingModal from "./LoadingModal";
import axiosInstance from "../api/axiosInstance";

const SubAdminList = () => {
  const [subAdmins, setSubAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSubAdmins = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`${APIENDPOINT.subadminList}`);
      setSubAdmins(response.data);
    } catch (err) {
      setError("Failed to load subadmin list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubAdmins();
  }, []);

  // Toggle Status
  const toggleStatus = async (id, currentStatus) => {
    setLoading(true);
    try {
      const newStatus = currentStatus === "active" ? "Inactive" : "active";
      await axiosInstance.put(`${APIENDPOINT.updateSubadminStatus}`, {
        subadminId: id,
        status: newStatus,
      });
      setSubAdmins((prev) =>
        prev.map((subAdmin) =>
          subAdmin.id === id ? { ...subAdmin, status: newStatus } : subAdmin
        )
      );
    } catch (error) {
      setError("Failed to update status");
    } finally {
      setLoading(false);
      fetchSubAdmins();
    }
  };

  return (
    <Layout>
      <div className="bg-white rounded p-5 mx-auto">
        <h1 className="font-bold border-b-2 mb-4">SubAdmin List</h1>
        {loading && <LoadingModal visible={loading} />}
        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Actions</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              {subAdmins.map((subAdmin) => (
                <tr key={subAdmin.id} className="text-center">
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() =>
                        toggleStatus(subAdmin._id, subAdmin.status)
                      }
                      className={`px-4 py-1 rounded ${
                        subAdmin.status === "active"
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {subAdmin.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                  <td
                    className={`px-4 py-2 border-b capitalize bg-green-100 ${
                      subAdmin.status === "active"
                        ? "text-green-600 text-xs font-semibold"
                        : "text-red-600 text-xs font-semibold"
                    }"`}
                  >
                    {subAdmin.status}
                  </td>
                  <td className="px-4 py-2 border-b">{subAdmin.name}</td>
                  <td className="px-4 py-2 border-b">{subAdmin.email}</td>
                  <td className="px-4 py-2 border-b">
                    {subAdmin.mobileNumber}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default SubAdminList;
