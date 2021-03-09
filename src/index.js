import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import DataProvider from './components/DataContext';
import GlobalStyle from './GlobalStyle';

ReactDOM.render(
	<React.StrictMode>
		<DataProvider>
			<GlobalStyle />
			<App />
		</DataProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

