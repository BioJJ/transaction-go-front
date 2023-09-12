import React, { useCallback, useMemo, useState } from 'react'
import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'

import listOfMonths from '../../utils/months'

import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'
import grinningImg from '../../assets/grinning.svg'
import opsImg from '../../assets/ops.svg'

import { Container, Content } from './style'
import WalletBox from '../../components/WalletBox'
import MessageBox from '../../components/MessageBox'
import PieChartBox from '../../components/PieChartBox'
import HistoryBox from '../../components/HistoryBox'
import BarChartBox from '../../components/BarChartBox'
import Layout from '../../components/Layout'

import { Transaction } from '../../types/Transaction'

const Dashboard: React.FC = () => {
	const [transactionFiltered] = useState<Transaction[]>([])
	const [monthSelected, setMonthSelected] = useState<number>(
		new Date().getMonth() + 1
	)
	const [yearSelected, setYearSelected] = useState<number>(
		new Date().getFullYear()
	)

	const years = useMemo(() => {
		const uniqueYears: number[] = []

		transactionFiltered.forEach((item) => {
			const date = new Date(item.data)
			const year = date.getFullYear()

			if (!uniqueYears.includes(year)) {
				uniqueYears.push(year)
			}
		})

		return uniqueYears.map((year) => {
			return {
				value: year,
				label: year
			}
		})
	}, [transactionFiltered])

	const months = useMemo(() => {
		return listOfMonths.map((month, index) => {
			return {
				value: index + 1,
				label: month
			}
		})
	}, [])

	const totalExpenses = useMemo(() => {
		let total: number = 0

		transactionFiltered.forEach((item) => {
			const date = new Date(item.data)
			const year = date.getFullYear()
			const month = date.getMonth() + 1

			if (
				month === monthSelected &&
				year === yearSelected &&
				item.transactionType.nature === 'Saída'
			) {
				try {
					total += Number(item.value)
				} catch {
					throw new Error('Invalid amount! Amount must be number.')
				}
			}
		})

		return total
	}, [monthSelected, yearSelected])

	const totalGains = useMemo(() => {
		let total: number = 0

		transactionFiltered.forEach((item) => {
			const date = new Date(item.data)
			const year = date.getFullYear()
			const month = date.getMonth() + 1

			if (
				month === monthSelected &&
				year === yearSelected &&
				item.transactionType.nature === 'Entrada'
			) {
				try {
					total += Number(item.value)
				} catch {
					throw new Error('Invalid amount! Amount must be number.')
				}
			}
		})

		return total
	}, [monthSelected, yearSelected])

	const totalBalance = useMemo(() => {
		return totalGains - totalExpenses
	}, [totalGains, totalExpenses])

	const message = useMemo(() => {
		if (totalBalance < 0) {
			return {
				title: 'Que triste!',
				description: 'Neste mês, você gastou mais do que deveria.',
				footerText:
					'Verifique seus gastos e tente cortar algumas coisas desnecessárias.',
				icon: sadImg
			}
		} else if (totalGains === 0 && totalExpenses === 0) {
			return {
				title: "Op's!",
				description: 'Neste mês, não há registros de entradas ou saídas.',
				footerText:
					'Parece que você não fez nenhum registro no mês e ano selecionado.',
				icon: opsImg
			}
		} else if (totalBalance === 0) {
			return {
				title: 'Ufaa!',
				description: 'Neste mês, você gastou exatamente o que ganhou.',
				footerText: 'Tenha cuidado. No próximo tente poupar o seu dinheiro.',
				icon: grinningImg
			}
		} else {
			return {
				title: 'Muito bem!',
				description: 'Sua carteira está positiva!',
				footerText: 'Continue assim. Considere investir o seu saldo.',
				icon: happyImg
			}
		}
	}, [totalBalance, totalGains, totalExpenses])

	const relationExpensesVersusGains = useMemo(() => {
		const total = totalGains + totalExpenses

		const percentGains = Number(((totalGains / total) * 100).toFixed(1))
		const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1))

		const data = [
			{
				name: 'Entradas',
				value: totalGains,
				percent: percentGains ? percentGains : 0,
				color: '#E44C4E'
			},
			{
				name: 'Saídas',
				value: totalExpenses,
				percent: percentExpenses ? percentExpenses : 0,
				color: '#F7931B'
			}
		]

		return data
	}, [totalGains, totalExpenses])

	const historyData = useMemo(() => {
		return listOfMonths
			.map((_, month) => {
				let amountEntry = 0
				transactionFiltered.forEach((gain) => {
					const date = new Date(gain.data)
					const gainMonth = date.getMonth()
					const gainYear = date.getFullYear()

					if (gainMonth === month && gainYear === yearSelected) {
						try {
							amountEntry += Number(gain.value)
						} catch {
							throw new Error(
								'amountEntry is invalid. amountEntry must be valid number.'
							)
						}
					}
				})

				let amountOutput = 0
				transactionFiltered.forEach((expense) => {
					const date = new Date(expense.data)
					const expenseMonth = date.getMonth()
					const expenseYear = date.getFullYear()

					if (expenseMonth === month && expenseYear === yearSelected) {
						try {
							amountOutput += Number(expense.value)
						} catch {
							throw new Error(
								'amountOutput is invalid. amountOutput must be valid number.'
							)
						}
					}
				})

				return {
					monthNumber: month,
					month: listOfMonths[month].substr(0, 3),
					amountEntry,
					amountOutput
				}
			})
			.filter((item) => {
				const currentMonth = new Date().getMonth()
				const currentYear = new Date().getFullYear()
				return (
					(yearSelected === currentYear && item.monthNumber <= currentMonth) ||
					yearSelected < currentYear
				)
			})
	}, [yearSelected])

	const relationExpensevesRecurrentVersusEventual = useMemo(() => {
		let amountRecurrent = 0
		let amountEventual = 0

		transactionFiltered
			.filter((expense) => {
				const date = new Date(expense.data)
				const year = date.getFullYear()
				const month = date.getMonth() + 1

				return month === monthSelected && year === yearSelected
			})
			.forEach((expense) => {
				if (expense.transactionType.signal === '+') {
					return (amountRecurrent += Number(expense.value))
				}

				if (expense.transactionType.signal === '-') {
					return (amountEventual += Number(expense.value))
				}
			})

		const total = amountRecurrent + amountEventual

		const percentRecurrent = Number(
			((amountRecurrent / total) * 100).toFixed(1)
		)
		const percentEventual = Number(((amountEventual / total) * 100).toFixed(1))

		return [
			{
				name: 'Recorrentes',
				amount: amountRecurrent,
				percent: percentRecurrent ? percentRecurrent : 0,
				color: '#F7931B'
			},
			{
				name: 'Eventuais',
				amount: amountEventual,
				percent: percentEventual ? percentEventual : 0,
				color: '#E44C4E'
			}
		]
	}, [monthSelected, yearSelected])

	const relationGainsRecurrentVersusEventual = useMemo(() => {
		let amountRecurrent = 0
		let amountEventual = 0

		transactionFiltered
			.filter((gain) => {
				const date = new Date(gain.data)
				const year = date.getFullYear()
				const month = date.getMonth() + 1

				return month === monthSelected && year === yearSelected
			})
			.forEach((gain) => {
				if (gain.transactionType.signal === '+') {
					return (amountRecurrent += Number(gain.value))
				}

				if (gain.transactionType.signal === '-') {
					return (amountEventual += Number(gain.value))
				}
			})

		const total = amountRecurrent + amountEventual

		const percentRecurrent = Number(
			((amountRecurrent / total) * 100).toFixed(1)
		)
		const percentEventual = Number(((amountEventual / total) * 100).toFixed(1))

		return [
			{
				name: 'Recorrentes',
				amount: amountRecurrent,
				percent: percentRecurrent ? percentRecurrent : 0,
				color: '#F7931B'
			},
			{
				name: 'Eventuais',
				amount: amountEventual,
				percent: percentEventual ? percentEventual : 0,
				color: '#E44C4E'
			}
		]
	}, [monthSelected, yearSelected])

	const handleMonthSelected = useCallback((month: string) => {
		try {
			const parseMonth = Number(month)
			setMonthSelected(parseMonth)
		} catch {
			throw new Error('invalid month value. Is accept 0 - 24.')
		}
	}, [])

	const handleYearSelected = useCallback((year: string) => {
		try {
			const parseYear = Number(year)
			setYearSelected(parseYear)
		} catch {
			throw new Error('invalid year value. Is accept integer numbers.')
		}
	}, [])

	return (
		<Layout>
			<Container>
				<ContentHeader title="Dashboard" lineColor="#F7931B">
					<SelectInput
						options={months}
						onChange={(e) => handleMonthSelected(e.target.value)}
						defaultValue={monthSelected}
					/>
					<SelectInput
						options={years}
						onChange={(e) => handleYearSelected(e.target.value)}
						defaultValue={yearSelected}
					/>
				</ContentHeader>

				<Content>
					<WalletBox
						title="saldo"
						color="#4E41F0"
						amount={totalBalance}
						footerlabel="atualizado com base nas entradas e saídas"
						icon="dolar"
					/>

					<WalletBox
						title="entradas"
						color="#F7931B"
						amount={totalGains}
						footerlabel="atualizado com base nas entradas e saídas"
						icon="arrowUp"
					/>

					<WalletBox
						title="saídas"
						color="#E44C4E"
						amount={totalExpenses}
						footerlabel="atualizado com base nas entradas e saídas"
						icon="arrowDown"
					/>

					<MessageBox
						title={message.title}
						description={message.description}
						footerText={message.footerText}
						icon={message.icon}
					/>

					<PieChartBox data={relationExpensesVersusGains} />

					<HistoryBox
						data={historyData}
						lineColorAmountEntry="#F7931B"
						lineColorAmountOutput="#E44C4E"
					/>

					<BarChartBox
						title="Saídas"
						data={relationExpensevesRecurrentVersusEventual}
					/>

					<BarChartBox
						title="Entradas"
						data={relationGainsRecurrentVersusEventual}
					/>
				</Content>
			</Container>
		</Layout>
	)
}

export default Dashboard
