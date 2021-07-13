import styled from "styled-components";

import backgroundImg from '../../assets/images/background.png'

export const Container = styled.main`
	height: 100vh;
	overflow: hidden;
	position: relative;

	display: flex;
	align-items: center;
	justify-content: center;

	background: url(${backgroundImg}) no-repeat;
	background-size: cover;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		background: rgba(255, 255, 255, 0.4);

		z-index: 1;
	}

	form {
		width: 100%;
		max-width: 23.44rem;
		padding: 2.87rem 1.875rem;
		z-index: 2;

		display: flex;
		flex-direction: column;

		background: var(--white);

		label + label {
			margin-top: 1.5rem;
		}

		button[type="submit"] {
			margin-top: 5rem;
		}

		> p {
			margin-top: 2.25rem;
			text-align: center;
			color: var(--black);

			a {
				color: var(--black);
				font-weight: 700;
				text-decoration: none;

				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
`