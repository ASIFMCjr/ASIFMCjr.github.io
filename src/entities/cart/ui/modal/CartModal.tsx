import React from 'react'
import './index.sass'
import { Button } from 'shared/ui'
import close from 'assets/close.svg'
import { SubmitHandler, useForm } from 'react-hook-form'
import { checkValidZipcode, makeOrder } from 'entities/cart/api/cartApi'
import { useAppDispatch } from 'shared/model/hooks'
import { fetchCartList } from 'entities/cart/model/cartSlice'
export function Modal({ onClose }: { onClose: () => void }) {
	interface Inputs {
		city: string
		address: string
		zipcode: string
	}
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<Inputs>()

	const dispatch = useAppDispatch()

	const onSubmit: SubmitHandler<Inputs> = async ({
		city,
		address,
		zipcode,
	}) => {
		try {
			const validZip = await checkValidZipcode(zipcode)
			const order = await makeOrder({ city, address, zipcode })
			if (!validZip) {
				setError('zipcode', { type: 'invalid', message: 'Invalid zipcode' })
				return
			}
			if (order) {
				console.log('Order is ready')
				dispatch(fetchCartList())
				onClose()
				return
			}
			console.log('Order refused')
			setError('zipcode', {
				type: 'internet',
				message: 'Something went wrong, try later',
			})
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="modal-cover">
			<div className="modal">
				<button onClick={onClose} className="modal-btn">
					<img src={close} alt="" />
				</button>
				<input
					{...register('city', { required: true })}
					className="modal-input"
					type="text"
					placeholder="city"
				/>
				{errors.city && (
					<div className="modal-input__error">{errors.city.message}</div>
				)}
				<input
					{...register('address', { required: true })}
					className="modal-input"
					type="text"
					placeholder="address"
				/>

				{errors.address && (
					<div className="modal-input__error">{errors.address.message}</div>
				)}
				<input
					{...register('zipcode', { required: true })}
					className="modal-input"
					type="text"
					placeholder="zipcode"
				/>

				{errors.zipcode && (
					<div className="modal-input__error">{errors.zipcode.message}</div>
				)}
				<Button text="purchase" width="100%" submit />
			</div>
		</form>
	)
}
