import { createContext, ReactNode } from "react";
import { useQuery } from 'react-query'
import { api } from "../services/api";

type Notification = {
	id: string
	content: string
}

type NotificationContextData = {
	notifications: Notification[] | undefined
}

type NotificationProviderProps = {
	children: ReactNode
}

export const NotificationContext = createContext({} as NotificationContextData)

export function NotificationProvider({ children }: NotificationProviderProps) {
	async function fetchNotifications(): Promise<Notification[]> {
		const response = await api.get<Notification[]>('/notifications')

		return response.data
	}
	
	const { data: notifications } = useQuery('notifications', fetchNotifications, {
		refetchInterval: 10000,
		refetchOnWindowFocus: false
		
	})

	return (
		<NotificationContext.Provider value={{
			notifications
		}}>
			{children}
		</NotificationContext.Provider>
	)
}