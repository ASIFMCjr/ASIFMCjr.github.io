import React from 'react'
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form'
import './index.sass'
import { Button } from 'shared/ui/'

export type FormValues = {
    email: string,
    password: string
  }

type FormProps = {
    onSubmit: SubmitHandler<FormValues>,
    apiErrors: FieldErrors<FormValues>
}
export const Form: React.FC<FormProps> = ({ onSubmit, apiErrors }) => {

  const { handleSubmit, register, formState: { errors } } = useForm<FormValues>()
    
  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <input
      className='form-input'
      placeholder='email'
        id="email"
        {...register("email", {
          required: "Fill all fields",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format",
          },
        })}
        type="email"
      />
      {apiErrors.email && <p>{apiErrors.email.message}</p>}
        {errors.email && 
        <p className='error'>{errors.email.message}</p>}
      
      <input
      className='form-input mt'
      placeholder='password'
        id="password"
        {...register("password", { required: "Fill all fields"})}
      />
        
        {errors.password?.type === 'required' && <p className='error'>{errors.password?.message}</p>}
      {/* <input type="submit" className='mt form-btn'/> */}
      <Button submit text="submit"/>
    </form>
  )
}
