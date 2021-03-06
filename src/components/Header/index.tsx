import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import {  } from 'react-query'

import { useAuth } from '../../hooks/useAuth'
import { useNotification } from '../../hooks/useNotification'

import userPlaceholderImg from '../../assets/images/user-placeholder.png'

import { api } from '../../services/api'

import * as S from './styles'

export function Header() {
	const { user, signOut } = useAuth()
	const { notifications, refetch } = useNotification()

	const [previousLength, setPreviousLength] = useState(0)
	const [showNotifications, setShowNotifications] = useState(false)

	const handleReadNotification = useCallback(async (id: string) => {
		await api.patch(`/notifications/${id}`, {
			read: true
		})

		await refetch()
	}, [refetch])
	
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

				<img src={user?.avatar_url ?? userPlaceholderImg} alt={user?.name} />

				{showNotifications && (
					<S.NotificationsContainer>
						{notifications && notifications.length > 0 ? notifications.map(notification => {
							return (
								<S.NotificationItem 
									key={notification.id}
									onClick={() => handleReadNotification(notification.id)}
								>
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