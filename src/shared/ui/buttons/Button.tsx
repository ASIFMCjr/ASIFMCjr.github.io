import React from 'react'
import './index.sass'

type ButtonProps = {
	text: string
	submit?: boolean
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	disabled?: boolean
	width?: string
}

export const Button: React.FC<ButtonProps> = ({
	text,
	submit,
	onClick,
	disabled = false,
	width,
}) => {
	return (
		<div>
			{submit ? (
				<input
					type="submit"
					className="btn"
					value={text}
					style={width ? { width: width } : {}}
				/>
			) : (
				<button
					disabled={disabled}
					onClick={onClick}
					className={`btn ${disabled && 'disabled'}`}
					style={width ? { width: width } : {}}
				>
					{text}
				</button>
			)}
		</div>
	)
}
