import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface Filters {
	price_gte: number
	price_lte: number
	release_date_gte?: string
	release_date_lte?: string
	writing_date_gte?: string
	writing_date_lte?: string
}
const initialState: Filters = {
	price_gte: 0,
	price_lte: 10000,
	release_date_gte: undefined,
	release_date_lte: undefined,
	writing_date_gte: undefined,
	writing_date_lte: undefined,
}

const bookFilterSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setFilters: (state, action: PayloadAction<Filters>) => {
			state = action.payload
		},
		setFilter: (
			state,
			action: PayloadAction<{
				name: keyof Filters
				value: Filters[keyof Filters]
			}>
		) => {
			return {
				...state,
				[action.payload.name]: action.payload.value,
			}
		},
	},
})

export default bookFilterSlice.reducer
export const { setFilters, setFilter } = bookFilterSlice.actions
