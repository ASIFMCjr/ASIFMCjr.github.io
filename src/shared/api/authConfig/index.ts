import axios from 'axios'
import { getToken, revokeToken } from 'shared/api'

export const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/',
})

axiosInstance.interceptors.request.use(
	async (config) => {
		const token: string = await getToken()
		const auth: string = token ? `Bearer ${token}` : ''

		config.headers['Authorization'] = auth

		return config
	},
	(error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response && error.response.status === 401) {
			return await revokeToken()
		}

		Promise.reject(error)
	}
)
