import styled from "styled-components";

type ContainerProps = {
	isFocused: boolean
	isFilled: boolean
}

export const Container = styled.label<ContainerProps>`
	height: 4.06rem;
	background: var(--shape);
	border: 2px solid transparent;
	border-color: ${({ isFocused, isFilled }) => (isFocused || isFilled) && 'var(--orange)'};
	
	border-radius: 0.75rem;

	position: relative;
	transition: border-color 0.2s;

	&:hover {
		border-color: var(--orange);
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
`