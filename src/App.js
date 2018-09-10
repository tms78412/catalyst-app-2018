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
/**
 * This linkConfig array describes links to be added to the header at the top of the page
 * 
 * The AppHeader class defined in Components/AppHeader.js has a method (_renderLinks) to interpret each item defined and
 * render it in the navigation portion of the header
 * 
 * Each item contains these four properties:
 * path - Describes where the link navigates to when clicked
 * label - The text to accompany the link
 * icon - The vector icon component (from react-icons) to render with the link
 * show - An array containing a list of paths where this icon will be rendered
 * 
 * NOTE: I wrote this implementation hastily and did not use quality coding practices
 * Ideally, the "show" property would not be necessary, and the currently rendered view would describe which links to show
 */
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

/**
 * NOTE: This file (App.js) serves as a reference for all other React views/components defined in the project
 * If you have a question about how any other component works, you can probably find the answer here
 * However, the comments in other component files will not be as detailed as they are here
 */

/**
 * JSDoc:
 * Our project uses the JSDoc format for commenting classes and functions
 * This allows us to generate documentation for our project automatically, provided we follow the format appropriately
 * 
 * Reference documentation:
 * http://usejsdoc.org/index.html
 */

/**
 * Class describing a React component that renders the main view of the web application
 * @extends Component
 */
class App extends Component {
	/**
	 * App component constructer, for use by React
	 * Do NOT manually instantiate (i.e. new App) this class!
	 * @param {array} props - The props passed into this component when rendered
	 */
	constructor(props) {
		//super is a reference to a class' parent
		//In this case, our class extends React's "Component" class
		super(props);

		//Create a state object with initial values for each state property
		this.state = {
			links: linkConfig
		};
	}

	////////////////////////////
	// REACT LIFECYCLE METHODS//
	////////////////////////////
	/**
	 * This section defines methods for React's "Lifecycle Hooks"
	 * Full reference information can be found here:
	 * https://reactjs.org/docs/react-component.html
	 * 
	 * Below you can find a few common hooks that can be used to solve a variety of problems
	 * 
	 * Perhaps most important is the "render" hook which should be defined for every React component in order for the component to be seen
	 */

	/**
	 * Runs when the component is mounted to the page
	 * Useful for initializing the component
	 * 
	 * Unlike the constructor, which only runs when the component is first created,
	 * componentDidMount runs every time the browser navigates to a page that renders this component
	 */
	componentDidMount() {

	}

	/**
	 * Runs before the component updates and re-renders
	 * If the function returns true, the component will accept the nextProps and nextState values and set them on the component and trigger a re-render
	 * If the function returns false, the component will preserve its current props and state and not re-render
	 * 
	 * Useful for handling invalid data passed into the component
	 * 
	 * @param {array} nextProps - The props that will be set on the component if this function returns true
	 * @param {object} nextState - The state object that will be set on the component if this function returns false
	 */
	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	/**
	 * Runs when the component's props or state are updated
	 * Useful for appropriately handling new data
	 * 
	 * NOTE: Do NOT call setState in this method without specifing a condition (if (...) { this.setState({...}); })
	 * Otherwise you will create an infinite loop
	 * 
	 * @param {array} props - The props the component had before the update; compare with this.props
	 * @param {object} prevState - The state the component had before the update; compare with this.state
	 */
	componentDidUpdate(prevProps, prevState) {

	}

	/**
	 * Runs on component mount, or after an update
	 * Required for a component to properly function, as it defines how the component looks on the web page
	 * 
	 * Should always return a single JSX element
	 */
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
