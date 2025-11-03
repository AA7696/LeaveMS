import React, { createContext, useReducer, useEffect } from "react";
import {api} from "../services/api.js"; // Import your API utility
export const AuthContext = createContext();

// Initial state
const initialState = {
  user: null,
  loading: true,
  error: null,
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { user: action.payload.user, loading: false, error: null };
    case "REGISTER_SUCCESS":
      return { ...state, loading: false, error: null };
    case "LOGOUT":
      return { user: null, loading: false, error: null };
    case "AUTH_ERROR":
      return { user: null, loading: false, error: action.payload };
    case "LOADING":
      return { ...state, loading: true };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // On mount, refresh user session
 useEffect(() => {
  if (!state.user) {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      dispatch({ type: "LOGOUT" });
      return;
    }
    const refreshUser = async () => {
      dispatch({ type: "LOADING" });
      try {
        const response = await api.post("/auth/refresh-token");
        const accessToken = response.data.data.accessToken;
        sessionStorage.setItem("accessToken", accessToken);

        const profileResponse = await api.get("/auth/profile");
        dispatch({ type: "LOGIN_SUCCESS", payload: { user: profileResponse.data.data } });
      } catch (error) {
        sessionStorage.removeItem("accessToken");
        dispatch({ type: "AUTH_ERROR", payload: error.response?.data?.message || "Failed to refresh session." });
      }
    };
    refreshUser();
  }
}, [state.user]);


  // Login function
const login = async (email, password) => {
  console.log(" LOGIN START - Clearing storage");
  sessionStorage.clear();
  localStorage.clear();
  
  dispatch({ type: "LOADING" });
  try {
    console.log(" Logging in with:", email);
    
    const loginRes = await api.post("/auth/login", { email, password });
    
    // ADD THESE DEBUG LOGS
    console.log(" FULL LOGIN RESPONSE:", loginRes);
    console.log(" Response data:", loginRes.data);
    console.log(" Response data.data:", loginRes.data.data);
    console.log(" Access token:", loginRes.data.data?.accessToken);
    
    const { accessToken } = loginRes.data.data;
    
    if (!accessToken) {
      console.error(" NO ACCESS TOKEN IN RESPONSE!");
      throw new Error("Access token not received from backend");
    }
    
    sessionStorage.setItem("accessToken", accessToken);
    console.log("Token saved:", sessionStorage.getItem("accessToken"));

    const profileRes = await api.get("/auth/profile");
    console.log("🔵 Profile fetched:", profileRes.data.data);
    
    dispatch({ type: "LOGIN_SUCCESS", payload: { user: profileRes.data.data } });
    return true;
  } catch (error) {
    console.error(" Login error:", error);
    console.error(" Error response:", error.response?.data);
    dispatch({
      type: "AUTH_ERROR",
      payload: error.response?.data?.message || error.message,
    });
    return false;
  }
};
  // Logout function
const logout = async () => {
  console.log(" LOGOUT START");
  console.log(" Current token before logout:", sessionStorage.getItem("accessToken"));
  
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Logout API failed:", error);
  }
  
  sessionStorage.clear();
  localStorage.clear();
  console.log(" Storage cleared");
  
  delete api.defaults.headers.common["Authorization"];
  console.log(" Headers cleared");
  
  dispatch({ type: "LOGOUT" });
  
  console.log(" Redirecting to login...");
  window.location.href = "/login";
};


// Register function
const register = async ({ name, email, password }) => {
  dispatch({ type: "LOADING" });
  try {
    await api.post("/auth/register", { name, email, password });
     dispatch({ type: "REGISTER_SUCCESS" });
    return true;
  } catch (error) {
    dispatch({
      type: "AUTH_ERROR",
      payload: error.response?.data?.message || error.message,
    });
    return false;
  }
};


  return (
    <AuthContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
