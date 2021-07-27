import styled from "styled-components";

export const Container = styled.header`
	display: flex;
	align-items: center;

	margin-bottom: 2.5rem;
`

export const ProfileContainer = styled.div`
	position: relative;
	margin-left: auto;

	display: flex;
	align-items: center;

	img {
		height: 3.125rem;
		width: 3.125rem;
		border-radius: 0.75rem;
	}
`

export const Profile = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 1.25rem;

	strong {
		font-family: 'Montserrat', sans-serif;
		font-size: 0.875rem;
	}

	a {
		margin-top: 4px;
		text-decoration: none;
		font: 400 0.75rem 'Poppins', sans-serif;
		color: var(--text);

		&:hover {
			text-decoration: underline;
		}
	}
`

export const LogoutButton = styled.button`
	margin-left: 1rem;
	font-size: 0;
	padding: 0.5rem;
	border-radius: 50%;
	border: 0;
	background: transparent;

	transition: opacity 0.2s;

	svg {
		height: 22px;
		width: 22px;
	}

	&:hover {
		opacity: 0.7;
	}
`

export const NotificationButton = styled.button`
	position: absolute;
	top: calc(-1.375rem / 2);
	left: calc(-1.375rem / 2);
	height: 1.375rem;
	width: 1.375rem;
	border-radius: 50%;
	border: 0;

	display: flex;
	align-items: center;
	justify-content: center;

	background: var(--red);
	color: var(--white);

	font: 400 0.69rem 'Montserrat', sans-serif;

	transition: filter 0.1s;

	&:active {
		filter: brightness(0.8);
	}
`

export const NotificationsContainer = styled.div`
	position: absolute;
	top: calc(100% - 1rem);
	left: -10.44rem;

	width: 12rem;
	border-radius: 0.625rem;
	background: var(--white);

	overflow: hidden;

	z-index: 1;
	opacity: 1;

	transition: top 0.3s;
`

export const NotificationItem = styled.div`
	width: 100%;
	height: 2.75rem;
	cursor: pointer;

	display: flex;
	align-items: center;
	justify-content: center;

	p {
		font: 400 9px 'Poppins', sans-serif;
		color: var(--text);
		margin: 0;
	}

	&:hover {
		background: rgba(239, 241, 249, 0.75);
	}
`