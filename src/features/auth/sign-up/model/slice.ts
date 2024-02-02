import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signUp } from "../api";

export const fetchUser = createAsyncThunk(
    'user/fetchUserData',
    async (userData: {email: string, password: string}) => {
      const response = await signUp(userData.email, userData.password)
      return response
    },
  )

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            id: null,
            email:	'',
            password:	'',
            is_superuser: '',
            is_staff: '',
            is_active: '',
            date_joined: '',
            last_login: '',
        }
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchUser.fulfilled, (state, action) => {
          // Add user to the state array
          state.user = action.payload
          
        })
      },
})

export default userSlice.reducer
export const { setUser } = userSlice.actions