import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";
import { Provider } from  "react-redux"
import Story from "./Story"
import store from "../store.js"

@connect((store)=>{
    return {
        data: store.storiesByEpics,
        state: store
    };
})

export default class AllStoriesByEpic extends React.Component {
    constructor(props){
        super(props)
        this.props.dispatch(actions.getStoriesByEpic(this.props.epicId))
    }

    shouldComponentUpdate(){
        allStories = this.props.state.allStories
        var notReady = true
        if (allStories){
            for (var i = 0; i<allStories.length; i++){
                notReady = (allStories[i]==null)
            }
        } 
        if (this.props.data.issues&&this.props.state.allStories[this.props.epicId]){
            if (this.props.data.issues.length==Object.keys(this.props.state.allStories[this.props.epicId]).length){
                return false
            }
        }
        return true

    }

    render(){
        var stories
        if (this.props.data[this.props.epicId]){
            var stories = this.props.data[this.props.epicId].issues
            for (var i = 0; i<stories.length; i++){
                this.props.dispatch(actions.getStory(stories[i].key))
            }
            if(this.props.state.allStories[this.props.epicId]&&
                stories.length == Object.keys(this.props.state.allStories[this.props.epicId]).length){
                var displayStories = stories.map(epic => {
                    return (
                        <div key={epic.id} className="epic-type">
                            <Provider store={store}>
                                <Story storyId={epic.key}/>
                            </Provider>
                        </div>
                    )
                });
                return(
                    <div className="epic-row-sprint">
                            {displayStories}
                    </div>
        
                )
            }
        }else if (!this.props.data){
            return(
                <div className="epic-row-sprint">
                    Stories failed to load
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