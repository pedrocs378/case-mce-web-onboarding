import { Link } from 'react-router-dom'

import { Input } from '../../components/Input'
import { InputPassword } from '../../components/Input/InputPassword'
import { Button } from '../../components/Button'

import logoImg from '../../assets/images/logo.png'

import { Container } from './styles'

export function Login() {

	return (
		<Container>
			<form>
				<img src={logoImg} alt="Mind Education" />

				<Input name="username" placeholder="Login" />
				<InputPassword name="password" placeholder="Senha" />

				<Link to="/forgot-password">Esqueci minha senha</Link>

				<Button type="submit">Login</Button>

				<p>
					Não tem conta?{' '}
					<Link to="/register">Registrar</Link>
				</p>
			</form>
		</Container>
	)
}