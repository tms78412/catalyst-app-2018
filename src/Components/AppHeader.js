//Dependencies
import React, { Component } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

//Local dependencies
import History from './../History';
import theme from './../theme';
import logo from './../Assets/logo.svg';

//Instantiated
const AppHeader = class AppHeader extends Component {
	////////////////////
	// HANDLER METHODS//
	////////////////////

	/**
	 * The handler invoked when the back button is pressed
	 * Uses the History object to navigate to the previous screen
	 */
	_handleBackButtonPress() {
		// preserve context
		const _this = this;
		History.goBack();
	}

	////////////////////
	// RENDER METHODS //
	////////////////////

	/**
	 * The function used to render the back button
	 * Checks whether the current route is the app root:
	 * If so, the back button is not rendered
	 * If not, the back button is rendered, assigned an onClick handler, and a style
	 */
	_renderBackButton() {
		// preserve context
		const _this = this;

		if (History.location.pathname === `/`) {
			return null;
		} else {
			return (
				<Button onClick={_this._handleBackButtonPress.bind(_this)} bsStyle="link">
					<FaChevronLeft size={28} />
				</Button>
			);
		}
	}

	/**
	 * The function used to render the navigation header links
	 * Renders a link for every link config specified in the "show" property of the current link config
	 */
	_renderLinks() {
		// preserve context
		const _this = this;

		/**
		 * In order to understand how this function works, you will need to understand how React component props work
		 * "props" refers to properties on a component that are specified at render time
		 * 
		 * Below, you can see an example of props being assigned to components in the forEach lambda function running over every link that will be shown
		 * Take this line for example:
		 * <LinkContainer to={linkConfig.path} color="blue" key={`link_${index}`}>
		 * 
		 * This tells our React renderer to create a LinkContainer component and assigns values to the "to", "color", and "key" props of that LinkContainer
		 * If we were to look in the code for the LinkContainer's render method, we would find references to props.to and props.color that
		 * would be used to change the LinkContainer's appearance and behavior
		 * 
		 * In this component (AppHeader), we are using the "links" prop to store link configuration objects that can be used to render every possible
		 * link that will be shown in the header of the app
		 * 
		 * Where did these objects come from? Look at the render function in App.js to find this line:
		 * <AppHeader links={_this.state.links} />
		 * 
		 * We create (and manage) the link configurations in App, and pass them into our AppHeader at render time
		 * Consequently, our AppHeader takes and interprets the link configurations at its render time, allowing it to dynamically change which links
		 * to show and assign them where to link to
		 */

		//Get the current link config from the current route
		const currentLink = _this.props.links.find((linkConfig) => { return linkConfig.path === History.location.pathname; });
		if (currentLink == null) {
			return null;
		}

		//Use the "show" property in the current link config to find which links should be rendered, and get their link configs
		const showLinks = _this.props.links.filter((linkConfig) => { return currentLink.show.includes(linkConfig.path); });
		const renderLinks = [];

		//Iterate over every link config that should be shown on this page
		//For each one, create a button that navigates to the path specified in the link config when pressed
		showLinks.forEach((linkConfig, index) => {
			renderLinks.push((
				<LinkContainer to={linkConfig.path} color="blue" key={`link_${index}`}>
					<Button bsStyle="link">
						<linkConfig.icon size={24} /> {linkConfig.label}
					</Button>
				</LinkContainer>
			));
		});

		return renderLinks;
	}

	////////////////////////////
	// REACT LIFECYCLE METHODS//
	////////////////////////////

	render() {
		// preserve context
		const _this = this;

		return (
			<div>
				<div className="container-fluid d-flex justify-content-start" style={{ backgroundColor: theme.dark }}>
					<img src={logo} className="App-logo" alt="AXOM Catalyst" />
					<h3 style={{ color: theme.light }}>Catalyst 2018</h3>
				</div>
				<div className="container-fluid" style={{ backgroundColor: theme.primary }}>
					{_this._renderBackButton()}
					{_this._renderLinks()}
				</div>
			</div>
		);
	}
};

export { AppHeader };
export default AppHeader;
