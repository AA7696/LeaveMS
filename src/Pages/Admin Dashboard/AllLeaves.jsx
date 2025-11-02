import React, { useContext, useEffect, useState, useMemo } from "react";
import StatusBadge from "../../Component/StatusBadge";
import { LeaveContext } from "../../context/LeaveContext";

function AllLeaves() {
  const { leaves, loading, error } = useContext(LeaveContext);
  const [statusFilter, setStatusFilter] = useState("All");


  // Calculate leave duration
  const calculateDays = (start, end) => {
    const diff = new Date(end) - new Date(start);
    return Math.ceil(diff / (1000 * 3600 * 24)) + 1;
  };

  // Apply filter to leaves
  const filteredLeaves = useMemo(() => {
    if (statusFilter === "All") return leaves;
    return leaves.filter((leave) => leave.status === statusFilter);
  }, [leaves, statusFilter]);

  // Loading / Error states
  if (loading)
    return <p className="text-center text-gray-600 mt-10">Loading leaves...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to fetch leaves: {error}
      </p>
    );

  return (
    <div className="bg-white rounded-lg shadow p-5 border text-black">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            All Leave Requests
          </h2>
          <p className="text-gray-500 text-sm">
            Complete history of all employees’ leave requests
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="mt-3 sm:mt-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="All">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {filteredLeaves.length === 0 ? (
        <p className="text-gray-500 text-center mt-4">
          No leave records found for <b>{statusFilter}</b> status.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-500 border-b bg-gray-50">
                <th className="py-2 px-3 font-medium">Employee</th>
                <th className="py-2 px-3 font-medium">Type</th>
                <th className="py-2 px-3 font-medium">Start Date</th>
                <th className="py-2 px-3 font-medium">End Date</th>
                <th className="py-2 px-3 font-medium">Days</th>
                <th className="py-2 px-3 font-medium">Reason</th>
                <th className="py-2 px-3 font-medium">Status</th>
                <th className="py-2 px-3 font-medium">Applied On</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeaves.map((row, idx) => (
                <tr
                  key={row._id || idx}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="py-2 px-3 font-semibold">
                    {row.user?.name || "Unknown"}
                  </td>
                  <td className="py-2 px-3 capitalize">{row.type}</td>
                  <td className="py-2 px-3">
                    {new Date(row.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-3">
                    {new Date(row.endDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-3">
                    {calculateDays(row.startDate, row.endDate)}
                  </td>
                  <td className="py-2 px-3">{row.reason}</td>
                  <td className="py-2 px-3">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="py-2 px-3">
                    {new Date(row.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllLeaves;
