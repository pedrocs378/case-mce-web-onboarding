import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import toast from 'react-hot-toast'

import { Input } from '../../components/Input'
import { InputPassword } from '../../components/Input/InputPassword'
import { Button } from '../../components/Button'

import logoImg from '../../assets/images/logo.png'

import * as S from './styles'

export function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const history = useHistory()

	function handleLogin(event: FormEvent) {
		event.preventDefault()

		toast.error('Teste')
		history.push('/')
	}

	return (
		<S.Container>
			<form onSubmit={handleLogin}>
				<img src={logoImg} alt="Mind Education" />

				<Input
					name="username"
					placeholder="Login"
					value={username}
					onChange={event => setUsername(event.target.value)}
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