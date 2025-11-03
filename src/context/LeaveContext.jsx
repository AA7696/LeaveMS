import React, { useContext } from "react";
import { createContext, useReducer, useEffect } from "react";
import { api } from "../services/api";
import { useCallback } from "react";
import { AuthContext } from "./AuthContext";

export const LeaveContext = createContext();

const INITIAL_STATE = {
    leaves: [],
    loading: false,
    error: null,
    balances: null
};

const ACTIONS = {
    START: "START",
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
    ADD_LEAVE: "ADD_LEAVE",
    RESET: "RESET",
    SET_BALANCES: "SET_BALANCES"
};


const leaveReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.START:
            return { ...state, loading: true, error: null };

        case ACTIONS.SUCCESS:
            return {
                ...state,
                leaves: Array.isArray(action.payload) ? action.payload : [],
                loading: false,
                error: null,
            };

        case ACTIONS.ADD_LEAVE:
            return {
                ...state,
                leaves: [...state.leaves, action.payload],
                loading: false,
                error: null,
            };
        case ACTIONS.SET_BALANCES:
            return { ...state, balances: action.payload, loading: false };

        case ACTIONS.FAILURE:
            return { ...state, loading: false, error: action.payload };

        case ACTIONS.RESET:
            return INITIAL_STATE;

        default:
            return state;
    }
};
export const LeaveContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(leaveReducer, INITIAL_STATE);
    const {user} = useContext(AuthContext)


    // Fetch leaves on mount
    const fetchLeaves = useCallback(async () => {
        dispatch({ type: ACTIONS.START });
        const token = sessionStorage.getItem("accessToken");
        if (!token) {
            dispatch({ type: ACTIONS.FAILURE, payload: "No access token found" });
            return;
        }
        try {
            const [leavesRes, balanceRes] = await Promise.all([
                api.get("/leaves/user"),
                api.get("/leaves/balance").catch(() => null), // optional
            ]);
            if (balanceRes?.data?.data) {
                dispatch({
                    type: ACTIONS.SET_BALANCES,
                    payload: balanceRes.data.data,
                });
            }
            dispatch({
                type: ACTIONS.SUCCESS,
                payload: leavesRes.data.data || [],
            });

        }

        catch (err) {
            dispatch({ type: ACTIONS.FAILURE, payload: err.message });
        }
    }, []);


    // Add leave function
    const addLeave = useCallback(async (leaveData) => {
        dispatch({ type: ACTIONS.START });
        try {
            const res = await api.post("/leaves/apply", leaveData);
            dispatch({
                type: ACTIONS.ADD_LEAVE,
                payload: res.data.data || res.data,
            });
            const balanceRes = await api.get("/leaves/balance").catch(() => null);
            if (balanceRes?.data?.data) {
                dispatch({
                    type: ACTIONS.SET_BALANCES,
                    payload: balanceRes.data.data,
                });
            }
            return true;
        } catch (err) {
            dispatch({
                type: ACTIONS.FAILURE,
                payload: err.response?.data?.message || err.message,
            });
            return false;
        }
    }, []);

    const resetLeaves = useCallback(() => {
        dispatch({ type: ACTIONS.RESET });
    }, []);

    // Delete Leave
    const deleteLeave = useCallback(async (leaveId) => {
    dispatch({ type: ACTIONS.START });
    try {
        await api.delete(`/leaves/${leaveId}`);
        dispatch({
            type: ACTIONS.SUCCESS,
            payload: state.leaves.filter((leave) => leave._id !== leaveId),
        });

        await fetchLeaves();
        
        return true;
    } catch (err) {
        dispatch({
            type: ACTIONS.FAILURE,
            payload: err.response?.data?.message || err.message,
        });
        toast.error("Failed to delete leave.");
        return false;
    }
}, [state.leaves]);

// Fetch ALL Leaves
 const fetchAllLeaves = useCallback(async () => {
        dispatch({ type: ACTIONS.START });
        const token = sessionStorage.getItem("accessToken");
        if (!token) {
            dispatch({ type: ACTIONS.FAILURE, payload: "No access token found" });
            return;
        }
        try {
            const [leavesRes] = await Promise.all([
                api.get("/leaves"),
            ]);
            dispatch({
                type: ACTIONS.SUCCESS,
                payload: leavesRes.data.data || [],
            });

        }

        catch (err) {
            dispatch({ type: ACTIONS.FAILURE, payload: err.message });
        }
    }, []);

    // Update Leave Status

const updateLeaveStatus = useCallback(async (leaveId, status) => {
  dispatch({ type: ACTIONS.START });
  try {
    let endpoint = "";
    if (status === "approved") {
      endpoint = `/leaves/${leaveId}/approve`;
    } else if (status === "rejected") {
      endpoint = `/leaves/${leaveId}/reject`;
    } else {
      throw new Error("Invalid leave status");
    }

    const res = await api.patch(endpoint);

    dispatch({
      type: ACTIONS.SUCCESS,
      payload: state.leaves.map(leave =>
        leave._id === leaveId ? res.data.data : leave
      ),
    });

    const balanceRes = await api.get("/leaves/balance").catch(() => null);
    if (balanceRes?.data?.data) {
      dispatch({
        type: ACTIONS.SET_BALANCES,
        payload: balanceRes.data.data,
      });
    }

    return true;
  } catch (err) {
    dispatch({
      type: ACTIONS.FAILURE,
      payload: err.response?.data?.message || err.message,
    });
    return false;
  }
}, [state.leaves]);


 useEffect(() => {
    if (user) {
      fetchLeaves();
    } else {
      resetLeaves();
    }
  }, [user]);

    return (
        <LeaveContext.Provider
            value={{
                leaves: state.leaves,
                balances: state.balances,
                loading: state.loading,
                error: state.error,
                addLeave,
                resetLeaves,
                fetchLeaves,
                deleteLeave,
                fetchAllLeaves,
                updateLeaveStatus
            }}
        >
            {children}
        </LeaveContext.Provider>
    );
}

export default LeaveContext;