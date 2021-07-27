import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'

import { useAuth } from '../../hooks/useAuth'
import { useNotification } from '../../hooks/useNotification'

import * as S from './styles'
import { useEffect } from 'react'

export function Header() {
	const { user, signOut } = useAuth()
	const { notifications } = useNotification()

	const [previousLength, setPreviousLength] = useState(0)
	const [showNotifications, setShowNotifications] = useState(false)
	
	useEffect(() => {
		if (notifications && notifications.length !== previousLength) {
			setPreviousLength(notifications.length)
			setShowNotifications(true)
		}
	}, [notifications, previousLength])

	return (
		<S.Container>
			<S.ProfileContainer>
				{notifications && (
					<S.NotificationButton 
						type="button"
						onClick={() => setShowNotifications(state => !state)}
						title={showNotifications ? "Esconder notificações" : "Mostrar notificações"}
					>
						{notifications.length}
					</S.NotificationButton>
				)}

				<img src="http://www.github.com/pedrocs378.png" alt={user?.name} />

				{showNotifications && (
					<S.NotificationsContainer>
						{notifications && notifications.length > 0 ? notifications.map(notification => {
							return (
								<S.NotificationItem key={notification.id}>
									<p>{notification.content}</p>
								</S.NotificationItem>
							)
						}) : (
							<S.NotificationItem>
								<p>Sem notificações 😊</p>
							</S.NotificationItem>
						)}
					</S.NotificationsContainer>
				)}

				<S.Profile>
					<strong>{user?.name}</strong>
					<Link to="/profile">Meu perfil</Link>
				</S.Profile>
				<S.LogoutButton type="button" onClick={signOut}>
					<FiLogOut />
				</S.LogoutButton>
			</S.ProfileContainer>
		</S.Container>
	)
}