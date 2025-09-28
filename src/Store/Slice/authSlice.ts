import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { REQRES_API_KEY } from "../../Utils/consts";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

export const login = createAsyncThunk<
  { token: string },
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (creds, thunkAPI) => {
  try {
    const resp = await axios.post(
      "https://reqres.in/api/login",
      { email: creds.email, password: creds.password },
      { headers: { "x-api-key": REQRES_API_KEY } }
    );
    return { token: resp.data.token };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err?.response?.data?.error || "Login failed"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Login failed";
    });
  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
