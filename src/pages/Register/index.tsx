
import * as S from './styles'

export function Register() {

	return (
		<S.Container>
			<form>
				<input type="text" placeholder="Usuário" />
				<input type="text" placeholder="Telefone" />
				<input type="text" placeholder="E-mail" />
				<input type="text" placeholder="Senha" />
				<input type="text" placeholder="Confirmar senha" />

				<button type="submit">Cadastrar</button>

				<p>
					Já tem conta?{' '}
					<a href="/">Login</a>
				</p>
			</form>
		</S.Container>
	)
}