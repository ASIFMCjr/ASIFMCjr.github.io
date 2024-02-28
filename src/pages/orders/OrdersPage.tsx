import { bookApi } from 'entities/book'
import { orderApi } from 'entities/order'
import { fetchOrders } from 'entities/order/model/orderSlice'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'shared/model/hooks'
import { Button } from 'shared/ui'
import './index.sass'

const OrderList: React.FC<{ order: orderApi.Order }> = (order) => {
	const [bookNames, setBookNames] = useState<string[]>([])

	return (
		<div>
			{order.order.products.map((product, index) => {
				useEffect(() => {
					const initLoad = async () => {
						const book = (await bookApi.getBook(product.book_id)).title
						setBookNames((prev) => [...prev, book])
					}
					initLoad()
				}, [])
				return (
					bookNames.length && (
						<div
							key={product.id}
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
							}}
						>
							<p>{bookNames[index]}</p>
							<p> {product.price_discounted} p</p>
						</div>
					)
				)
			})}
		</div>
	)
}

export const OrdersPage = () => {
	const dispatch = useAppDispatch()
	// const [bookNames, setBookNames] = useState<string[]>()
	useEffect(() => {
		dispatch(fetchOrders())
	}, [])
	const orders = useAppSelector((state) => state.orders.orders)
	return (
		<div style={{ margin: 'auto' }}>
			<h1>Orders</h1>
			{orders?.map((order) => {
				return (
					<div className="orders-item" key={order.order_id}>
						<p>
							Order id: <b>{order.order_id}</b>
						</p>
						<p>Summary: {order.persons_discounted_price} p</p>
						<p>Status: {order.status}</p>
						<details>
							<summary>Products</summary>
							<div style={{ padding: '15px' }}>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<p>Book title</p>
									<p>Price</p>
								</div>
								<OrderList order={order} />
							</div>
						</details>
						<Button
							text="Pay"
							width="100%"
							onClick={async () => {
								try {
									await orderApi.payOrder(order.order_id)
									fetchOrders()
								} catch (err) {
									console.log(err)
									alert('Not enough money')
								}
							}}
						/>
					</div>
				)
			})}
		</div>
	)
}
