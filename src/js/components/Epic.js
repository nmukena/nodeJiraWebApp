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
		console.log(store);
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
				<h2>Epic {this.props.issueId} </h2>
				<h3>{epicsDict.summary}</h3>
				<article>Target completion: {epicsDict.customfield_10501.value} </article>
				<p>Scrum Team: {epicsDict.customfield_10500.value }</p>
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