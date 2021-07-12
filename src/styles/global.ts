import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
	:root {
		--white: #fff;
		--black: #333333;

		--gray190: #CCCCCC;
		--gray200: #CACACC;

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
`