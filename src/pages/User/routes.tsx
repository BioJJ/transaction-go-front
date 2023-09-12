import { RouteObject } from 'react-router-dom'

import List from './'

export enum UserRoutesEnum {
	LIST = '/list/user',
	USER_LIST = '/user',
	USER_INSERT = '/user/parse-create',
	USER_EDIT = '/user/:userId'
}

export const listUser: RouteObject[] = [
	{
		path: UserRoutesEnum.LIST,
		element: <List />
	}
]
