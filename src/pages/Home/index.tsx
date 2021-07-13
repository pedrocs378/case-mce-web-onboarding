import { Link } from 'react-router-dom'

import { Container, ProfileContainer } from './styles'

export function Home() {

	return (
		<Container>
			<header>
				<ProfileContainer>
					<img src="http://www.github.com/pedrocs378.png" alt="Pedro César" />
					<div>
						<strong>Pedro César</strong>
						<Link to="/profile">Meu perfil</Link>
					</div>
				</ProfileContainer>
			</header>
		</Container>
	)
}