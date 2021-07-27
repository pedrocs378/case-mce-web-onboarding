import { useRef, useState, useCallback, InputHTMLAttributes } from "react"
import { AiFillCheckCircle } from 'react-icons/ai'

import * as S from './styles'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	isValidated?: boolean
	isErrored?: boolean
	onInputBlur?: (fieldValue: string) => void
}

export function Input({ 
	children, 
	isValidated = false, 
	isErrored = false,
	onInputBlur,
	...rest 
}: InputProps) {
	const inputRef = useRef<HTMLInputElement>(null)

	const [isFocused, setIsFocused] = useState(false)

	const handleFocus = useCallback(() => {
		setIsFocused(true)
	}, [])

	const handleBlur = useCallback(() => {
		setIsFocused(false)

		onInputBlur && onInputBlur(inputRef.current?.value ?? '')
	}, [onInputBlur])

	return (
		<S.Container
			isFocused={isFocused}
			isFilled={!!inputRef.current?.value.trim()}
			isValidated={isValidated}
			isErrored={isErrored}
		>
			<input
				ref={inputRef}
				onFocus={handleFocus}
				onBlur={handleBlur}
				{...rest}
			/>
			{children}
			{isValidated && <AiFillCheckCircle />}
		</S.Container>
	)
}