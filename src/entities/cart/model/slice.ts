import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { cartApi } from '..'

const initialState: { cartItem: cartApi.CartItem; cartList: cartApi.CartList } =
	{
		cartList: {
			persons_discounted_price: 0,
			products: [],
			total: 0,
		},
		cartItem: {
			city: '',
			address: '',
			zipcode: '',
			id: 0,
			state: '',
			user_id: 0,
			warranty_days: 0,
			orders_id: '',
			orders_time: '',
			book_id: 0,
			amount: 0,
		},
	}

export const fetchCartList = createAsyncThunk<cartApi.CartList>(
	'cart/fetchCartList',
	async () => await cartApi.getCartList()
)

export const fetchCartItem = createAsyncThunk<cartApi.CartItem, number>(
	'cart/fetchCartItem',
	async (id) => await cartApi.getCartItem(id)
)

export const fetchUpdateCart = createAsyncThunk<
	cartApi.CartItem,
	cartApi.PrimitiveCart
>('cart/fetchUpdateCart', async (item) => await cartApi.updateCart(item))

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		// setParams: (state, action: PayloadAction<bookApi.GetBookParams>) => {state.params = action.payload}
	},
	extraReducers: (builder) => {
		builder.addCase(
			fetchCartList.fulfilled,
			(state, action: PayloadAction<cartApi.CartList>) => {
				state.cartList = action.payload
			}
		),
			builder.addCase(
				fetchCartItem.fulfilled,
				(state, action: PayloadAction<cartApi.CartItem>) => {
					state.cartItem = action.payload
				}
			),
			builder.addCase(
				fetchUpdateCart.fulfilled,
				(state, action: PayloadAction<cartApi.CartItem>) => {
					state.cartItem = action.payload
				}
			)
	},
})

export default cartSlice.reducer
