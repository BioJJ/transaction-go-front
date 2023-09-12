import React, { useState } from 'react'
import { Modal } from 'antd'
import logoImg from '../../assets/logo.svg'
import { useNavigate } from 'react-router-dom'

import {
	MdDashboard,
	MdArrowDownward,
	MdArrowUpward,
	MdExitToApp,
	MdClose,
	MdMenu
} from 'react-icons/md'

import {
	Container,
	Header,
	LogImg,
	Title,
	MenuContainer,
	MenuItemLink,
	MenuItemButton,
	ToggleMenu,
	ThemeToggleFooter
} from './style'
import Toggle from './../Toggle'

import { useTheme } from '../../hooks/theme'
import { logout } from '../../functions/connections/auth'

const Aside: React.FC = () => {
	const navigate = useNavigate()
	const { toggleTheme, theme } = useTheme()
	const [open, setOpen] = useState(false)

	const showModal = () => {
		setOpen(true)
	}

	const hideModal = () => {
		setOpen(false)
	}

	const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false)
	const [darkTheme, setDarkTheme] = useState(() =>
		theme.title === 'dark' ? true : false
	)

	const handleToggleMenu = () => {
		setToggleMenuIsOpened(!toggleMenuIsOpened)
	}

	const handleChangeTheme = () => {
		setDarkTheme(!darkTheme)
		toggleTheme()
	}

	return (
		<Container $menuIsOpen={toggleMenuIsOpened}>
			<Header>
				<ToggleMenu onClick={handleToggleMenu}>
					{toggleMenuIsOpened ? <MdClose /> : <MdMenu />}
				</ToggleMenu>

				<LogImg src={logoImg} alt="Transaction Management" />
				<Title>Transaction Management</Title>
			</Header>

			<MenuContainer>
				<MenuItemLink href="/dashboard">
					<MdDashboard />
					Dashboard
				</MenuItemLink>

				<MenuItemLink href="/list/transaction">
					<MdArrowUpward />
					Transactions
				</MenuItemLink>

				<MenuItemLink href="/list/transaction-type">
					<MdArrowDownward />
					Transation Type
				</MenuItemLink>

				<MenuItemButton onClick={showModal}>
					<MdExitToApp />
					Sair
				</MenuItemButton>
			</MenuContainer>

			<ThemeToggleFooter $menuIsOpen={toggleMenuIsOpened}>
				<Toggle
					labelLeft="Light"
					labelRight="Dark"
					checked={darkTheme}
					onChange={handleChangeTheme}
				/>
			</ThemeToggleFooter>

			<Modal
				title="Atenção"
				open={open}
				onOk={() => logout(navigate)}
				onCancel={hideModal}
				okText="Sim"
				cancelText="Cancelar"
			>
				<p data-testid={'HEADER_MODAL_P'}>Tem certeza que deseja sair?</p>
			</Modal>
		</Container>
	)
}

export default Aside
