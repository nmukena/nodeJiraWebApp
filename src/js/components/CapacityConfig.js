import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";
import { Provider } from  "react-redux";
import Team from "./Team";
import store from "../store.js";

@connect((store)=>{
    return {
        data: store.epics.allEpics,
        teams: store.epics.epicByTeam,
        state: store.epics,
        capacity: store.capacity,
        connection: store.connection
    };
})

export default class CapacityConfig extends React.Component {
    constructor(props){
        super(props)
        this.props.dispatch(actions.getAllEpics(this.props.state.projectId))
    }

    shouldComponentUpdate(){
        if (this.props.data.issues&&this.props.state.epics){
            if (this.props.data.issues.length==Object.keys(this.props.state.epics).length){
                return false
            }
        }
        return true
    }

    displayEpics(project){
        this.props.dispatch(actions.displayEpics(project))
    }

    displayIndex(){
        this.props.dispatch(actions.displayIndex())
    }

    setTeamCapacities(team, target, event){
        this.props.dispatch(actions.setTeamCapacities(team, target, event.target.value))
    }

    logDatabase(state){
        this.props.dispatch(actions.logDatabase(state))
    }

    render(){
        if (this.props.data.issues){
            var epics = this.props.data.issues
            for (var i = 0; i<epics.length; i++){
                this.props.dispatch(actions.getEpic(epics[i].key))
            }
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
                        <div onClick={()=>this.displayEpics(this.props.state.projectId)} className="login-button">
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
        this.props.dispatch(actions.displayEpics(this.props.state.projectId))
    }
}