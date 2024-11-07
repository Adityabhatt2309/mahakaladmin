"use client";
import Layout from "./Layout";
import React from "react";
const AdminDashboard = () => {
  return (
    <>
      <Layout>
        <div className="bg-white rounded p-5 mx-auto">
          <h1 className="font-bold border-b-2">Welcome To Super Admin </h1>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 p-6">
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-700">
                Total SubAdmin
              </h2>
              <p className="text-3xl font-bold text-yellow-500 mt-4">25</p>
              <p className="text-sm text-gray-500 mt-2">Total Subadmins</p>
              <div className="flex justify-between gap-2">
                <span className="inline-block bg-green-100 text-green-600 text-xs font-semibold mt-4 px-3 py-1 rounded-full">
                  5 Active
                </span>
                <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold mt-4 px-3 py-1 rounded-full">
                  5 InActive
                </span>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-700">
                Total Users
              </h2>
              <p className="text-3xl font-bold text-blue-500 mt-4">5000</p>
              <p className="text-sm text-gray-500 mt-2">Total Users All</p>
              <div className="flex justify-between gap-2">
                <span className="inline-block bg-green-100 text-green-600 text-xs font-semibold mt-4 px-3 py-1 rounded-full">
                  4500 Active
                </span>
                <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold mt-4 px-3 py-1 rounded-full">
                  500 InActive
                </span>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-700">
                Total Games
              </h2>
              <p className="text-3xl font-bold text-yellow-500 mt-4">10</p>
              <p className="text-sm text-gray-500 mt-2">Total Games</p>
              <div className="flex justify-between gap-2">
                <span className="inline-block bg-green-100 text-green-600 text-xs font-semibold mt-4 px-3 py-1 rounded-full">
                  5 Active
                </span>
                <span className="inline-block bg-red-100 text-red-600 text-xs font-semibold mt-4 px-3 py-1 rounded-full">
                  1 InActive
                </span>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-700">
                Subadmin Team D
              </h2>
              <p className="text-3xl font-bold text-blue-500 mt-4">30</p>
              <p className="text-sm text-gray-500 mt-2">Total Subadmins</p>
              <span className="inline-block bg-green-100 text-green-600 text-xs font-semibold mt-4 px-3 py-1 rounded-full">
                Active
              </span>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default AdminDashboard;
