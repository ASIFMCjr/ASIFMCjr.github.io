import React from 'react'
import './index.sass'
import { Button } from 'shared/ui'
export function Modal({ onClose }: { onClose: () => void }) {
	return (
		<div className="modal">
			<p onClick={onClose}>x</p>
			<input type="text" placeholder="city" />
			<input type="text" placeholder="address" />
			<input type="text" placeholder="zipcode" />
			<Button text="purchase" width="100%" onClick={onClose} />
		</div>
	)
}
