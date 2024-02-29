import React from 'react'
import './index.sass'

type CounterProps = {
	amount: number
	// eslint-disable-next-line no-unused-vars
	handleAmount: (param: string, value?: number) => void
	max: number
	isDisabled: boolean
}

export const Counter: React.FC<CounterProps> = ({
	amount,
	handleAmount,
	max,
	isDisabled,
}) => {
	return (
		<div className="counter">
			<button
				className="counter-btns"
				onClick={() => handleAmount('sub')}
				disabled={isDisabled}
			>
				-
			</button>
			<input
				className="counter-input"
				type="number"
				name=""
				id=""
				min={0}
				max={max}
				value={amount}
				onChange={(e) => handleAmount('', Number(e.target.value))}
			/>
			<button
				className="counter-btns"
				onClick={() => handleAmount('add')}
				disabled={isDisabled}
			>
				+
			</button>
		</div>
	)
}
