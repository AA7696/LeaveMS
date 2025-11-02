import React from "react";
import { useState } from "react";
import { LeaveContext } from "../../context/LeaveContext";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { useMemo } from "react";

function ApplyLeave() {
    const [form, setForm] = useState({ type: '', start: '', end: '', reason: '' });
    const { addLeave, loading, balances, fetchLeaves } = useContext(LeaveContext);
    const { user } = useContext(AuthContext);
    console.log(balances)


    const leaveBalances = useMemo(() => {
        return balances;
    }, [balances]);


    const maxDays = useMemo(() => {
        if (!form.type || !leaveBalances) return null;
        return leaveBalances[form.type];
    }, [form.type, leaveBalances]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.type || !form.start || !form.end || !form.reason) {
            alert("Please fill in all fields.");
            return;
        }


        const startDate = new Date(form.start);
        const endDate = new Date(form.end);
        const today = new Date();

        if (startDate < today.setHours(0, 0, 0, 0)) {
            toast.error("Start date cannot be in the past.");
            return;
        }

        if (endDate < startDate) {
            toast.error("End date cannot be before start date.");
            return;
        }

        const diffDays =
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

        if (diffDays > maxDays) {
            toast.error(`You only have ${maxDays} ${form.type} leaves left.`);
            return;
        }
        const leaveData = {
            userId: user._id,
            type: form.type,
            startDate: form.start,
            endDate: form.end,
            reason: form.reason,
        };
        // Call context function
        const success = await addLeave(leaveData);

        if (success) {
            toast.success('Leave request submitted successfully!');
            // Reset form after success
            setForm({ type: '', start: '', end: '', reason: '' });
             await fetchLeaves();
        } else {
            toast.error('Failed to submit leave request. Please try again.');
        }
    };


    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow p-6 max-w-5xl mx-auto mt-5 text-black">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Apply Leave</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Leave Type</label>
                    <select
                        className="w-full  border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
                        value={form.type}
                        onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    >
                        <option value="">Select leave type</option>
                        <option value="annual">Annual Leave</option>
                        <option value="sick">Sick Leave</option>
                        <option value="casual">Casual Leave</option>
                        <option value="unpaid">Unpaid Leave</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Start Date */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Start Date</label>
                        <input
                            type="date"
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
                            value={form.start}
                            onChange={e => setForm(f => ({ ...f, start: e.target.value }))}

                        />
                    </div>
                    {/* End Date */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">End Date</label>
                        <input
                            type="date"
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200 "
                            value={form.end}
                            onChange={e => setForm(f => ({ ...f, end: e.target.value }))}
                        />
                    </div>
                </div>
                {/* Reason */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-1">Reason</label>
                    <textarea
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
                        placeholder="Enter reason for leave..."
                        rows={3}
                        value={form.reason}
                        onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
                    />
                </div>
                {/* Submit Button */}
                <button
                    disabled={loading}
                    className={`w-full font-bold py-3 rounded-md text-lg transition ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                    type="submit"
                >
                    {loading ? "Submitting..." : "Submit Leave Request"}
                </button>
            </form>
        </>
    );
}
export default ApplyLeave;
