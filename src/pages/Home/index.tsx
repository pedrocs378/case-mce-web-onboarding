import { useState, useMemo } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Timeline } from 'antd'
import 'antd/dist/antd.css'

import { Header } from '../../components/Header'
import { CustomerCard } from '../../components/CustomerCard'

import listIcon from '../../assets/icons/list-icon.svg'

import * as S from './styles'

export function Home() {
	const [selectedDate, setSelectedDate] = useState(new Date())

	function handleGoToPrevDate() {
		const prevDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 1)

		setSelectedDate(prevDay)
	}

	function handleGoToNextDate() {
		const nextDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1)

		setSelectedDate(nextDay)
	}

	const selectedDateFormatted = useMemo(() => {
		return format(selectedDate, "d 'de' MMMM", {
			locale: ptBR
		})
	}, [selectedDate])

	return (
		<S.Container>
			<Header />

			<main>
				<S.MainHeader>
					<button type="button" onClick={handleGoToPrevDate}>
						<IoIosArrowBack />
					</button>
					<strong>{selectedDateFormatted}</strong>
					<button type="button" onClick={handleGoToNextDate}>
						<IoIosArrowForward />
					</button>
				</S.MainHeader>

				<S.MainContent>
					<Timeline mode="left">
						<Timeline.Item label="8h" />
						<Timeline.Item label="9h">
							<CustomerCard
								customer={{
									name: 'Frederico Jorge',
									phone: '(15) 98876-0982'
								}}
							/>
						</Timeline.Item>
						<Timeline.Item label="10h" />
						<Timeline.Item label="11h" />
						<Timeline.Item label="12h">
							<CustomerCard
								customer={{
									name: 'Frederico Jorge',
									phone: '(15) 98876-0982'
								}}
							/>
						</Timeline.Item>
						<Timeline.Item label="13h" />
						<Timeline.Item label="14h" />
						<Timeline.Item label="15h" />
						<Timeline.Item label="16h" />
					</Timeline>
				</S.MainContent>
			</main>

			<button type="button">
				<img src={listIcon} alt="Listar agendamentos" />
			</button>
		</S.Container>
	)
}