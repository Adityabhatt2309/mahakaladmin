import React, { useState } from "react";
import { APIENDPOINT } from "../api/apiEndpoints";
import Layout from "./Layout";
import LoadingModal from "./LoadingModal";
import axiosInstance from "../api/axiosInstance";

const SubAdminCreate = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email format is invalid.";

    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";

    if (!formData.mobileNumber)
      newErrors.mobileNumber = "Mobile number is required.";
    else if (!/^\d{10}$/.test(formData.mobileNumber))
      newErrors.mobileNumber = "Mobile number must be 10 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validate()) return;
    try {
      const response = await axiosInstance.post(
        APIENDPOINT.subAdminCreate,
        formData
      );
      if (response.status === 201) {
        setStatusMessage("Subadmin created successfully!");
        setFormData({ name: "", email: "", password: "", mobileNumber: "" });
        setLoading(false);
      } else {
        setStatusMessage("Failed to create subadmin.");
        setLoading(false);
      }
    } catch (error) {
      setStatusMessage(
        error.response?.data?.message || "Error connecting to server."
      );
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  return (
    <Layout>
      <div className="bg-white rounded p-5 mx-auto">
        <h1 className="font-bold border-b-2">Create SubAdmin Form </h1>
        {statusMessage && (
          <p className="text-center mt-4 text-green-600">{statusMessage}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-600"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.mobileNumber && (
              <span className="text-red-500 text-sm">
                {errors.mobileNumber}
              </span>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Format: 10 digits (e.g., 1234567890)
            </p>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-[#2fdec1] hover:bg-[#1ea38d] text-white font-semibold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? "Create SubAdmin..." : "Create SubAdmin"}
            </button>
          </div>
          <LoadingModal visible={loading} />
        </form>
      </div>
    </Layout>
  );
};

export default SubAdminCreate;
