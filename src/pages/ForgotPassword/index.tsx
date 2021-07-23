import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import logoImg from '../../assets/images/logo.png'

import * as S from './styles'

export function ForgotPassword() {
	const [email, setEmail] = useState('')

	const history = useHistory()

	async function handleSendConde(event: FormEvent) {
		event.preventDefault()

		history.push('/login')
		toast.success('Código enviado')
	}

	return (
		<S.Container>
			<form onSubmit={handleSendConde}>
				<img src={logoImg} alt="Mind Education" />

				<Input
					name="email"
					placeholder="Digite o seu e-mail"
					value={email}
					onChange={event => setEmail(event.target.value)}
				/>

				<Button type="submit">Login</Button>

				<p>
					Já possui uma conta?{' '}
					<Link to="/login">Entrar</Link>
				</p>
			</form>
		</S.Container>
	)
}