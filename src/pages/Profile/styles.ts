import styled from "styled-components";

export const Container = styled.div`
	height: calc(100vh - 8.75rem);

	main {
		width: 100%;
		max-width: 32.1rem;
		margin: 0 auto;
		border-radius: 0.75rem;
		background: var(--white);

		box-shadow: 0px 17px 8.486px rgba(239, 241, 249, 0.75);

		position: relative;

		a {
			position: absolute;
			top: 1rem;
			left: 1rem;

			font-size: 0;
			padding: 0.5rem;
			border-radius: 50%;

			transition: opacity 0.2s;

			svg {
				height: 20px;
				width: 20px;
				color: var(--black);
			}

			&:hover {
				opacity: 0.8;
			}
		}

		form {
			display: flex;
			flex-direction: column;
			align-items: center;

			padding: 1.375rem 6.25rem 5rem;

			> label + label {
				margin-top: 1.375rem;
			}

			button[type="submit"] {
				margin-top: 3rem;
			}
		}
	}
`

export const AvatarContainer = styled.div`
	margin: 1rem 0 3.125rem 0;
	position: relative;

	> img {
		height: 6.8rem;
		width: 6.8rem;

		border-radius: 50%;
	}

	label {
		height: 2rem;
		width: 2rem;

		border: 2px solid var(--white);
		border-radius: 50%;

		position: absolute;
		bottom: 0;
		right: 0;

		background: var(--orange);
		display: flex;
		align-items: center;
		justify-content: center;

		cursor: pointer;
		transition: filter 0.2s;

		input {
			display: none;
		}

		img {
			height: 1rem;
			width: 1rem;
		}

		&:hover {
			filter: brightness(0.95);
		}
	}
`