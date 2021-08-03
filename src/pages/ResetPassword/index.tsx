import { FormEvent, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { InputPassword } from '../../components/Input/InputPassword'
import { Button } from '../../components/Button'

import { api } from '../../services/api'

import logoImg from '../../assets/images/logo.png'

import * as S from './styles'

type RouteParams = {
	email: string
}

export function ResetPassword() {
	const [password, setPassword] = useState('')
	const [password_confirmation, setPasswordConfirmation] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const history = useHistory()

	const location = useLocation()
	const { email } = location.state as RouteParams

	async function handleSendToken(event: FormEvent) {
		event.preventDefault()
		setIsLoading(true)

		try {
			await api.post('/password/reset', { 
				email,
				password,
				password_confirmation
			})

			history.push('/login')
			toast.success('Sua senha foi alterada')
		} catch (err) {
			let message = 'Algo deu errado ao tentar enviar o código.'

			if (err.response.data.message) {
				message = err.response.data.message
			}

			toast.error(message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<S.Container>
			<form onSubmit={handleSendToken}>
				<img src={logoImg} alt="Mind Education" />

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

				<Button type="submit" loading={isLoading}>
					Criar nova senha
				</Button>
			</form>
		</S.Container>
	)
}