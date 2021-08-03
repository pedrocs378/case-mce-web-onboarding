import { createContext, ReactNode } from "react";
import { QueryObserverResult, RefetchOptions, useQuery } from 'react-query'

import { api } from "../services/api";

type Notification = {
	id: string
	content: string
}

type NotificationContextData = {
	notifications: Notification[] | undefined
	refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<Notification[], unknown>>
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
	
	const { data: notifications, refetch } = useQuery('notifications', fetchNotifications, {
		refetchInterval: 10000,
		refetchOnWindowFocus: false
		
	})

	return (
		<NotificationContext.Provider value={{
			notifications,
			refetch
		}}>
			{children}
		</NotificationContext.Provider>
	)
}