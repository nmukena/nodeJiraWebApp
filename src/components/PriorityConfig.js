import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAllEpics, getAllEpicsSuccess, getAllEpicsError, displayEpics, displayIndex, setEpicPriority, logPriority, logPrioritySuccess, getEpic, getEpicSuccess} from "../actions/actions.js";
import axios from 'axios'
import Team from "./Team";

import api_server from '../API_SERVER';
var API_SERVER = api_server();

class PriorityConfig extends React.Component {
    constructor(props){
        super(props)
    }


    displayEpics(project){
        this.props.displayEpics(project)
    }

    displayIndex(){
        this.props.displayIndex()
    }

    setEpicPriority(epic, event){
        this.props.setEpicPriority(epic, event.target.value)
    }

    logPriority(state){
        this.props.logPriority(state)
        this.props.logPrioritySuccess(state)
    }



    render(){
        if (this.props.priority.priorities){
            var priorities = this.props.priority.priorities
            var epics = Object.keys(priorities).sort()
            var displayPriorities = epics.map(epic => {
                return (
                    <tr key={epic}>
                        <td>{epic}</td>
                        <td>{priorities[epic].totalPoints}</td>
                        <td key={epic}>
                        <input type='text' style={{color: 'black'}} onChange={this.setEpicPriority.bind(this, epic)} defaultValue={priorities[epic].priority}/>
                        </td>
                    </tr>
                )
            })

            return(
                <div className="team-row">
                    <table>
                        <tbody>
                            <tr>
                                <th scope="col">Epic</th>
                                <th scope="col">Points</th>
                                <th scope="col">Priority</th>
                            </tr>
                            {displayPriorities}
                        </tbody>
                    </table>
                    <div className="login-button-container">
                        <div onClick={()=>this.displayEpics(this.props.epicstate.projectId)} className="login-button">
                            See Epics!
                        </div>
                    </div>
                    <div className="login-button-container">

                        <div onClick={()=>this.logPriority(this.props.priority)} className="login-button">
                            Submit Priorities!
                        </div>
                    </div>
                    <div className="login-button-container">
                        <div onClick={()=>this.displayIndex()} className="login-button">
                            Back to Index!
                        </div>
                    </div>
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

    handleClick(event) {
        // Encrypt
        this.props.displayEpics(this.props.epicstate.projectId)
    }
}

function mapStateToProps(state){
  return {
    data: state.epics.allEpics,
    teams: state.epics.epicByTeam,
    epicstate: state.epics,
    capacity: state.capacity,
    connection: state.connection,
    priority: state.priority
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({getAllEpics, getAllEpicsSuccess, getAllEpicsError, displayEpics, displayIndex, setEpicPriority, logPriority, logPrioritySuccess, getEpic, getEpicSuccess}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PriorityConfig);
