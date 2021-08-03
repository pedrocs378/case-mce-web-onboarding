import { ButtonHTMLAttributes } from "react"
import Loading from "react-loading"

import * as S from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	loading?: boolean
}

export function Button({ loading = false, children, ...rest }: ButtonProps) {
	return (
		<S.Container {...rest}>
			{loading ? 
			<Loading
				type="spinningBubbles"
				height={24}
				width={24}
				color="var(--white)"
			/> 
			: children}
		</S.Container>
	)
}