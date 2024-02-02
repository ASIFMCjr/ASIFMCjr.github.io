import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../api";

export const fetchTokenRevoke = createAsyncThunk(
    'user/fetchUserData',
    async (userData: {email: string, password: string}) => await login(userData.email, userData.password)
  )

const tokenSlice = createSlice({
    name: "user",
    initialState: {
        refresh: '',
        access: ''
    },
    reducers: {
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchTokenRevoke.fulfilled, (state, action) => {
          // Add user to the state array
          state.refresh = action.payload.refresh
          state.access = action.payload.access
        })
      },
})

export default tokenSlice.reducer
// export const { setUser } = tokenSlice.actions