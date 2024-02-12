import React from 'react'
import './index.sass'

type ButtonProps = {
    text: string,
    submit?: boolean,
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const Button: React.FC<ButtonProps> = ({text, submit, onClick}) => {
  return (
    <button onClick={onClick} type={submit ? 'submit' : 'button'} className='btn'>{text}</button>
  )
}
