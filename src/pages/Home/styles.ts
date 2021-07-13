import styled from "styled-components";

export const Container = styled.div`
	padding: 3.125rem 4.375rem;

	header {
		display: flex;
		align-items: center;
	}
`

export const ProfileContainer = styled.div`
	margin-left: auto;

	display: flex;
	align-items: center;

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