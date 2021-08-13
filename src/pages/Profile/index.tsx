import { ChangeEvent, FormEvent, useMemo, useState } from 'react'
import { formatPhoneNumber } from 'react-phone-number-input'
import { FiArrowLeft } from 'react-icons/fi'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { InputPassword } from '../../components/Input/InputPassword'

import { useAuth } from '../../hooks/useAuth'

import { checkPhoneNumber } from '../../utils/checkPhoneNumber'
import { api } from '../../services/api'

import userPlaceholderImg from '../../assets/images/user-placeholder.png'
import cameraIcon from '../../assets/icons/camera-edit-icon.svg'

import * as S from './styles'

type ValidatedField = {
	[field: string]: boolean
}

type ValidationError = {
	[key: string]: string
}

const validationShape = {
	name: Yup.string().required('Nome é obrigatório').min(3, 'Nome muito curto'),
	email: Yup.string().required('Email é obrigatório').email('O email precisa ser válido'),
	phone: Yup.string()
		.required('Número do telefone é obrigatório')
		.test('isPhoneNumber', 'Número inválido', (value) => checkPhoneNumber(value)),
	password: Yup.string()
}

export function Profile() {
	const { user, updateUserData } = useAuth()

	const [name, setName] = useState(user?.name ?? '')
	const [phone, setPhone] = useState(user?.phone ?? '')
	const [email, setEmail] = useState(user?.email ?? '')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const [validatedFields, setValidatedFields] = useState({} as ValidatedField)
	const [validationErrors, setValidationErrors] = useState({} as ValidationError)

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

			const schema = Yup.object().shape(validationShape)

			await schema.validate(data)

			const response = await api.put('/profile', data)

			updateUserData(response.data)
			toast.success(`${response.data.name} atualizado`)
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				setValidatedFields(state => ({
					...state,
					[name]: false
				}))
				setValidationErrors(state => ({
					...state,
					[name]: err.message
				}))

				return
			}
			let message = 'Não foi possivel atualizar seu perfil. Tente novamente mais tarde'

			if (err.response.data.message) {
				message = err.response.data.message
			}

			toast.error(message)
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

	const formattedPhone = useMemo(() => {
		const output = formatPhoneNumber(`+55${phone}`)

		return output.trim() ? output : phone
	}, [phone])


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
						isValidated={!!validatedFields['name']}
						isErrored={!!validationErrors['name']}
					/>
					<Input
						name="phone"
						placeholder="Número de telefone"
						value={formattedPhone}
						onChange={event => setPhone(event.target.value)}
						isValidated={!!validatedFields['phone']}
						isErrored={!!validationErrors['phone']}
					/>
					<Input
						type="email"
						name="email"
						placeholder="E-mail"
						value={email}
						onChange={event => setEmail(event.target.value)}
						isValidated={!!validatedFields['email']}
						isErrored={!!validationErrors['email']}
					/>
					<InputPassword
						name="password"
						placeholder="Senha"
						value={password}
						onChange={event => setPassword(event.target.value)}
						isValidated={!!validatedFields['password']}
						isErrored={!!validationErrors['password']}
					/>

					<Button type="submit" loading={isLoading}>
						Salvar alterações
					</Button>
				</form>
			</main>
		</S.Container>
	)
}