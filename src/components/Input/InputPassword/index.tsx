import { useCallback } from "react";
import { useState, InputHTMLAttributes } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { Input } from "..";

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function InputPassword(props: InputProps) {
	const [showPassword, setShowPassword] = useState(false)

	const handleToggleShowPassword = useCallback(() => {
		return setShowPassword(state => !state)
	}, [])

	return (
		<Input
			type={showPassword ? 'text' : 'password'}
			{...props}
		>
			<button
				type="button"
				onClick={handleToggleShowPassword}
			>
				{showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
			</button>
		</Input>

	)
}