import React from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import {getAllEpics, getAllEpicsSuccess, getAllEpicsError, getEpic, getEpicSuccess} from "../actions/actions.js";
import axios from 'axios';
import Team from "./Team";

import api_server from '../API_SERVER';
var API_SERVER = api_server();

/**
 * AllEpics component. Responsible for displaying all the Epics in a specific Project by
 * the Teams they are assigned to and by the Target Completion Date they are supposed
 * to be completed by.
 */
class AllEpics extends React.Component {
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

    }

    // componentWillMount(){
    //   this.props.getAllEpics(this.props.projectId)
    //   axios.get(API_SERVER+"/getAllEpics/"+this.props.projectId).then((response)=>{
    //        this.props.getAllEpicsSuccess(response.data)
    //   }).catch((err)=>{
    //       this.props.getAllEpicsError(err.response.status, err.response.statusText)
    //   })
    // }

    /**
     * Helps avoid infinite loop. It prevents further updates as soon as all the epics
     * have been collected.
     * this.props.data serves as the record of all the existing epics.
     * this.props.state.epics is the record of all collected epic details that are received
     * progressively. As soon as they match, this component should stop changing to prevent
     * infinite loops.
     */
    // shouldComponentUpdate(){
    //     if (this.props.data.issues&&this.props.epicstate.epics){
    //         if (this.props.data.issues.length==Object.keys(this.props.epicstate.epics).length){
    //             return false
    //         }
    //     }
    //     return true
    // }

    render(){
      
        if (this.props.data.issues){
            // var epics = this.props.data.issues
            // for (var i = 0; i<epics.length; i++){
            //     this.props.getEpic(epics[i].key)
            //     this.props.getEpicSuccess(epics[i].key)
            // }
            var teamNames = Object.keys(this.props.teams).sort()
            var displayTeams = teamNames.map(name => {
                return (
                    <div key={name} className="team-type">

                            <Team teamName={name}/>

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

function mapStateToProps(state){
  return {
    data: state.epics.allEpics,
    teams: state.epics.epicByTeam,
    epicstate: state.epics,
    connection: state.connection
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({getAllEpics, getAllEpicsSuccess, getAllEpicsError, getEpic, getEpicSuccess}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AllEpics);
