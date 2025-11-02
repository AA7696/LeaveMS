import React from 'react';
import LeaveBalanceCard from '../../Component/LeaveBalanceCard.jsx';
import { useContext } from 'react';
import { LeaveContext } from '../../context/LeaveContext.jsx';


function Dashboard() {
  const { balances } = useContext(LeaveContext);
  

  const formated = [
    {
      type: "Annual Leave",
      available: balances ? balances["annual"] : 20,
      used: balances ? 20 - balances["annual"] : 0,
      total: 20
    },
    {
      type: "Sick Leave",
      available: balances ? balances["sick"] : 12,
      used: balances ? 10 - balances["sick"] : 0,
      total: 10
    },
    {
      type: "Casual Leave",
      available: balances ? balances["casual"] : 8,
      used: balances ? 12 - balances["casual"] : 0,
      total: 12
    },
    {
      type: "Unpaid Leave",
      available: 0,
      used: balances ? 9999 - balances["unpaid"] : 0,
      total: 0
    },
  ];
  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">

      {/* Leave Cards */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Leave Balances</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5">
        {formated.map((b) => (
          <LeaveBalanceCard key={b.type} {...b} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;