import { Link } from 'react-router-dom'

import listIcon from '../../assets/icons/list-icon.svg'

import { Container, ProfileContainer } from './styles'

export function Home() {

	return (
		<Container>
			<header>
				<ProfileContainer>
					<span>72</span>
					<img src="http://www.github.com/pedrocs378.png" alt="Pedro César" />
					<div>
						<strong>Pedro César</strong>
						<Link to="/profile">Meu perfil</Link>
					</div>
				</ProfileContainer>
			</header>

			<button type="button">
				<img src={listIcon} alt="Listar agendamentos" />
			</button>
		</Container>
	)
}