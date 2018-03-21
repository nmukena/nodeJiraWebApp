import React from "react";
import { connect } from "react-redux";

import Story from "./Story"

class Sprint extends React.Component {
    constructor(props){
        super(props)
    }

    shouldComponentUpdate(){
        if (this.props.data[this.props.epicId]&&
            this.displayStories.length==Object.keys(this.props.targets).length){
            return false
        }
        return true

    }
    render(){
        var epic = this.props.epic
        var target = this.props.target
        if (this.props.targets[epic][target]){
            var stories = this.props.targets[epic][target]
            this.displayStories = stories.map(story => {
                return (
                    <div key={story} className="epic-type">
                      
                            <Story storyId={story}/>

                    </div>
                )
            });

            return(
                 <div className="target-type">{this.displayStories}</div>
            )
        }

        var date = '';



        return(
            <div>
                    <i class="fa fa-refresh fa-spin fa-5x fa-fw loading"></i>
                    <p>Wait For It...</p>
            </div>
        )
    }
}

function mapStateToProps(state){
  return {
    data: state.stories.storiesByEpics,
    targets: state.stories.storiesByTarget
  };
}

export default connect(mapStateToProps)(Sprint);
