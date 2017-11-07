import React from "react";

export default class Header extends React.Component {
	render() {
		return (
			<div>
				<h1>
					Target MMF Completion Sprints
				</h1>
				<div className="label-column">
					<div className="label-header">Target Completion</div>
					<div className="sprint-header">Sprint 1
						<div className="sprint-date">TBD-TBD</div>
					</div>
					<div className="sprint-header">Sprint 2
						<div className="sprint-date">TBD-TBD</div>
					</div>
					<div className="sprint-header">Sprint 3
						<div className="sprint-date">TBD-TBD</div>
					</div>
					<div className="sprint-header">Sprint 4
						<div className="sprint-date">TBD-TBD</div>
					</div>
				</div>
			</div>

		);
	}
}