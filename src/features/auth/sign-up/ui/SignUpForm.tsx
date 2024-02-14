import React from 'react'
import { useAppDispatch } from 'shared/model/hooks'
import { FieldValues, useForm } from 'react-hook-form'
import { setUser } from '../model/slice'
import { checkAvailableEmail, signUp } from '../api'
import { Form, type FormValues } from 'entities/form'
import { useNavigate } from 'react-router-dom'
import { createTokens } from 'shared/api'

export const SignUpForm = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const {
		formState: { errors },
		setError,
		clearErrors,
	} = useForm<FormValues>()

	const onSubmit = async ({ email, password }: FieldValues): Promise<void> => {
		try {
			const is_available: boolean = await checkAvailableEmail(email)

			if (!is_available) {
				setError('email', { type: 'exists', message: 'User already exists' })
				return
			}
			await signUp(email, password)
			await createTokens(email, password)
			dispatch(setUser({ email, password }))
			clearErrors('email')
			navigate('../books')
		} catch (err: any) {
			setError('email', {
				type: 'internet',
				message: err.response.data.email
					? err.response.data.email
					: `${err.response.statusText}. Please try later`,
			})
			setTimeout(() => clearErrors('email'), 2000)
		}
	}

	return <Form onSubmit={onSubmit} apiErrors={errors} />
}
