import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";
import { Provider } from  "react-redux"
import Target from "./Target"
import store from "../store.js"

@connect((store)=>{
    return {
        teams: store.epicByTeam,
        targetCompletions: store.target_completions,
        state: store
    };
})

export default class Team extends React.Component {
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