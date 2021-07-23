import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import toast from 'react-hot-toast'

import { Input } from '../../components/Input'
import { InputPassword } from '../../components/Input/InputPassword'
import { Button } from '../../components/Button'

import { useAuth } from '../../hooks/useAuth'

import logoImg from '../../assets/images/logo.png'

import * as S from './styles'

export function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { signIn } = useAuth()

	const history = useHistory()

	async function handleLogin(event: FormEvent) {
		event.preventDefault()

		try {
			await signIn({
				email,
				password
			})

			history.push('/')
		} catch(err) {
			toast.error(err.response?.data.message)
		}
	}

	return (
		<S.Container>
			<form onSubmit={handleLogin}>
				<img src={logoImg} alt="Mind Education" />

				<Input
					name="email"
					placeholder="Login"
					value={email}
					onChange={event => setEmail(event.target.value)}
				/>
				<InputPassword
					name="password"
					placeholder="Senha"
					value={password}
					onChange={event => setPassword(event.target.value)}
				/>

				<Link to="/forgot-password">Esqueci minha senha</Link>

				<Button type="submit">Login</Button>

				<p>
					Não tem conta?{' '}
					<Link to="/register">Registrar</Link>
				</p>
			</form>
		</S.Container>
	)
}