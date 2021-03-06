import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { api } from '../../services/api'

import logoImg from '../../assets/images/logo.png'

import * as S from './styles'

export function ForgotPassword() {
	const [email, setEmail] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const history = useHistory()

	async function handleSendToken(event: FormEvent) {
		event.preventDefault()
		setIsLoading(true)

		try {
			await api.post('/password/forgot', { email })

			history.push('/validate-token', { email })
			toast.success('E-mail enviado')
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

				<Input
					name="email"
					placeholder="Digite o seu e-mail"
					value={email}
					onChange={event => setEmail(event.target.value)}
				/>

				<Button type="submit" loading={isLoading}>
					Enviar código
				</Button>

				<p>
					Já possui uma conta?{' '}
					<Link to="/login">Entrar</Link>
				</p>
			</form>
		</S.Container>
	)
}