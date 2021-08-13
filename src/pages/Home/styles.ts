import styled, { css } from "styled-components";

export const Container = styled.div`
	position: relative;
	padding-bottom: 2.5rem;

	main {
		width: 100%;
		max-width: 32.1rem;
		margin: 0 auto;
		padding: 1.375rem 1.5rem;
		border-radius: 0.75rem;
		background: var(--white);

		box-shadow: 0px 17px 8.486px rgba(239, 241, 249, 0.75);
	}

	> button[type="button"] {
		position: fixed;
		right: 2.5rem;
		bottom: 2.5rem;
		height: 4rem;
		width: 4rem;
		font-size: 0;

		border: 0;
		border-radius: 50%;

		background: var(--orange);
		transition: filter 0.2s;

		img {
			height: 1.56rem;
			width: 1.56rem;
		}

		&:hover {
			filter: brightness(0.95);
		}
	}
`

export const MainHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	margin-bottom: 2.25rem;

	button[type="button"] {
		height: 3.125rem;
		width: 3.125rem;
		border: 0;
		border-radius: 50%;
		font-size: 0;

		background: var(--shape);
		transition: filter 0.2s;

		svg {
			height: 1.125rem;
			width: 1.125rem;
			color: var(--purple-dark);
		}

		&:hover {
			filter: brightness(0.95);
		}
	}

	strong {
		font-size: 1.375rem;
		color: var(--heading);
		font-family: 'Montserrat', sans-serif;
	}
`

export const MainContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	
	ul {
		width: 100%;

		li {
			height: 4rem;

			.ant-timeline-item-label {
				width: auto !important;
				text-align: left;
				color: var(--text);
				opacity: 0.4;
				font: 400 0.75rem 'Poppins', sans-serif;
			}

			.ant-timeline-item-tail {
				left: 3.4rem !important;
				border-left: 1px dashed var(--text);
				opacity: 0.3;
			}		

			.ant-timeline-item-head {
				border-color: var(--text);
				opacity: 0.4;
				left: 3.4rem !important;

				height: 11px;
				width: 11px;
			}		

			.ant-timeline-item-content {
				width: auto !important;
				left: 4.34rem !important;
				top: -50%;
			}		
		}
	}
`

type AvailabilityButtonProps = {
	filled: boolean
}

export const AvailabilityButton = styled.button<AvailabilityButtonProps>`
	height: 2.5rem;
	min-width: 82px;

	padding: 0.625rem;
	border-radius: 0.625rem;
	font: 700 0.75rem 'Montserrat', sans-serif;
	border: 1px solid var(--orange);
	background: var(--white);
	color: var(--orange);
	margin-top: 10px;

	display: inline-flex;
	justify-content: center;
	align-items: center;
	align-self: center;

	transition: all 0.2s;

	${({ filled }) => filled ? css`
		border-color: transparent;
		background: var(--orange);
		color: var(--white);

		&:hover {
			opacity: 0.8;
		}
	` : css`
		&:hover {
			background: var(--orange);
			color: var(--white);
		}
	`}

	&[disabled] {
		opacity: 0.5;
		pointer-events: none;
	}

	& + button {
		margin-left: 1rem;
	}
`