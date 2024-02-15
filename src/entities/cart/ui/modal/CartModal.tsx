import React from 'react'
import './index.sass'
import { Button } from 'shared/ui'
import close from 'assets/close.svg'
export function Modal({ onClose }: { onClose: () => void }) {
	return (
		<div className="modal">
			<button onClick={onClose}>
				<img src={close} alt="" />
			</button>
			<input type="text" placeholder="city" />
			<input type="text" placeholder="address" />
			<input type="text" placeholder="zipcode" />
			<Button text="purchase" width="100%" onClick={onClose} />
		</div>
	)
}
