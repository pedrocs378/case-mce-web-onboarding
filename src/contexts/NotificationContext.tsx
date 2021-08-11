import { createContext, ReactNode, useEffect } from "react";
import { QueryObserverResult, RefetchOptions, useQuery } from 'react-query'

import { queryClient } from "../services/queryClient";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

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
	const { user } = useAuth()

	async function fetchNotifications(): Promise<Notification[]> {
		if (!user) return []

		const response = await api.get<Notification[]>('/notifications')

		return response.data
	}
	
	const { data: notifications, refetch } = useQuery('notifications', fetchNotifications, {
		refetchInterval: 10000,
		refetchOnWindowFocus: false
		
	})

	useEffect(() => {
		return () => {
			queryClient.cancelQueries()
		}
	}, [])

	return (
		<NotificationContext.Provider value={{
			notifications,
			refetch
		}}>
			{children}
		</NotificationContext.Provider>
	)
}