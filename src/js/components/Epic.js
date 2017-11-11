import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";
import store from "../store.js"


@connect((store)=>{
		return {
			data: store,
		};
	}, 
)

export default class Epic extends React.Component {


    constructor(props){
		super(props)
	}

	displayStories(epicId){
		this.props.dispatch(actions.displayStories(epicId))
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
				<span>Epic {this.props.issueId} </span><br/>
				<span>{epicsDict.summary}</span><br/>
				<span>Target completion: {epicsDict.customfield_10501.value} </span><br/>
				<span>Scrum Team: {epicsDict.customfield_10500.value} </span><br/>
				<button onClick={()=>this.displayStories(this.props.issueId)}>
                    Display Stories
                </button>
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