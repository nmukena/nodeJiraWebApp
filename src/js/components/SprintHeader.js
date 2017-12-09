import React from "react";
import { connect } from "react-redux";
import { Provider } from  "react-redux"
import store from "../store.js"

import '../../App.css';

@connect((store)=>{
    return {
        data: store.stories,
        views: store.views,
    };
})

export default class SprintHeader extends React.Component {
	render() {
        if (this.props.data.storiesByTarget[this.props.views.epicView]){
            var target_list = Object.keys(this.props.data.storiesByTarget[this.props.views.epicView]).sort().map(target_completion => {
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
                        Epic: {this.props.views.epicView}
                    </h1>
                    <div className="label-column">
                        {target_list}
                    </div>
                </div>
    
            );
        }
        return null;
	}
}
