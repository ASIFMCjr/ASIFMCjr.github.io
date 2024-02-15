import React from 'react'
import './index.sass'

type CounterProps = {
	amount: number
	handleAmount: (param: string, value?: number) => void
	max: number
}

export const Counter: React.FC<CounterProps> = ({
	amount,
	handleAmount,
	max,
}) => {
	return (
		<div className="counter">
			<button className="counter-btns" onClick={() => handleAmount('sub')}>
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
			<button className="counter-btns" onClick={() => handleAmount('add')}>
				+
			</button>
		</div>
	)
}
