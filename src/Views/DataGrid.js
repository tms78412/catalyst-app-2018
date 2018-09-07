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
const QUERY_DATE_FORMAT = `YYYY-MM-DD`;
const TIME_FORMAT = `hh:mm a`;

const DataGrid = class DataGrid extends Component {
	constructor() {
		super();

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

	dataItemSort(itemA, itemB) {
		return moment(itemA.airstamp).diff(moment(itemB.airstamp));
	}

	////////////////
	// API METHODS//
	////////////////

	_getShowData() {
		// preserve context
		const _this = this;

		_this.setState({
			dataStatus: `fetching`
		});

		axios.get(`http://api.tvmaze.com/schedule`, {
			params: {
				country: `US`,
				date: _this.state.selectedDate.format(QUERY_DATE_FORMAT)
			}
		})
			.then((response) => {
				const orderedData = response.data.sort(_this.dataItemSort);
				_this.setState({
					dataResults: orderedData,
					dataStatus: `fetched`
				});
			})
			.catch((err) => {
				_this.setState({
					dataResults: [],
					dataStatus: `error`
				});
			});
	}

	////////////////////
	// HANDLER METHODS//
	////////////////////

	_handleDateChange(date) {
		// preserve context
		const _this = this;

		_this.setState({
			dataStatus: `unset`,
			selectedDate: date,
			currentPage: 0,
		});
	}

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

	_renderIndicator() {
		// preserve context
		const _this = this;

		if (_this.state.dataStatus === `fetching`) {
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

		_this._getShowData();
	}

	componentDidUpdate() {
		// preserve context
		const _this = this;

		if (_this.state.dataStatus === `unset`) {
			_this._getShowData();
		}
	}

	render() {
		// preserve context
		const _this = this;

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
