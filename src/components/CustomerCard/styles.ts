import styled from "styled-components";

export const Container = styled.div`
	height: 3.5rem;
	max-width: 15.5rem;
	background: var(--orange);
	padding: 0rem 1.125rem;
	border-radius: 0.5rem;
	font-family: 'Montserrat', sans-serif;
	
	display: flex;
	flex-direction: column;
	justify-content: center;
	
	strong {
		color: var(--white);
		line-height: 200%;
		font-size: 0.75rem;
	}
	p {
		color: var(--white);
		font-size: 0.75rem;
	}
`