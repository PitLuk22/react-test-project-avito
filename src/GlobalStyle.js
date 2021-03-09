import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	body {
		margin: 0;
		font-family: 'Roboto', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
`;
export default GlobalStyle;