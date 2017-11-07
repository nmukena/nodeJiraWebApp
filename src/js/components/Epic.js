import React from "react";
import { connect } from "react-redux";
import axios from 'axios';
import * as actions from "../actions/actions.js";
import store from "../store.js"

var API_SERVER="http://localhost:3000";

@connect((store)=>{
    return {
		data: store,
    };
})

export default class Epic extends React.Component {


    constructor(props){
		super(props)
	}

    render(){

		const epics = this.props.data.epics

		if (this.error){
			return(
				<div>
				<span>Epic {this.props.issueId} </span><br/>
				This epic is not available.
				</div>
			);	
		} else if (epics) {
			const epicsDict = epics[this.props.issueId].issues[0].fields
			return(
			<div>
				<span>Epic {epicsDict.key} </span><br/>
				<span>{epicsDict.summary}</span><br/>
				<span>Target completion: {epicsDict.customfield_10501.value} </span><br/>
				<span>Scrum Team: {epicsDict.customfield_10500.value} </span><br/>
			</div>);
		} else {
			return(
				<div>
				<span>Epic {this.props.issueId} </span><br/>
				This epic has not been loaded yet.
				</div>
			);
		}

	}
}