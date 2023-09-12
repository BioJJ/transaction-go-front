import { RouteObject } from 'react-router-dom'

import Dashboard from './'

export enum DashboardRoutesEnum {
	FIRST_SCREEN = '/dashboard'
}

export const dashboardRoutes: RouteObject[] = [
	{
		path: DashboardRoutesEnum.FIRST_SCREEN,
		element: <Dashboard />
	}
]
