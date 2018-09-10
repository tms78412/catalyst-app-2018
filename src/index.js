//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//Local dependencies
import App from './App';
import History from './History';
import registerServiceWorker from './registerServiceWorker';

//Initialize
/**
 * This code renders the rest project code to the DOM (Document Object Model; basically the view in the browser)
 * It uses "JSX" syntax, similar to HTML, to allow for rendering of custom components (like our App component) through React
 * 
 * The <Router> tag is imported from the react-router-dom project and allows for navigation between views in the project
 * The Router is assigned a static History object exported from our local History file which allows for storing the
 * user's browsing history in the app and navigating "back" or "forward" when moving between the app's pages
 * 
 * The <App> tag is imported from our own App.js file and contains the code to render all our views and components
 * 
 * On a more technical level, our project is a "SPA", or Single-Page Application
 * From the user's perspective it's not much different from a typical website, but from the browser's perspective the entire app,
 * including all its views, is rendered on a single page
 * To switch views, React simply changes the content rendered in the body, rather than requesting different HTML pages from the server each time
 */
ReactDOM.render(
	<Router history={History}>
		<App />
	</Router>,
	document.getElementById(`root`) //eslint-disable-line no-undef
);
registerServiceWorker();
