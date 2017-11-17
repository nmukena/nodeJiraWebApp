import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";
import { Provider } from  "react-redux"
import Epic from "./Epic"
import store from "../store.js"

@connect((store)=>{
    return {
        teams: store.epicByTeam,
        targetCompletions: store.target_completions,
        targetByTeam: store.targetByTeam,
        state: store
    };
})

export default class Target extends React.Component {
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