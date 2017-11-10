import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";
import store from "../store.js"


@connect((store)=>{
    return {
		data: store,
    };
})

export default class Story extends React.Component {


    constructor(props){
		super(props)
	}

    render(){

		const stories = this.props.data.allStories

		if (this.error){
			return(
				<div>
				<span>Story {this.props.storyId} </span><br/>
				This story is not available.
				</div>
			);	
		} else if (stories) {
			const storyDict = allStories[this.props.storyId].issues[0].fields
			return(
			<div>
				<span>Story {storyDict.key} </span><br/>
				<span>{storyDict.summary}</span><br/>
				<span>Status: {storyDict.status.name} </span><br/>
                <span>Story Points: {storyDict.customfield_10200} </span><br/>
			</div>);
		} else {
			return(
				<div>
				<span>Epic {this.props.storyId} </span><br/>
				This epic has not been loaded yet.
				</div>
			);
		}

	}
}