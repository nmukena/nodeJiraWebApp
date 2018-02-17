import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";
import { Provider } from  "react-redux"
import Target from "./Target"
import store from "../store.js"


/**
 * Connects to the Redux store and adds the epics substate (state attribute), 
 * the info on teams (teams attribute), and target completion dates 
 * (targetCompletion attribute) to the props of the component.
 */
@connect((store)=>{
    return {
        teams: store.epics.epicByTeam,
        targetCompletions: store.epics.target_completions,
        state: store.epics
    };
})

/**
 * Team component. Responsible for displaying the Target Completions Dates for one Team 
 * and the Epics due in each of them.
 */
export default class Team extends React.Component {
    /**
	 * Component constructor that takes props, initiates and returns an instance of the
	 * Team component.
	 * @param {Object} props The props (parameters) used to initiate and return an instance 
	 * of the Team component.
	 * The props include: @param {string} teamName The name of the specific Team
     *                    @param {Object} teams Object storing info on Teams, their Target Completion dates, and Epics
     *                    @param {Object} targetCompletions List of all the Target Completion Dates of the Project
	 * 					  @param {Object} state The epics sub-state
	*/
    constructor(props){
        super(props)
    }


    render(){
        var teams = this.props.teams
        var tCompletions = this.props.targetCompletions
        var displayEpics = []
        if (teams[this.props.teamName]){
            var displayTargets = tCompletions.map((item, i) => {
                    if(teams[this.props.teamName][item]){
                        return (
                            <div key={item+i} className="target-type">
                                <Provider store={store}>
                                    <Target targetComp={item} teamName={this.props.teamName}/>
                                </Provider>
                            </div>
                        )
                    }else{
                        return(
                            <div key={item+i} className="target-type">
                                
                            </div>
                        )
                    }
                }
            )
            return(
                <div>
                    <div className="targets">
                        <div className="team-name col-1 col-pad">
                            {this.props.teamName}
                        </div>
                        <div className="displayTargets">{displayTargets}</div>   
                    </div>
                </div>
            )
        }

        var date = '';
        
        return(
            <div className="target-type">
                    <p>Wait For It...</p>
            </div>
        )
    }
}