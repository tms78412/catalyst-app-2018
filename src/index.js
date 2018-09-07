//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
