import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../Config/Api";
import { User } from './../Types/UserTypes';

export const sendLoginSignUpOtp = createAsyncThunk(
  "auth/sendLoginSignUpOtp",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/sent/login-signup-otp", { email });
      console.log("Sent OTP", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const signin = createAsyncThunk<any, any>(
  "auth/signing",
  async (loginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signing", loginRequest);
      console.log("jwt", response.data.jwt);
      localStorage.setItem("jwt", response.data.jwt);
      return response.data.jwt;
    } catch (error) {
      console.log("Error during login", error);
      return rejectWithValue(error.message);
    }
  }
);
export const signup = createAsyncThunk<any, any>(
  "auth/signup",
  async (signupRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signup", signupRequest);
      console.log("Signup successful", response.data.jwt);
      localStorage.setItem("jwt", response.data.jwt);
      return response.data.jwt;
    } catch (error) {
      console.log("Error during signup", error);
      return rejectWithValue(error.message);
    }
  }
);
export const logout = createAsyncThunk<any, any>(
  "auth/logout",
  async (navigate, { rejectWithValue }) => {
    try {
      localStorage.clear();
      navigate("/");
      return { message: "Logged out successfully" };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchUserProfile = createAsyncThunk<any, any>(
  "auth/fetchUserProfile",
  async ({ jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/users/profile", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("User profile", response.data);
      return response.data;
    } catch (error) {
      console.log("Error during fetching user profile", error);
      return rejectWithValue(error.message);
    }
  }
);
interface AuthState {
  jwt: string | null;
  otpSent: boolean;
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
}
const initialState: AuthState = {
  jwt: null,
  otpSent: false,
  isLoggedIn: false,
  user: null,
  loading: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendLoginSignUpOtp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendLoginSignUpOtp.fulfilled, (state) => {
      state.loading = false;
      state.otpSent = true;
    });
    builder.addCase(sendLoginSignUpOtp.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.jwt = action.payload;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.jwt = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.jwt = null;
      state.isLoggedIn = false;
      state.user = null;
    });
  },
});
export default authSlice.reducer;
