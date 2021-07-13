import styled from "styled-components";

export const Container = styled.button`
	border: 0;
	border-radius: 0.875rem;

	height: 4.06rem;
	width: 100%;
	background: var(--orange);
	color: var(--white);

	transition: filter 0.2s;

	&:hover {
		filter: brightness(0.95);
	}
`