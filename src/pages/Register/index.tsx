import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link } from 'react-router-dom'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { InputPassword } from '../../components/Input/InputPassword'

import * as S from './styles'

export function Register() {
	const [username, setUsername] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirmation, setPasswordConfirmation] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

	return (
		<S.Container>
			<form>
				<Input
					type="text"
					name="username"
					placeholder="Usuário"
					value={username}
					onChange={event => setUsername(event.target.value)}
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
					value={passwordConfirmation}
					onChange={event => setPasswordConfirmation(event.target.value)}
				/>

				<Button type="submit">Cadastrar</Button>

				<p>
					Já tem conta?{' '}
					<Link to="/">Login</Link>
				</p>
			</form>
		</S.Container>
	)
}