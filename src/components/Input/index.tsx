import { useRef, useState, useCallback, InputHTMLAttributes } from "react"

import * as S from './styles'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ children, ...rest }: InputProps) {
	const inputRef = useRef<HTMLInputElement>(null)

	const [isFocused, setIsFocused] = useState(false)

	const handleFocus = useCallback(() => {
		setIsFocused(true)
	}, [])

	const handleBlur = useCallback(() => {
		setIsFocused(false)
	}, [])

	return (
		<S.Container
			isFocused={isFocused}
			isFilled={!!inputRef.current?.value.trim()}
		>
			<input
				ref={inputRef}
				onFocus={handleFocus}
				onBlur={handleBlur}
				{...rest}
			/>
			{children}
		</S.Container>
	)
}