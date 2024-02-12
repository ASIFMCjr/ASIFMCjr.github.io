import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { bookApi } from '..'

const initialState: {
	book: bookApi.Book
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
	book: {
		author: [],
		genres: [],
		id: 1,
		title: '',
		description: '',
		price: 0,
		in_stock: 1,
		writing_date: String(new Date()),
		release_date: String(new Date()),
	},
	params: {},
	loading: false,
}

export const fetchBooks = createAsyncThunk<
	bookApi.Books,
	bookApi.GetBookParams | undefined
>('books/fetchBooks', async (bookParams) => await bookApi.getBooks(bookParams))

export const fetchBook = createAsyncThunk<bookApi.Book, number>(
	'books/fetchBook',
	async (id) => await bookApi.getBook(id)
)

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
		})
		builder.addCase(fetchBook.fulfilled, (state, action) => {
			state.book = action.payload
		})
	},
})

export default bookSlice.reducer
