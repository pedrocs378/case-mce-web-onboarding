import { FormEvent, useState } from 'react'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { InputPassword } from '../../components/Input/InputPassword'

import cameraIcon from '../../assets/icons/camera-edit-icon.svg'

import * as S from './styles'

export function Profile() {
	const [username, setUsername] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	function handleSaveChanges(event: FormEvent) {
		event.preventDefault()
	}

	return (
		<S.Container>
			<main>
				<form onSubmit={handleSaveChanges}>
					<S.AvatarContainer>
						<img src="http://www.github.com/pedrocs378.png" alt="Pedro César" />

						<label htmlFor="avatar">
							<input type="file" name="avatar" id="avatar" />
							<img src={cameraIcon} alt="Icone Camera" />
						</label>
					</S.AvatarContainer>

					<Input
						name="username"
						placeholder="Nome do usuário"
						value={username}
						onChange={event => setUsername(event.target.value)}
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

					<Button type="submit">Salvar alterações</Button>
				</form>
			</main>
		</S.Container>
	)
}