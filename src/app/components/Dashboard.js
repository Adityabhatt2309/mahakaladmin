"use client";
import Layout from "./Layout";
import React, { useState, useEffect } from "react";
import { getList } from "./../api/services";
import { APIENDPOINT } from "./../api/apiEndpoints";
import TableGameList from "./TableGameList";
const Dashboard = () => {
  const [gameData, setGameData] = useState([]);

  const GameListHandler = async () => {
    try {
      const response = await getList(APIENDPOINT.gameList);
      if (response) {
        setGameData(response?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onEditHandler = () => {};

  useEffect(() => {
    GameListHandler();
  }, []);
  return (
    <>
      <Layout>
        <div className="bg-white rounded p-5 mx-auto">
          <h1 className="font-bold border-b-2">Dashboard Home</h1>
          <div className="my-5">
            <p className="border-b-2 font-semibold">Market Bid Details</p>
            <div className="flex flex-col md:flex-row w-full my-2 gap-2">
              <input
                type="date"
                className="w-full border-2 border-black rounded p-2"
              />
              <select
                name="games"
                id="games"
                className="w-full border-2 border-black rounded p-2"
              >
                <option value="">Select an option</option>
                {gameData &&
                  gameData.map((game) => (
                    <option key={game._id} value={game._id}>
                      {game.name}
                    </option>
                  ))}
              </select>
              <button className="bg-[#2c907f] rounded px-3 py-2 md:py-0 text-white font-bold w-full md:w-auto">
                Submit
              </button>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-5 my-5">
              <div className="bg-[#2c907f] rounded flex flex-col md:flex-row justify-between items-center text-center p-4 w-full">
                <div>
                  <p className="text-white font-bold">0</p>
                  <p className="text-white font-bold">Today Registration</p>
                </div>
                <div>
                  <p className="text-white font-bold">281</p>
                  <p className="text-white font-bold">Total Users</p>
                </div>
              </div>
              <div className="bg-[#2c907f] rounded flex justify-between items-center text-center p-4 w-full">
                <div className="w-full">
                  <p className="text-white font-bold">{gameData?.length}</p>
                  <p className="text-white font-bold">Total Games</p>
                </div>
              </div>
              <div className="bg-[#2c907f] rounded flex justify-between items-center text-center p-4 w-full">
                <div className="w-full">
                  <p className="text-white font-bold">10</p>
                  <p className="text-white font-bold">Total Bid Amount</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="border-b-2 font-semibold">Total Bid Of Today</p>
            <div className="flex flex-col md:flex-row w-full my-2 gap-2">
              <div className="w-full">
                <p className="border-b-2 font-semibold">Game Name</p>
                <select
                  name="games"
                  id="games"
                  className="w-full border-2 border-black rounded p-2"
                >
                  <option value="">Select an option</option>
                  {gameData &&
                    gameData.map((game) => (
                      <option key={game._id} value={game._id}>
                        {game.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-full">
                <p className="border-b-2 font-semibold">Market Time</p>
                <select
                  name="cars"
                  id="cars"
                  className="w-full border-2 border-black rounded p-2"
                >
                  <option value="">Select an option</option>
                  <option value="Open Time">Open Time</option>
                  <option value="Close Time">Close Time</option>
                </select>
              </div>
              <button className="bg-[#2c907f] py-2 md:py-0 md:mt-6 sm:p-2 rounded px-3 text-white font-bold w-full md:w-auto">
                Submit
              </button>
            </div>
            <div className="bg-[#2c907f] rounded flex flex-col justify-between items-center text-center p-4 w-full">
              <p className="text-white font-bold">10</p>
              <p className="text-white font-bold">Total Bids</p>
            </div>
          </div>
          {/* Table Component */}
          <div className="flex-grow overflow-x-auto">
            <TableGameList onEdit={onEditHandler} />
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Dashboard;
