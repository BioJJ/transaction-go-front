import { useDispatch } from 'react-redux'

import { UserType } from '../../../types/UserType'
import { useAppSelector } from '../../hooks'
import { setUsersAction } from '.'

export const useUserReducer = () => {
	const dispatch = useDispatch()
	const { users } = useAppSelector((state) => state.userReducer)

	const setUsers = (users: UserType[]) => {
		dispatch(setUsersAction(users))
	}

	return {
		users,
		setUsers
	}
}
