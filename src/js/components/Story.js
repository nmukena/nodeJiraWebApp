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
				<div className="story-details">
				<span>Story {this.props.storyId} </span><br/>
				This story is not available.
				</div>
			);	
		} else if (stories[this.props.storyId]) {
            const storyFields = stories[this.props.storyId].issues[0].fields
			return(
			<div>
				<div className="story-details">
					<span>Story {this.props.storyId} </span><br/>
					<span>{storyFields.summary}</span><br/>
					<span>Status: {storyFields.status.name} </span><br/>
					<span>Story Points: {storyFields.customfield_10200} </span><br/>
				</div>
			</div>);
		} else {
			return(
				<div className="story-details">
				<span>Epic {this.props.storyId} </span><br/>
				<i class="fa fa-refresh fa-spin fa-5x fa-fw loading"> </i>
                <p>Wait For It...</p>
				</div>
			);
		}

	}
}