//Dependencies
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { MdGridOn, MdEdit, MdHome } from 'react-icons/md';

//Local dependencies
import AppHeader from './Components/AppHeader';
import {
	Home,
	DataGrid,
	Form,
	NoRoute
} from './Views';
import './Css/App.css';

//Instantiated
const linkConfig = [
	{
		path: `/`,
		label: `Home`,
		icon: MdHome,
		show: [`/datagrid`, `/form`]
	},
	{
		path: `/datagrid`,
		label: `Data Grid`,
		icon: MdGridOn,
		show: [`/`]
	},
	{
		path: `/form`,
		label: `Form`,
		icon: MdEdit,
		show: [`/`]
	},
];

class App extends Component {
	constructor() {
		super();

		this.state = {
			links: linkConfig
		};
	}

	////////////////////////////
	// REACT LIFECYCLE METHODS//
	////////////////////////////

	render() {
		// preserve context
		const _this = this;
		
		return (
			<div>
				<AppHeader links={_this.state.links} />

				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/datagrid" component={DataGrid} />
					<Route path="/form" component={Form} />
					<Route component={NoRoute} />
				</Switch>
			</div>
		);
	}
}

export default App;
