import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../api'

const initialState: { user: User } = {
	user: {
		id: undefined,
		email: '',
		password: '',
		is_superuser: undefined,
		is_staff: undefined,
		is_active: undefined,
		date_joined: undefined,
		last_login: undefined,
		is_auth: false,
	},
}
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload
		},
		setIsAuth: (state, action: PayloadAction<boolean>) => {
			state.user.is_auth = action.payload
		},
	},
})

export default userSlice.reducer
export const { setUser, setIsAuth } = userSlice.actions
