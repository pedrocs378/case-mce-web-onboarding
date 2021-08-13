import { FormEvent, useMemo, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { formatPhoneNumber } from 'react-phone-number-input'
import { toast } from 'react-hot-toast'
import * as Yup from 'yup'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { InputPassword } from '../../components/Input/InputPassword'

import { getValidationErrors } from '../../utils/getValidationErrors'
import { checkPhoneNumber } from '../../utils/checkPhoneNumber'
import { api } from '../../services/api'

import * as S from './styles'

type ValidationTypes = 'name' | 'email' | 'phone' | 'password' | 'password_confirmation'

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
	password: Yup.string().required('Senha obrigatória').min(6, 'A senha precisa ter no minímo 6 caracteres'),
	password_confirmation: Yup.string()
		.oneOf([Yup.ref('password'), null], 'As senhas precisam ser iguais')
}

export function Register() {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [password_confirmation, setPasswordConfirmation] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const [validatedFields, setValidatedFields] = useState({} as ValidatedField)
	const [validationErrors, setValidationErrors] = useState({} as ValidationError)

	const history = useHistory()

	async function handleRegister(event: FormEvent) {
		event.preventDefault()

		try {
			setValidationErrors({})
			setIsLoading(true)

			const data = {
				name,
				phone,
				email,
				password,
				password_confirmation
			}

			const schema = Yup.object().shape(validationShape)

			await schema.validate(data, {
				abortEarly: false
			})

			await api.post('/users/personal', data)

			toast.success('Cadastro salvo')
			history.push('/login')
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errors = getValidationErrors(err)
				setValidationErrors(errors)

				return
			}

			const message = err.response.data?.message || 'Não foi possivel salvar seu registro. Tente novamente'

			toast.error(message)
		} finally {
			setIsLoading(false)
		}
	}

	async function handleValidField(name: ValidationTypes, value: string) {
		if (!value.trim()) {
			setValidatedFields(state => ({
				...state,
				[name]: false
			}))

			return
		}

		try {
			setValidationErrors({})

			const schema = Yup.object().shape({
				[name]: validationShape[name]
			})

			const data = {
				[name]: value,
				...(name === 'password_confirmation' && {
					password
				})
			}

			await schema.validate(data)

			setValidatedFields(state => ({
				...state,
				[name]: true
			}))
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
		}
	}

	const formattedPhone = useMemo(() => {
		const output = formatPhoneNumber(`+55${phone}`)

		return output.trim() ? output : phone
	}, [phone])

	return (
		<S.Container>
			<form onSubmit={handleRegister}>
				<Input
					type="text"
					name="name"
					placeholder="Nome do usuário"
					value={name}
					onChange={event => setName(event.target.value)}
					onInputBlur={(value) => handleValidField('name', value)}
					isValidated={!!validatedFields['name']}
					isErrored={!!validationErrors['name']}
				/>
				<Input
					type="tel"
					name="phone"
					placeholder="Telefone"
					value={formattedPhone}
					onChange={event => setPhone(event.target.value)}
					onInputBlur={() => handleValidField('phone', phone)}
					isValidated={!!validatedFields['phone']}
					isErrored={!!validationErrors['phone']}
				/>
				<Input
					type="email"
					name="email"
					placeholder="E-mail"
					value={email}
					onChange={event => setEmail(event.target.value)}
					onInputBlur={(value) => handleValidField('email', value)}
					isValidated={!!validatedFields['email']}
					isErrored={!!validationErrors['email']}
				/>
				<InputPassword
					name="password"
					placeholder="Senha"
					value={password}
					onChange={event => setPassword(event.target.value)}
					onInputBlur={(value) => handleValidField('password', value)}
					isValidated={!!validatedFields['password']}
					isErrored={!!validationErrors['password']}
				/>
				<InputPassword
					name="password_confirmation"
					placeholder="Confirmar senha"
					value={password_confirmation}
					onChange={event => setPasswordConfirmation(event.target.value)}
					onInputBlur={(value) => handleValidField('password_confirmation', value)}
					isValidated={!!validatedFields['password_confirmation']}
					isErrored={!!validationErrors['password_confirmation']}
				/>

				<Button type="submit" loading={isLoading}>
					Cadastrar
				</Button>

				<p>
					Já tem conta?{' '}
					<Link to="/login">Login</Link>
				</p>
			</form>
		</S.Container>
	)
}