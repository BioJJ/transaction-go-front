import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

import App from './app.routes'
import Auth from './auth.routes'

const Routes: React.FC = () => {
	const isLogged = useSelector(
		(rootState: RootState) => !!rootState.globalReducer.user?.id
	)

	return <BrowserRouter>{isLogged ? <App /> : <Auth />}</BrowserRouter>
}

export default Routes
