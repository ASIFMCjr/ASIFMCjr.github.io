import { LoginForm } from 'features/auth/login'
import { SignUpForm } from 'features/auth/sign-up'
import React, { useState } from 'react'
import './index.sass'

export const AuthPage = () => {
  const [is_authenticated, setIsAuthenticated] = useState<boolean>(false)
  return (
    <div className='auth'>
      <div className="auth-check">
        <label htmlFor="toggle-button">Are you signed up?</label>
        <input type="checkbox" id="toggle-button" checked={is_authenticated} onChange={e => setIsAuthenticated(e.target.checked)} className="toggle-button"/>
      </div>
      { is_authenticated ?
        <LoginForm/> :
        <SignUpForm/>
      }
    </div>
  )
}

