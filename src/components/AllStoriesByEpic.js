import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getStoriesByEpic, getStoriesByEpicSuccess, getStoriesByEpicError, getStory, getStorySuccess} from "../actions/actions.js";
import axios from 'axios';
import Sprint from "./Sprint"

import api_server from '../API_SERVER';
var API_SERVER = api_server();

class AllStoriesByEpic extends React.Component {
    constructor(props){
        super(props)
        this.displayTargets = []
    }

    // componentWillMount(){
    //   this.props.getStoriesByEpic(this.props.epicId)
    //   axios.get(API_SERVER+"/getStoriesByEpic/"+this.props.epicId).then((response)=>{
    //       this.props.getStoriesByEpicSuccess(this.props.epicId, response.data)
    //   }).catch((err)=>{
    //     this.props.getStoriesByEpicError(err.response.status, err.response.statusText)
    //   })
    // }

    // shouldComponentUpdate(){
    //     if (this.props.targets[this.props.epicId]&&
    //         this.displayTargets.length==Object.keys(this.props.targets[this.props.epicId]).length){
    //         return false
    //     }
    //     return true
    //
    // }

    render(){
        var stories
        if (this.props.data[this.props.epicId]){
            if (this.props.data[this.props.epicId].issues){
                // var stories = this.props.data[this.props.epicId].issues
                // for (var i = 0; i<stories.length; i++){
                //     this.props.getStory(stories[i].key)
                //     this.props.getStorySuccess(stories[i].key, this.props.epicId)
                // }
                var targetList = []
                if(this.props.targets[this.props.epicId]){
                    targetList = Object.keys(this.props.targets[this.props.epicId]).sort()
                    this.displayTargets = targetList.map(target => {
                        return (
                            <div key={target} class="story-background col-2.75 col-pad">

                                    <Sprint target={target} epic={this.props.epicId}/>

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

function mapStateToProps(state){
  return {
    data: state.stories.storiesByEpics,
    targets: state.stories.storiesByTarget,
    storiestate: state.stories
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({getStoriesByEpic, getStoriesByEpicSuccess, getStoriesByEpicError, getStory, getStorySuccess}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AllStoriesByEpic);
