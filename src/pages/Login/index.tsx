import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Loading from 'react-loading'
import * as Yup from 'yup'

import { Input } from '../../components/Input'
import { InputPassword } from '../../components/Input/InputPassword'
import { Button } from '../../components/Button'

import { useAuth } from '../../hooks/useAuth'
import { getValidationErrors } from '../../utils/getValidationErrors'

import logoImg from '../../assets/images/logo.png'

import * as S from './styles'

type ValidationTypes = 'email' | 'password'

type ValidatedField = {
	[field: string]: boolean
}

type ValidationError = {
	[key: string]: string
}

const validationShape = {
	email: Yup.string().required('Email é obrigatório').email('O email precisa ser válido'),
	password: Yup.string().required('Senha obrigatória')
}

export function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const [validatedFields, setValidatedFields] = useState({} as ValidatedField)
	const [validationErrors, setValidationErrors] = useState({} as ValidationError)

	const { signIn } = useAuth()

	const history = useHistory()

	async function handleLogin(event: FormEvent) {
		event.preventDefault()

		try {
			setValidationErrors({})
			setIsLoading(true)

			const data = {
				email,
				password,
			}

			const schema = Yup.object().shape(validationShape)

			await schema.validate(data, {
				abortEarly: false
			})

			await signIn(data)

			history.push('/')
		} catch(err) {
			if (err instanceof Yup.ValidationError) {
				const errors = getValidationErrors(err)
				setValidationErrors(errors)

				return
			}

			const message = err.response.data?.message || 'Não foi possivel realizar o login. Tente novamente'

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

			await schema.validate({
				[name]: value
			})

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

	return (
		<S.Container>
			<form onSubmit={handleLogin}>
				<img src={logoImg} alt="Mind Education" />

				<Input
					name="email"
					placeholder="Login"
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

				<Link to="/forgot-password">Esqueci minha senha</Link>

				<Button type="submit">
					{isLoading ? 
						<Loading 
							type="spinningBubbles"
							height={24}
							width={24}
							color="var(--white)"
						/> 
						: "Login"}
				</Button>

				<p>
					Não tem conta?{' '}
					<Link to="/register">Registrar</Link>
				</p>
			</form>
		</S.Container>
	)
}