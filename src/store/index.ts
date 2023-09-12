import { configureStore } from '@reduxjs/toolkit'

import globalReducer from './reducers/globalReducer'

import userReducer from './reducers/userReducer'

import transactionReducer from './reducers/transactionReducer'

export const store = configureStore({
	reducer: {
		globalReducer,
		userReducer,
		transactionReducer
	}
})

export type RootState = ReturnType<typeof store.getState>

export default store
