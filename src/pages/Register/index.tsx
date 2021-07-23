import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { InputPassword } from '../../components/Input/InputPassword'

import { api } from '../../services/api'

import * as S from './styles'

export function Register() {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [password_confirmation, setPasswordConfirmation] = useState('')

	const history = useHistory()

	async function handleRegister(event: FormEvent) {
		event.preventDefault()

		try {
			await api.post('/users/personal', {
				name,
				phone,
				email,
				password,
				password_confirmation
			})

			toast.success('Cadastro salvo')
			history.push('/login')
		} catch (err) {
			toast.error(err.response?.data.message)
		}
	}

	return (
		<S.Container>
			<form onSubmit={handleRegister}>
				<Input
					type="text"
					name="name"
					placeholder="Nome do usuário"
					value={name}
					onChange={event => setName(event.target.value)}
				/>
				<Input
					type="tel"
					name="phone"
					placeholder="Telefone"
					value={phone}
					onChange={event => setPhone(event.target.value)}
				/>
				<Input
					type="email"
					name="email"
					placeholder="E-mail"
					value={email}
					onChange={event => setEmail(event.target.value)}
				/>
				<InputPassword
					name="password"
					placeholder="Senha"
					value={password}
					onChange={event => setPassword(event.target.value)}
				/>
				<InputPassword
					name="password_confirmation"
					placeholder="Confirmar senha"
					value={password_confirmation}
					onChange={event => setPasswordConfirmation(event.target.value)}
				/>

				<Button type="submit">Cadastrar</Button>

				<p>
					Já tem conta?{' '}
					<Link to="/login">Login</Link>
				</p>
			</form>
		</S.Container>
	)
}