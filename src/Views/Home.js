//Dependencies
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

//Local dependencies

//Instantiated
const Home = class Home extends Component {
	render() {
		// preserve context
		const _this = this;
		
		return (
			<div>
				<h1>Home</h1>
			</div>
		);
	}
};

export { Home };
export default Home;
