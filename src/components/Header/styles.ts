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