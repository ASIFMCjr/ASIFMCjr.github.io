import { store } from 'app/store'
import axios from 'axios'
import { setIsAuth } from 'features/auth/sign-up/model/slice'
import { revokeToken } from 'shared/api'

export const axiosInstance = axios.create({
	baseURL: 'http://localhost:8000/',
})

axiosInstance.interceptors.request.use(
	async (config) => {
		const token: string | null = localStorage.getItem('access')
		const auth: string = token ? `Bearer ${token}` : ''

		config.headers['Authorization'] = auth
		store.dispatch(setIsAuth(true))
		return config
	},
	(error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
	(response) => {
		store.dispatch(setIsAuth(true))
		return response
	},
	async (error) => {
		if (error.response.status === 401) {
			return await revokeToken()
		}
		store.dispatch(setIsAuth(false))
		Promise.reject(error)
	}
)
