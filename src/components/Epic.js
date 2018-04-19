import React from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import {displayStories}  from "../actions/actions.js";

/**
 * Epic component. Responsible for displaying the information a specific Epic.
 */
class Epic extends React.Component {

	/**
	 * Component constructor that takes props, initiates and returns an instance of the
	 * Epic component.
	 * @param {Object} props The props (parameters) used to initiate and return an instance
	 * of the Epic component.
	 * The props include: @param {string} issueId The ID of the specific Epic
	 * 					  @param {Object} data The epics sub-state
	 */
    constructor(props){
		super(props)
	}

	/**
	 * Fires the "DISPLAY_STORIES" action to display the stories of one specific Epic (see
	 * action.js).
	 * @param {string} epicId The ID of the specific Epic
	 */
	displayStories(epicId){
		this.props.displayStories(epicId)
	}


    render(){

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

function mapStateToProps(state){
  return {
		data: state.epics
	};
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({displayStories}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Epic);
