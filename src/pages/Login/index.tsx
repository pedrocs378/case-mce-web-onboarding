
import { Input } from '../../components/Input'

import logoImg from '../../assets/images/logo.png'

import { Container } from './styles'
import { InputPassword } from '../../components/Input/InputPassword'

export function Login() {

	return (
		<Container>
			<form>
				<img src={logoImg} alt="Mind Education" />

				<Input name="username" placeholder="Login" />
				<InputPassword name="password" placeholder="Senha" />
			</form>
		</Container>
	)
}