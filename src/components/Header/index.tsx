import { Link } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'

import { useAuth } from '../../hooks/useAuth'

import * as S from './styles'

export function Header() {

	const { user, signOut } = useAuth()

	return (
		<S.Container>
			<S.ProfileContainer>
				<span>72</span>
				<img src="http://www.github.com/pedrocs378.png" alt={user?.name} />
				<div>
					<strong>{user?.name}</strong>
					<Link to="/profile">Meu perfil</Link>
				</div>
				<button type="button" onClick={signOut}>
					<FiLogOut />
				</button>
			</S.ProfileContainer>
		</S.Container>
	)
}