import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";
import { Provider } from  "react-redux"
import Team from "./Team"
import store from "../store.js"

@connect((store)=>{
    return {
        data: store.allEpics,
        teams: store.epicByTeam,
        state: store
    };
})

export default class AllEpics extends React.Component {
    constructor(props){
        super(props)
        this.props.dispatch(actions.getAllEpics(this.props.projectId))
    }

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
            var teamNames = Object.keys(this.props.teams)
            var displayTeams = teamNames.map(name => {
                return (
                    <Provider store={store}>
                        <Team teamName={name}/>
                    </Provider>
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
                Wait for it...
            </div>
        )
    }
}