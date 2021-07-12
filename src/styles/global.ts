import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
	:root {
		--white: #fff;
		--black: #333333;

		--gray190: #CCCCCC;
		--gray200: #CACACC;
		--gray450: #A3A3A3;

		--red: #EF3F5F;
		--orange: #FEA051;
		--purple-dark: #402E46;

		--heading: #3F4254;
		--text: #626679;

		--shape: #F9F9FB;
		--background: #EFF1F9;
	} 

	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	html {
		@media (max-width: 1080px) {
			font-size: 93.75%;
		}

		@media (max-width: 720px) {
			font-size: 87.5%;
		}
	}

	body {
		background: var(--background);
	}

	body, input, button, textarea {
		font: 500 1rem 'DM Sans', sans-serif;
	}

	button {
		cursor: pointer;
	}
`