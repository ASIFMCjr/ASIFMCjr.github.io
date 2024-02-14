import React from 'react'
import { login } from '../api'
import { FieldValues, useForm } from 'react-hook-form'
import { AxiosError } from 'axios'
import { Form, FormValues } from 'entities/form'
import { useNavigate } from 'react-router-dom'

export const LoginForm = () => {
	const navigate = useNavigate()
	const {
		formState: { errors },
		setError,
		clearErrors,
	} = useForm<FormValues>()

	const onSubmit = async ({ email, password }: FieldValues): Promise<void> => {
		try {
			await login(email, password)
			navigate('../books')
		} catch (err: any) {
			if (err instanceof AxiosError && err?.response?.status === 401) {
				setError('email', { type: 'wrong', message: 'Wrong data' })
			}
			setError('email', {
				type: 'internet',
				message: `${err.response.statusText}. Please, try later`,
			})
			setTimeout(() => clearErrors('email'), 2000)
		}
	}

	return <Form onSubmit={onSubmit} apiErrors={errors} />
}
