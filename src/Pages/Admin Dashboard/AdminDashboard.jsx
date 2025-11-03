import React, { useContext } from 'react';
import ActionButtons from '../../Component/ActionButton';
import LeaveContext from '../../context/LeaveContext';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


function AdminDashboard() {
    const { leaves, updateLeaveStatus,  fetchAllLeaves } = useContext(LeaveContext)
    const navigate = useNavigate()

    // Pending Request
    const pendingRequests = leaves.filter((leave) => leave.status === "pending");
    const processedRequests = leaves.filter((leave) => leave.status !== "pending");

    // Calculate leave duration
    const calculateDays = (start, end) => {
        const diff = new Date(end) - new Date(start);
        return Math.ceil(diff / (1000 * 3600 * 24)) + 1;
    };

    const handleApprove = async (leaveId) => {
        const success = await updateLeaveStatus(leaveId, 'approved');
        if (success) {
            toast.success('Leave Approved');
            await fetchAllLeaves(); // refresh list after update
        } else {
            toast.error("Error")

        }
    };

    const handleReject = async (leaveId) => {
        const success = await updateLeaveStatus(leaveId, 'rejected');
        if (success) {
            toast.success('Leave Rejected');

            await fetchAllLeaves(); // refresh list after update
        } else {
            toast.error("Error")
        }
    };

    const handleUserInfo = (id) => {
        navigate(`/admin/user-history/${id}`)

        
    }


    return (
        <div className="bg-gray-50 min-h-screen p-4 text-black">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>

            {/* Top Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow border p-5 flex flex-col items-start">
                    <div className="text-gray-600 mb-2">Pending Requests</div>
                    <div className="text-yellow-500 text-2xl font-bold">{pendingRequests.length}</div>
                </div>
                <div className="bg-white rounded-lg shadow border p-5 flex flex-col items-start">
                    <div className="text-gray-600 mb-2">Total Requests</div>
                    <div className="text-blue-600 text-2xl font-bold">{leaves.length}</div>
                </div>
                <div className="bg-white rounded-lg shadow border p-5 flex flex-col items-start">
                    <div className="text-gray-600 mb-2">Processed</div>
                    <div className="text-green-600 text-2xl font-bold">{processedRequests.length}</div>
                </div>
            </div>
            {/* Pending Requests Table */}
            <div className="bg-white rounded-lg shadow p-5 border mb-6">
                <h2 className="text-xl font-semibold mb-1 text-gray-800">Pending Requests</h2>
                <p className="text-gray-500 mb-3 text-sm">Review and approve/reject leave requests</p>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="text-gray-500 border-b">
                                <th className="py-2 px-3 font-medium">Employee</th>
                                <th className="py-2 px-3 font-medium">Type</th>
                                <th className="py-2 px-3 font-medium">Start Date</th>
                                <th className="py-2 px-3 font-medium">End Date</th>
                                <th className="py-2 px-3 font-medium">Days</th>
                                <th className="py-2 px-3 font-medium">Reason</th>
                                <th className="py-2 px-3 font-medium">Applied</th>
                                <th className="py-2 px-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingRequests.map((row, idx) => (
                                <tr key={idx} className="border-b last:border-b-0 align-middle">
                                    <td className="py-2 px-3 ">{row.user?.name}</td>
                                    <td className="py-2 px-3">{row.type}</td>
                                    <td className="py-2 px-3">{new Date(row.startDate).toLocaleDateString()}</td>
                                    <td className="py-2 px-3">{new Date(row.endDate).toLocaleDateString()}</td>
                                    <td className="py-2 px-3">{calculateDays(row.startDate, row.endDate)}</td>
                                    <td className="py-2 px-3">{row.reason}</td>
                                    <td className="py-2 px-3"> {new Date(row.createdAt).toLocaleDateString()}</td>
                                    <td className="py-2 px-3">
                                        <ActionButtons
                                            onApprove={() => handleApprove(row._id)}
                                            onReject={() => handleReject(row._id)}
                                        onUserInfo={() => handleUserInfo(row.user?._id)}
                                        />

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard
