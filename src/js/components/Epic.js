import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";
import store from "../store.js"


@connect((store)=>{
		return {
			data: store.epics,
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
		console.log(store);
		const data = this.props.data
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
			var target = "Not Specified"
			var team = "Not Specified"
			if (epicsDict[data.TARGET_COMPLETION_FIELD]){
				target = epicsDict[data.TARGET_COMPLETION_FIELD].value
			}
			if (epicsDict[data.SCRUM_TEAM_FIELD]){
				team = epicsDict[data.SCRUM_TEAM_FIELD].value
			}
			return(
			<div>
				<h2>Epic {this.props.issueId} </h2>
				<h3>{epicsDict.summary}</h3>
				<article>Target completion: {target} </article>
				<p>Scrum Team: {team}</p>
				<button class="button" onClick={()=>this.displayStories(this.props.issueId)}>
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