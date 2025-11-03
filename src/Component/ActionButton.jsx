import React from "react";
import { LuCheck } from 'react-icons/lu';
import { AiOutlineClose } from 'react-icons/ai';
import { FaRegUserCircle } from 'react-icons/fa';

// Action Buttotn for accepting rejectin request
function ActionButtons({ onApprove, onReject, onUserInfo }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onApprove}
        className="bg-green-100 text-green-700 font-semibold py-1 px-1 rounded hover:bg-green-200"
        aria-label="Approve"
      >
        <LuCheck size={24} />
      </button>
      <button
        onClick={onReject}
        className="bg-red-100 text-red-700 font-semibold py-1 px-1 rounded hover:bg-red-200"
        aria-label="Reject"
      >
        <AiOutlineClose size={24} />
      </button>
      <button
        onClick={onUserInfo}
        className="bg-blue-100 text-blue-700 font-semibold py-1 px-1 rounded hover:bg-blue-200"
        aria-label="User Info"
      >
        <FaRegUserCircle size={24} />
      </button>
    </div>
  );
}

export default ActionButtons;
