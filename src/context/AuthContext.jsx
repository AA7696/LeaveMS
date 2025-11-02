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
    // Best-effort clear any previous server session/cookie before logging in.
    // Some backends use httpOnly cookies for sessions; clearing the previous
    // session on the server helps avoid returning the previous user's profile
    // when calling the refresh endpoint.
    try {
      await api.post("/auth/logout");
    } catch (err) {
      // ignore: logout is best-effort and may fail if there's no active session
    }
    // Ensure local token is cleared before login
    sessionStorage.removeItem("accessToken");

    dispatch({ type: "LOADING" });
    try {
      // First attempt to login
      const loginRes = await api.post("/auth/login", { email, password });

      // Try to read profile immediately
      let profileRes = await api.get("/auth/profile");

      // If profile doesn't match the requested email, attempt one retry:
      // Sometimes a stale server session/cookie can cause the profile to
      // belong to the previous user. Retry by logging out on server and
      // logging in again once.
      const profileEmail = profileRes?.data?.data?.email;
      if (profileEmail && profileEmail !== email) {
        console.warn("AuthContext: profile email mismatch after login; retrying to clear stale server session");
        try {
          await api.post("/auth/logout");
          await api.post("/auth/login", { email, password });
          profileRes = await api.get("/auth/profile");
        } catch (retryErr) {
          // fall through to error handling below
          console.warn("AuthContext: retry login failed", retryErr);
        }
      }

      // Prefer accessToken returned by login response if available
      const accessFromLogin = loginRes?.data?.data?.accessToken;
      if (accessFromLogin) {
        sessionStorage.setItem("accessToken", accessFromLogin);
      } else {
        // Otherwise attempt refresh-token to get an access token (legacy flow)
        try {
          const resRefresh = await api.post("/auth/refresh-token");
          if (resRefresh?.data?.data?.accessToken) {
            sessionStorage.setItem("accessToken", resRefresh.data.data.accessToken);
          }
        } catch (refreshErr) {
          // ignore refresh failure for now; profile may still be available via cookie
          console.warn("AuthContext: refresh-token failed after login", refreshErr);
        }
      }

      if (profileRes?.data?.data) {
        dispatch({ type: "LOGIN_SUCCESS", payload: { user: profileRes.data.data } });
        return true;
      }

      throw new Error("Failed to retrieve profile after login");
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        payload: error.response?.data?.message || error.message,
      });
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    // Remove local token and clear any axios default auth header to avoid
    // sending stale Authorization values in subsequent requests.
    sessionStorage.removeItem("accessToken");
    try {
      // clear axios instance header (safe even if not previously set)
      api.defaults.headers.common["Authorization"] = "";
    } catch (err) {
      // ignore
    }

    dispatch({ type: "LOGOUT" });
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
