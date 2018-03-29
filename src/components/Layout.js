import React from "react";
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import {displayEpics, displayIndex, loadCapacity, configureCapacity} from "../actions/actions.js";

import '../style/App.css';
import Header from "./Header";
import SprintHeader from "./SprintHeader";
import AllEpics from "./AllEpics";
import AllStoriesByEpic from "./AllStoriesByEpic";
import Footer from "./Footer";
import Index from "./Index";
import CapacityConfig from "./CapacityConfig";

class Layout extends React.Component {

    constructor(props){
        super(props)
    }

    displayEpics(project){
        this.props.displayEpics(project)
    }

    displayIndex(){
        this.props.displayIndex()
    }

    displayCapacityConfig(url, projectId){
        this.props.loadCapacity()
        this.props.configureCapacity()
    }

    render(){
        if (this.props.data.view=="Epics"){
            return(
                <div>
                    <div>
                        <Header />
                    </div>
                    <div className="main-layout">
                        <AllEpics projectId = {this.props.epics.projectId}/>
                    </div>
                    <div>
                        <Footer />
                    </div>
                    <div className="login-button-container">
                        <div onClick={()=>this.displayCapacityConfig(this.props.epics.projectId)} className="login-button">
                            Configure Capacities!
                        </div>
                    </div>
                    <div className="login-button-container">
                        <div onClick={()=>this.displayIndex()} className="login-button">
                            Back to Index!
                        </div>
                    </div>
                </div>
            );
        }
        if (this.props.data.view=="Stories"){
            return(
                <div>
                    <div>
                        <SprintHeader />
                    </div>
                    <div className="main-layout">
                        <AllStoriesByEpic epicId = {this.props.data.epicView}/>
                    </div>
                    <button className="button-back" onClick={()=>this.displayEpics(this.props.epics.projectId)}>
                                Back to Epics!
                    </button>
                    <div>
                        <Footer />
                    </div>
                </div>
            );
        }else if(this.props.data.view=="Index"){
            return(
                <div>
                    <div>
                    <div class="projer projer-head">
                        ProJER by Deloitte
                    </div>
                    <div class="projer projer-welcome">
                        Welcome to ProJER, a Project Management and Planning Tool designed for Jira.
                    </div>
                    </div>
                    <div class="projer projer-detail">
                        <p>Enter your Jira Project Details:</p>
                        <Index />
                    </div>
                </div>
            );
        }else if(this.props.data.view=="Capacity_Config"){
            return(
                <div>
                    <div>
                    <div class="projer projer-head">
                        ProJER by Deloitte
                    </div>
                    <div class="projer projer-welcome">
                        Welcome to ProJER, a Project Management and Planning Tool designed for Jira.
                    </div>
                    </div>
                    <div class="projer projer-detail">
                        <p>Enter your Teams Capacity:</p>
                        <CapacityConfig />
                    </div>
                </div>
            )
        }else if(this.props.data.view=="Priority_Config"){

        }
    };
}

function mapStateToProps(state){
  return {
    data: state.views,
    epics: state.epics,
    connection: state.connection
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({displayEpics, displayIndex, loadCapacity, configureCapacity}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
