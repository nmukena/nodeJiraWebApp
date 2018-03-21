import React from "react";
import { connect } from "react-redux";

import '../style/App.css';

class Header extends React.Component {
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
				<div className="projer-head">
					<div>ProJER By Deloitte</div>
					<div className="projer-project">
					Project: {this.props.data.projectId}
					</div>
				</div>
				<div className="label-column">
					<div className="label-header col-1 col-pad">Target Completion</div>
					{target_list}
				</div>
			</div>

		);
	}
}

function mapStateToProps(state){
  return {
    data: state.epics
  };
}

export default connect(mapStateToProps)(Header);
