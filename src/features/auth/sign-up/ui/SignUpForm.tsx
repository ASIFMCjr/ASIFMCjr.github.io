import React from 'react'
import { useAppDispatch } from 'shared/model/hooks'
import { FieldValues, useForm } from 'react-hook-form'
import { setUser } from '../model/slice'
import { checkAvailableEmail, signUp } from '../api'

export const Form = () => {
  const dispatch = useAppDispatch()

  type FormValues = {
    email: string,
    password: string
  }

  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormValues>()

  const onSubmit = async ({email, password}: FieldValues): Promise<void> => {
    try {
      const is_available: boolean = await checkAvailableEmail(email)
      if (!is_available) {
        setError('email', { type: 'exists', message: 'User already exists' })
        return
      }
      await signUp(email, password)
      dispatch(setUser({email, password}))
    } catch (err) {
      setError('email', { type: 'internet', message: 'Something went wrong. Try later' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">email</label>
      <input
        id="email"
        {...register("email", {
          required: "required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format",
          },
        })}
        type="email"
      />
      {errors.email && 
        <p>{errors.email.message}</p>}
      <label htmlFor="password">password</label>
      <input
        id="password"
        {...register("password", { required: true})}
      />
        {errors.password && 
        <p>{errors.password.message}</p>}
      <input type="submit" />
    </form>
  )
}