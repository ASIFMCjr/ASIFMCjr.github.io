import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authorApi } from '..'

const initialState: {
	authorsInfo: authorApi.Authors
} = {
	authorsInfo: {
		result: [],
		page: 0,
		total_pages: 0,
		total_items: 0,
		page_size: 0,
		links: {
			next: null,
			previous: null,
		},
	},
}

export const fetchAuthors = createAsyncThunk<
	authorApi.Authors,
	{ page?: number; page_size?: number }
>(
	'authors/fetchAuthors',
	async ({ page, page_size }) => await authorApi.getAuthors(page_size, page)
)

const authorSlice = createSlice({
	name: 'book',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAuthors.fulfilled, (state, action) => {
			state.authorsInfo = action.payload
		})
	},
})

export default authorSlice.reducer
