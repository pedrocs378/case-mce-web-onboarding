
import * as S from './styles'

type CustomerCardProps = {
	customer: {
		name: string
		phone: string
	}
}

export function CustomerCard({ customer }: CustomerCardProps) {

	return (
		<S.Container>
			<strong>{customer.name}</strong>
			<p>{customer.phone}</p>
		</S.Container>
	)
}