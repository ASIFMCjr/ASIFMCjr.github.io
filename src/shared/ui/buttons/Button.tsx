import React from 'react'
import './index.sass'

type ButtonProps = {
	text: string
	submit?: boolean
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const Button: React.FC<ButtonProps> = ({ text, submit, onClick }) => {
	return (
		<div>
			{submit ? (
				<input type="submit" className="btn" value={text} />
			) : (
				<button onClick={onClick} className="btn">
					{text}
				</button>
			)}
		</div>
	)
}
