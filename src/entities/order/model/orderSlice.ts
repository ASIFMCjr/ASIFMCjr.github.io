import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { orderApi } from '..'

const initialState: { orders: orderApi.Order[] } = {
	orders: [],
}

export const fetchOrders = createAsyncThunk<orderApi.Order[]>(
	'books/fetchOrders',
	async () => await orderApi.getOrders()
)

const orderSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			fetchOrders.fulfilled,
			(state, action: PayloadAction<orderApi.Order[]>) => {
				state.orders = action.payload
			}
		)
	},
})

export default orderSlice.reducer
