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
        this.displayStories = []
    }

    shouldComponentUpdate(){
        if (this.props.data[this.props.epicId]&&
            this.displayStories.length==this.props.data[this.props.epicId].issues.length){
            return false
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
            this.displayStories = stories.map(story => {
                return (
                    <div key={story.id} className="epic-type">
                        <Provider store={store}>
                            <Story storyId={story.key}/>
                        </Provider>
                    </div>
                )
            });
            return(
                <div className="epic-row-sprint">
                        {this.displayStories}
                </div>
    
            )
        }else if (!this.props.data){
            return(
                <div className="epic-row-sprint">
                    Stories failed to load
                </div>
    
            )
        }
        return(
            <div className="epic-row-sprint">
                <i class="fa fa-refresh fa-spin fa-5x fa-fw loading"> </i>
                <p>Wait For It...</p>
            </div>
        )
    }
}