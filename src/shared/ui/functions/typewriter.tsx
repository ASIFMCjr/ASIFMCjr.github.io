import React, { useState, useEffect } from 'react'

export const TypeWriter: React.FC<{ text: string; delay?: number }> = ({
	text,
	delay = 50,
}) => {
	const [currentText, setCurrentText] = useState<string>('')
	const [currentIndex, setCurrentIndex] = useState<number>(0)

	useEffect(() => {
		if (currentIndex < text.length) {
			const timeout = setTimeout(() => {
				setCurrentText((prevText) => prevText + text[currentIndex])
				setCurrentIndex((prevIndex) => prevIndex + 1)
			}, delay)

			return () => clearTimeout(timeout)
		}
	}, [currentIndex, delay, text])

	return <span>{currentText}</span>
}
