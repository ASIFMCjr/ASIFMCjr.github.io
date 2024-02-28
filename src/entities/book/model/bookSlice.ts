import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { bookApi } from '..'

const initialState: {
	booksInfo: bookApi.Books
	params: bookApi.GetBookParams
	loading: boolean
} = {
	booksInfo: {
		result: [],
		page: 1,
		total_pages: 1,
		total_items: 0,
		page_size: 1,
		links: {
			next: null,
			previous: null,
		},
	},
	params: {},
	loading: false,
}

export const fetchBooks = createAsyncThunk<
	bookApi.Books,
	bookApi.GetBookParams | undefined
>('books/fetchBooks', async (bookParams) => await bookApi.getBooks(bookParams))

const bookSlice = createSlice({
	name: 'book',
	initialState,
	reducers: {
		setParams: (state, action: PayloadAction<bookApi.GetBookParams>) => {
			state.params = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchBooks.fulfilled, (state, action) => {
			state.booksInfo = action.payload
			state.loading = false
		})
		builder.addCase(fetchBooks.pending, (state) => {
			state.loading = true
		})
	},
})

export default bookSlice.reducer
