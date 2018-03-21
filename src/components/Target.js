import React from "react";
import { connect } from "react-redux";
import Epic from "./Epic"

/**
 * Target component. Responsible for displaying the Epics for one Target Completion date for
 * one Team.
 */
class Target extends React.Component {
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
                        
                            <Epic issueId={epic.key}/>

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

function mapStateToProps(state){
  return {
    teams: state.epics.epicByTeam,
    targetCompletions: state.epics.target_completions,
    targetByTeam: state.epics.targetByTeam
  };
}

export default connect(mapStateToProps)(Target);
