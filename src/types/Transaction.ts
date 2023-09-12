import { TransactionType } from './TransactionType'

export interface Transaction {
	id: number

	data: Date

	description: string

	value: number

	seller: string

	transactionType: TransactionType
}
