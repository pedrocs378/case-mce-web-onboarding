import { useMemo } from 'react'
import { formatPhoneNumber } from 'react-phone-number-input'

import * as S from './styles'

type CustomerCardProps = {
	customer: {
		name: string
		phone: string
	}
}

export function CustomerCard({ customer }: CustomerCardProps) {

	const formattedPhone = useMemo(() => {
		const output = formatPhoneNumber(`+55${customer.phone}`)

		return output.trim() ? output : customer.phone
	}, [customer.phone])

	return (
		<S.Container>
			<strong>{customer.name}</strong>
			<p>{formattedPhone}</p>
		</S.Container>
	)
}