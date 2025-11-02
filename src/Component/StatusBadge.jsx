import React from "react";

function StatusBadge({ status }) {
    const base = "px-4 py-1 rounded-full font-semibold text-sm";
    return (
        <span
            className={
                status === "approved"
                    ? `${base} bg-green-600 text-white`
                    : status === "pending"
                        ? `${base} bg-yellow-500 text-white`
                        : `${base} bg-gray-300 text-gray-800`
            }
        >
            {status}
        </span>
    );
}

export default StatusBadge
