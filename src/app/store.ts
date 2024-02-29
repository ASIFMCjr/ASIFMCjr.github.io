import { configureStore } from '@reduxjs/toolkit'
import userSlice from 'features/auth/sign-up/model/slice'
import booksSlice from 'entities/book/model/bookSlice'
import cartSlice from 'entities/cart/model/cartSlice'
import bookFilterSlice from 'widgets/book/filter/model/bookFilterSlice'
import favoritesSlice from 'entities/favorites/model/favoritesSlice'
import orderSlice from 'entities/order/model/orderSlice'
import authorSlice from 'entities/author/model/authorSlice'

const rootReducer = {
	user: userSlice,
	books: booksSlice,
	cart: cartSlice,
	filters: bookFilterSlice,
	favorites: favoritesSlice,
	orders: orderSlice,
	authors: authorSlice,
}

export const store = configureStore({
	reducer: rootReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
