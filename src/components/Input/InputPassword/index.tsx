import { useCallback, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { Input, InputProps } from "..";

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
				title={showPassword ? 'Esconder senha' : 'Mostrar senha'}
				onClick={handleToggleShowPassword}
			>
				{showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
			</button>
		</Input>

	)
}