import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";
import { Provider } from  "react-redux"
import Epic from "./Epic"
import store from "../store.js"

/**
 * Connects to the Redux store and adds the epics substate (state attribute), 
 * the info on teams (teams attribute), target completion dates (targetCompletion attribute), 
 * and target completion dates by teams (targetByTeam attribute) to the props of the component.
 */
@connect((store)=>{
    return {
        teams: store.epics.epicByTeam,
        targetCompletions: store.epics.target_completions,
        targetByTeam: store.epics.targetByTeam,
        state: store.epics
    };
})

/**
 * Target component. Responsible for displaying the Epics for one Target Completion date for 
 * one Team.
 */
export default class Target extends React.Component {
	/**
	 * Component constructor that takes props, initiates and returns an instance of the
	 * Target component.
	 * @param {Object} props The props (parameters) used to initiate and return an instance 
	 * of the Target component.
	 * The props include: @param {string} teamName The name of the specific Team
     *                    @param {string} targetComp The name of the Target Completion Date ("Sprint 1 - Week 2")
     *                    @param {Object} teams Object storing info on Teams, their Target Completion dates, and Epics
     *                    @param {list} targetCompletions List of all the Target Completion Dates of the Project
	 * 					  @param {Object} state The epics sub-state
	 */
    constructor(props){
        super(props)
    }

    render(){
        var teams = this.props.teams
        var target_completion = this.props.targetComp
        if (teams[this.props.teamName][target_completion]){
            var epics = teams[this.props.teamName][target_completion]
            var displayEpics = epics.map(item => {
                var epic = item.issues[0]
                return (
                    <div key={epic.id} className="epic-type">
                        <Provider store={store}>
                            <Epic issueId={epic.key}/>
                        </Provider>
                    </div>
                )
            }
        )

            return(
                 <div>{displayEpics}</div>
            )
        }

        var date = '';
        
        

        return(
            <div>
                    <i class="fa fa-refresh fa-spin fa-5x fa-fw loading"></i>
                    <p>Wait For It...</p>
            </div>
        )
    }
}