//Dependencies
import moment from 'moment';
import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import ReactTable from 'react-table';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { PropagateLoader } from 'react-spinners';

import 'react-table/react-table.css';
import 'react-datepicker/dist/react-datepicker.css';

//Local dependencies

//Instantiated
/** The QUERY_DATE_FORMAT specifies how the "date" query param will be formatted so the API we are using can understand it */
const QUERY_DATE_FORMAT = `YYYY-MM-DD`;
/** The TIME_FORMAT specifies how times will appear in our data table so that users can understand it */
const TIME_FORMAT = `hh:mm a`;

/**
 * Class describing a React component that renders a view containing a data grid displaying TV Show data acquired from the tvmaze.com API
 * @extends Component
 */
const DataGrid = class DataGrid extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dataStatus: `unset`,
			dataResults: [],
			selectedDate: moment(),
			currentPage: 0,
		};
	}

	////////////////////
	// UTILITY METHODS//
	////////////////////

	/**
	 * A method responsible for comparing two TV show data items to sort which should be displayed first
	 * Currently compares their air times to determine which show airs first
	 * @param {Object} itemA The first TV show data object to compare
	 * @param {Object} itemB The Second TV show data object to compare
	 */
	dataItemSort(itemA, itemB) {
		return moment(itemA.airstamp).diff(moment(itemB.airstamp));
	}

	////////////////
	// API METHODS//
	////////////////

	/**
	 * A method that asynchronously retrieves TV show data using the tvmaze.com API
	 * API reference documentation can be found here:
	 * http://www.tvmaze.com/api
	 */
	_getShowData() {
		// preserve context
		const _this = this;

		//Set the "dataStatus" to fetching
		//This allows us to change the render behavior of the DataGrid, e.g. show a loading animation and disable interactions that
		//could conflict with the current task
		_this.setState({
			dataStatus: `fetching`
		});

		/**
		 * axios is a library for making HTTP requests
		 * Reference documentation can be found here:
		 * https://github.com/axios/axios#readme
		 */

		//Use axios to start getting the TV schedule data from the API
		//The "params" object specifies the query params to send with the request (read more about query params here: https://en.wikipedia.org/wiki/Query_string)
		//In this case, we are specifying that we want shows airing in the US (country: `US`) on the date selected in the DatePicker component (date: <formatted date>)
		//This request is run asynchronously, meaning the user can continue to use our App even while it is waiting for the data to be sent
		axios.get(`http://api.tvmaze.com/schedule`, {
			params: {
				country: `US`,
				date: _this.state.selectedDate.format(QUERY_DATE_FORMAT)
			}
		})
			.then((response) => {
				//This function runs after the request successfully retrieves the data
				//We first sort the data according to whatever metric we want (in this case, air time)
				const orderedData = response.data.sort(_this.dataItemSort);
				//Next we store the data in the DataGrid's state, allowing it to access the information elsewhere in the component (in this file)
				//We also update our "dataStatus" variable to inform the DataGrid that the data was successfully fetched and can be displayed
				_this.setState({
					dataResults: orderedData,
					dataStatus: `fetched`
				});
			})
			.catch((err) => {
				//This function runs if the request fails
				//The "err" variable passed to it can be accessed to determine the reason for failure
				//For now, we simply set the data to an empty array (display nothing in the grid)
				//and update our "dataStatus" variable to inform the DataGrid that an error occurred
				//In the future, we can use the "err" and error status to implement a more robust error handler that can be used to inform the user
				//that a problem occurred and what steps they can take to resolve it
				_this.setState({
					dataResults: [],
					dataStatus: `error`
				});
			});
	}

	////////////////////
	// HANDLER METHODS//
	////////////////////

	/**
	 * The handler invoked when the user uses the DatePicker to select a new date
	 * Updates the state to inform the DataGrid that it needs to get new data
	 * @param {moment} date A moment object defining the new date the user selected
	 */
	_handleDateChange(date) {
		// preserve context
		const _this = this;

		//Update dataStatus to "unset" to tell our component that it needs to start a request for new data
		//Update the selectedDate to the newly selected date so that the request for new data can use this date in its query
		//Update the currentPage to 0 so that the DataGrid will start on the first page of results, in case the user had changed page on the DataGrid
		_this.setState({
			dataStatus: `unset`,
			selectedDate: date,
			currentPage: 0,
		});
	}

	/**
	 * The handler invoked when the user changes the page on the ReactTable
	 * Updates the state to change the currentPage number to the newly selected page number
	 * @param {Number} pageNumber The number (actually index) of the newly selected page
	 */
	_handlePageChange(pageNumber) {
		// preserve context
		const _this = this;
		
		_this.setState({
			currentPage: pageNumber,
		});
	}

	////////////////////
	// RENDER METHODS //
	////////////////////

	/**
	 * The function used to render the DatePicker the user can interact with to select a different air date
	 */
	_renderAirDatePicker() {
		// preserve context
		const _this = this;
		
		return (
			<div className="d-flex justify-content-around">
				<div className="mr-1">
					<label>Air Date:</label>
				</div>
				<div className="ml-1">
					<DatePicker
						selected={_this.state.selectedDate}
						onChange={_this._handleDateChange.bind(_this)}
						disabled={_this.state.dataStatus === `fetching`}
					/>
				</div>
			</div>
		);
	}

	/**
	 * The function used to render a loading indicator when the DataGrid is fetching data
	 */
	_renderIndicator() {
		// preserve context
		const _this = this;

		//If the dataStatus state variable is set to "fetching", show the indicator; otherwise show nothing
		if (_this.state.dataStatus === `fetching`) {
			//Typically we want to avoid using inline styles like this, but in this case the stying is very specific
			//We render a box that covers the entirety of its neighboring element (the ReactTable) in transparent black
			//Because this box covers the ReactTable, it prevents the user from interacting with it
			//At the center of this box, we place a loading indicator to show the user that work is being done (the data is being retrieved)
			return (
				<div style={{
					position: `absolute`,
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: `#0000002f`,
					display: `flex`,
					justifyContent: `center`,
					alignItems: `center`,
					zIndex: 2
				}}
				>
					<PropagateLoader
						sizeUnit={`px`}
						size={24}
						color={`#03af11`}
					/>
				</div>
			);
		} else {
			return null;
		}
	}

	////////////////////////////
	// REACT LIFECYCLE METHODS//
	////////////////////////////

	componentDidMount() {
		// preserve context
		const _this = this;

		//Get the show data as soon as this component is mounted for the first time
		_this._getShowData();
	}

	componentDidUpdate() {
		// preserve context
		const _this = this;

		//If the component updated and that update caused the data to be unset (for instance, when the user selects a new date), get new data
		if (_this.state.dataStatus === `unset`) {
			_this._getShowData();
		}
	}

	render() {
		// preserve context
		const _this = this;

		/**
		 * This is the configuration object used to tell our ReactTable how to render our columns
		 * Relevent reference information can be found here, in the Columns section:
		 * https://react-table.js.org/#/story/readme
		 * 
		 * For each column, we specify:
		 * Header - The name shown on the table at the top of the column
		 * id - The property used by the table to internally reference this header's information
		 * accessor - A function describing how the data should be retrieved for each data item
		 */
		const columnConfig = [
			{
				Header: `Name`,
				id: `name`,
				accessor: (item) => { return item.show.name; }
			},
			{
				Header: `Start Time`,
				id: `startTime`,
				accessor: (item) => { return moment(item.airstamp).format(TIME_FORMAT); },
				sortMethod: _this.dataItemSort
			},
			{
				Header: `End Time`,
				id: `endTime`,
				accessor: (item) => { return moment(item.airstamp).add({ minutes: item.runtime }).format(TIME_FORMAT); },
				sortMethod: _this.dataItemSort
			},
			{
				Header: `Network`,
				id: `network`,
				accessor: (item) => {
					if (item.show.network != null) {
						return item.show.network.name;
					} else {
						return `N/A`;
					}
				}
			},
		];

		return (
			<Panel className="container-fluid">
				<div className="d-flex justify-content-center">
					<div className="mr-auto align-self-center">
						{_this._renderAirDatePicker()}
					</div>
					<div className="mr-auto">
						<h1>TV Shows</h1>
					</div>
				</div>
				<div className="position-relative">
					{_this._renderIndicator()}
					<ReactTable
						page={_this.state.currentPage}
						onPageChange={_this._handlePageChange.bind(_this)}
						data={_this.state.dataResults}
						columns={columnConfig}
						defaultPageSize={18}
						showPageSizeOptions={false}
						noDataText={`No results found.`}
					/>
					<label>Found {_this.state.dataResults.length} shows.</label>
				</div>
			</Panel>
		);
	}
};

export { DataGrid };
export default DataGrid;
