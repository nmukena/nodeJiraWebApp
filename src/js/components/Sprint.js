import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";

@connect((store)=>{
    return {
        data: store,
    };
})

export default class Sprint extends React.Component {
    componentWillMount(){
        this.props.dispatch(actions.getAllSprints(4))
	}


    render(){

        const listSprints = this.props.data.sprintIds.
        map((sprint, i) =>
        <div key={sprint.id} className="sprint-header">Sprint {i}: {sprint.name} 
						<div className={sprint.id}></div>
					</div>)
		return (
			<div>
				<h1>
					Target MMF Completion Sprints
				</h1>
				<div className="label-column">
					<div className="label-header">Target Completion</div>     
                	<ul>{ listSprints }</ul>
				</div>
			</div>

		);
	}

	componentDidMount(){
		for (var num = 0; num < this.props.data.sprintIds; num++) {
			this.props.dispatch(actions.getIssuesBySprint(4, this.props.data.sprintIds[num].id))
		}
	}
}