import React from "react";
import { connect } from "react-redux";
import { Provider } from  "react-redux"
import store from "../store.js"

import '../../App.css';

@connect((store)=>{
    return {
        data: store.epics,
    };
})

export default class Header extends React.Component {
	render() {
		var target_list = this.props.data.target_completions.map(target_completion => {
			return (
				<div key={target_completion} className="sprint-header col-2.75 col-pad">
					{target_completion}
				</div>
			)
		});

		return (
			<div>
				<h1 class="col-12">
					ProJER
				</h1>
				<h1 class="col-12">
					Project: {this.props.data.projectId}
				</h1>
				<div className="label-column">
					<div className="label-header col-1 col-pad">Target Completion</div>
					{target_list}
				</div>
			</div>

		);
	}
}