import { configureStore } from '@reduxjs/toolkit'
import userSlice from 'features/auth/sign-up/model/slice'
import booksSlice from 'entities/book/model/slice'
import cartSlice from 'entities/cart/model/slice'

const rootReducer = {
	user: userSlice,
	books: booksSlice,
	cart: cartSlice,
}

export const store = configureStore({
	reducer: rootReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
