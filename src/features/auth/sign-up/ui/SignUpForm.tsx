import React from 'react'
import { useAppDispatch } from 'shared/model/hooks'
import { fetchUser } from '../model/slice'
import { FieldValues, useForm } from 'react-hook-form'

export const Form = () => {
  const dispatch = useAppDispatch()
  type FormValues = {
    email: string,
    password: string
  }
  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormValues>()
  const onSubmit = async ({email, password}: FieldValues) => { 
    const res = await dispatch(fetchUser({email, password}))
    if (Object.prototype.hasOwnProperty.call(res.payload, 'is_available')) setError('email', { type: 'exists', message: 'User already exists' })
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
      {errors.email && errors.email.type === "exists" && (<p>Already exists</p>)}
        {errors.email && errors.email.type === "required" && (
          <span>This is required</span>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <span>not an email</span>
        )}

      <label htmlFor="password">password</label>
      <input
        id="password"
        {...register("password", { required: true})}
      />
        {errors.password && errors.password.type === "required" && (
          <span>This is required</span>
        )}
      <input type="submit" />
    </form>
  )
}