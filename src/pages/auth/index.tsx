import { LoginForm } from 'features/auth/login'
import { SignUpForm } from 'features/auth/sign-up'
import React from 'react'

export const AuthPage = () => {
  return (
    <div>
      <SignUpForm/>
      <LoginForm/>
    </div>
  )
}

