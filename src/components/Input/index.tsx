import { InputHTMLAttributes } from "react"

import { Container } from './styles'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ children, ...rest }: InputProps) {
	return (
		<Container>
			<input {...rest} />
			{children}
		</Container>
	)
}