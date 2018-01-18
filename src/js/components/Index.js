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
      errorMessage = "We were not able to establish a connection to the Jira Project. Check your Jira url."
    } else if (this.props.data.connection.bad_request) {
      errorMessage = "We were not able to establish a connection to the Jira Project. Please verify the Project ID and the custom fields."
    } else if (!this.props.data.connection.fetched) {
      errorMessage = "We were not able to establish a connection to the Jira Project."
    }

    return (
      <div className="projer projer-detail">
        {errorMessage &&
          <p>{errorMessage}</p>
        }
        <div className="login-input-auth">
          <div className="login-input">
            <input type='text' ref='username' className="form-control" placeholder='Jira Username'/>
          </div>
          <div className="login-input">
            <input type='password' ref='password' className="form-control"  placeholder='Jira Password'/>
          </div>
        </div>
        <div className="login-input">
          <div>Jira URL: </div><input type='text' ref='url' defaultValue='https://mehran-development.atlassian.net' className="form-control" placeholder='Jira URL'/>
        </div>
        <div className="login-input">
          <div>Project ID: </div><input type='text' ref='project' defaultValue='GTMP' className="form-control" placeholder='Jira URL'/>
        </div>
        <div className="login-input">
          <div>Target Completion Date Custom Field: </div><input type='text' ref='target_completion' defaultValue='customfield_10501' className="form-control"  placeholder='Target Completion CustomField'/>
        </div>
        <div className="login-input">
          <div>Scrum Team Custom Field: </div><input type='text' ref='scrum_team' defaultValue='customfield_10500' className="form-control"  placeholder='Scrum Team Customfield'/>
        </div>
        <div className="login-button-container">
          <div onClick={(event) => this.handleClick(event)} className="login-button">
            Login
          </div>
        </div>
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
    this.props.dispatch(actions.setProject(this.refs.project.value.trim()))
    this.props.dispatch(actions.configureCapacity())
  }
}