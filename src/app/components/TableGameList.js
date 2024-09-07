import React from 'react'

const gameData = [
    { name: 'MILAN MORNING', openTime: '10:20:00', closeTime: '11:20:00', openResult: '***-*', closeResult: '***-*' },
    { name: 'KALYAN MORNING', openTime: '11:00:00', closeTime: '12:00:00', openResult: '***-*', closeResult: '***-*' },
    { name: 'MADHUR MORNING', openTime: '11:30:00', closeTime: '12:30:00', openResult: '***-*', closeResult: '***-*' },
    { name: 'SRIDEVI', openTime: '11:30:00', closeTime: '12:30:00', openResult: '***-*', closeResult: '***-*' },
    { name: 'TIME BAZAAR', openTime: '12:50:00', closeTime: '13:50:00', openResult: '***-*', closeResult: '***-*' },
    { name: 'MADHUR DAY', openTime: '13:20:00', closeTime: '14:20:00', openResult: '***-*', closeResult: '***-*' },
    { name: 'MILAN DAY', openTime: '14:55:00', closeTime: '16:55:00', openResult: '***-*', closeResult: '***-*' },
    { name: 'SUPREME DAY', openTime: '15:30:00', closeTime: '17:35:00', openResult: '***-*', closeResult: '***-*' },
    { name: 'KALYAN', openTime: '16:00:00', closeTime: '18:00:00', openResult: '***-*', closeResult: '***-*' },
    { name: 'SRIDAVI NIGHT', openTime: '19:00:00', closeTime: '20:00:00', openResult: '***-*', closeResult: '***-*' },
    { name: 'MADHUR NIGHT', openTime: '20:20:00', closeTime: '22:20:00', openResult: '***-*', closeResult: '***-*' },
    { name: 'SUPREME NIGHT', openTime: '20:35:00', closeTime: '22:35:00', openResult: '***-*', closeResult: '***-*' },
    { name: 'MILAN NIGHT', openTime: '20:50:00', closeTime: '22:50:00', openResult: '***-*', closeResult: '***-*' },
    { name: 'KALYAN NIGHT', openTime: '21:20:00', closeTime: '23:30:00', openResult: '***-*', closeResult: '***-*' },
    { name: 'RAJDHANI NIGHT', openTime: '21:20:00', closeTime: '23:30:00', openResult: '***-*', closeResult: '***-*' },
    { name: 'MAIN BAJAR', openTime: '21:25:00', closeTime: '23:55:00', openResult: '***-*', closeResult: '***-*' },
    { name: 'RAJDHANI DAY', openTime: '15:00:00', closeTime: '17:00:00', openResult: '***-*', closeResult: '***-*' },
  ];

const TableGameList = () => {
  return (
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
        {gameData.map((game, index) => (
          <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-2 px-4 text-left whitespace-nowrap">{game.name}</td>
            <td className="py-2 px-4 text-left whitespace-nowrap">{game.openTime}</td>
            <td className="py-2 px-4 text-left whitespace-nowrap">{game.closeTime}</td>
            <td className="py-2 px-4 text-left whitespace-nowrap">{game.openResult}</td>
            <td className="py-2 px-4 text-left whitespace-nowrap">{game.closeResult}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>  )
}

export default TableGameList