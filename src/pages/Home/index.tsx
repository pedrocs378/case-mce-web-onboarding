import { useState, useEffect, useMemo } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { format, addDays, subDays } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Timeline } from 'antd'
import 'antd/dist/antd.css'

import { CustomerCard } from '../../components/CustomerCard'

import { useAuth } from '../../hooks/useAuth'
import { api } from '../../services/api'

import listIcon from '../../assets/icons/list-icon.svg'

import * as S from './styles'

interface UserAppointment {
	id: string
	name: string
	phone: string
}

type Appointment = {
	hour: number
	available: boolean
	user: UserAppointment | null
}

export function Home() {
	const [appointments, setAppointments] = useState<Appointment[]>([])
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [showAppointments, setShowAppointments] = useState(true)
	
	const { user } = useAuth()

	function handleGoToPrevDate() {
		setSelectedDate(subDays(selectedDate, 1))
	}

	function handleGoToNextDate() {
		setSelectedDate(addDays(selectedDate, 1))
	}

	const selectedDateFormatted = useMemo(() => {
		return format(selectedDate, "d 'de' MMMM", {
			locale: ptBR
		})
	}, [selectedDate])

	useEffect(() => {
		const day = selectedDate.getDate()
		const month = selectedDate.getMonth()
		const year = selectedDate.getFullYear()

		api
			.get<Appointment[]>(`/providers/${user?.id}/available_day_hours?day=${day}&month=${month}&year=${year}`)
			.then(response => {
				setAppointments(response.data)
			})
	}, [user?.id, selectedDate])

	return (
		<S.Container>
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
						{appointments.map(appointment => {
							return (
								<Timeline.Item 
									key={appointment.hour} 
									label={`${appointment.hour}h`}
								>
									{ showAppointments ? appointment.user && (
										<CustomerCard
											customer={appointment.user}
										/>
									) : (
										<>
											<S.AvailabilityButton 
												type="button"
												enabled={true}
											>
												Disponivel
											</S.AvailabilityButton>
											<S.AvailabilityButton 
												type="button"
												enabled={false}
											>
												Não disponivel
											</S.AvailabilityButton>
										</>
									)}
								</Timeline.Item>
							)
						})}
					</Timeline>
				</S.MainContent>
			</main>

			<button type="button" onClick={() => setShowAppointments(state => !state)}>
				<img src={listIcon} alt="Listar agendamentos" />
			</button>
		</S.Container>
	)
}