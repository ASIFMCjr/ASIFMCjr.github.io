import React from 'react'
import { login } from '../api'
import { FieldValues, useForm } from 'react-hook-form'
import { AxiosError } from 'axios'

export const Form = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm()
  const onSubmit = async ({email, password}: FieldValues) => {
      const tryAuth = await login(email, password)
      if (tryAuth instanceof AxiosError && tryAuth?.response?.status === 401) {
        setError('email', { type: 'wrong', message: 'Wrong data' })
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
      {errors.email && errors.email.type === "wrong" && (
          <span>Wrong user data</span>
        )}
        {errors.email && errors.email.type === "required" && (
          <span>This is required</span>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <span>not an email</span>
        )}

      <label htmlFor="password">password</label>
      <input
        id="password"
        {...register("password", { required: true })}
      />
        {errors.password && errors.password.type === "required" && (
          <span>This is required</span>
        )}
      <input type="submit" />
    </form>
  )
}

