import styled from "styled-components";

export const Container = styled.div`
	height: 100vh;
	padding: 3.125rem 4.375rem;
	position: relative;

	background: var(--background);

	header {
		display: flex;
		align-items: center;
	}

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
		position: absolute;
		right: 1.125rem;
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

export const ProfileContainer = styled.div`
	position: relative;
	margin-left: auto;

	display: flex;
	align-items: center;

	span {
		position: absolute;
		top: calc(-1.375rem / 2);
		left: calc(-1.375rem / 2);
		height: 1.375rem;
		width: 1.375rem;
		border-radius: 50%;

		display: flex;
		align-items: center;
		justify-content: center;

		background: var(--red);
		color: var(--white);

		font: 400 0.69rem 'Montserrat', sans-serif;
	}

	img {
		height: 3.125rem;
		width: 3.125rem;
		border-radius: 0.75rem;
	}

	> div {
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
	align-items: flex-start;
	
	ul {
		width: 100%;

		li {
			height: 4rem;

			.ant-timeline-item-label {
				width: auto !important;
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