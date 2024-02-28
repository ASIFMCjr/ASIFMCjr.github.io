import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { favoritesApi } from '..'

const initialState: favoritesApi.Favorites = {
	result: [],
	links: { next: '', previous: '' },
	page: 0,
	page_size: 0,
	total_items: 0,
	total_pages: 0,
}

export const fetchFavorites = createAsyncThunk<
	favoritesApi.Favorites,
	{ page?: number; page_size?: number }
>(
	'books/fetchFavorites',
	async ({ page, page_size }) =>
		await favoritesApi.getFavorites(page, page_size)
)

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchFavorites.fulfilled, (state, action) => {
			state.result = action.payload.result
			state.links = action.payload.links
			state.page = action.payload.page
			state.page_size = action.payload.page_size
			state.total_items = action.payload.total_items
			state.total_pages = action.payload.total_pages
		})
	},
})

export default favoritesSlice.reducer
