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
        super(props);
        this.state = {
          priorities: null,
          targetCompletions: null,
          teamCapacities: null,
          teams: null,

        };
    }

    componentWillMount(){
      let priorities = this.props.priority.priorities;
      let structuredPriorities = [];
      let teams = this.props.capacity.teams;

      Object.keys(priorities).forEach((key)=>{
        let tempTeams = [];
        Object.keys(priorities[key]).forEach((key2)=>{
          if(key2.includes('Team')){
            tempTeams.push([key2,priorities[key][key2]])
          }
        });

        let emptyTeams = [];
        for(let i = 0; i<teams.length; i++){
          let count = false;
          for(let j=0; j<tempTeams.length; j++){
            if(tempTeams[j][0]===teams[i]){
              count=true;
            }
          }
          if(!count){
            emptyTeams.push([teams[i],0]);
          }else{

          }
        }

        for(let i=0; i<emptyTeams.length; i++){
          tempTeams.push(emptyTeams[i]);
        }

        tempTeams.sort();
        let tempEpic = {epic: key, priority: priorities[key].priority, points: priorities[key].totalPoints, teams: tempTeams.slice()};
        structuredPriorities.push(tempEpic)

      });

      structuredPriorities.sort((a,b)=>{
        return a.priority - b.priority;
      });

      let teamCapacities= JSON.parse(JSON.stringify(this.props.capacity.teams_capacities));

      this.setState({priorities: JSON.parse(JSON.stringify(structuredPriorities)),
        targetCompletions: this.props.capacity.target_completions.slice(),
        teamCapacities: teamCapacities,
        teams: teams});
    }

    burnEpics(){
      console.log(JSON.parse(JSON.stringify(this.state.priorities)));
      let remainingEpics = JSON.parse(JSON.stringify(this.state.priorities));
      let burnableEpics = {};
      for (let i = 0; i<this.state.targetCompletions.length; i++){
        let sprintTeamCapacity = [];



        Object.keys(this.state.teamCapacities).forEach((team)=>{
          sprintTeamCapacity.push([team, this.state.teamCapacities[team][this.state.targetCompletions[i]]]);
        });

        sprintTeamCapacity.sort();

        for(let j=0; j<remainingEpics.length; j++){
          for(let k=0; k<this.state.teams.length; k++){
            if(Number(sprintTeamCapacity[k][1]) !== 0 && remainingEpics[j].teams[k][1] !== 0){
              let result = sprintTeamCapacity[k][1] - remainingEpics[j].teams[k][1];

              if(result>0){

                if(burnableEpics[this.state.teams[k]]){
                  if(burnableEpics[this.state.teams[k]][this.state.targetCompletions[i]]){
                    burnableEpics[this.state.teams[k]][this.state.targetCompletions[i]].push([remainingEpics[j].epic, sprintTeamCapacity[k][0], remainingEpics[j].teams[k][1]]);
                  }else{
                    burnableEpics[this.state.teams[k]][this.state.targetCompletions[i]] = [[remainingEpics[j].epic, sprintTeamCapacity[k][0], remainingEpics[j].teams[k][1]]];
                  }
                }else{
                  burnableEpics[this.state.teams[k]] = {};
                  burnableEpics[this.state.teams[k]][this.state.targetCompletions[i]] = [[remainingEpics[j].epic, sprintTeamCapacity[k][0], remainingEpics[j].teams[k][1]]];
                }

                sprintTeamCapacity[k][1]=result;
                remainingEpics[j].teams[k][1] = 0;
              }else{

                if(burnableEpics[this.state.teams[k]]){
                  if(burnableEpics[this.state.teams[k]][this.state.targetCompletions[i]]){
                    burnableEpics[this.state.teams[k]][this.state.targetCompletions[i]].push([remainingEpics[j].epic, sprintTeamCapacity[k][0], Number(sprintTeamCapacity[k][1])]);
                  }else{
                    burnableEpics[this.state.teams[k]][this.state.targetCompletions[i]] = [[remainingEpics[j].epic, sprintTeamCapacity[k][0], Number(sprintTeamCapacity[k][1])]];
                  }
                }else{
                  burnableEpics[this.state.teams[k]] = {};
                  burnableEpics[this.state.teams[k]][this.state.targetCompletions[i]] = [[remainingEpics[j].epic, sprintTeamCapacity[k][0], Number(sprintTeamCapacity[k][1])]];
                }

                sprintTeamCapacity[k][1]=0;
                remainingEpics[j].teams[k][1] = -1*result;
              }
            }
          }
        }

        let indexSplice = [];

        for(let j=0; j<remainingEpics.length; j++){
          let count = 0;
          for(let k=0; k<this.state.teams.length; k++){
            if(remainingEpics[j].teams[k][1] === 0){
              count=count+1;
            }
          }
          if(count===this.state.teams.length){
            indexSplice.push(j);
          }
        }

        indexSplice.sort();
        let offset =0;
        for(let j=0; j<indexSplice.length; j++){
          let finishedEpic =JSON.parse(JSON.stringify(remainingEpics.splice(j-offset,1)));
          offset=offset+1;
        }
      }

      //console.log('Epics by Target and Team: ', JSON.parse(JSON.stringify(burnableEpics)));

      return burnableEpics;
    }

    render(){
      let epicsByTarget =JSON.parse(JSON.stringify(this.burnEpics()));
        if (this.props.data.issues){

            var teamNames = Object.keys(this.props.teams).sort()
            var displayTeams = teamNames.map(name => {
                return (
                    <div key={name} className="team-type">

                            <Team teamName={name} epicsByTarget={epicsByTarget}/>

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
    connection: state.connection,
    capacity: state.capacity,
    priority: state.priority
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({getAllEpics, getAllEpicsSuccess, getAllEpicsError, getEpic, getEpicSuccess}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AllEpics);
