import React from "react";

export default class Header extends React.Component {
	render() {
		return (
			<div>
				<h1 class="col-12">
					Target MMF Completion Sprints
				</h1>
				<div className="label-column">
					<div className="label-header col-1 col-pad">Target Completion</div>
					<div className="sprint-header col-2.75 col-pad">Sprint 1

					</div>
					<div className="sprint-header col-2.75 col-pad">Sprint 2

					</div>
					<div className="sprint-header col-2.75 col-pad">Sprint 3

					</div>
					<div className="sprint-header col-2.75 col-pad">Sprint 4

					</div>
				</div>
			</div>

		);
	}
}