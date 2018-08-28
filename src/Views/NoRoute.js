//Dependencies
import { Component } from 'react';

//Local dependencies
import History from './../History';

//Instantiated
const NoRoute = class NoRoute extends Component {
	////////////////////////////
	// REACT LIFECYCLE METHODS//
	////////////////////////////
	
	componentDidMount() {
		History.goBack();
	}

	render() {
		return null;
	}
};

export { NoRoute };
export default NoRoute;
