import React from "react";
import { connect } from "react-redux";
import * as actions from "./actions/actions.js";

@connect((store)=>{
    return {
        data: store.json,
    };
})

export default class Epic extends React.Component {

    getAllIssuesFunc(id){
        this.props.dispatch(actions.getAllIssues(id))
    }

	render() {

	    if (!this.props.data){
            return <button onClick={this.getAllIssuesFunc("GTMP").bind(this)}>Get Issues</button>
        }

		const listIssues = this.props.data.issues.
        map((issue, i) =>
        <div className="epic-details" key={issue.key}>
            <article>
                <h2>Issue {issue.key}</h2>
                <h3>Description: {issue.fields.summary}</h3>
                <p>Status: {issue.fields.status.name} </p>
            </article>
        </div>)

		return (
			<div className="epic-row-sprint">
				<div className="epic-row">
					<div className="epic-type"><span>Epic One </span><br/>New Customer and Bind on Phone</div>
					<div className="epic-sprint">
						<div className="epic-sprint-one">{listIssues}</div>
						<div className="epic-sprint-two">{listIssues}</div>
						<div className="epic-sprint-three">{listIssues}</div>
						<div className="epic-sprint-four">{listIssues}</div>
					</div>
				</div>
			
				<div className="epic-row">
					<div className="epic-type"><span>Epic Two </span><br/>Advanced Phone Channel Quote</div>
					<div className="epic-sprint">
						<div className="epic-sprint-one"> </div>
						<div className="epic-sprint-two"> </div>
						<div className="epic-sprint-three"> </div>
						<div className="epic-sprint-four"> </div>
					</div>
				</div>
		
			
				<div className="epic-row">
					<div className="epic-type"><span>Epic Three </span><br/>Digital Quote for multi driver and multi vehicle</div>
					<div className="epic-sprint">
						<div className="epic-sprint-one"> </div>
						<div className="epic-sprint-two"> </div>
						<div className="epic-sprint-three"> </div>
						<div className="epic-sprint-four"> </div>
					</div>
				</div>

			</div>
		);
	}
}