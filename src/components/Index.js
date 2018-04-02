import React from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import axios from 'axios';
import {setURL, changeCustomFields, setProject, configureCapacity, configurePriority, loadCapacity, loadPriority, displayEpics, getAllEpics, getAllEpicsSuccess, getEpic, getEpicSuccess, getStoriesByEpic, getStoriesByEpicSuccess, getStory, getStorySuccess} from "../actions/actions.js";
import '../style/App.css';
import api_server from '../API_SERVER';

var API_SERVER = api_server();

class Login extends React.Component {

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
    var project = new Buffer(this.refs.project.value.trim()).toString('hex')

      //this.props.setURL(url, project)
    axios.get(API_SERVER+"/setURL/"+url+"/"+project).then((res)=>{
      if(res){
        this.props.loadCapacity();
        this.props.loadPriority();
      }
      this.props.changeCustomFields(this.refs.target_completion.value.trim(), this.refs.scrum_team.value.trim())

      axios.get(API_SERVER+"/setCredentials/"+user+"/"+pass).then(()=>{
        this.props.setProject(this.refs.project.value.trim())
        // Get All Epics, Get EPics, Get Stories by Epics, and Get All Stories during login
        axios.get(API_SERVER+"/getAllEpics/"+(this.refs.project.value.trim())).then((res)=>{

          this.props.getAllEpicsSuccess(res.data)
          let epics = res.data.issues
          for (var i = 0; i<epics.length; i++){
               this.props.getEpic(epics[i].key)
               this.props.getEpicSuccess(epics[i].key)

               this.props.getStoriesByEpic(epics[i].key)
               axios.get(API_SERVER+"/getStoriesByEpic/"+epics[i].key).then((response)=>{
                 if(response.data.issues.length!=0){

                   this.props.getStoriesByEpicSuccess(response.data.issues[0].fields.customfield_10006, response.data)

                   for (var i = 0; i<response.data.issues.length; i++){
                       this.props.getStory(response.data.issues[i].key)
                       this.props.getStorySuccess(response.data.issues[i].key, response.data.issues[0].fields.customfield_10006)
                   }
                 }

               })
          }

          if (!this.props.data.capacity.configured ){// && this.props.data.capacity.teams.length!==0

            this.props.configureCapacity()
          } else if (!this.props.data.priority.configured) {
            this.props.configurePriority()
          } else {
            this.props.displayEpics(this.refs.project.value.trim())
          }
        })
      })
    })

  }

}

function mapStateToProps(state){
  return {
    data: state
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({setURL, changeCustomFields, setProject, configureCapacity, configurePriority, loadCapacity, loadPriority, displayEpics, getAllEpics, getAllEpicsSuccess, getEpic, getEpicSuccess, getStoriesByEpic, getStoriesByEpicSuccess, getStory, getStorySuccess}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
