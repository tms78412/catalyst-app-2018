//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

//Local dependencies
import './Css/index.css';
import App from './App';
import History from './History';
import registerServiceWorker from './registerServiceWorker';

//Initialize

ReactDOM.render(
	<Router history={History}>
		<App />
	</Router>,
	document.getElementById(`root`) //eslint-disable-line no-undef
);
registerServiceWorker();
