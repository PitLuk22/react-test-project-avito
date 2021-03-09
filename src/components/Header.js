import React from 'react'
import styled from 'styled-components';
const Header = ({ children }) => {
	return (
		<S.Header>
			<h1>{children}</h1>
		</S.Header>
	)
}

export default Header

const S = {};
S.Header = styled.header`
	width: 100%;
	text-transform: uppercase;
	padding: 15px 0;
	text-align: center;
	h1 {
		font-size: 36px;
		line-height: 42px;
		margin: 0;
		font-weight: 400;
	}
`;

