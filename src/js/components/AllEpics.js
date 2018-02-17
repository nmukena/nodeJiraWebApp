import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";
import { Provider } from  "react-redux";
import Team from "./Team";
import store from "../store.js";

/**
 * Connects to the Redux store and adds the epics substate (state attribute), 
 * the info on teams (teams attribute), and target completion dates 
 * (targetCompletion attribute) to the props of the component.
 */
@connect((store)=>{
    return {
        data: store.epics.allEpics,
        teams: store.epics.epicByTeam,
        state: store.epics,
        connection: store.connection
    };
})

/**
 * AllEpics component. Responsible for displaying all the Epics in a specific Project by
 * the Teams they are assigned to and by the Target Completion Date they are supposed 
 * to be completed by.
 */
export default class AllEpics extends React.Component {
    /**
     * Component constructor that takes props, initiates and returns the AllEpics instance
     * which displays all the Epics for a specific Project.
     * @param {Object} props
	 * The props include: @param {string} projectId The ID of the specific Project
     *                    @param {Object} data JSON object containing all the Epics
     *                    @param {Object} teams Object storing info on Teams, their Target Completion dates, and Epics
     *                    @param {Object} state The epics sub-state
	 * 					  @param {Object} connection The connection sub-state
     */
    constructor(props){
        super(props)
        this.props.dispatch(actions.getAllEpics(this.props.projectId))
    }

    /**
     * Helps avoid infinite loop. It prevents further updates as soon as all the epics 
     * have been collected.
     * this.props.data serves as the record of all the existing epics.
     * this.props.state.epics is the record of all collected epic details that are received
     * progressively. As soon as they match, this component should stop changing to prevent
     * infinite loops.
     */
    shouldComponentUpdate(){
        if (this.props.data.issues&&this.props.state.epics){
            if (this.props.data.issues.length==Object.keys(this.props.state.epics).length){
                return false
            }
        }
        return true
    }

    render(){
        if (this.props.data.issues){
            var epics = this.props.data.issues
            for (var i = 0; i<epics.length; i++){
                this.props.dispatch(actions.getEpic(epics[i].key))
            }
            var teamNames = Object.keys(this.props.teams).sort()
            var displayTeams = teamNames.map(name => {
                return (
                    <div key={name} className="team-type">
                        <Provider store={store}>
                            <Team teamName={name}/>
                        </Provider>
                    </div>
                )
            });
            return(
                <div className="team-row">
                    {displayTeams}
                </div>
            )
        }else if (!this.props.data){
            return(
                <div className="team-row">
                    Epics failed to load
                </div>
            )
        }
        return(
            <div className="team-row">
                <i class="fa fa-refresh fa-spin fa-5x fa-fw loading"> </i>
                <p>Wait For It...</p>
            </div>
        )
    }
}