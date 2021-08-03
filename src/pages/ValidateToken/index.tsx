import { FormEvent, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { api } from '../../services/api'

import logoImg from '../../assets/images/logo.png'

import * as S from './styles'

type RouteParams = {
	email: string
}

export function ValidateToken() {
	const [token, setToken] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const history = useHistory()

	const location = useLocation()
	const { email } = location.state as RouteParams

	async function handleValidToken(event: FormEvent) {
		event.preventDefault()
		setIsLoading(true)

		try {
			await api.post('/password/validate_token', { 
				email,
				token
			})

			history.push('/reset-password', { email })
			toast.success('Token validado')
		} catch (err) {
			let message = 'Algo deu errado ao tentar validar o token.'

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
			<form onSubmit={handleValidToken}>
				<img src={logoImg} alt="Mind Education" />

				<Input
					type="number"
					name="token"
					placeholder="Token"
					maxLength={5}
					value={token}
					onChange={event => setToken(event.target.value)}
				/>

				<Button type="submit" loading={isLoading}>
					Verificar
				</Button>
			</form>
		</S.Container>
	)
}