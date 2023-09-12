import { RouteObject } from 'react-router-dom'

import SignIn from './'

export enum LoginRoutesEnum {
	LOGIN = '/'
}

export const loginRoutes: RouteObject[] = [
	{
		path: LoginRoutesEnum.LOGIN,
		element: <SignIn />
	}
]
