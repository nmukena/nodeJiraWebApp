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

            }
        )
        var teamEpicObj = displayEpics[0].props.children._owner.stateNode.props.teams;
        var teamEpicArray = Object.keys(teamEpicObj).map(function(key){
            return teamEpicObj[key];
        });

        for (var i = 0; i < teamEpicArray.length; i++){
            console.log(teamEpicArray[i]);
            for(var x = 0; x < teamEpicArray[i].length; x++){
                console.log(teamEpicArray[i][x]);
            }
        }



            return(

                <div>
                     {/* {console.log(displayEpics[0].props.children._owner.stateNode.props.teams)} */}



                    <div className="team-type">
                        <div className="team-name col-1 col-pad">
                            {this.props.teamName}
                        </div>
                            <div id="sprint1" className="sprint-team col-2.75 col-pad">
                            {
                                displayEpics
                            }</div>
                            <div id="sprint2"className="sprint-team col-2.75 col-pad">{displayEpics}</div>
                            
                            <div id="sprint3"className="sprint-team col-2.75 col-pad">{displayEpics}</div>
                            <div id="sprint4"className="sprint-team col-2.75 col-pad">{displayEpics}</div>
                            
                    </div>
                </div>
            )
        }

        var date = '';
        
        

        return(
            <div className="team-type">
                    <i class="fa fa-refresh fa-spin fa-5x fa-fw loading"></i>
                    <p>Wait For It...</p>
            </div>
        )
    }
}