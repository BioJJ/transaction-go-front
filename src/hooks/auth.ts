import { useState } from 'react'
import { NavigateFunction } from 'react-router-dom'

import { DashboardRoutesEnum } from '../routes/app.routes'
import { AuthType } from '../types/AuthType'
import { useGlobalReducer } from '../store/reducers/globalReducer/useGlobalReducer'
import {
	ERROR_INVALID_PASSWORD,
	ERROR_USER_CREATE
} from '../constants/errorStatus'
import { URL_AUTH, URL_USER_CREATE } from '../constants/urls'
import { setAuthorizationToken } from '../functions/connections/auth'
import ConnectionAPI, {
	connectionAPIPost,
	MethodType
} from '../functions/connections/connectionsAPI'
import { User } from '../types/User'
import { LoginRoutesEnum } from '../routes/auth.routes'

export const useRequests = () => {
	const [loading, setLoading] = useState(false)
	const { setNotification, setUser } = useGlobalReducer()

	const request = async <T>(
		url: string,
		method: MethodType,
		saveGlobal?: (object: T) => void,
		body?: unknown,
		message?: string
	): Promise<T | undefined> => {
		setLoading(true)

		const returnObject: T | undefined = await ConnectionAPI.connect<T>(
			url,
			method,
			body
		)
			.then((result) => {
				if (saveGlobal) {
					saveGlobal(result)
				}
				if (message) {
					setNotification('Sucesso!', 'success', message)
				}
				return result
			})
			.catch((error: Error) => {
				setNotification(error.message, 'error')
				return undefined
			})

		setLoading(false)

		return returnObject
	}

	const authRequest = async (
		navigate: NavigateFunction,
		body: unknown
	): Promise<void> => {
		setLoading(true)

		await connectionAPIPost<AuthType>(URL_AUTH, body)
			.then((result) => {
				setUser({
					id: result.id,
					email: result.email,
					name: result.name
				})

				setAuthorizationToken(result.token)
				navigate(DashboardRoutesEnum.FIRST_SCREEN)
				return result
			})
			.catch(() => {
				setNotification(ERROR_INVALID_PASSWORD, 'error')
				return undefined
			})

		setLoading(false)
	}

	const newUserRequest = async (
		navigate: NavigateFunction,
		body: unknown
	): Promise<void> => {
		setLoading(true)

		await connectionAPIPost<User>(URL_USER_CREATE, body)
			.then(() => {
				setNotification(
					'Cadastro Realizado com sucesso!',
					'success',
					'realize o login!!'
				)
				navigate(LoginRoutesEnum.LOGIN)
			})
			.catch(() => {
				setNotification(ERROR_USER_CREATE, 'error')
			})

		setLoading(false)
	}

	return {
		loading,
		authRequest,
		newUserRequest,
		request
	}
}
