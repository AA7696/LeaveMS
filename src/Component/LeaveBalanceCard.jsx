import React from 'react';

// Leave balave cards
function LeaveBalanceCard({ type, available, used, total }) {
  // calculate percent of leave used
  const percent = total > 0 ? (used / total) * 100 : 0;
  return (
    <div className="bg-white rounded-lg shadow border p-5 w-full min-w-[220px]">
      <div className="text-lg font-semibold text-gray-800 mb-1">{type}</div>
      <div className="flex items-center justify-between mt-2 mb-2">
        <span className="text-gray-500">Available</span>
        <span className="text-blue-600 font-bold text-2xl">{available}</span>
      </div>
      <div className="w-full h-2.5 rounded bg-gray-200 overflow-hidden mb-3">
        <div
          className="h-full bg-blue-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Used: {used}</span>
        <span>Total: {total}</span>
      </div>
    </div>
  );
}
export default LeaveBalanceCard;