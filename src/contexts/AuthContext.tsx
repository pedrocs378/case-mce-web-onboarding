import { createContext, ReactNode, useState, useCallback } from "react";

import { api } from "../services/api";

interface User {
	id: string
	name: string
	phone: string
	email: string
	avatar_url?: string
	accessLevel: ('personal' | 'user')[]
}

interface SignInCredentials {
	email: string
	password: string
}

interface AuthContextData {
	user: User | undefined
	signIn: (credentials: SignInCredentials) => Promise<User>
	signOut: () => void
	updateUserData: (data: User) => void
}

interface AuthProviderProps {
	children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | undefined>(() => {
		const user = localStorage.getItem('@Mindeducation:user')
		const token = localStorage.getItem('@Mindeducation:token')

		if (user && token) {
			api.defaults.headers.authorization = `Bearer ${token}`

			return JSON.parse(user)
		}

		return undefined
	})

	const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
		const response = await api.post('/sessions/personal', {
			email,
			password
		})

		api.defaults.headers.authorization = `Bearer ${response.data.token}`

		setUser(response.data.user)
		localStorage.setItem('@Mindeducation:user', JSON.stringify(response.data.user))
		localStorage.setItem('@Mindeducation:token', response.data.token)

		return response.data.user
	}, [])

	const signOut = useCallback(() => {
		localStorage.removeItem('@Mindeducation:user')
		localStorage.removeItem('@Mindeducation:token')
		setUser(undefined)
	}, [])

	const updateUserData = useCallback((data: User) => {
		setUser(data)
		localStorage.setItem('@Mindeducation:user', JSON.stringify(data))
	}, [])

	return (
		<AuthContext.Provider value={{ user, signIn, signOut, updateUserData }}>
			{children}
		</AuthContext.Provider>
	)
}