import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { useRequests } from '../../hooks/auth'

import {
	Container,
	Logo,
	Form,
	FormTitle,
	FormRegister,
	MaskInput
} from './style'

const SignIn: React.FC = () => {
	const navigate = useNavigate()
	const [name, setName] = useState<string>('')
	const [phone, setPhone] = useState<string>('')
	const [dateBirth, setDateBirth] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const [register, setRegister] = useState<boolean>(false)

	const { authRequest, newUserRequest, loading } = useRequests()

	const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value)
	}

	const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPhone(event.target.value)
	}

	const handleDateBirth = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDateBirth(event.target.value)
	}
	const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value)
	}

	const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value)
	}

	const handleLogin = () => {
		authRequest(navigate, {
			email,
			password
		})
	}

	const handleNewUser = () => {
		newUserRequest(navigate, {
			name,
			email,
			password,
			phone,
			dateBirth
		})

		setTimeout(toggleRegister, 3000)
	}

	const toggleRegister = () => {
		setRegister(!register)
	}

	return (
		<Container>
			<Logo>
				<img src={logoImg} alt="Transaction Go" />
				<h2>Transaction Go</h2>
			</Logo>

			{register ? (
				<FormRegister>
					<FormTitle>Cadastrar</FormTitle>

					<Input
						type="text"
						placeholder="Name"
						required
						onChange={handleName}
					/>

					<Input
						type="email"
						placeholder="e-mail"
						required
						onChange={handleEmail}
					/>
					<MaskInput
						mask="(99) 9999-9999"
						type="text"
						placeholder="phone"
						required
						onChange={handlePhone}
					/>

					<MaskInput
						mask="99/99/9999"
						type="text"
						placeholder="Date Birth"
						required
						onChange={handleDateBirth}
					/>

					<Input
						type="password"
						placeholder="senha"
						required
						onChange={handlePassword}
					/>

					<Button
						loading={loading}
						type="primary"
						margin="10px 0px 10px 0px"
						onClick={handleNewUser}
					>
						Cadastrar
					</Button>

					<Button
						type="link"
						margin="10px 0px 16px 0px"
						onClick={toggleRegister}
					>
						Cancelar
					</Button>
				</FormRegister>
			) : (
				<Form>
					<FormTitle>Entrar</FormTitle>

					<Input
						type="email"
						placeholder="e-mail"
						required
						onChange={handleEmail}
					/>
					<Input
						type="password"
						placeholder="senha"
						required
						onChange={handlePassword}
					/>

					<Button
						loading={loading}
						type="primary"
						margin="10px 0px 10px 0px"
						onClick={handleLogin}
					>
						Acessar
					</Button>

					<Button
						type="link"
						margin="10px 0px 16px 0px"
						onClick={toggleRegister}
					>
						Cadastrar
					</Button>
				</Form>
			)}
		</Container>
	)
}

export default SignIn
