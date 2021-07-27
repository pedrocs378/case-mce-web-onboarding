import styled, { css } from "styled-components";

type ContainerProps = {
	isFocused: boolean
	isFilled: boolean
	isValidated: boolean
	isErrored: boolean
}

export const Container = styled.label<ContainerProps>`
	height: 4.06rem;
	width: 100%;
	background: var(--shape);

	border: 2px solid transparent;
	border-color: ${({ isFocused, isFilled }) => (isFocused || isFilled) && 'var(--orange)'};
	border-color: ${({ isErrored }) => isErrored && 'var(--red)'};
	border-radius: 0.75rem;

	position: relative;
	overflow: hidden;
	transition: all 0.3s;

	&:hover {
		border-color: ${({ isValidated, isErrored }) => 
			!isValidated && 
			!isErrored && 
			'var(--orange)'
		};
	}

	input {
		border: 0;
		outline: none;
		height: 100%;
		width: 100%;
		padding: 1.375rem 1.25rem;

		background: transparent;
		color: var(--black);

		&::placeholder {
			color: var(--gray200);
		}
	}

	button[type="button"] {
		position: absolute;
		right: 1.5rem;
		top: 50%;
		transform: translateY(-50%);

		background: transparent;
		font-size: 0;
		border: 0;

		svg {
			height: 1.2rem;
			width: 1.2rem;
			color: var(--gray200);
		}
	}

	> svg {
		position: absolute;
		right: 1.25rem;
		top: 50%;
		transform: translateY(-50%);

		height: 1.2rem;
		width: 1.2rem;
		color: var(--white);
	}

	button[type="button"] ~ svg {
		right: 3rem;
	}

	${({ isValidated }) => isValidated && css`
		background: var(--purple-dark);
		border-color: var(--purple-dark);

		input {
			color: var(--white);
			
			&::placeholder {
				color: var(--white);
			} 
		}
	`}
`