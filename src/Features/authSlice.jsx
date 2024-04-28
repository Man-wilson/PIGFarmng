import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getItemAsync, setItemAsync, deleteItemAsync } from "expo-secure-store";

const initialState = {
  userData: {},
  isLoggedIn: false,
  isLoading: false,
  token: "",
  userEdited: false,
  error: null,
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
      state.error = null; // Clear errors when new loading starts
    },
    endLoading: (state, action) => {
      state.isLoading = false;
      state.error = action.payload; // Store error information
    },
    loginSuccess: (state, action) => {
      state.userData = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.userData = {};
      state.isLoggedIn = false;
      state.token = "";
      state.error = null;
    },
    tokenStore: (state, action) => {
      state.token = action.payload;
    },
    editUser: (state) => {
      state.userEdited = true;
    },
    resetEditProfile: (state) => {
      state.userEdited = false;
    },
  },
});

export const {
  loginSuccess,
  tokenStore,
  logout,
  editUser,
  resetEditProfile,
  startLoading,
  endLoading,
} = authSlice.actions;

export default authSlice.reducer;

export const loginUser = (data) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.post(
      "https://pig-farming-backend.onrender.com/api/auth/login",
      data,
      { timeout: 60000 } // 60 seconds timeout
    );

    // console.log(
    //   data,
    //   "zzzzzzzzzzzzzzzzzzzzzzzzzzzz++++++++++++++++++++++++++++++++"
    // );

    const token = response.data.token;
    const userData = response.data.user;
    // Verifying and storing token
    if (typeof token === "string") {
      await setItemAsync("token", token);
    } else {
      console.error("Received token is not a string:", token);
      throw new Error("Token received is not a string");
    }

    //Handling refreshToken
    if (response.data.refreshToken) {
      await setItemAsync("refreshToken", response.data.refreshToken);
    }

    // Serializing and storing user data
    if (userData && typeof userData === "object") {
      await setItemAsync("logindata", JSON.stringify(userData));
    } else {
      console.error("Received user data is not an object:", userData);
      throw new Error("User data received is not serializable");
    }

    dispatch(loginSuccess(userData));
    dispatch(tokenStore(token));
    dispatch(endLoading(null));
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.error
      : error.message;
    console.error("Login error:", errorMessage);
    dispatch(endLoading(errorMessage));
    alert(`Login failed: ${errorMessage}`);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    // Removed the token from SecureStore
    await deleteItemAsync("token");
    await deleteItemAsync("logindata");

    // Dispatched the logout action to update state
    dispatch(logout());
  } catch (error) {
    console.error("Logout error:", error);
  }
};
