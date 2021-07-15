import { Link } from 'react-router-dom'

import * as S from './styles'

export function Header() {

	return (
		<S.Container>
			<S.ProfileContainer>
				<span>72</span>
				<img src="http://www.github.com/pedrocs378.png" alt="Pedro César" />
				<div>
					<strong>Pedro César</strong>
					<Link to="/profile">Meu perfil</Link>
				</div>
			</S.ProfileContainer>
		</S.Container>
	)
}