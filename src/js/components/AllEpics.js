import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";
import { Provider } from  "react-redux"
import Epic from "./Epic"
import store from "../store.js"

@connect((store)=>{
    return {
        data: store.allEpics,
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
        var epics
        if (this.props.data.issues){
            var epics = this.props.data.issues
            for (var i = 0; i<epics.length; i++){
                this.props.dispatch(actions.getEpic(epics[i].key))
            }
            if(this.props.state.epics&&epics.length == Object.keys(this.props.state.epics).length){
                var displayEpics = epics.map(epic => {
                    return (
                        <div key={epic.id} className="epic-type">
                            <Provider store={store}>
                                <Epic issueId={epic.key}/>
                            </Provider>
                        </div>
                    )
                });
                return(
                    <div className="epic-row-sprint">
                            {displayEpics}
                    </div>
        
                )
            }
        }else if (!this.props.data){
            return(
                <div className="epic-row-sprint">
                    Epics failed to load
                </div>
    
            )
        }
        return(
            <div className="epic-row-sprint">
                Wait for it...
            </div>

        )
    }
}