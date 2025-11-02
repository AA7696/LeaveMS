import React, { useContext } from "react";
import { LeaveContext } from "../../context/LeaveContext";
import { toast } from "react-hot-toast";
import {FaTrash as Trash2} from 'react-icons/fa6';
import StatusBadge from "../../Component/StatusBadge";


function LeaveHistory() {
  const { leaves, deleteLeave } = useContext(LeaveContext);

  const calculateDays = (start, end) => {
    const diff = new Date(end) - new Date(start);
    return Math.ceil(diff / (1000 * 3600 * 24)) + 1;
  };

   const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this leave request?"
    );
    if (!confirmDelete) return;

    const success = await deleteLeave(id);
    if (success){
      toast.success("Leave deleted successfully!");

    } 
  };

  return (
    <div className="bg-white rounded-lg shadow border p-5 max-w-7xl mx-auto mt-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Leave History</h2>

      {leaves.length === 0 ? (
        <p className="text-gray-500">No leave applications found.</p>
      ) : (
        <table className="min-w-full text-left text-black border-collapse">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2 px-3 font-medium">Type</th>
              <th className="py-2 px-3 font-medium">Start Date</th>
              <th className="py-2 px-3 font-medium">End Date</th>
              <th className="py-2 px-3 font-medium">Days</th>
              <th className="py-2 px-3 font-medium">Reason</th>
              <th className="py-2 px-3 font-medium">Status</th>
              <th className="py-2 px-3 font-medium">Applied On</th>
             <th className="py-2 px-3 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((row, idx) => (
              <tr key={idx} className="border-b last:border-b-0 hover:bg-gray-50 transition">
                <td className="py-2 px-3 capitalize">{row.type}</td>
                <td className="py-2 px-3">{new Date(row.startDate).toLocaleDateString()}</td>
                <td className="py-2 px-3">{new Date(row.endDate).toLocaleDateString()}</td>
                <td className="py-2 px-3">{calculateDays(row.startDate, row.endDate)}</td>
                <td className="py-2 px-3">{row.reason}</td>
                <td className="py-2 px-3">
                  <StatusBadge status={row.status} />
                </td>
                <td className="py-2 px-3">{new Date(row.createdAt).toLocaleDateString()}</td>
                 <td className="py-2 px-3 text-center">
                  {row.status === "pending" ? (
                    <button 
                      onClick={() => handleDelete(row._id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Delete Leave"
                    >
                      <Trash2 size={18} />
                    </button>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LeaveHistory;
