import axios from 'axios'
import Cookies from 'js-cookie'
import { store } from 'app/store'
import { setIsAuth } from 'features/auth/sign-up/model/slice'

export interface Token {
	refresh: string
	access: string
}

axios.defaults.headers['Access-Control-Allow-Origin'] = '*'

const baseUrl = {
	baseURL: 'http://localhost:3000',
}

export const getToken = async (): Promise<string> => {
	const access = localStorage.getItem('access')
	try {
		const data = (
			await axios.post('api/token/verify/', { token: access }, baseUrl)
		).data
		if (!data) return await revokeToken()
	} catch (err) {
		return ''
	}

	return access ? access : ''
}

export const createTokens = async (
	email: string,
	password: string
): Promise<Token> => {
	const data = (
		await axios.post<Token>('api/token/', { email, password }, baseUrl)
	).data
	localStorage.setItem('access', data.access)
	Cookies.set('refresh', data.refresh)

	return data
}

export const revokeToken = async (): Promise<string> => {
	const refresh = Cookies.get('refresh')
	try {
		const { access } = (
			await axios.post<Token>('api/token/refresh/', { refresh }, baseUrl)
		).data
		localStorage.setItem('access', access)
		return access
	} catch (e) {
		store.dispatch(setIsAuth(false))
		return ''
	}
}
