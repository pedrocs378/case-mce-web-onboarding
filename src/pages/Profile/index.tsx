import { ChangeEvent, FormEvent, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import Loading from 'react-loading'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { InputPassword } from '../../components/Input/InputPassword'

import { useAuth } from '../../hooks/useAuth'
import { api } from '../../services/api'

import userPlaceholderImg from '../../assets/images/user-placeholder.png'
import cameraIcon from '../../assets/icons/camera-edit-icon.svg'

import * as S from './styles'

export function Profile() {
	const { user, updateUserData } = useAuth()

	const [name, setName] = useState(user?.name ?? '')
	const [phone, setPhone] = useState(user?.phone ?? '')
	const [email, setEmail] = useState(user?.email ?? '')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	async function handleSaveChanges(event: FormEvent) {
		event.preventDefault()

		try {
			setIsLoading(true)

			const data = {
				name,
				phone,
				email,
				...(password.trim() ? {
					password
				} : {})
			}

			const response = await api.put('/profile', data)

			updateUserData(response.data)
			toast.success(`${response.data.name} atualizado`)
		} catch (err) {
			toast.error(err.response?.data.message)
		} finally {
			setIsLoading(false)
		}
	}

	const handleUpdateAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			try {
				const data = new FormData()

				data.append('avatar', event.target.files[0])

				const response = await api.patch('/users/avatar', data)
				updateUserData(response.data)
				toast.success('Avatar atualizado')
			} catch (err) {
				let message = 'Não foi possivel atualizar seu avatar'

				if (err.response.data.message) {
					message = err.response.data.message
				}

				toast.error(message)
			}
		}
	}

	return (
		<S.Container>
			<main>
				<Link to="/">
					<FiArrowLeft />
				</Link>
				<form onSubmit={handleSaveChanges}>
					<S.AvatarContainer>
						<img src={user?.avatar_url ?? userPlaceholderImg} alt={user?.name} />

						<label htmlFor="avatar">
							<input 
								type="file" 
								name="avatar" 
								id="avatar" 
								onChange={handleUpdateAvatar} 
							/>
							<img src={cameraIcon} alt="Icone Camera" />
						</label>
					</S.AvatarContainer>

					<Input
						name="text"
						placeholder="Nome do usuário"
						value={name}
						onChange={event => setName(event.target.value)}
					/>
					<Input
						name="phone"
						placeholder="Número de telefone"
						value={phone}
						onChange={event => setPhone(event.target.value)}
					/>
					<Input
						name="email"
						placeholder="E-mail"
						value={email}
						onChange={event => setEmail(event.target.value)}
					/>
					<InputPassword
						name="password"
						placeholder="Senha"
						value={password}
						onChange={event => setPassword(event.target.value)}
					/>

					<Button type="submit">
						{isLoading 
							? (
								<Loading 
									type="spinningBubbles"
									height={24}
									width={24}
									color="var(--white)"
								/>
							) 
							: "Salvar alterações"
						}
					</Button>
				</form>
			</main>
		</S.Container>
	)
}