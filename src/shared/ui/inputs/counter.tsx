import React from 'react'
import './index.sass'
export const Counter: React.FC<{
	amount: number
	setAmount: React.Dispatch<React.SetStateAction<number>>
	max: number
}> = ({ amount, setAmount, max }) => {
	return (
		<div className="counter">
			<button
				className="counter-btns"
				onClick={() => {
					setAmount((prev) => (0 < prev ? prev - 1 : 0))
				}}
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
				onChange={(e) => {
					const numE = Number(e.target.value)
					setAmount(numE <= 0 ? 0 : numE >= max ? max : numE)
				}}
			/>
			<button
				className="counter-btns"
				onClick={() => {
					setAmount((prev) => (max > prev ? (prev || 0) + 1 : prev))
				}}
			>
				+
			</button>
		</div>
	)
}
