import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../api";

const initialState: {user: User} = {
        user: {
            id: undefined,
            email:	'',
            password:	'',
            is_superuser: undefined,
            is_staff: undefined,
            is_active: undefined,
            date_joined: undefined,
            last_login: undefined,
        }
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        }
    },
})

export default userSlice.reducer
export const { setUser } = userSlice.actions