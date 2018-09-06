//Dependencies
import React, { Component } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import {
	Button,
	Grid,
	Row,
	Col,
	Navbar,
	Nav,
	Panel
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

//Local dependencies
import History from './../History';
import logo from './../Assets/logo.svg';

//Instantiated
const AppHeader = class AppHeader extends Component {
	////////////////////
	// HANDLER METHODS//
	////////////////////
	_handleBackButtonPress() {
		// preserve context
		const _this = this;
		History.goBack();
	}

	////////////////////
	// RENDER METHODS //
	////////////////////

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

	_renderLinks() {
		// preserve context
		const _this = this;

		const currentLink = _this.props.links.find((linkInfo) => { return linkInfo.path === History.location.pathname; });
		if (currentLink == null) {
			return null;
		}

		const showLinks = _this.props.links.filter((linkInfo) => { return currentLink.show.includes(linkInfo.path); });
		const renderLinks = [];
		if (_this.props != null && _this.props.links != null) {
			showLinks.forEach((linkInfo, index) => {
				renderLinks.push((
					<LinkContainer to={linkInfo.path} color="blue" key={`link_${index}`}>
						<Button bsStyle="link">
							<linkInfo.icon size={24}/> {linkInfo.label}
						</Button>
					</LinkContainer>
				));
			});
		}

		return renderLinks;
	}

	////////////////////////////
	// REACT LIFECYCLE METHODS//
	////////////////////////////

	render() {
		// preserve context
		const _this = this;

		return (
			<div style={{ width: `100%` }}>
				<div style={{padding: 5, backgroundColor: `#040b15` }}>
					<img src={logo} className="App-logo" alt="AXOM Catalyst" align="left" />
					<h3 style={{color: `#e2e2e2` }}>Catalyst 2018</h3>
				</div>
				<div style={{padding: 5, backgroundColor: `#08172b`, height: 64 }}>
					{_this._renderBackButton()}
					{_this._renderLinks()}
				</div>
			</div>
		);
	}
};

export { AppHeader };
export default AppHeader;
