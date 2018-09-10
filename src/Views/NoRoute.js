//Dependencies
import { Component } from 'react';

//Local dependencies
import History from './../History';

//Instantiated
/**
 * Class describing a React component that renders nothing, but on mounting navigates to the root route
 */
const NoRoute = class NoRoute extends Component {
	////////////////////////////
	// REACT LIFECYCLE METHODS//
	////////////////////////////
	
	/**
	 * Returns the browser to the App root view
	 * This component will only ever render if the browser is targeting a route that does not exist
	 * Because of this, if this component is mounted it means that the page the browser is trying to access does not exist in our app
	 * The safest thing to do is point the browser to the home page (at route "/")
	 */
	componentDidMount() {
		History.push(`/`);
	}

	render() {
		return null;
	}
};

export { NoRoute };
export default NoRoute;
