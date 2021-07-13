import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

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
				<Input
					type={showPassword ? 'text' : 'password'}
					name="password"
					placeholder="Senha"
					value={password}
					onChange={event => setPassword(event.target.value)}
				>
					<button
						type="button"
						onClick={() => setShowPassword(state => !state)}
					>
						{showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
					</button>
				</Input>
				<Input
					type={showPasswordConfirmation ? 'text' : 'password'}
					name="password_confirmation"
					placeholder="Confirmar senha"
					value={passwordConfirmation}
					onChange={event => setPasswordConfirmation(event.target.value)}
				>
					<button
						type="button"
						onClick={() => setShowPasswordConfirmation(state => !state)}
					>
						{showPasswordConfirmation ? <AiFillEyeInvisible /> : <AiFillEye />}
					</button>
				</Input>

				<Button type="submit">Cadastrar</Button>

				<p>
					Já tem conta?{' '}
					<a href="/">Login</a>
				</p>
			</form>
		</S.Container>
	)
}