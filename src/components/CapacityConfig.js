import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAllEpics, getAllEpicsSuccess, getAllEpicsError, displayEpics, displayIndex, setTeamCapacities, logDatabase, logDatabaseSuccess, getEpic, getEpicSuccess} from "../actions/actions.js";
import axios from 'axios'
import Team from "./Team";

import api_server from '../API_SERVER';
var API_SERVER = api_server();

class CapacityConfig extends React.Component {
    constructor(props){
        super(props)
    }

    // componentWillMount(){
    //   this.props.getAllEpics(this.props.epicstate.projectId)
    //   axios.get(API_SERVER+"/getAllEpics/"+this.props.epicstate.projectId).then((response)=>{
    //         this.props.getAllEpicsSuccess(response.data)
    //   }).catch((err)=>{
    //       this.props.getAllEpicsError(err.response, err.response)
    //   })
    //
    //
    // }
    //
    // shouldComponentUpdate(){
    //     if (this.props.data.issues&&this.props.epicstate.epics){
    //         if (this.props.data.issues.length==Object.keys(this.props.epicstate.epics).length){
    //             return false
    //         }
    //     }
    //     return true
    // }

    displayEpics(project){
        this.props.displayEpics(project)
    }

    displayIndex(){
        this.props.displayIndex()
    }

    setTeamCapacities(team, target, event){
        this.props.setTeamCapacities(team, target, event.target.value)
    }

    logDatabase(state){
        this.props.logDatabase(state)
        this.props.logDatabaseSuccess(state)
    }

    render(){
      console.log('rerender');
        if (this.props.data.issues){
            // var epics = this.props.data.issues
            // for (var i = 0; i<epics.length; i++){
            //      this.props.getEpic(epics[0].key)
            //      this.props.getEpicSuccess(epics[0].key)
            // }

            var teamNames = Object.keys(this.props.teams).sort()
            var teams = this.props.capacity.teams
            var target_completions = this.props.capacity.target_completions
            var displayTeams = teams.map(name => {
                var displayTargets = target_completions.map(target => {
                    return (
                        <td key={target}>Capacity:
                        <input type='text' style={{color: 'black'}} onChange={this.setTeamCapacities.bind(this, name, target)} defaultValue={this.props.capacity.teams_capacities[name][target]}/>
                        </td>
                    )
                })

                return (
                    <tr key={name}>
                    <th scope="row">{name}</th>
                    {displayTargets}
                    </tr>
                )
            });

            var columns = target_completions.map(target => {return (<th key={target} scope="col">{target}</th>) })
            return(
                <div className="team-row">
                    <table>
                        <tbody>
                            <tr>
                                <td></td>
                                {columns}
                            </tr>
                            {displayTeams}
                        </tbody>
                    </table>
                    <div className="login-button-container">
                        <div onClick={()=>this.displayEpics(this.props.epicstate.projectId)} className="login-button">
                            See Epics!
                        </div>
                    </div>
                    <div className="login-button-container">
                        <div onClick={()=>this.logDatabase(this.props.capacity)} className="login-button">
                            Submit Capacities!
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
    connection: state.connection
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({getAllEpics, getAllEpicsSuccess, getAllEpicsError, displayEpics, displayIndex, setTeamCapacities, logDatabase, logDatabaseSuccess, getEpic, getEpicSuccess}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CapacityConfig);
