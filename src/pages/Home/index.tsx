import { useState, useEffect, useMemo, useCallback } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { toast } from 'react-hot-toast'
import Loading from 'react-loading'
import { Timeline } from 'antd'
import { format, addDays, subDays, formatISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
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

type AvailabilityHour = {
	[hour: number]: boolean
}

type AvailabilityHourResponse = {
	available_hours: {
		hour: number
		available: boolean
	}[]
}

export function Home() {
	const [appointments, setAppointments] = useState<Appointment[]>([])
	const [availabilityHours, setAvailabilityHours] = useState<AvailabilityHour>({} as AvailabilityHour)
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [showAppointments, setShowAppointments] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	
	const { user } = useAuth()

	function handleGoToPrevDate() {
		setSelectedDate(subDays(selectedDate, 1))
	}

	function handleGoToNextDate() {
		setSelectedDate(addDays(selectedDate, 1))
	}

	async function handleConfirmChanges() {
		setIsLoading(true)

		try {
			const available_hours = Object
				.keys(availabilityHours)
				.map(hour => Number(hour))
				.map(hour => {
					return {
						hour,
						available: availabilityHours[hour]
					}
				})

			await api.post<AvailabilityHourResponse>(`/providers/${user?.id}/available_day_hours`, {
				date: formatISO(selectedDate),
				available_hours
			})

			toast.success('Horários atualizados com sucesso')
		} catch (err) {
			appointments.forEach(appointment => {
				setAvailabilityHours((state) => ({
					...state,
					[appointment.hour]: appointment.available
				}))
			})

			let message = 'Algo deu errado ao tentar atualizar os horários'

			if (err.response.data.message) {
				message = err.response.data.message
			}

			toast.error(message)
		} finally {
			setIsLoading(false)
		}
	}

	const handleToggleAvailabilityHour = useCallback((hour: number) => {
		setAvailabilityHours((state) => ({
			...state,
			[hour]: !state[hour]
		}))
	}, [])

	const selectedDateFormatted = useMemo(() => {
		return format(selectedDate, "d 'de' MMMM", {
			locale: ptBR
		})
	}, [selectedDate])

	useEffect(() => {
		const day = selectedDate.getDate()
		const month = selectedDate.getMonth() + 1
		const year = selectedDate.getFullYear()

		api
			.get<Appointment[]>(`/providers/${user?.id}/available_day_hours?day=${day}&month=${month}&year=${year}`)
			.then(response => {
				const data = response.data
					.filter(appointment => appointment.hour !== 12)
					.map(appointment => {
						setAvailabilityHours((state) => ({
							...state,
							[appointment.hour]: appointment.available
						}))

						return appointment
					})

				setAppointments(data)
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
												enabled={availabilityHours[appointment.hour]}
												onClick={() => handleToggleAvailabilityHour(appointment.hour)}
											>
												Disponivel
											</S.AvailabilityButton>
											<S.AvailabilityButton 
												type="button"
												enabled={!availabilityHours[appointment.hour]}
												onClick={() => handleToggleAvailabilityHour(appointment.hour)}
											>
												Não disponivel
											</S.AvailabilityButton>
										</>
									)}
								</Timeline.Item>
							)
						})}
					</Timeline>
					{!showAppointments && (
						<S.AvailabilityButton 
							type="button"
							onClick={handleConfirmChanges}
							enabled
						>
							{isLoading ? (
								<Loading
									type="spinningBubbles"
									height={24}
									width={24}
									color="var(--white)"
								/>
							) : "Confimar"}
						</S.AvailabilityButton>
					)}
				</S.MainContent>
			</main>

			<button type="button" onClick={() => setShowAppointments(state => !state)}>
				<img src={listIcon} alt="Listar agendamentos" />
			</button>
		</S.Container>
	)
}