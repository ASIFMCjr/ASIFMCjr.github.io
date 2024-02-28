import { axiosInstance } from 'shared/api'

export interface OrderProducts {
	id: number
	amount: number
	state: string
	book_id: number
	user_id: number
	warranty_days: number
	orders_id: string
	orders_time: string
	city: string
	address: string
	total_orders_price: number
	price_discounted: number
	new_price: number
}
export interface Order {
	order_id: string
	total: number
	persons_discounted_price: number
	products: Array<OrderProducts>
	status: string
}
export const getOrders = async (): Promise<Array<Order>> =>
	(await axiosInstance.get('api/orders')).data
export const getOrder = async (order_id: string): Promise<Order> =>
	(await axiosInstance.get('api/orders/detail', { params: { order_id } })).data
export const payOrder = async (order_id: string) =>
	(await axiosInstance.post('api/orders/pay/', { order_id })).data
