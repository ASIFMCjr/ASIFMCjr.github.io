import React from 'react';
export const Counter: React.FC<{
	amount: number;
	setAmount: React.Dispatch<React.SetStateAction<number>>;
}> = ({ amount, setAmount }) => {
	return (
		<div>
			<button
				onClick={() => {
					setAmount((prev) => (prev || 0) - 1);
				}}
			>
				-
			</button>
			<input
				type="number"
				name=""
				id=""
				min={0}
				value={amount}
				onChange={(e) => {
					setAmount(Number(e.target.value));
				}}
			/>
			<button
				onClick={() => {
					setAmount((prev) => (prev || 0) + 1);
				}}
			>
				+
			</button>
		</div>
	);
};
