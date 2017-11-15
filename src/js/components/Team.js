import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";
import { Provider } from  "react-redux"
import Epic from "./Epic"
import store from "../store.js"

@connect((store)=>{
    return {
        teams: store.epicByTeam,
        state: store
    };
})

export default class Team extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        var teams = this.props.teams
        //console.log(this.props);
        //if(this.props.)


        if (teams[this.props.teamName]){
            var displayEpics = teams[this.props.teamName].map(json => {
                var epic = json.issues[0]
                return (
                    <div key={epic.id} className="epic-type">
                        <Provider store={store}>
                            <Epic issueId={epic.key}/>
                        </Provider>
                    </div>
                )
            })
            return(
                <div>
                    <div className="team-type">
                        <div className="team-name">
                            {this.props.teamName}
                        </div>
                            {displayEpics}
                    </div>
                </div>
            )
        }
        return(
            <div className="team-type">
                    <i class="fa fa-refresh fa-spin fa-5x fa-fw loading"></i>
                    <p>Wait For It...</p>
            </div>
        )
    }
}