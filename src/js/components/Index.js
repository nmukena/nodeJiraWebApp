import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";

@connect((store)=>{
    return {
        data: store
    };
})


export default class Login extends React.Component {

  render() {
    var errorMessage = null
    if (this.props.data.connection.unauthorized){
      errorMessage = "The provided credentials are wrong. Please provide your correct Jira credentials"
    } else if (this.props.data.connection.unavailable){
      errorMessage = "We were not able to establish a connection to the the Jira Project. Check your Jira url."
    }

    return (
      <div>
        {errorMessage &&
          <p>{errorMessage}</p>
        }
        Jira Username: <input type='text' ref='username' className="form-control" placeholder='Jira Username'/>
        Jira Password: <input type='password' ref='password' className="form-control"  placeholder='Jira Password'/>
        Jira URL: <input type='text' ref='url' defaultValue='https://mehran-development.atlassian.net' className="form-control" placeholder='Jira URL'/>
        Project ID: <input type='text' ref='project' defaultValue='GTMP' className="form-control" placeholder='Jira URL'/>
        Target Completion Date Custom Field: <input type='text' ref='target_completion' defaultValue='customfield_10501' className="form-control"  placeholder='Target Completion CustomField'/>
        Scrum Team Custom Field: <input type='text' ref='scrum_team' defaultValue='customfield_10500' className="form-control"  placeholder='Scrum Team Customfield'/>
        <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
          Login
        </button>
      </div>
    )
  }

  handleClick(event) {
    // Encrypt 
    var url = new Buffer(this.refs.url.value.trim()).toString('hex')
    var user = new Buffer(this.refs.username.value.trim()).toString('hex')
    var pass = new Buffer(this.refs.password.value.trim()).toString('hex')

    this.props.dispatch(actions.setURL(url))
    this.props.dispatch(actions.setCredentials(user,pass))
    this.props.dispatch(actions.changeCustomFields(this.refs.target_completion.value.trim(), this.refs.scrum_team.value.trim()))
    this.props.dispatch(actions.displayEpics(this.refs.project.value.trim()))
  }
}