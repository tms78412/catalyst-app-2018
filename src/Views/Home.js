//Dependencies
import React, { Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';

//Local dependencies
import theme from './../theme';

//Instantiated
/**
 * Class describing a React component that renders the home view of the App
 */
const Home = class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mouseX: 0,
			mouseY: 0,
			exampleInputText: ``
		};
	}
	////////////////////
	// HANDLER METHODS//
	////////////////////

	/**
	 * The function run whenever the cursor moves over the main body of the Home view. Updates the cursor's stored
	 * position on this component's state.
	 * @param {Object} e An object describing the event triggered by the mouse movement
	 */
	_handleMouseMove(e) {
		// preserve context
		const _this = this;

		_this.setState({
			mouseX: e.screenX,
			mouseY: e.screenY
		});
	}

	/**
	 * The function run whenever the user types in the input field on the Home view. Updates the stored text information
	 * on this component's state.
	 * @param {Object} e An object describing the event triggered by the mouse movement
	 */
	_handleExampleTextChange(e) {
		// preserve context
		const _this = this;
		
		_this.setState({
			exampleInputText: e.target.value
		});
	}

	////////////////////////////
	// REACT LIFECYCLE METHODS//
	////////////////////////////
	render() {
		// preserve context
		const _this = this;

		return (
			<div className="container-fluid flex-col" onMouseMove={_this._handleMouseMove.bind(_this)}>
				<div className="flex-col text-center w-100">
					<h1>Welcome to AXOM Catalyst</h1>
					<h2>Introduction to JavaScript</h2>
				</div>
				<div>
					<p>
						This course will train you in the basics of web development with JavaScript using the React framework. By the end of the course, you will be able to
						create your own web app.
					</p>
					<h4>What is JavaScript?</h4>
					<p>
						JavaScript is a programming language designed to run in a browser. Most modern websites use JavaScript to create interactive interfaces for their users.
						Features like chat boxes, shopping cart management, and login forms are typically implemented in JavaScript. In the past decade, JavaScript has experienced
						an remarkable amount of growth in both the size of the developer community and its overall functionality. Because of this, many cutting-edge web
						technologies are developed in JavaScript, and are typically available for free on <a href="https://github.com/" target="_blank">GitHub</a> and <a href="https://www.npmjs.com/" target="_blank">NPM</a>. However,
						this growth has also created a very confusing and ever-evolving ecosystem where new developers often find difficulty getting started. This course aims to
						help introduce you to the JavaScript environment without overwhelming you.
					</p>
					<h4>What is React?</h4>
					<p>
						<a href="https://github.com/" target="_blank">React</a> defines itself as "A JavaScript <a href="https://en.wikipedia.org/wiki/Library_(computing)" target="_blank">library</a> for
						building <a href="https://en.wikipedia.org/wiki/User_interface" target="_blank">user interfaces</a>". It is basically one
						(<a href="https://en.wikipedia.org/wiki/List_of_JavaScript_libraries#Web-application_related_(MVC,_MVVM)" target="_blank">of many</a>) frameworks
						web developers can use to create interactive web sites.
					</p>
					<p>
						At its core, React simply provides methods for displaying data and taking in user inputs. Take this input field for example:
					</p>
					<FormControl
						type="text"
						width={200}
						value={this.state.exampleInputText}
						placeholder="Enter text here"
						onChange={this._handleExampleTextChange.bind(_this)}
					/>
					<p>You entered "{_this.state.exampleInputText}"</p>
					<p>Or, if you move your mouse over this space, the app can tell your cursor is located at ({_this.state.mouseX}, {_this.state.mouseY}) on the page.</p>
					<p>
						These are examples of taking user input data and using it to display something on the screen. React makes this process simple so that you can collect information
						from various sources and allow your users to view and interact with it in their browser.
					</p>
					<p>
						All the code used to render this page can be found and modified in your example project under the <code>src/Views/Home.js</code> directory. If you would
						like to understand how this page was built, please browse the code and experiment with it. Don't worry about breaking anything; you can always revert
						your changes later.
					</p>
				</div>
			</div>
		);
	}
};

export { Home };
export default Home;
