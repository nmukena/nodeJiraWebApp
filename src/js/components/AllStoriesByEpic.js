import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";
import { Provider } from  "react-redux"
import Sprint from "./Sprint"
import store from "../store.js"

@connect((store)=>{
    return {
        data: store.stories.storiesByEpics,
        targets: store.stories.storiesByTarget,
        state: store.stories
    };
})

export default class AllStoriesByEpic extends React.Component {
    constructor(props){
        super(props)
        this.props.dispatch(actions.getStoriesByEpic(this.props.epicId))
        this.displayTargets = []
    }

    shouldComponentUpdate(){
        if (this.props.targets[this.props.epicId]&&
            this.displayTargets.length==Object.keys(this.props.targets[this.props.epicId]).length){
            return false
        }
        return true

    }

    render(){
        var stories
        if (this.props.data[this.props.epicId]){
            if (stories = this.props.data[this.props.epicId].issues){
                var stories = this.props.data[this.props.epicId].issues
                for (var i = 0; i<stories.length; i++){
                    this.props.dispatch(actions.getStory(stories[i].key, this.props.epicId))
                }
                var targetList = []
                if(this.props.targets[this.props.epicId]){
                    targetList = Object.keys(this.props.targets[this.props.epicId]).sort()
                    this.displayTargets = targetList.map(target => {
                        return (
                            <div key={target} class="story-background col-2.75 col-pad">
                                <Provider store={store}>
                                    <Sprint target={target} epic={this.props.epicId}/>
                                </Provider>
                            </div>
                        )
                    });
                    return(
                    <div>
                        <div className="epic-row-sprint">
                            <div className="team-type">
                                <div className="displayTargets">
                                    {this.displayTargets}
                                </div>
                            </div>
                        </div>
                    </div>
            
                    )
                }
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
                <i class="fa fa-refresh fa-spin fa-5x fa-fw loading"> </i>
                <p>No stories found yet...</p>
            </div>
        )
    }
}