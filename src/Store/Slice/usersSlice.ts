import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { REQRES_API_KEY } from "../../Utils/consts";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UsersState {
  all: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  all: [],
  loading: false,
  error: null,
};

export const fetchUsersPage = createAsyncThunk<User[], number>(
  "users/fetchUsersPage",
  async (page: number, thunkAPI) => {
    try {
      const res = await fetch(`https://reqres.in/api/users?page=${page}`, {
        headers: { "x-api-key": REQRES_API_KEY },
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      return data.data as User[];
    } catch (err) {
      return thunkAPI.rejectWithValue("Error fetching users");
    }
  }
);

export const addUser = createAsyncThunk<User, Omit<User, "id">>(
  "users/addUser",
  async (user) => {
    const res = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": REQRES_API_KEY,
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    return { ...user, id: Math.floor(Math.random() * 10000) } as User;
  }
);

export const updateUser = createAsyncThunk<User, User>(
  "users/updateUser",
  async (user) => {
    await fetch(`https://reqres.in/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": REQRES_API_KEY,
      },
      body: JSON.stringify(user),
    });
    return user;
  }
);

export const deleteUser = createAsyncThunk<number, number>(
  "users/deleteUser",
  async (id) => {
    await fetch(`https://reqres.in/api/users/${id}`, {
      method: "DELETE",
      headers: { "x-api-key": REQRES_API_KEY },
    });
    return id;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsersPage.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.loading = false;
          const ids = new Set(state.all.map((u) => u.id));
          const merged = [...state.all];
          action.payload.forEach((u) => {
            if (!ids.has(u.id)) merged.push(u);
          });
          state.all = merged;
        }
      )
      .addCase(fetchUsersPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.all.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to add user";
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.all = state.all.map((u) =>
          u.id === action.payload.id ? action.payload : u
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to update user";
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.all = state.all.filter((u) => u.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to delete user";
      });
  },
});

export default usersSlice.reducer;
